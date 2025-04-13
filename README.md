# 🎬 Movies App

A sleek and modern movie browsing app built with **React 19**, powered by **Vite**, using **Appwrite** for backend services and **TMDB API** for fetching movie data. Browse popular movies, see what's trending, and search with a smooth, optimized user experience.

🔗 **Live Demo:** [https://react19-movies-app.vercel.app/](https://react19-movies-app.vercel.app/)

---

## ✨ Features

- 🔥 **Trending & Popular Movies**: Fetched directly from TMDB API.
- 🔍 **Optimized Search**: Debounced search input for better performance.
- 📈 **Trending Based on Searches**: Stores search count and movie ID in Appwrite DB to determine most-searched movies.
- 💾 **Backend Powered by Appwrite**: Used for managing searched movie metadata.
- ⚡️ **Fast & Modern Frontend**: Built using React 19 and Vite for lightning-fast development.
- 📱 **Responsive Design**: Looks great on mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Appwrite (Database & API integration)
- **External API**: [TMDB API](https://www.themoviedb.org/documentation/api)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

---

## 🖼️ Screenshots

| Home Page|
|-----------|
| ![Hero-Movies](https://github.com/user-attachments/assets/f2b1dd26-04c4-44d6-adc9-cd2c62c4cd37) |


| trendings|
|-----------|
|![Trending](https://github.com/user-attachments/assets/8dab6e40-dea9-40c6-8673-0da54e3b295b)|

| Popular |
|---------|
|![popularlist](https://github.com/user-attachments/assets/83bf0007-7394-4794-9765-df923fdeaf52)



---

## 🚀 Getting Started

### Clone the repo

```bash
git clone https://github.com/your-username/react19-movies-app.git
cd react19-movies-app
```

  ```sh
npm install
```

## Create an account on appwrite and TMDB
🔗 **Appwrite** [appwrite](https://appwrite.io/)

🔗 **TMDB:** [TMDB](https://developer.themoviedb.org/reference/intro/getting-started)

---


### Add environment variables
Create a .env file in the root of your project and add the following:


.env
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=your_db_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id

```
Run the development server

```bash
npm run dev
```
