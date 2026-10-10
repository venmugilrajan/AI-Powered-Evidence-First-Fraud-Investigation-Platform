import sys
import os

# Add backend directory to Python sys.path so app modules import cleanly
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

candidate_paths = [
    os.path.join(current_dir, "..", "backend"),
    os.path.join(parent_dir, "backend"),
    os.path.join(os.getcwd(), "backend"),
    current_dir,
]

for p in candidate_paths:
    if os.path.exists(p) and p not in sys.path:
        sys.path.insert(0, p)

try:
    from app.main import app
except Exception as e:
    # Diagnostic fallback so the exact exception is returned to the client rather than an opaque 500 error
    from fastapi import FastAPI
    app = FastAPI(title="TrustTrace Startup Error Diagnostic")

    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
    def catch_all(path: str):
        return {
            "error": "Failed to import app.main",
            "exception": str(e),
            "sys_path": sys.path,
            "cwd": os.getcwd()
        }
