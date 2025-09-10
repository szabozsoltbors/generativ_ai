from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "FastAPI Exercices"
    database_url: str = "sqlite:///./app.db"
    debug: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
