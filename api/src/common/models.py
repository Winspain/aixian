# global models
from tortoise.models import Model
from tortoise import fields


class ChatGPTUser(Model):
    userToken = fields.CharField(max_length=255)
    expireTime = fields.DatetimeField()
    deletedAt = fields.DatetimeField(source_field='deleted_at')

    class Meta:
        table = "chatgpt_user"  # 指定表名
