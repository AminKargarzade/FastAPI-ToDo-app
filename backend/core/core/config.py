from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SQLALCHEMY_DATABASE_URL: str

    model_config = SettingsConfigDict(env_file=".env")
    JWT_SECRET_KEY: str = "your_secret_key"


settings = Settings()
