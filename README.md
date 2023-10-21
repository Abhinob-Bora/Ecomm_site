# Ecomm_site
# Your Project Name

Briefly describe your project in one or two sentences.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installing](#installing)
2. [Configuration](#configuration)


## Getting Started

Provide a quick overview of how to get your project up and running.

### Prerequisites

List any software or tools that need to be installed before your project can be used.

- Node.js (vXX.XX)
- MongoDB (optional)

### Installing

A step-by-step guide on how to install and set up your project.

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo.git

# Navigate to the project directory
cd your-repo

# Install dependencies
npm install


### configuration

# Create a .env file and set your configuration variables
DB_CONNECTION_STRING='mongodb://localhost:27017/your-database'

To START-
write nodemon app.js or npm start


API CALLS-
to make requests you can use postman

## Usage

### Making Requests with Postman

You can use [Postman](https://www.postman.com/) to interact with the API. Follow the steps below to make requests:

1. Download and install Postman if you haven't already.
2. Open Postman and create a new collection for your project.

### Sending a GET Request

#### Retrieve Orders (Seller)

- **Method:** GET
- **Endpoint:** `http://your-api-endpoint/api/seller/orders`
- **Headers:** Add an `Authorization` header with the token.
- **Description:** Retrieve the list of orders received by a seller.

#### Retrieve Orders (Specific Seller)

- **Method:** GET
- **Endpoint:** `http://your-api-endpoint/api/seller/orders`
- **Headers:** Add an `Authorization` header with the token.
- **Body (JSON):**
  ```json
  {
    "sellerId": "your-seller-id"
  }

Sending a POST Request
Create an Order (Buyer)
Method: POST
Endpoint: http://your-api-endpoint/api/buyer/create-order/:seller_id
Headers: Add an Authorization header with the token.
Params:
:seller_id: The ID of the seller for whom the order is created.
Body (JSON):

{
  "items": [
    {
      "product": "Product 1",
      "quantity": 2
    },
    {
      "product": "Product 2",
      "quantity": 3
    }
  ]
}



