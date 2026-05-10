# 🔐 Authentication & Token Management

## How Tokens Work

Your Travel App uses **JWT (JSON Web Tokens)** for secure authentication. Here's how it works:

### Login Flow
```
User enters email & password
         ↓
Backend verifies credentials
         ↓
Backend creates JWT token
         ↓
Token sent to frontend
         ↓
Frontend stores token in localStorage
         ↓
Token included in all API requests
         ↓
Backend verifies token for each request
```

## Token Storage

**Tokens are stored in localStorage:**
- Key: `traveloop_token`
- Location: Browser's local storage
- Duration: 24 hours (then you need to login again)

**User data also stored in localStorage:**
- Key: `traveloop_user`
- Contains: email, name, id, avatar

## Security Features

✅ **Bcrypt Password Hashing**
- Passwords are hashed with 10 salt rounds
- Never stored in plain text
- Even admins can't see your password

✅ **JWT Tokens**
- Signed with secret key
- Expire after 24 hours
- Cannot be modified without secret

✅ **CORS Protection**
- Only frontend can access backend
- Prevents unauthorized API access

✅ **Authorization Middleware**
- Every API call requires valid token
- Token verified on backend

## Logout Behavior

When you click "Logout":
1. Token removed from localStorage
2. User data removed from localStorage
3. You're redirected to login page
4. All API calls will fail (requires new login)

## Token Expiration

After 24 hours:
- Token becomes invalid
- You'll see login page on refresh
- Automatic logout for security

## How It Connects to Backend

### Frontend Implementation

```typescript
// AuthContext.tsx
const login = async (email: string, password: string) => {
  // Send credentials to backend
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  // Get token from response
  const data = await response.json();
  
  // Store token
  localStorage.setItem('traveloop_token', data.token);
  localStorage.setItem('traveloop_user', JSON.stringify(data.user));
};
```

### Using Token in API Calls

```typescript
// Every API call includes the token
const token = localStorage.getItem('traveloop_token');
const response = await fetch(`${API_URL}/trips`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Backend Verification

```javascript
// authMiddleware.js
export function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;  // Add user info to request
    next();
  });
}
```

## Protected Routes

All API endpoints (except login/signup) require authentication:

```
✅ Public:
  POST /api/auth/login
  POST /api/auth/signup

🔒 Protected (require token):
  GET /api/auth/profile
  GET /api/trips
  POST /api/trips
  PUT /api/trips/:id
  DELETE /api/trips/:id
  ... and all other endpoints
```

## .env Configuration

Backend needs this for JWT:

```
JWT_SECRET=your-secret-key-here-change-in-production
```

⚠️ **Important:** Change this to a random string in production!

Generate a good secret:
```bash
# On Mac/Linux/PowerShell:
openssl rand -base64 32

# Output example:
# aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890+/=

# Use this in .env
JWT_SECRET=aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890+/=
```

## Password Security

### Signup (Creating Account)
1. User enters password in frontend
2. Frontend sends to backend
3. Backend hashes password with bcrypt
4. Only hashed password stored in database
5. Plain password discarded

### Login (Accessing Account)
1. User enters password in frontend
2. Frontend sends to backend
3. Backend compares with stored hash
4. If match, creates token
5. Token sent to frontend

### Password Reset (If Implemented)
- Would use email verification
- Temporary link with token
- User creates new password
- New hash stored in database

## Data Flow with Tokens

```
Frontend → Backend Request with Token
                ↓
Backend: Is token valid?
                ↓
           YES: Process request
                ↓
           NO: Return 401 Unauthorized
                ↓
Frontend: Shows login page
```

## What Data is Encrypted?

✅ **Encrypted (with bcrypt):**
- User passwords

✅ **Signed (with JWT secret):**
- Authentication tokens

❌ **NOT encrypted:**
- User email
- Trip data
- Itinerary items
- Notes

**Note:** For production, consider adding HTTPS/SSL to encrypt all data in transit.

## Security Best Practices

✅ **DO:**
- Use HTTPS in production
- Change JWT_SECRET to random string
- Keep tokens secure
- Don't share tokens
- Logout after using public computers
- Use strong passwords

❌ **DON'T:**
- Store tokens in cookies (unless httpOnly)
- Share your token with anyone
- Use default JWT_SECRET
- Log sensitive information
- Expose API keys

## Troubleshooting

### "Invalid token" error
- Clear localStorage
- Login again
- Check if 24 hours passed

### "No token provided" error
- Clear localStorage
- Refresh page
- Login again

### Logout not working
- Clear browser localStorage manually (F12 → Application → Local Storage → Clear All)
- Try in private/incognito window
- Check browser console for errors

## API Response Examples

### Successful Login
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://api.dicebear.com/..."
  }
}
```

### Failed Login
```json
{
  "error": "Invalid credentials"
}
```

### Valid Request with Token
```bash
GET /api/trips
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
↓
Response: [list of trips]
```

### Invalid/Missing Token
```bash
GET /api/trips
(no Authorization header)
↓
Response: 
{
  "error": "No token provided"
}
```

---

## Summary

Your app uses industry-standard JWT authentication:
- ✅ Secure passwords with bcrypt
- ✅ Tokens that expire
- ✅ Backend verification
- ✅ LocalStorage persistence
- ✅ CORS protected

Everything is handled automatically - just login and use the app! 🎉
