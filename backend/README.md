# Travel App Backend

A Node.js Express backend for the Travel Planning Web App with JWT authentication and SQLite database.

## Features

- ✅ **Authentication**: JWT-based user authentication with bcrypt password hashing
- ✅ **Trips Management**: Create, read, update, delete trips
- ✅ **Itinerary Items**: Manage trip itineraries (flights, activities, accommodations, etc.)
- ✅ **Packing Checklist**: Track packing items with completion status
- ✅ **Notes**: Create and manage trip notes
- ✅ **SQLite Database**: Local database storage
- ✅ **CORS Support**: Cross-origin requests for frontend communication
- ✅ **Free & Open Source**: No external API dependencies (except optional Supabase)

## Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`):
   ```bash
   PORT=5000
   JWT_SECRET=your-secret-key-here-change-in-production
   NODE_ENV=development
   DB_PATH=./db/travel_app.db
   ```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Trips
- `GET /api/trips` - Get all user trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Itinerary Items
- `GET /api/trips/:tripId/itinerary` - Get trip itinerary
- `POST /api/trips/:tripId/itinerary` - Add itinerary item
- `PUT /api/itinerary/:itemId` - Update itinerary item
- `DELETE /api/itinerary/:itemId` - Delete itinerary item

### Packing Checklist
- `GET /api/trips/:tripId/packing` - Get packing items
- `POST /api/trips/:tripId/packing` - Add packing item
- `PUT /api/packing/:itemId` - Toggle packing item (mark as packed/unpacked)
- `DELETE /api/packing/:itemId` - Delete packing item

### Notes
- `GET /api/trips/:tripId/notes` - Get trip notes
- `POST /api/trips/:tripId/notes` - Create note
- `PUT /api/notes/:noteId` - Update note
- `DELETE /api/notes/:noteId` - Delete note

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

The token is automatically saved after login/signup in the frontend's localStorage.

## Database

The backend uses **SQLite3** for data persistence. The database file is created automatically at `backend/db/travel_app.db`.

Tables created:
- `users` - User accounts
- `trips` - Travel trips
- `itinerary_items` - Trip activities and bookings
- `packing_items` - Packing checklist items
- `notes` - Trip notes

## Architecture

```
backend/
├── server.js                 # Main server entry point
├── middleware/
│   └── authMiddleware.js     # JWT verification
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── tripController.js     # Trip and data management
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   └── tripRoutes.js         # Trip endpoints
├── models/
│   └── database.js           # Database initialization
├── package.json
├── .env.example
└── db/                       # Database files (auto-created)
```

## Technologies Used

- **Express.js** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support
- **uuid** - Unique ID generation

## Environment Variables

```
PORT=5000                                          # Server port
JWT_SECRET=your-secret-key-here                   # JWT signing key (CHANGE IN PRODUCTION)
NODE_ENV=development                              # Environment mode
DB_PATH=./db/travel_app.db                       # Database path
```

## Notes

⚠️ **Important for Production:**
- Change `JWT_SECRET` to a strong, random string
- Use environment variables from a secure vault
- Enable HTTPS
- Set proper CORS origins
- Add rate limiting
- Add input validation and sanitization

## Support

For issues or questions, check the main project README.
