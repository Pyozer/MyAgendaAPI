import express, { Application } from "express";
import { handleBodyRequestParsing, handleCompression } from "./middlewares/common";
import dotevent from "dotenv";
import baseRoute from "./routes/base";

const app: Application = express();

dotevent.config();
handleBodyRequestParsing(app);
handleCompression(app);

app.use("/api", baseRoute);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log("API listening on port " + PORT);
});
