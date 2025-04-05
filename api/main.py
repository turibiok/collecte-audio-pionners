# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from kaggle.api.kaggle_api_extended import KaggleApi
import os
import tempfile
import uuid
import shutil
import json
from flask_cors import CORS

app = Flask(__name__)

# Permettre toutes les origines (CORS)
CORS(app)

KAGGLE_DATASET_SLUG = "audio-dataset-auto-upload-collectml-test"
KAGGLE_DATASET_TITLE = "Audio Dataset Auto upload CollectML Test"
KAGGLE_DATASET_DIR = "audio_dataset_collectml_test"


KAGGLE_USERNAME = os.getenv('KAGGLE_USERNAME')
KAGGLE_KEY = os.getenv('KAGGLE_KEY')


# KAGGLE_USERNAME = "lioneltoton"
# KAGGLE_KEY = "481062f8a29ca2be8c326d0d7cc3326b"

@app.route("/upload-audio/", methods=["POST"])
def upload_audio():
    try:
        # Authentification avec Kaggle
        os.environ["KAGGLE_USERNAME"] = KAGGLE_USERNAME
        os.environ["KAGGLE_KEY"] = KAGGLE_KEY
        api = KaggleApi()
        api.authenticate()

        # Vérifier la présence du fichier dans la requête
        if 'file' not in request.files:
            return jsonify({"success": False, "error": "No file part"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"success": False, "error": "No selected file"}), 400

        # Sauvegarde du fichier
        filename = f"audio_{uuid.uuid4().hex}.wav"
        tmp_dir = tempfile.gettempdir()
        dataset_path = os.path.join(tmp_dir, KAGGLE_DATASET_DIR)
        os.makedirs(dataset_path, exist_ok=True)

        file_path = os.path.join(dataset_path, filename)
        file.save(file_path)

        # Création ou ajout au dataset Kaggle
        dataset_ref = f"{os.environ['KAGGLE_USERNAME']}/{KAGGLE_DATASET_SLUG}"
 
        # Création du fichier dataset-metadata.json
        metadata = {
            "title": "Audio Dataset Auto upload Test",
            "id": f"{os.environ['KAGGLE_USERNAME']}/{KAGGLE_DATASET_SLUG}",
            "licenses": [{"name": "CC0-1.0"}],
            "description": "This dataset contains audio files uploaded automatically.",
            "keywords": ["audio", "dataset", "upload", "machine learning"]
        }

        try:
            api.dataset_view(dataset_ref)
            dataset_exists = True
            print("Dataset exists")
        except:
            dataset_exists = False

        if not dataset_exists:
            with open(os.path.join(dataset_path, "dataset-metadata.json"), "w") as f:
                json.dump(metadata, f)
            api.dataset_create_new(dataset_path, public=True, quiet=True)
            message = f"Dataset créé avec {filename}"
        else:
            # Ajout du fichier au dataset existant
            api.dataset_upload_file(dataset_ref, file_path, quiet=True)
            message = f"{filename} ajouté au dataset existant"

        return jsonify({"success": True, "message": message})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8100)
