require('dotenv').config()
const  express = require('express');
const cors = require('cors');
const companiesRouter = require('./routes/CompaniesRoutes')

const  app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.listen(process.env.APP_PORT, function () {
  console.log(`Example app listening on port ${process.env.APP_PORT}!`);
});

app.use("/api/companies", companiesRouter)