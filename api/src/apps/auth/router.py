from fastapi import APIRouter, HTTPException
from tortoise.exceptions import DoesNotExist

from common.models import ChatGPTUser
from common.schemas import TokenRequest

router = APIRouter()


@router.post('/aixian/v1/user', response_model=dict)
async def get_user_expire_time(token_request: TokenRequest):
    try:
        user = await ChatGPTUser.filter(userToken=token_request.userToken).exclude(deletedAt__isnull=False).first()
        return {"userToken": user.userToken, "expireTime": user.expireTime}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")
