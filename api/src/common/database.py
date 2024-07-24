import os

from fastapi import FastAPI
from tortoise import Tortoise
from dotenv import load_dotenv

# 加载.env文件
load_dotenv()


def get_db_config():
    return {
        'connections': {
            # 默认连接
            'default': {
                'engine': 'tortoise.backends.mysql',
                'credentials': {
                    'host': os.getenv('DB_HOST'),
                    'port': int(os.getenv('DB_PORT')),
                    'user': os.getenv('DB_USER'),
                    'password': os.getenv('DB_PASSWORD'),
                    'database': os.getenv('DB_NAME'),
                }
            }
        },
        'apps': {
            'models': {
                'models': ['common.models'],
                'default_connection': 'default',
            }
        }
    }


async def init_db():
    await Tortoise.init(config=get_db_config())


async def close_db_connections():
    await Tortoise.close_connections()


def register_tortoise(app: FastAPI):
    app.add_event_handler("startup", init_db)
    app.add_event_handler("shutdown", close_db_connections)
