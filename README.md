# Project Setup

## Backend

1. Navigate to the backend directory:
   ```sh
   cd backend/src/fastapi
   ```
2. Create and activate a virtual environment:
   ```sh
   pip install uv
   uv venv
   source .venv/bin/activate
   ```
3. Install `uv` and project dependencies:
   ```sh
   uv pip install -r requirements.txt
   ```
4. Start the backend server using `uv`:
   ```sh
   python main.py
   ```

## Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm start
   ```
4. Start the frontend application with dev mode:
   ```sh
   npm run dev
   ```
