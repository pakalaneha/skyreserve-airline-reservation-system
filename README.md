# Airline Reservation System

A small airline reservation project with a React website and a Spring Boot REST API. Customers can find flights, choose seats, book tickets, manage wallet funds, cancel bookings, and download an e-ticket. Administrators can manage flight and airport data and review bookings.

## Features

### Customer

- Register and log in with token-based authentication.
- Search available flights and view flight details.
- Choose a travel class, enter passenger details, and select seats.
- Pay for a booking from the wallet balance.
- View bookings, cancel a booking, and download its ticket as a PDF.
- Add wallet funds through a simulated Card, UPI, or Net Banking flow.

### Administrator

- Manage airplanes, airports, and flights.
- Review flights, customers, and bookings.
- View basic booking and ticket summaries on the dashboard.

### Demo payment

Wallet top-ups simulate a successful payment. They do not connect to a payment provider or charge money. Do not enter real card, UPI, or bank details. The payment form details are not sent to or stored by the application; the existing wallet API receives only the top-up amount. Booking fares are then deducted from the wallet.

## Technology

- **Backend:** Java 17+, Spring Boot, Spring Security, Spring Data JPA, Maven
- **Database:** MySQL 8+
- **Frontend:** Node.js 18+ and npm, React
- **Java package:** `com.ars`

There is no `requirements.txt` because this project does not use Python. Backend dependencies are declared in `SB-ARS/pom.xml`; frontend dependencies are declared in `ars-react-frontend/package.json`.

## Requirements

Install the following before running the application:

1. Java Development Kit (JDK) 17 or newer.
2. MySQL Server 8 or newer.
3. Node.js 18 or newer (npm is included with Node.js).

The Maven wrapper is included, so a separate Maven installation is not required.

## Setup

### 1. Create the database

Start MySQL and create the database:

```sql
CREATE DATABASE airline_db;
```

The application uses Hibernate to create or update its tables on startup. Backend connection settings are kept in `SB-ARS/.env`, which is ignored by Git.

### 2. Start the backend

On first setup, create your local credentials file from the example. Edit `.env` and enter your own MySQL username and password:

```powershell
cd .\SB-ARS
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

The local `.env` is not uploaded to Git. Keep it on your computer and update it if your database credentials change. Then start the backend from the `SB-ARS` directory:

```powershell
.\mvnw.cmd spring-boot:run
```

The API starts at `http://localhost:8080`. Keep this terminal running.

Use a long, random `APP_JWT_SECRET`; never use a development secret in a deployed application. Application account passwords are hashed in the database; they are not kept in `.env`.

### 3. Start the frontend

Open a second terminal at the project root:

```powershell
cd .\ars-react-frontend
npm install
npm start
```

The website opens at `http://localhost:3000`. Its API base URL is currently `http://localhost:8080/api`, configured in `ars-react-frontend/src/services/Api.js`.

Register a customer account to try the customer flow. Administrator access depends on the role assigned to the account.

## Useful commands

Run backend tests:

```powershell
cd .\SB-ARS
.\mvnw.cmd test
```

Build the frontend for production:

```powershell
cd .\ars-react-frontend
npm run build
```

Run frontend tests:

```powershell
cd .\ars-react-frontend
npm test
```

## How it works

1. The React frontend sends HTTP requests to the Spring Boot API.
2. The API authenticates users and uses Spring Data JPA to read and update MySQL.
3. When a customer books a flight, the backend validates the booking and deducts its fare from the wallet.
4. The customer can view the saved booking and download its ticket from **My Bookings**.
5. A wallet top-up is a demo-only simulation: after local form validation, the frontend asks the existing API to add the entered amount.

## Project layout

```text
SB-ARS/              Spring Boot backend and Maven wrapper
ars-react-frontend/  React website
README.md            Setup and project guide
```

## Notes

- This is a learning/demo project, not a production payment system.
- Do not use real payment details in the simulated payment form.
- Do not expose local database credentials or development JWT secrets in a public deployment.
