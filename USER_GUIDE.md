# 🎯 How to Use Your Travel Planning App

## 🚀 Getting Started

### 1. Launch the App
- **Windows users:** Double-click `START_APP.bat`
- **Manual:** Run `npm run dev` in both frontend and backend folders
- **Access:** Open `http://localhost:5173` in your browser

### 2. Create Your Account
- Click **"Sign Up"**
- Enter your email, password, and full name
- Click **"Create Account"**
- ✅ You're logged in!

### 3. Login (Next time)
- Enter your email and password
- Click **"Login"**
- ✅ Welcome back!

---

## ✈️ Trip Management

### Create a New Trip

1. Click **"Create New Trip"** button
2. Fill in the details:
   - **Trip Title:** e.g., "Summer Vacation in Paris"
   - **Destination:** e.g., "Paris, France"
   - **Start Date:** When your trip starts
   - **End Date:** When your trip ends
   - **Budget:** Total trip budget (in your currency)
   - **Travelers:** Number of people
3. Click **"Create Trip"**
4. ✅ Your trip is created!

### View Your Trips

- Go to **"My Trips"** page
- See all your trips in a grid view
- Click any trip to see details
- Filter by status: Planning, Upcoming, Ongoing, Completed

### Edit a Trip

1. Click on a trip
2. Click **"Edit"** button
3. Update any details:
   - Change destination
   - Adjust dates
   - Update budget
   - Change traveler count
4. Click **"Save Changes"**
5. ✅ Updated!

### Delete a Trip

1. Click on a trip
2. Click **"Delete Trip"** button
3. Confirm deletion
4. ✅ Trip removed (and all its data)

---

## 📅 Itinerary Builder

### Add Activities/Bookings to Your Trip

1. Go to **"Itinerary Builder"** for your trip
2. Click **"Add Activity"** or **"Add Event"**
3. Fill in the details:

#### Flight Booking
- **Type:** Flight
- **Date & Time:** Departure
- **Title:** "Flight to Paris"
- **Details:** "Air France AF1234"
- **Location:** Airport
- **Cost:** Flight price

#### Accommodation
- **Type:** Accommodation
- **Date & Time:** Check-in date
- **Title:** "Hotel Le Marais"
- **Details:** "Booking confirmation #12345"
- **Location:** Hotel address
- **Cost:** Nightly rate or total

#### Activity
- **Type:** Activity
- **Date & Time:** Activity time
- **Title:** "Visit Eiffel Tower"
- **Details:** "Guided tour, 2 hours"
- **Location:** Eiffel Tower
- **Cost:** Ticket price

#### Food & Dining
- **Type:** Food
- **Date & Time:** Meal time
- **Title:** "Dinner at Michelin Restaurant"
- **Details:** "Reservation for 2"
- **Location:** Restaurant name
- **Cost:** Est. cost

#### Transport
- **Type:** Transport
- **Date & Time:** Travel time
- **Title:** "Taxi from airport to hotel"
- **Details:** "Pre-booked"
- **Location:** Route
- **Cost:** Transport cost

### View Timeline

1. Click **"Timeline View"** for your trip
2. See all activities in chronological order
3. Color-coded by category
4. Shows date and time
5. Displays costs

### Edit Activity

1. Click on an activity in the itinerary
2. Click **"Edit"**
3. Update details
4. Click **"Save"**
5. ✅ Updated!

### Delete Activity

1. Click on an activity
2. Click **"Delete"**
3. Confirm
4. ✅ Removed from itinerary!

---

## 🎒 Packing Checklist

### Add Items to Pack

1. Go to **"Packing Checklist"** for your trip
2. Click **"Add Item"**
3. Enter details:
   - **Item Name:** e.g., "Passport", "Swimsuit"
   - **Category:** Clothing, Documents, Toiletries, Electronics, Other
4. Click **"Add"**
5. ✅ Item added to list!

### Mark Items as Packed

1. View your packing list
2. Check the checkbox next to each item as you pack
3. ✅ Item marked as packed (strikethrough)

### Unmark Items

1. Click checkbox again to unmark
2. ✅ Item unmarked (remove strikethrough)

### View Packing Progress

- See progress bar at top
- Shows "X of Y items packed"
- Helps you track packing completion

### Delete Item

1. Find the item in your list
2. Click **"Delete"** or trash icon
3. ✅ Item removed!

### Filter by Category

1. Click category filter
2. Show only Clothing, Documents, Toiletries, Electronics, or All
3. Makes packing easier!

---

## 📝 Trip Notes

### Create a Note

1. Go to **"Notes"** for your trip
2. Click **"Add Note"**
3. Enter:
   - **Title:** Note title (e.g., "Places to Visit")
   - **Content:** Your notes (anything you want to remember)
4. Click **"Save"**
5. ✅ Note created!

### Edit Note

1. Click on a note
2. Click **"Edit"**
3. Update title or content
4. Click **"Save"**
5. ✅ Updated!

### Delete Note

1. Click on a note
2. Click **"Delete"**
3. Confirm
4. ✅ Deleted!

### View All Notes

- Notes are sorted by most recent first
- Shows creation date
- Full content visible

---

## 💰 Budget Breakdown

### View Budget Summary

1. Go to **"Budget Breakdown"** for your trip
2. See:
   - Total budget
   - Amount spent so far
   - Remaining budget
   - Spending percentage

