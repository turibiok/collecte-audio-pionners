
📦 backend/
 ┣ 📂 src/
 ┃ ┣ 📂 application/         # 💡 Cas d'utilisation (services / use cases)
 ┃ ┃ ┣ 📂 use-cases/         #  ├── Contient les logiques métiers
 ┃ ┃ ┣ 📂 dtos/              #  ├── Définitions des DTOs (Data Transfer Objects)
 ┃ ┃ ┗ 📂 exceptions/        #  ├── Gestion des exceptions spécifiques à l’application
 ┃ ┣ 📂 domain/              # 💡 Cœur du métier
 ┃ ┃ ┣ 📂 entities/          #  ├── Entités (classes qui modélisent le domaine)
 ┃ ┃ ┣ 📂 repositories/      #  ├── Interfaces des repositories
 ┃ ┃ ┗ 📂 services/          #  ├── Logique métier indépendante de l’infra
 ┃ ┣ 📂 infrastructure/      # 💡 Couche infrastructure (DB, API, etc.)
 ┃ ┃ ┣ 📂 database/          #  ├── Implémentation des repositories
 ┃ ┃ ┣ 📂 http/              #  ├── Express (routes, middleware, controllers)
 ┃ ┃ ┗ 📂 config/            #  ├── Configuration (dotenv, etc.)
 ┃ ┣ 📂 adapters/            # 💡 Interfaces d'entrée/sortie (Ports)
 ┃ ┃ ┣ 📂 controllers/       #  ├── Controllers Express (entrée)
 ┃ ┃ ┣ 📂 mappers/           #  ├── Mappers (DTO <-> Entité)
 ┃ ┃ ┗ 📂 external-services/ #  ├── Services externes (ex: API tiers)
 ┃ ┣ 📂 shared/              # 💡 Code réutilisable (utilitaires, types)
 ┃ ┣ 📜 app.ts               # 📌 Point d’entrée principal Express
 ┃ ┗ 📜 server.ts            # 📌 Démarrage du serveur
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┗ 📜 .env



📦 backend/
 ┣ 📂 src/
 ┃ ┣ 📂 application/         
 ┃ ┣ 📂 domain/
 ┃ ┣ 📂 infrastructure/
 ┃ ┣ 📂 adapters/
 ┃ ┣ 📂 shared/
 ┃ ┣ 📜 app.ts
 ┃ ┗ 📜 server.ts
 ┣ 📂 tests/                # 📌 Dossier pour les tests unitaires
 ┃ ┣ 📂 application/        #  ├── Tests des cas d'utilisation
 ┃ ┣ 📂 domain/             #  ├── Tests des entités / services métiers
 ┃ ┣ 📂 infrastructure/     #  ├── Tests des repositories
 ┃ ┣ 📂 adapters/           #  ├── Tests des controllers
 ┃ ┗ 📜 setup.ts            # 📌 Setup global des tests (ex: connexion à une DB de test)
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┗ 📜 jest.config.js        # 📌 Configuration Jest






jsonwebtoken : Gestion des tokens JWT
bcryptjs : Hashage des mots de passe
mysql2 : Connexion à MySQL sans ORM
dotenv : Chargement des variables d’environnement
nodemailer : Envoi d’emails
passport & passport-google-oauth20 : Authentification avec Google OAuth



npm install @react-email/render @react-email/tailwind react react-dom

npm i @react-email/components


npm install --save-dev @types/react @types/react-dom


npx tsc --init


npm i @types/nodemailer


npx nodemon --version


PS C:\Users\user\Desktop\sublime-world_backend> tree /F
e numéro de série du volume est DA61-F042
C:.
│   .env
│   .gitignore
│   nodemon.json
│   package-lock.json
│   package.json
│   structure.sh
│   tree.bat
│   try-tsconfig.json
│   tsconfig.json
│
└───src
    │   server.ts
    │
    ├───config
    │       Database.ts
    │
    ├───controllers
    │       AuthController.ts
    │
    ├───databases
    │       user.sql
    │
    ├───emails
    │       VerificationEmail.tsx
    │
    ├───logs
    ├───middlewares
    │       AuthMiddleware.ts
    │
    ├───models
    │       User.ts
    │
    ├───routes
    │       AuthRoutes.ts
    │
    ├───services
    │       AuthService.ts
    │       EmailService.ts
    │
    └───utils



npm install --save-dev jest ts-jest @types/jest

npm install openai


 npm install tailwindcss-animate --legacy-peer-deps





  shopt -s dotglob
  mv sublime-world_frontend/* .
  shopt -u dotglob


Essayer de Centraliser les methodes d'actions de l'utilisateur et indexé le composant 
dans lequel ces méthodes peuvent être appelé 