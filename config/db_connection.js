import mysql from "mysql";
import { DB_CONFIG } from "./config.js";

const connection = mysql.createConnection(DB_CONFIG);

function connectDb() {
  connection.connect(function (err, res) {
    if (err) {
      console.log("ERROR", err);
    } else {
      console.log("DB Connected");
    }
  });
}

export { connectDb, connection };
