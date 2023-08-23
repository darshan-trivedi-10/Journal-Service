import Query from "../utills/QueryHelper.js";

class User {
  async create(user) {
    try {
      // { username: 'dbt10', password: 1235678, role: 1 }
      let query = `
            INSERT INTO Users (username, password, role)
            VALUES ("${user.username}", "${user.password}", ${user.role});
      `;
      const data = await Query(query);
      return data.affectedRows > 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne({ username }) {
    try {
      let query = `
        SELECT * FROM Users WHERE username = "${username}" LIMIT 1;
      `;
      const data = await Query(query);
      return data[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default User;