import pytest
import re
from playwright.sync_api import sync_playwright, expect

FRONTEND_URL = "http://127.0.0.1:5173"

def test_full_browser_user_journey():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        # 1. Landing Page
        page.goto(FRONTEND_URL, wait_until="networkidle")
        expect(page).to_have_title(re.compile("TrustTrace|Vite", re.IGNORECASE))
        heading = page.locator("h1")
        expect(heading).to_contain_text("Investigate Suspicious Messages")

        # 2. Navigate to New Investigation Wizard
        page.click("text=Start Investigation")
        page.wait_for_url("**/investigate/new")

        # 3. Choose a Benchmark Preset Scenario (Postal Redelivery)
        page.click("text=Suspicious Postal Redelivery Fee")
        
        # Verify preset fields are loaded into input fields
        claimed_org_input = page.locator("input[placeholder*='USPS, Amazon']")
        expect(claimed_org_input).to_have_value("USPS")

        # 4. Launch Investigation
        launch_btn = page.locator("button[type='submit']")
        launch_btn.click()

        # 5. Wait for Investigation Workspace
        page.wait_for_url("**/investigations/**", timeout=15000)
        
        # 6. Verify Executive Risk Banner
        risk_banner = page.locator("text=/.*OBSERVED RISK.*/")
        expect(risk_banner).to_be_visible()

        # 7. Check Score Breakdown in Executive Findings
        expect(page.locator("text=Transparent Score Attribution")).to_be_visible()
        expect(page.locator("text=Domain Contradicts Claimed Organization").first).to_be_visible()

        # 8. Interactive Evidence Graph Tab
        page.click("button:has-text('Evidence Graph & Provenance')")
        page.wait_for_selector(".react-flow", timeout=10000)

        # Click a node inside the React Flow canvas to trigger the Evidence Inspector
        node = page.locator(".react-flow__node").first
        expect(node).to_be_visible()
        node.click()

        # Verify Evidence Inspector panel reflects selected node details
        expect(page.locator("text=Evidence Inspector")).to_be_visible()

        # 9. Test Claims & Lookups Tabs
        page.click("button:has-text('Claims')")
        expect(page.locator("text=Extracted Discrete Claims")).to_be_visible()

        page.click("button:has-text('External Lookups')")
        expect(page.locator("text=External Threat Intelligence Lookups")).to_be_visible()

        # 10. Check Case Dossier Report Tab and Report Export
        page.click("button:has-text('Dossier Report')")
        expect(page.locator("text=TrustTrace Case Dossier Snapshot")).to_be_visible()

        # Test Export Markdown download/trigger
        with page.expect_download() as download_info:
            page.click("button:has-text('Export Markdown')")
        download = download_info.value
        assert "trusttrace-case-" in download.suggested_filename
        assert download.suggested_filename.endswith(".md")

        # 11. Navigate to History & Archive
        page.click("text=History & Cases")
        page.wait_for_url("**/history")
        expect(page.locator("text=Investigation Case Archive")).to_be_visible()
        
        # Confirm our created investigation shows up in the archive
        expect(page.locator("text=Suspicious Postal Redelivery Fee").first).to_be_visible()

        # 12. Test Investigation Deletion
        # Set up dialog handler for window.confirm
        page.on("dialog", lambda dialog: dialog.accept())
        initial_delete_btn = page.locator("button[title='Delete Case']").first
        expect(initial_delete_btn).to_be_visible()
        initial_delete_btn.click()
        page.wait_for_timeout(1000)

        # 13. Settings / Integrations Page
        page.click("text=Integrations & Mode")
        page.wait_for_url("**/settings")
        expect(page.locator("text=System Settings & Threat Feeds")).to_be_visible()
        expect(page.locator("text=Demonstration & Evaluation Lab")).to_be_visible()

        # 14. Error Handling Verification
        # Navigate to a non-existent investigation ID and verify error handling
        page.goto(f"{FRONTEND_URL}/investigations/00000000-0000-0000-0000-000000000000")
        expect(page.locator("text=Case Record Not Found")).to_be_visible()

        browser.close()
