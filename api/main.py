from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from pydantic import BaseModel
import io
import os
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive.file']

class AudioUploadResponse(BaseModel):
    success: bool
    file_id: str = None
    error: str = None

def get_google_drive_service():
    creds = None
    
    # Load credentials from the credentials.json file
    with open('credentials.json', 'r') as f:
        creds_data = json.load(f)
    
    # Initialize credentials with client secrets
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json', SCOPES)
    creds = flow.run_local_server(port=0)
    
    return build('drive', 'v3', credentials=creds)

@app.post("/upload-audio/", response_model=AudioUploadResponse)
async def upload_audio(file: UploadFile = File(...), corpus_id: int = None):
    try:
        # Create Google Drive API service
        service = get_google_drive_service()
        
        # Read the file into memory
        file_content = await file.read()
        
        # Create file metadata
        file_metadata = {
            'name': f'corpus_{corpus_id}_{file.filename}',
            'mimeType': 'audio/wav'
        }
        
        # Create media
        fh = io.BytesIO(file_content)
        media = MediaIoBaseUpload(fh, mimetype='audio/wav', resumable=True)
        
        # Upload file to Google Drive
        file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()
        
        return AudioUploadResponse(success=True, file_id=file.get('id'))
        
    except Exception as e:
        return AudioUploadResponse(success=False, error=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)