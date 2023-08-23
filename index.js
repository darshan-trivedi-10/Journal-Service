import express from "express";
import bodyParser from "body-parser";

import { connectDb } from "./config/db_connection.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.listen(8000, async () => {
    console.log("Server Started");
    connectDb();
});

app.get("/", (req, res)=>{
    res.send("<h1>Namaste From Server 🙏</h1>");
})
