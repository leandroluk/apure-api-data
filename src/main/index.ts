import express from "express";
import "express-async-errors";
import {
  bodyParserMiddleware,
  corsMiddleware,
  errorHandlerMiddleware,
  securityMiddleware,
  urlParserMiddleware
} from "./middlewares";
import { routes } from "./routes";

const app = express();

app.use(bodyParserMiddleware);
app.use(corsMiddleware);
app.use(urlParserMiddleware);
app.use(securityMiddleware);
app.use(routes);
app.use(errorHandlerMiddleware);

export { app };
