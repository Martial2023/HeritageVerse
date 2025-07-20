# 🌍 HeritageVerse - Préserve et Anime les Contes Africains avec l'IA

**HeritageVerse** est une application web interactive alimentée par l'Intelligence Artificielle qui redonne vie aux contes africains traditionnels en créant des expériences narratives immersives et multimédia.

## 🎯 Problématique

Les contes africains, véritables trésors de sagesse et de culture, se perdent progressivement faute de documentation moderne et d'outils adaptés pour les transmettre aux nouvelles générations. Ces récits ancestraux, porteurs de valeurs et d'enseignements, risquent de disparaître dans l'oubli.

## 💡 Notre Solution

HeritageVerse transforme la préservation du patrimoine culturel africain grâce à une approche technologique innovante qui :

### ✨ Fonctionnalités Principales

- **🎨 Génération d'Histoires Animées** : Transformation automatique de contes traditionnels en expériences multimédia complètes
  - Texte structuré et optimisé
  - Images illustratives générées par IA
  - Narration vocale authentique

- **🎙️ Enregistrement Personnel** : Interface permettant aux utilisateurs d'enregistrer leurs propres contes familiaux
  - L'IA illustre automatiquement les récits
  - Création d'avatars africains pour la narration
  - Préservation de l'authenticité culturelle

- **🌐 Traduction Multilingue** : Support des langues africaines pour une accessibilité maximale
  - Traduction automatique vers les langues locales
  - Préservation des nuances culturelles
  - Respect des dialectes régionaux

- **📚 Classification Intelligente** : Organisation systématique du patrimoine
  - Classement par région géographique
  - Catégorisation par langue d'origine
  - Indexation par pays et communauté
  - Système de tags thématiques

### 🛠️ Technologies Utilisées

- **Frontend** : Next.js 15 avec TypeScript
- **IA** : Google Gemini API pour la génération de contenu
- **Base de données** : Prisma ORM
- **UI** : Tailwind CSS + shadcn/ui
- **Audio** : Gestion des enregistrements et narration
- **Images** : Génération automatique d'illustrations

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm/yarn/pnpm/bun
- Clé API Google Gemini

### Installation

```bash
# Cloner le repository
git clone [url-du-repo]
cd my-heritage

# Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### Configuration

1. Créer un fichier `.env.local` à la racine du projet :
```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL="your_database_url"
```

2. Configurer la base de données :
```bash
npx prisma generate
npx prisma db push
```

### Lancement du serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## 📖 Utilisation

1. **Découvrir les Contes** : Parcourez la collection de contes africains classés par région
2. **Écouter et Visualiser** : Profitez des narrations audio et des illustrations générées
3. **Contribuer** : Enregistrez vos propres contes familiaux pour enrichir la collection
4. **Explorer** : Utilisez les filtres par langue, région ou thématique

## 🌟 Impact Cultural

HeritageVerse contribue à :
- **Préserver** le patrimoine oral africain
- **Transmettre** les valeurs traditionnelles aux jeunes générations
- **Valoriser** la diversité culturelle africaine
- **Connecter** les communautés à travers leurs récits communs

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Reporter des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Ajouter de nouveaux contes

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

## 🙏 Remerciements

Merci à tous les gardiens de la tradition orale africaine qui inspirent ce projet et contribuent à la préservation de notre riche héritage culturel.

---

**HeritageVerse** - *Où chaque conte trouve sa voix, chaque histoire trouve ses couleurs.*
