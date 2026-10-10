import sys
import os

# Set up paths so app imports cleanly
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

for path in [
    os.path.join(parent_dir, "backend"),
    os.path.join(current_dir, "..", "backend"),
    os.path.join(os.getcwd(), "backend"),
    current_dir
]:
    if os.path.exists(path) and path not in sys.path:
        sys.path.insert(0, path)

try:
    # Import the FastAPI application
    from app.main import app
except Exception as e:
    import traceback
    err_trace = traceback.format_exc()
    print(f"CRITICAL: Failed to import FastAPI application: {err_trace}", file=sys.stderr)
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse
    app = FastAPI(title="TrustTrace Error Fallback")
    
    @app.get("/api/debug")
    @app.get("/debug")
    async def get_debug_info():
        return JSONResponse(
            status_code=200,
            content={
                "status": "error_fallback_active",
                "error_type": type(e).__name__,
                "details": str(e),
                "traceback": err_trace
            }
        )
    
    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"])
    async def catch_all_error(path: str):
        return JSONResponse(
            status_code=500,
            content={
                "error": "Backend initialization failed",
                "details": str(e),
                "traceback": err_trace
            }
        )


# Standard aliases expected by serverless WSGI/ASGI runtimes
application = app
handler = app

