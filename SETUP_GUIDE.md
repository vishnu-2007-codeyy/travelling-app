# Setup Instructions - Travel App Complete Setup

This guide will help you run your Travel Planning Web App with the new backend.

## Prerequisites

Make sure you have installed:
- Node.js (v16 or higher) - Download from https://nodejs.org
- npm (comes with Node.js)

## Step 1: Install Frontend Dependencies

```bash
cd "d:\TRAVELLING APP\Travel Planning Web App (1)"
npm install
```

Wait for all packages to install. This might take 2-3 minutes.

## Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all backend packages including Express, SQLite, JWT, bcrypt, etc.

## Step 3: Create Backend Environment File

In the `backend` folder, create a file named `.env`:

```
PORT=5000
JWT_SECRET=your-secret-travel-key-2026
NODE_ENV=development
DB_PATH=./db/travel_app.db
```

## Step 4: Run the Backend Server

Open a new terminal/PowerShell and run:

```bash
cd "d:\TRAVELLING APP\Travel Planning Web App (1)\backend"
npm run dev
```

You should see output like:
```
✓ Database initialized successfully
🚀 Server is running on http://localhost:5000
```

**Keep this terminal open!** The backend must be running while you use the app.

## Step 5: Run the Frontend (in a NEW terminal)

```bash
cd "d:\TRAVELLING APP\Travel Planning Web App (1)"
npm run dev
```

This will start the frontend at `http://localhost:5173`

## Step 6: Access the Application

Open your browser and go to: `http://localhost:5173`

You should see the login page.

## First-Time Usage

1. **Sign Up**: Create a new account with your email, password, and name
2. **Login**: Use your credentials to login
3. **Create a Trip**: Click "Create New Trip" and add your trip details
4. **Add Itinerary**: Add flights, activities, accommodations
5. **Packing List**: Add items to pack and mark them as packed
6. **Notes**: Take notes for your trip

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check that all dependencies installed: `npm install` in backend folder
- Ensure Node.js is properly installed

### Frontend can't connect to backend
- Make sure backend is running (should see "Server is running on http://localhost:5000")
- Check that `.env` file has correct API URL: `VITE_API_URL=http://localhost:5000/api`

### SQLite database errors
- Delete the `db` folder in backend if it exists
- The database will be recreated automatically on next run

### npm install fails
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` folder and try again

## File Structure

```
Travel Planning Web App (1)/
├── src/                          # Frontend React code
│   ├── app/
│   │   ├── pages/               # All pages
│   │   ├── components/          # React components
│   │   ├── context/             # Auth & Trips contexts (UPDATED)
│   │   └── ...
│   └── ...
├── backend/                      # NEW - Backend server
│   ├── server.js               # Main server
│   ├── package.json            # Backend dependencies
│   ├── controllers/            # Business logic
│   ├── routes/                 # API routes
│   ├── middleware/             # JWT auth
│   ├── models/                 # Database
│   ├── db/                     # SQLite database (auto-created)
│   └── README.md               # Backend documentation
├── .env                         # Frontend API URL
├── package.json                # Frontend dependencies
└── vite.config.ts              # Vite config (UPDATED)
```

## What's Changed

✅ **Removed**: Figma plugin and components  
✅ **Added**: Full backend with Express.js  
✅ **Added**: SQLite database for data persistence  
✅ **Added**: JWT authentication  
✅ **Updated**: AuthContext to use backend API  
✅ **Updated**: TripsContext to use backend API  
✅ **Added**: Password hashing with bcrypt  
✅ **Added**: CORS for frontend-backend communication  

## Data Persistence

All your trip data, itineraries, packing items, and notes are now stored in the SQLite database at:
```
backend/db/travel_app.db
```

This means your data will be saved permanently even after closing the app!

## Backend Technology Stack

- **Express.js** - Web framework (FAST & LIGHTWEIGHT)
- **SQLite3** - Database (FREE & NO SETUP)
- **JWT** - Secure authentication
- **bcryptjs** - Password encryption
- **CORS** - Cross-origin support
- **UUID** - Unique IDs for records

## Cost

🎉 **COMPLETELY FREE!**

- Node.js: FREE
- Express: FREE
- SQLite: FREE
- All packages: FREE

No cloud services or paid subscriptions needed!

## Next Steps

1. Run both servers (backend and frontend)
2. Create your account
3. Start planning your trips!
4. Your data is automatically saved

## Support

Check the backend/README.md for API documentation if you need more details.

Good luck with your Travel Planning App! 🚀✈️🌍