### Track Spending

- Each activity with cost contributes to spending
- Automatically totals in budget
- See spending by category (Flight, Hotel, Food, etc.)

### Budget Categories

- **Flights:** Air tickets
- **Accommodation:** Hotels, Airbnb, etc.
- **Activities:** Tours, attractions, experiences
- **Food:** Restaurants, meals
- **Transport:** Taxis, public transit, rentals
- **Other:** Miscellaneous expenses

### Adjust Spending

1. Edit each activity's cost
2. Budget total updates automatically
3. ✅ Spending tracked in real-time!

---

## 👤 User Profile

### View Your Profile

1. Click your avatar/profile icon (top right)
2. Click **"Profile"**
3. See your:
   - Name
   - Email
   - Avatar (auto-generated)
   - Account info

### Update Profile

1. Go to Profile page
2. Click **"Edit Profile"** (if available)
3. Update your information
4. Click **"Save"**
5. ✅ Profile updated!

### Change Avatar

- Avatar automatically generated from your email
- Unique for each account
- Cannot be manually changed (design choice)

### Logout

1. Click your avatar/profile
2. Click **"Logout"**
3. ✅ You're logged out
4. Return to login page

---

## 🔍 Search & Filter

### Find a Trip

- Use search bar (if available)
- Filter by status: Planning, Upcoming, Ongoing, Completed
- Sort by date or name

### Find Activities

- View by date in timeline
- Filter by type (Flight, Hotel, Food, etc.)
- See on map (if feature added)

### Find Packing Items

- Filter by category
- Search item name
- Show packed/unpacked items

---

## 💾 Data Storage

### Where is My Data?

✅ **All stored locally:**
- Backend SQLite database at `backend/db/travel_app.db`
- No cloud storage needed
- Your data stays on your computer

### Backup Your Data

To backup your trips:
1. Copy the entire `backend/db` folder
2. Keep it somewhere safe
3. Can restore by copying back

### Export Data (Future Feature)

- May add export to CSV/PDF
- Coming soon!

---

## 🎨 UI Features

### Dark/Light Mode (if available)

- Click theme toggle in settings
- Saves your preference

### Responsive Design

- Works on desktop
- Mobile-responsive (coming soon)
- All devices supported

### Keyboard Shortcuts (Coming Soon)

- Esc: Close modals
- Ctrl+S: Save
- Ctrl+N: New trip

---

## 🐛 Troubleshooting

### "Can't login"
- Check email/password are correct
- Make sure backend is running
- Clear browser cache and try again

### "Data not saved"
- Check backend is running
- Look for error messages
- Refresh page and try again

### "Connection error"
- Make sure both servers running
- Backend at http://localhost:5000
- Frontend at http://localhost:5173

### "Lost all my data"
- Restore from backup if available
- Check `backend/db/travel_app.db` exists
- Check browser console for errors

---

## 💡 Tips & Tricks

### ⏰ Best Practices

1. **Create trip first** before adding activities
2. **Add activities as you plan** (don't wait until last minute)
3. **Set realistic budget** with buffer room
4. **Pack checklist day before** travel
5. **Take notes** about important info
6. **Update spent amount** as you spend

### 🎯 Smart Planning

1. **View timeline** to ensure no conflicts
2. **Check budget** regularly to stay within limits
3. **Group activities** by location/day
4. **Share notes** with travel mates
5. **Keep receipts** for expense tracking

### 📱 On the Go

1. Use on any device (when deployed online)
2. Access from computer or phone
3. Sync instantly
4. Never lose your plans

---

## 🎉 Advanced Features

### Activity Categories

Each activity can be:
- **Flight** ✈️
- **Accommodation** 🏨
- **Activity** 🎪
- **Food** 🍽️
- **Transport** 🚕
- **Other** 📌

### Trip Status

- **Planning** - Initial stage
- **Upcoming** - Trip coming soon
- **Ongoing** - Currently on trip
- **Completed** - Trip finished

### Automatic Calculations

- Trip duration automatically calculated
- Budget spent percentage auto-updated
- Packing progress automatically tracked

---

## 📊 Reports & Analysis

### Spending Analysis (Coming Soon)

- Breakdown by category
- Daily spending trends
- Budget vs actual

### Trip Statistics (Coming Soon)

- Total trips
- Total days traveled
- Total spent
- Average budget

---

## ❓ FAQ

**Q: Can I share my trip with others?**
A: Currently personal. Sharing feature coming soon!

**Q: Can I modify dates after creating trip?**
A: Yes! Click Edit on the trip.

**Q: Is my data secure?**
A: Yes! Local database + encrypted passwords.

**Q: Can I delete everything?**
A: Yes! Logout clears session. Delete trip removes all data.

**Q: How many trips can I create?**
A: Unlimited! Create as many as you want.

**Q: Can I duplicate a trip?**
A: Currently not. Copy manually or use template.

---

## 🚀 Next Steps

1. ✅ **Create your first trip**
2. ✅ **Add activities to your itinerary**
3. ✅ **Add packing items**
4. ✅ **Create notes**
5. ✅ **Track your budget**
6. ✅ **Start traveling!**

---

## 📞 Need Help?

- Check documentation files
- Review error messages
- Check browser console (F12)
- Ensure backend is running

---

**Happy traveling! 🌍✈️🎒**

Have fun planning your trips with your new Travel Planning App! 🎉
