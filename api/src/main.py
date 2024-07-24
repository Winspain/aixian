import os
import sys
from pathlib import Path

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI

from apps.auth.router import router
from common.database import register_tortoise

# 加载.env文件
load_dotenv()

app = FastAPI()

# 数据库初始化
register_tortoise(app)

# 添加路由
app.include_router(router)

if __name__ == '__main__':
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sys.path.append(root_dir)
    web_port = int(os.getenv('WEB_PORT'))
    current_path = Path(__file__).parent
    log_path = f'{current_path}/logging.json'
    uvicorn.run('main:app', host='0.0.0.0', port=web_port, log_config=log_path)
