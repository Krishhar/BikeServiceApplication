
# Bike Service Application - Backend

This project provides the backend setup for a bike service application.


## Features

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Bcrypt**: Library for hashing passwords.



## Requirements

- **Node.js**: Ensure you have Node.js installed (>=14.x).
- **MongoDB**: Ensure you have MongoDB installed and running.
## Installation

1. Clone the Repository

```bash
git clone https://github.com/Krishhar/BikeServiceApplication.git
cd BikeServiceApplication
```

2. Install Dependencies

```bash
npm install
```

3. Configure Environment Variables

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Run the Development Server
```bash
npm start
```


    
## Project Structure

```bash
BikeServiceApplication/
├── Middlewares/
├── config/
├── controllers/
├── models/
├── routes/
├── .gitignore
├── package-lock.json
├── package.json
├── server.js
└── README.md

```

- Middlewares/: Contains middleware functions.
- config/: Configuration files.
- controllers/: Contains route controllers.
- models/: Contains Mongoose models.
- routes/: Contains application routes.
- .gitignore: Git ignore file.
- package-lock.json: Lock file for npm dependencies.
- package.json: Project metadata and dependencies.
- server.js: Main entry point for the server.
- README.md: Documentation.
## Database Schema

Our application uses the following data models:

### Customer
Represents a customer who can book services.

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer'], default: 'customer' }
}
```
### Owner
Represents a service owner who can offer services.

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['owner'], default: 'owner' }
}
```

### Service
Represents a service that can be booked by customers.

```javascript
{
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true }
}
```

### Booking
Represents a service booking made by a customer.

```javascript
{
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'ready for delivery', 'completed'], default: 'pending' }
}
```

### Vehicle
Represents a vehicle that can be serviced.

```javascript
{
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true, unique: true },
  color: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }
}
```
## Sample Data

Below is a set of sample data representing entries for each collection in the database:

```json
{
  "Customer": [
    {
      "name": "hari",
      "email": "hari@gmail.com",
      "password": "123456",
      "role": "customer"
    }
  ],
  "Owner": [
    {
      "name": "krish",
      "email": "krish@gmail.com",
      "password": "123456",
      "role": "owner"
    }
  ],
  "services": [
    {
      "name": "Basic Service",
      "description": "Basic bike service",
      "price": 50,
      "ownerId": "60d21b4667d0d8992e610c85"
    }
  ],
  "bookings": [
    {
      "customerId": "6108e4f6a3d1d12d0c8b4567",
      "serviceId": "6108e4f6a3d1d12d0c8b4568",
      "vehicleId": "6108e4f6a3d1d12d0c8b4569",
      "ownerId": "6108e4f6a3d1d12d0c8b4570",
      "date": "2024-07-20",
      "status": "pending"
    },
    {
      "customerId": "6108e4f6a3d1d12d0c8b4571",
      "serviceId": "6108e4f6a3d1d12d0c8b4572",
      "vehicleId": "6108e4f6a3d1d12d0c8b4573",
      "ownerId": "6108e4f6a3d1d12d0c8b4574",
      "date": "2024-07-25",
      "status": "ready for delivery"
    },
    {
      "customerId": "6108e4f6a3d1d12d0c8b4575",
      "serviceId": "6108e4f6a3d1d12d0c8b4576",
      "vehicleId": "6108e4f6a3d1d12d0c8b4577",
      "ownerId": "6108e4f6a3d1d12d0c8b4578",
      "date": "2024-07-30",
      "status": "completed"
    }
  ],
  "Vehicle": [
    {
      "brand": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "licensePlate": "ABC123",
      "color": "Silver",
      "serviceId": "6108e4f6a3d1d12d0c8b4568",
      "customerId": "6108e4f6a3d1d12d0c8b4567"
    },
    {
      "brand": "Honda",
      "model": "Civic",
      "year": 2018,
      "licensePlate": "XYZ456",
      "color": "Blue",
      "serviceId": "6108e4f6a3d1d12d0c8b4572",
      "customerId": "6108e4f6a3d1d12d0c8b4571"
    },
    {
      "brand": "Ford",
      "model": "Mustang",
      "year": 2022,
      "licensePlate": "GHI789",
      "color": "Red",
      "serviceId": "6108e4f6a3d1d12d0c8b4576",
      "customerId": "6108e4f6a3d1d12d0c8b4575"
    }
  ]
}
```
## Deployment

To deploy the application, you need to follow these steps:

### Configure the Environment Variables

Ensure you have the necessary environment variables set in your hosting environment. The required variables are:

- `PORT`
- `MONGO_URI`
- `SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`

Example configuration in `.env` file:

```bash
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password


## Deploy the Application

- Deploy the backend application to a hosting provider like Heroku, AWS, or any other service that supports Node.js applications.

**Example: Deploy to Heroku**
```bash
npm install -g heroku
```
- Login to your Heroku account:

```bash
heroku login
```
- Create a new Heroku app:
```bash
heroku create your-app-name
```
- Push the code to Heroku:
```bash
git push heroku main
```
- Set the environment variables on Heroku:
```bash
heroku config:set PORT=5000
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
```


# Complete Deployment Instructions

To deploy the full application, follow these steps:


1. **Build the Frontend**

- Navigate to the `FrontEnd` directory and run the build command:

```bash
cd FrontEnd
npm run build
```

2. **Deploy the Backend**

- Ensure the backend server is deployed and running on a platform like Heroku, AWS, or any other service that supports Node.js.

3. **Serve the Frontend**
- After building the frontend, you can either:

- Deploy the dist directory to a static site hosting service like Netlify or Vercel.
- Serve the built frontend files using the backend server. You can configure the backend server to serve static files from the dist directory.
- **Example of serving static files from Express (in server.js):**
```bash
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, 'FrontEnd', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'FrontEnd', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
## Contributing

Contributions are always welcome!

If you want to contribute to this project, feel free to open a pull request or issue.
## Contributing

Contributions are always welcome!

If you want to contribute to this project, feel free to open a pull request or issue.
## Contact
For any inquiries, please contact hari38731@gmail.com.
