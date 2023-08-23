import { connection } from "../config/db_connection.js";

const Query = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export default Query;