import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import moviesRouter from "./api/movies";
import usersRouter from "./api/users";
import genresRouter from "./api/genres";
import "./db";
import { loadUsers } from "./seedData";

dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error is in development then send the stack trace to display the whole error,
  if it's in production then just send the error message  */
  if (process.env.NODE_ENV === "production") {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

if (process.env.SEED_DB) {
  loadUsers();
}

const app = express();

const port = process.env.PORT;

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static("public"));
app.use("/api/movies", moviesRouter);

// Users router
app.use("/api/users", usersRouter);

// Genres router
app.use("/api/genres", genresRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
