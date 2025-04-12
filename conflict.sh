#!/bin/bash




# Vérifie que tu es bien sur la branche AInelo-main
git checkout AInelo-main

# Synchronise les branches distantes
git fetch origin

# Bascule sur main
git checkout main

# Copie le contenu exact de AInelo-main dans main
git reset --hard AInelo-main

# Change le remote vers ton dépôt personnel
git remote set-url origin git@github.com:turibiok/collecte-audio-pionners.git

# Vérifie le remote
git remote -v

# Pousse le nouveau contenu de main sur ton dépôt
git push origin main --force


