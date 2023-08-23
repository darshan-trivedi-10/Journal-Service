import Query from "../utills/QueryHelper.js";

class Journal {
  create = async (journalData) => {
    try {
      // journal_id	description	published_at	user_id	attachment_id

      const query = `
        INSERT INTO Journals (description, published_at, user_id, attachment_id) VALUES ("${journalData.description}", '${journalData.published_at}', ${journalData.user_id}, "${journalData.attachment_id}")
      `;
      console.log(query);
      const data = await Query(query);
      return data.affectedRows > 0;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  update = async (id, type, data) => {};

  delete = async (id) => {};
}

export default Journal;
