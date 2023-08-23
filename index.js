import express from "express";
import bodyParser from "body-parser";
import multer from 'multer';

import { connectDb } from "./config/db_connection.js";
import apiRoutes from './router/index.js';

const app = express();
const upload = multer({ dest: 'uploads/' })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use("/uploads", express.static("uploads"));

app.use("/api", apiRoutes);

app.listen(8000, async () => {
    console.log("Server Started");
    connectDb();
});

app.get("/", (req, res)=>{
    res.send("<h1>Namaste From Server 🙏</h1>");
})
