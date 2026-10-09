import re
from typing import Dict, Any, List
from urllib.parse import urlparse
import tldextract

# Common entity regexes
URL_REGEX = re.compile(
    r'(?:https?://)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d+)?(?:/[^\s]*)?',
    re.IGNORECASE
)
EMAIL_REGEX = re.compile(
    r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+',
    re.IGNORECASE
)
PHONE_REGEX = re.compile(
    r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}',
    re.ASCII
)
UPI_REGEX = re.compile(
    r'[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}',
    re.IGNORECASE
)
CURRENCY_REGEX = re.compile(
    r'(?:[$€£₹]|USD|EUR|GBP|INR)\s?\d+(?:,\d{3})*(?:\.\d{1,2})?',
    re.IGNORECASE
)

# Sensitive data redaction regexes
REDACT_PHONE = re.compile(r'(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}')
REDACT_EMAIL = re.compile(r'([a-zA-Z0-9_.+-]{1,2})[a-zA-Z0-9_.+-]+(@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)')

def normalize_text(text: str) -> str:
    """Safe Unicode normalization and whitespace trimming."""
    if not text:
        return ""
    # Strip null bytes and non-printable control characters while preserving newlines
    cleaned = "".join(ch for ch in text if ch == '\n' or ch == '\t' or ord(ch) >= 32)
    # Collapse multiple consecutive blank lines
    return re.sub(r'\n{3,}', '\n\n', cleaned).strip()

def redact_sensitive_pii(text: str) -> str:
    """Masks phone numbers and obfuscates email handles before third-party LLM transmission."""
    if not text:
        return ""
    redacted = REDACT_PHONE.sub("[REDACTED_PHONE]", text)
    redacted = REDACT_EMAIL.sub(r"\1***\2", redacted)
    return redacted

def extract_entities_from_input(
    raw_text: str = "",
    raw_url: str = "",
    claimed_org: str = "",
    payment_handle: str = ""
) -> List[Dict[str, str]]:
    """Deterministic extractor for all core indicators."""
    entities: List[Dict[str, str]] = []
    seen = set()

    def add_entity(etype: str, val: str, ctx: str = "text_body"):
        val_clean = val.strip()
        key = (etype, val_clean.lower())
        if val_clean and key not in seen:
            seen.add(key)
            entities.append({
                "entity_type": etype,
                "value": val_clean,
                "normalized_value": val_clean.lower(),
                "source_context": ctx
            })

    # Direct input parameters
    if raw_url:
        add_entity("URL", raw_url, "user_url_field")
        parsed = urlparse(raw_url if "://" in raw_url else "http://" + raw_url)
        if parsed.hostname:
            add_entity("DOMAIN", parsed.hostname, "url_domain_derivation")

    if claimed_org:
        add_entity("ORG", claimed_org, "user_claimed_org_field")

    if payment_handle:
        add_entity("PAYMENT_HANDLE", payment_handle, "user_payment_field")

    if not raw_text:
        return entities

    # Extract URLs from text
    for match in URL_REGEX.finditer(raw_text):
        url_cand = match.group(0).strip(".,;!?'\"()")
        if "." in url_cand and not url_cand.startswith("@"):
            add_entity("URL", url_cand, "extracted_url")
            parsed = urlparse(url_cand if "://" in url_cand else "http://" + url_cand)
            if parsed.hostname and "." in parsed.hostname:
                add_entity("DOMAIN", parsed.hostname, "extracted_domain")

    # Extract Emails
    for match in EMAIL_REGEX.finditer(raw_text):
        email_cand = match.group(0)
        add_entity("EMAIL", email_cand, "extracted_email")
        domain_part = email_cand.split("@")[-1]
        add_entity("DOMAIN", domain_part, "email_domain")

    # Extract Payment Handles / UPI
    for match in UPI_REGEX.finditer(raw_text):
        cand = match.group(0)
        # Verify it's not already classified as an email
        if not any(cand.lower() == e["normalized_value"] for e in entities if e["entity_type"] == "EMAIL"):
            # Check popular Indian banking handles or payment identifiers
            if any(cand.lower().endswith(h) for h in ["@oksbi", "@okaxis", "@okicici", "@okhdfcbank", "@paytm", "@ybl", "@ibl"]):
                add_entity("PAYMENT_HANDLE", cand, "extracted_upi_vpa")

    # Extract Currency Amounts
    for match in CURRENCY_REGEX.finditer(raw_text):
        add_entity("CURRENCY_AMOUNT", match.group(0), "extracted_fee_claim")

    return entities
