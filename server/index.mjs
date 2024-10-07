import express from "express";
import morgan from "morgan";
import cors from "cors";

/* INIT */
const app = express();
const port = 3001;

/* MIDDLEWARES */
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

/* START SERVER */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
