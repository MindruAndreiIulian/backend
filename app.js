require('dotenv').config()
const  express = require('express');
const cors = require('cors');
const companiesRouter = require('./routes/CompaniesRoutes')

const  app = express();

app.use(cors());

app.use(express.json());

app.listen(3001, function () {
  console.log(`Example app listening on port ${3001}!`);
});

app.use("/api/companies", companiesRouter)