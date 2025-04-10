
import os
import shutil
import traceback
from pathlib import Path

def move_latest_files(src_folder, dest_folder, num_files=2):
    src_path = Path(os.path.expanduser(src_folder))
    dest_path = Path(dest_folder)
    
    if not src_path.exists():
        print(f"Le dossier source {src_path} n'existe pas.")
        return
    if not dest_path.exists():
        os.makedirs(dest_path)
    
    files = sorted(src_path.iterdir(), key=os.path.getmtime, reverse=True)
    print(f"Nombre de fichiers trouvés : {len(files)}")
    
    files_to_move = [f for f in files if f.is_file()][:num_files]
    
    for file in files_to_move:
        try:
            print(f"Tentative de déplacement : {file}")
            shutil.move(str(file), str(dest_path))
            print(f"Déplacé : {file} -> {dest_path}")
        except Exception as e:
            print(f"Erreur lors du déplacement de {file}: {e}")
            traceback.print_exc()

if __name__ == "__main__":
    move_latest_files("C:/Users/user/Downloads", "D:/just/very-last", num_files=1)
