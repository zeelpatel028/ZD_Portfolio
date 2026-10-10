import os
import sys
import uvicorn

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"[SERVER] Starting Zeel Dobariya Portfolio FastAPI Server on http://{host}:{port}")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
