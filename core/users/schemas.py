from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime


class UserLoginSchema(BaseModel):
    username: str = Field(..., max_length=250, description="The Username of the User")
    password: str = Field(..., description="The Password of the User")


class UserRegisterSchema(BaseModel):
    username: str = Field(..., max_length=250, description="The Username of the User")
    password: str = Field(..., description="The Password of the User")
    password_confirm: str = Field(..., description="Confirm The Password of the User")

    @field_validator("password_confirm")
    def check_passwords_match(cls, password_confirm, validation):
        if not (password_confirm == validation.data.get("password")):
            raise ValueError("Passwords Does NOT Match!")
        return password_confirm
