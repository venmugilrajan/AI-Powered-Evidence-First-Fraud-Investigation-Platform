import ipaddress
import socket
from urllib.parse import urlparse
from typing import Tuple, Optional

BLOCKED_IP_NETWORKS = [
    ipaddress.ip_network("0.0.0.0/8"),
    ipaddress.ip_network("10.0.0.0/8"),
    ipaddress.ip_network("127.0.0.0/8"),
    ipaddress.ip_network("169.254.0.0/16"),   # Link-local / Cloud metadata (AWS, GCP, Azure)
    ipaddress.ip_network("172.16.0.0/12"),
    ipaddress.ip_network("192.168.0.0/16"),
    ipaddress.ip_network("100.64.0.0/10"),   # Carrier-grade NAT
    ipaddress.ip_network("198.18.0.0/15"),   # Benchmarking
    ipaddress.ip_network("224.0.0.0/4"),     # Multicast
    ipaddress.ip_network("240.0.0.0/4"),     # Reserved
    ipaddress.ip_network("::/128"),          # Unspecified IPv6
    ipaddress.ip_network("::1/128"),        # Loopback IPv6
    ipaddress.ip_network("::ffff:0:0/96"),   # IPv4-mapped IPv6
    ipaddress.ip_network("64:ff9b::/96"),    # IPv4/IPv6 translation
    ipaddress.ip_network("100::/64"),        # Discard-only
    ipaddress.ip_network("2001::/23"),       # IETF protocol assignments
    ipaddress.ip_network("2001:db8::/32"),   # Documentation
    ipaddress.ip_network("fc00::/7"),        # Unique local address (ULA)
    ipaddress.ip_network("fe80::/10"),       # Link-local IPv6
    ipaddress.ip_network("ff00::/8"),        # Multicast IPv6
]

class SSRFGuard:
    """
    Guards outbound HTTP requests from executing against private, link-local,
    cloud metadata, or local loopback interfaces.
    """
    
    @staticmethod
    def validate_url(url: str) -> Tuple[bool, Optional[str]]:
        try:
            parsed = urlparse(url)
            if parsed.scheme not in ("http", "https"):
                return False, f"Unsupported URL scheme '{parsed.scheme}'. Only http and https are permitted."
            
            hostname = parsed.hostname
            if not hostname:
                return False, "Malformed URL: missing hostname."
            
            # Check for localhost literal
            if hostname.lower() in ("localhost", "127.0.0.1", "::1", "metadata.google.internal"):
                return False, f"Target hostname '{hostname}' resolves to a restricted internal domain."
            
            # Attempt to resolve IP to prevent DNS rebinding or private IP target
            try:
                addr_info = socket.getaddrinfo(hostname, None)
                for item in addr_info:
                    ip_str = item[4][0]
                    ip_obj = ipaddress.ip_address(ip_str)
                    for network in BLOCKED_IP_NETWORKS:
                        if ip_obj in network:
                            return False, f"Security restriction: Host resolves to protected network address ({ip_str}). Outbound lookup blocked."
            except socket.gaierror:
                # If DNS does not resolve, it's not a reachable target
                return False, f"DNS resolution failed for hostname '{hostname}'."
            
            return True, None
        except Exception as e:
            return False, f"URL validation error: {str(e)}"
