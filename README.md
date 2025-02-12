# Car Comparison API

## 📌 Overview
This project is a **Car Comparison API** that allows users to perform various operations such as adding, updating, deleting, and comparing cars based on their attributes.

## 🚀 Features
- **Add a Car**: Store car details including make, model, images, fuel type, transmission, mileage, price, and features.
- **Update Car Details**: Modify specific or all fields of an existing car.
- **Delete a Car**: Remove a car from the database.
- **Fetch Car Details**: Retrieve information about specific cars.
- **Compare Cars**: Compare two or more cars based on various attributes.

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (If required)
- **Image Storage**: Local `/images/{make}/` folder (Can be extended to cloud storage)

## 📂 Project Structure
```
/CARTRADE_BACKEND
  ├── src
  │   ├── controllers
  │   │   ├── carController.js
  │   ├── models
  │   │   ├── Car.js
  │   ├── routes
  │   │   ├── carRoutes.js
  │   ├── middleware
  │   │   ├── errorHandler.js
  │   ├── config
  │   │   ├── dbConnect.js
  │   ├── server.js
  ├── images
  │   ├── toyota
  │   ├── honda
  │   ├── hyundai
  ├── package.json
  ├── .env
  ├── README.md
```

## 🏗 API Endpoints
### 🚗 Car Management
| Method | Endpoint             | Description |
|--------|----------------------|-------------|
| POST   | `/api/cars`          | Add a new car |
| GET   | `/api/allCars`          | Get all cars |
| GET    | `/api/cars/:id`      | Get details of a specific car |
| PUT    | `/api/cars/:id`      | Update car details (entire object) |
| PATCH  | `/api/cars/:id`      | Update specific car fields |
| DELETE | `/api/cars/:id`      | Delete a car |

### 🔍 Car Comparison
| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| GET    | `/api/cars/compare?ids=car1,car2` | Compare two or more cars |
| POST   | `/api/cars/compare` | Compare cars by sending car IDs in the request body |

## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Mohd-Ehtesham/car-trade-backend.git
cd car-trade-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add:
```
PORT=9000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Run the Server
```sh
npm start
```

## 📌 Example Payload
### Add a New Car
```json
{
  "make": "Hyundai",
  "model": "Verna",
  "year": 2023,
  "images": [
    "/images/hyundai/hyundaiverna1.jpg",
    "/images/hyundai/hyundaiverna2.jpg"
  ],
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "mileage": 10000,
  "color": "White",
  "price": 22000,
  "location": {
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India"
  },
  "features": [
    "Wireless Charging",
    "Ventilated Seats"
  ],
  "description": "A premium sedan with modern features and a powerful engine.",
  "owner": {
    "name": "Rahul Sharma",
    "contact": "+91 98765 43210"
  },
  "vin": "MALBM51RULM123456",
  "condition": "New"
}
```

## 🛠 Future Enhancements
- **Image Upload Support** (Cloud Storage Integration)
- **Authentication & Authorization**
- **Sorting & Filtering Cars**

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

