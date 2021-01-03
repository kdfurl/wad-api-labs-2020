import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import moviesRouter from "./api/movies";

dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error is in development then send the stack trace to display the whole error,
  if it's in production then just send the error message  */
  if (process.env.NODE_ENV === "production") {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

const app = express();

const port = process.env.PORT;

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static("public"));
app.use("/api/movies", moviesRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
