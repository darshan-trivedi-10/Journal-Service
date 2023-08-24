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

  updateTaggedStudents = async (journal_id, students) => {
    try {
      let query = `
      DELETE FROM JournalStudentTag WHERE journal_id = "${journal_id}"
      `;
      const data = await Query(query);
      return await this.create(journal_id, students);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  studentFeed = async (studentId) => {
    try {
      let query = `
        SELECT J.journal_id, J.description, J.published_at, 
        U.username AS author, A.attachment_data
        FROM Journals AS J 
        JOIN Users AS U ON J.user_id = U.user_id
        LEFT JOIN 
        Attachments AS A ON J.attachment_id = A.attachment_id
        JOIN JournalStudentTag AS JST ON J.journal_id = JST.journal_id
        WHERE 
        JST.student_id = "${studentId}" AND J.published_at <= NOW();
      `;
      const data = await Query(query);
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
}

export default JournalStudentTag;
