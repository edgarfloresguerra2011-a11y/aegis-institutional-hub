import os
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
import uvicorn

app = FastAPI(title="AEGIS Operational Intelligence")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.get("/", response_class=HTMLResponse)
async def read_index():
    return FileResponse(os.path.join(BASE_DIR, "index.html"))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8083)
