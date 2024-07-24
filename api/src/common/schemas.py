from pydantic import BaseModel


class TokenRequest(BaseModel):
    userToken: str
