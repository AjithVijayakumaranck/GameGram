
Live : <a href="#" target="blank"></a>

## Main Functionality
  - User Login and Register with mail verification
  - Forgot password with resend otp
  - JWT authentication and route verification
  - Home page with online friends and post’s
  - Upload post, edit and delete post 
  - Like, comment and report post 
  - Search and follow user’s
  - Profile management 
  - Chat with users (socket Io)
  - Live notification
  - Admin login with jwt verification
  - Block user’s and post  





## Used 

#### *Node js  |  React js  |  Mongo DB  |  Express js*


## Prerequisites

* Node.js >= v16.15.0
* React js >= 
* npm >= 
* MongoDB >= ^4.7.0


## Run Locally



Clone the project

```bash
  git clone https://github.com/Faisal-kkn/Social-Media.git
```

Go to the project directory

```bash
  cd Social-Media
```
### Run backend


```bash
  cd server
```
Install dependencies

```bash
  npm install
```


Create a .env file and add 👇

```bash
  DATABASE = MongoDB database link
  ADMIN_MAIL_ID = Admin email for node mailer
  ADMIN_PASSWORD = Admin password for node mailer
  USER_JWT_SECRET = User jwt secret
  ADMIN_JWT_SECRET = Admin jwt secret
  PORT  = 5000
```

Start the backend server

```bash
  npm start
```


### Run Frontend

```bash
  cd ../client
```
Install dependencies
```bash
  npm install
```

Start the server

```bash
  npm start
```
