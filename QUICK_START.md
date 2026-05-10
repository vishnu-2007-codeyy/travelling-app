# 🚀 Quick Start Checklist

## ✅ Installation & Setup

### Step 1: Install Frontend Packages
```bash
cd "d:\TRAVELLING APP\Travel Planning Web App (1)"
npm install
```
⏱️ **Takes 2-3 minutes**

### Step 2: Install Backend Packages
```bash
cd backend
npm install
```
⏱️ **Takes 1-2 minutes**

### Step 3: Create Backend Environment File
Create a file named `.env` in the `backend` folder:

```
PORT=5000
JWT_SECRET=my-secret-travel-key-2026
NODE_ENV=development
DB_PATH=./db/travel_app.db
```

---

## 🎮 Running the Application

### Option A: Easy Way (Windows Only)
In the project root, double-click:
```
START_APP.bat
```

### Option B: Manual Way

**Open Terminal 1 - Start Backend:**
```bash
cd "d:\TRAVELLING APP\Travel Planning Web App (1)\backend"
npm run dev
```

You should see:
```
✓ Database initialized successfully
🚀 Server is running on http://localhost:5000
```

**Open Terminal 2 - Start Frontend:**
```bash
cd "d:\TRAVELLING APP\Travel Planning Web App (1)"
npm run dev
```

You should see:
```
  VITE v6.3.5 running at:

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 📱 Access the App

Open your browser and go to:
```
http://localhost:5173
```

---

## 🔐 Create Your Account

1. Click on **"Sign Up"**
2. Enter your email, password, and name
3. Click **"Create Account"**
4. You're logged in! 🎉

---

## 🗺️ Using the App

### Create a Trip
- Click **"Create New Trip"**
- Fill in trip details (destination, dates, budget)
- Click **"Create Trip"**

### Add Itinerary
- Select a trip
- Go to **"Itinerary"** tab
- Click **"Add Activity"**
- Fill in flight, hotel, activity details
- Save!

### Packing Checklist
- Go to **"Packing Checklist"**
- Add items you need to pack
- Check them off as you pack

### Trip Notes
- Go to **"Notes"**
- Create notes about your trip
- Edit or delete as needed

---

## 🐛 Troubleshooting

### Problem: "Backend connection failed"
- ✅ Make sure backend terminal shows "Server is running on http://localhost:5000"
- ✅ Check that both terminals are still open
- ✅ Restart both servers

### Problem: "npm install takes forever"
- ✅ Check your internet connection
- ✅ Try clearing npm cache: `npm cache clean --force`
- ✅ Delete `node_modules` folder and try again

### Problem: "Port 5000 or 5173 already in use"
- ✅ Find what's using the port and close it
- ✅ Or change PORT in `.env` to 5001, 5002, etc.

### Problem: "Database errors"
- ✅ Delete the `backend/db` folder
- ✅ Restart the backend server (it will recreate the database)

---

## 📚 Important Files

| File | Purpose |
|------|---------|
| `SETUP_GUIDE.md` | Detailed setup instructions |
| `BACKEND_SUMMARY.md` | What's included in the backend |
| `backend/README.md` | Backend API documentation |
| `.env` | Frontend configuration |
| `backend/.env` | Backend configuration |

---

## ✨ What's Included

✅ **Frontend** - React with Vite, Radix UI, Tailwind CSS  
✅ **Backend** - Express.js with SQLite database  
✅ **Authentication** - Secure JWT tokens  
✅ **Data Storage** - Local SQLite database  
✅ **API** - Full REST API with 30+ endpoints  
✅ **Documentation** - Complete setup and API docs  

---

## 💰 Cost

**COMPLETELY FREE!**
- All software is open-source
- No subscriptions needed
- No API keys required
- Everything runs locally

---

## 🎯 Common Issues & Solutions

### "EACCES: permission denied"
```bash
# On Mac/Linux, use sudo:
sudo npm install
```

### "Cannot find module 'express'"
```bash
# Make sure you're in the backend folder:
cd backend
npm install
```

### "Module not found" errors after install
```bash
# Clear npm cache and reinstall:
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Check `backend/README.md` for API documentation
3. Make sure both servers are running
4. Check the browser console for error messages (F12)

---

## 🎉 Ready to Go!

You're all set! Your Travel Planning App is now fully functional with:
- User authentication
- Trip management
- Itinerary planning
- Packing checklist
- Notes
- Persistent storage

**Happy traveling!** ✈️🌍

---

## 📋 Verification Checklist

Before starting, verify:
- [ ] Node.js is installed (`node -v`)
- [ ] npm is installed (`npm -v`)
- [ ] You're in the correct directory
- [ ] `.env` file exists in backend folder
- [ ] All packages installed without errors

Ready? Run `npm run dev` in both folders! 🚀
