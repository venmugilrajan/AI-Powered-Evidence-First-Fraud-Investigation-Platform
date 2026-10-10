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

# Import the FastAPI application
from app.main import app

# Standard aliases expected by serverless WSGI/ASGI runtimes
application = app
handler = app
