import Query from "../utills/QueryHelper.js";

class Journal {
  create = async (journalData) => {
    try {
      // journal_id	description	published_at	user_id	attachment_id

      const query = `
        INSERT INTO Journals (journal_id, description, published_at, user_id, attachment_id) VALUES ( "${journalData.journal_id}" ,"${journalData.description}", '${journalData.published_at}', "${journalData.user_id}", "${journalData.attachment_id}")
      `;
      console.log(query);
      const data = await Query(query);
      console.log(data);
      return await this.findById(journalData.journal_id);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  update = async (id, journalData) => {
    try {
      let query = `UPDATE Journals SET `;
      const updateValues = [];

      for (const key in journalData) {
        if (journalData.hasOwnProperty(key)) {
          updateValues.push(`${key} = "${journalData[key]}"`);
        }
      }

      query += updateValues.join(", ");
      query += ` WHERE journal_id = '${id}'`;

      console.log(query);

      const data = await Query(query);
      return data.affectedRows > 0;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  delete = async (journal_id, user_id) => {
    try {
      const deleteTagsQuery = `
        DELETE FROM JournalStudentTag WHERE journal_id = "${journal_id}";
      `;
      await Query(deleteTagsQuery); // Delete associated tags first

      const deleteJournalQuery = `
        DELETE FROM Journals WHERE journal_id = "${journal_id}" AND user_id = "${user_id}";
      `;
      const data = await Query(deleteJournalQuery);
      return data.affectedRows > 0;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  findById = async (journal_id) => {
    try {
      const query = `
        SELECT * FROM Journals WHERE journal_id = "${journal_id}";
      `;

      const data = await Query(query);

      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  teacherFeed = async (teacherId) => {
    try {
      let query = `
        SELECT * FROM Journals WHERE user_id = "${teacherId}";
      `
      const data = await Query(query);
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
}

export default Journal;

/*

  let journal_id = uuidv4();
  const journalData = {
    journal_id: journal_id,
    description: req.body.description,
    published_at: req.body.published_at,
    user_id: req.user_id,
    attachment_id: attachment_id,
  };


  Journals :
		// journal_id (Primary Key)
		description - done
		published_at - done
		attachment_type : file, url
		user_id - (foreign key)
		attachment_id - (foreign Key)

	Attachments Table :
		attachment_id
		attachment_type - image, url, Video, PDF
		attachment_data
	
	JournalStudentTag Table :
		tag_id (Primary Key)
		journal_id : (foreign key)
		student_id 
		scheduled_for
*/
