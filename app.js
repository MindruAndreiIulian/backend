require('dotenv').config()
const  express = require('express');
const cors = require('cors');
const companiesRouter = require('./routes/CompaniesRoutes')

const  app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.listen(80, function () {
  console.log(`Example app listening on port ${80}!`);
});

app.use("/api/companies", companiesRouter)