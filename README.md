# 🚗 Car Rental

A full-stack **Car Rental & Booking Platform** built with the MERN stack. Users can browse cars, check availability, select rental dates, and book cars. Car owners can list and manage their vehicles and bookings.

🔗 **Live Demo:** https://car-rental-tan-sigma.vercel.app/
🔗 **GitHub:** https://github.com/princepatel451/Car-Rental

## ✨ Features

* 🔐 User registration and JWT-based authentication
* 🚘 Browse and view available cars
* 📅 Select pickup and return dates
* 🔎 Check car availability before booking
* 📋 Create and manage car bookings
* 👤 User booking management
* 🚗 Car owner dashboard
* ➕ Add and manage cars
* 🖼️ Upload car images
* 📊 Manage cars and bookings
* 📱 Fully responsive UI

## 🛠️ Tech Stack

**Frontend**

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* ImageKit

**Deployment**

* Vercel
* MongoDB Atlas
* ImageKit

## 📂 Project Structure

```text
Car-Rental/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── Context/
│   │   └── assets/
│   └── package.json
│
├── server/              # Express backend
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── .gitignore
```

## 🔄 How It Works

```text
User
 ↓
Register / Login
 ↓
Browse Cars
 ↓
Select Pickup & Return Dates
 ↓
Check Availability
 ↓
Book Car
 ↓
Manage Bookings
```

For car owners:

```text
Become Owner
 ↓
Add Car
 ↓
Manage Cars
 ↓
View Bookings
 ↓
Manage Booking Status
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/princepatel451/Car-Rental.git
cd Car-Rental
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend:

```bash
npm run server
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=₹
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 👨‍💻 Author

**Prince Patel**

GitHub: https://github.com/princepatel451
