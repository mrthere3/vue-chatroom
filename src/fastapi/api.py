from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import base64

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/login')
async def login(request: Request):
    data = await request.json()
    print(data)
    if (data["username"] == "wangxiaogang") and (data["password"] == 123456):
        response = JSONResponse({
            "status_code":
            200,
            "token": (base64.b64encode(
                data["username"].encode("utf-8"))).decode('utf-8')
        })
        return response
    else:

        return JSONResponse({"status_code": 400})


@app.post('/model_record')
async def records(request: Request):
    data = await request.json()
    print(data)
    return JSONResponse({"records": ["天气真好", "没错", "你明天回来嘛", "是的我后天回来"]})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=7999)
