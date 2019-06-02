import dotevent from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import { handleBodyRequestParsing, handleCompression } from "./middlewares/common";
import baseRoute from "./routes/base";

const app: Application = express();

dotevent.config();
handleBodyRequestParsing(app);
handleCompression(app);
app.use(morgan("[:date] :method :url :status :res[content-length] - :response-time ms"));

app.use("/api", baseRoute);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log("API listening on port " + PORT);
});
