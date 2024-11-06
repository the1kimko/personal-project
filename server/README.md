# Pet E-commerce & Veterinary Services

This project is an e-commerce platform for veterinary services and products, designed to help users easily order veterinary services for their pets and buy related products. It includes features for user registration, authentication, adding services/products to a cart, and placing orders.

## Features

- **User Authentication**: Login, Register, and token-based authentication (JWT).
- **Admin Functions**: Admins can add, update, and delete services and products.
- **Cart**: Users can add products and services to their cart, view the cart, and checkout.
- **Order Management**: Users can place orders and track their purchases.
- **Admin Panel**: Admins can approve/disapprove service requests and product orders.

## Technology Stack

- **Backend**: Python, Flask, PostgreSQL
- **Frontend**: React, Redux Toolkit
- **Database**: PostgreSQL
- **Authentication**: JWT for token-based authentication
- **Testing**: Jest (for frontend), Minitests (for backend)
- **Deployment**: Docker (optional)

---

## Table of Contents

1. [Installation](#installation)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Database Configuration](#database-configuration)
5. [Seeding the Database](#seeding-the-database)
6. [Running Tests](#running-tests)
7. [API Endpoints](#api-endpoints)
8. [License](#license)

---

## Installation

### Prerequisites

Before you begin, ensure that you have the following installed:

- Python 3.x
- Node.js (for frontend)
- PostgreSQL (or Docker for PostgreSQL container)
- `pip` and `npm` for managing dependencies

---

## Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repository/pet-ecommerce-vet-services.git
    cd pet-ecommerce-vet-services/backend
    ```

2. Create a virtual environment:

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # For Windows: venv\Scripts\activate
    ```

3. Install Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Create a `.env` file and configure your database settings. This file should be placed in the root of your backend project:

    ```bash
    DATABASE_URL=postgresql://username:password@localhost/pet_shop
    SECRET_KEY=your_secret_key
    ```

5. Create the PostgreSQL database and apply migrations:

    First, initialize the database migrations:

    ```bash
    flask db init
    ```

    Then generate and apply the migration script:

    ```bash
    flask db migrate  # Generate migration script
    flask db upgrade  # Apply migration to the database
    ```

---

## Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install Node.js dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

This will start the React application on `http://localhost:3000`.

---

## Database Configuration

Ensure you have PostgreSQL installed and running. If you're using Docker, you can run the following command to create a PostgreSQL container:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_USER=youruser -e POSTGRES_DB=pet_shop -p 5432:5432 -d postgres
