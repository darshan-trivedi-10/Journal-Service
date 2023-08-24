import Query from "../utills/QueryHelper.js";

class JournalStudentTag {
  create = async (journal_id, students) => {
    try {
      let query = `
          INSERT INTO JournalStudentTag (journal_id, student_id)
          VALUES `;

      // Create an array to hold the placeholders for each student
      const placeholders = [];

      // Loop through the students array and generate placeholders and values
      for (const student of students) {
        placeholders.push(`("${journal_id}", "${student}")`);
      }

      query += placeholders.join(", ");
      const data = await Query(query);
      return data.affectedRows > 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default JournalStudentTag;
