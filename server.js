const express = require("express");
require("dotenv").config();
const bootcamp = require("./routes/bootcamp");
const logger = require("./middlewares/logger");
const mongoose = require("mongoose");
const colors = require("colors");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    // These two options are added for mongoose validation
    autoIndex: true, //make this also true
    family: 4, //Use IPv4, skip trying IPv6
  })
  .then((conn) =>
    console.log(
      `mongodb connected. Connection name: ${conn.connection.name} port: ${conn.connection.port} host: ${conn.connection.host}`
        .blue.underline.bold
    )
  )
  .catch((err) => console.log(`${err}`.red.underline.bold));
// (async function () {
//   const conn = await mongoose.connect(process.env.MONGO_URI);
//   const { host, port, name } = conn.connection;
//   console.log(host);
//   console.log(port);
//   console.log(name);
// })();

// Dev logging middleware
app.use(logger);

// Mount routers
app.use("/api/v1/bootcamps", bootcamp);

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} on port: ${PORT}`.yellow
      .underline
  )
);
