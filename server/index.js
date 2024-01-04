// express
const express = require("express");
const app = express();

app.use(express.json());

// cors
const cors = require("cors");
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST, POT, DELETE, PATCH, HEAD",
    credentials:true
};
app.use(cors(corsOptions));

// dotenv
require("dotenv").config();
const port = process.env.PORT;

// database connection
const connectDb = require("./db/conn");

// routes
const authRouter = require("./router/auth-router");
app.use('/api/auth', authRouter);

const customerRouter = require("./router/customer-router");
app.use('/api/dashboard', customerRouter);

// error middleware
const errormiddleware = require("./middleware/error-middleware");
app.use(errormiddleware);

// Listen
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Listening on Port ${port}`);
    });
});