import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "JournalsFeeds",
});

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