import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NoteService {

  async find(query = {}) {
    return await dbContext.Notes.find(query)
  }
  async getNotesByBugId(bugId) {
    let data = await dbContext.Notes.find(bugId);
    if (!data) {
      throw new BadRequest("Invalid Id or you do not own this board");
    }
    return data;
  }
  async getAll(query = {}) {
    return await dbContext.Notes.find(query)
  }

  async getById(id) {
    let data = await dbContext.Notes.findOne(id);
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async create(body) {
    let data = await dbContext.Notes.create(body);
    return data;
  }

  async edit(id, creatorEmail, update) {
    let data = await dbContext.Notes.findOneAndUpdate(
      { _id: id, creatorEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id) {
    let success = await dbContext.Notes.findOneAndDelete( {_id: id })
    if (!success) {
      throw new BadRequest("Invalid Id")
    }
  }
}

export const notesService = new NoteService();