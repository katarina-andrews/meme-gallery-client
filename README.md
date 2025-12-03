# Meme Gallery 

A lightweight React frontend for the Meme Gallery App. Users can register, log in, add memes, update memes, delete memes, and like/unlike memes. This frontend communicates with the Express + Prisma backend API.

**Author:** Katarina Andrews

- **[Deployment URL](https://d8ltedkzvs2h3.cloudfront.net/)**
- **[Backend repository](https://github.com/katarina-andrews/meme-gallery-api)**

##  Features
- User registration and login
- JWT-based authentication (stored in `localStorage`)
- Add new memes
- Update existing memes
- Delete memes
- Like/unlike memes (with heart icon)
- Fully styled using **TailwindCSS**
- API communication via **Axios**
- Icons via **@heroicons/react**
- Deployed using **Amazon S3 + CloudFront**

## Components Overview

### AddMemeForm

- Allows logged-in users to submit memes
- Validates form inputs

### LoginForm

- Sends login credentials to backend
- Stores authenticated user in `localStorage`

### RegisterForm

- Creates a new user
- Automatically logs them in (**note: must logout then login after registration to manage memes**)

### LogoutBtn

- Clears `localStorage`
- Logs user out

### MemeList

Contains all main app functionality:
- Displays all memes
- Shows like count + liked/unliked state
- Edit meme
- Delete meme
- Heart icon toggle using Heroicons
