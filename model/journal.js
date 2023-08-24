import Query from "../utills/QueryHelper.js";

class Journal {
  create = async (journalData) => {
    try {
      // journal_id	description	published_at	user_id	attachment_id

      const query = `
        INSERT INTO Journals (journal_id, description, published_at, user_id, attachment_id) VALUES ( "${journalData.journal_id}" ,"${journalData.description}", '${journalData.published_at}', ${journalData.user_id}, "${journalData.attachment_id}")
      `;
      console.log(query);
      const data = await Query(query);
      console.log(data);
      return data.affectedRows > 0;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  update = async (id, type, data) => {};

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
}

export default Journal;
