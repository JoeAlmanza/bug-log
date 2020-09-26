import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query);
  }

  async getById(id) {
    let data = await dbContext.Bugs.findById(id);
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async create(body) {
    let data = await dbContext.Bugs.create(body);
    return data;
  }

  async edit(id, creatorEmail, body) {
    console.log(body.createdAt);
    let data = await dbContext.Bugs.findOneAndUpdate(
      { _id: id, creatorEmail, closed: false}, 
      body,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async softDelete(id, creatorEmail, body) {
    console.log(body.createdAt);
    let data = await dbContext.Bugs.findById(id);
    data.closed = true;
    this.edit(data.id, creatorEmail, data)
    if (!data) {
      throw new BadRequest("Invalid ID, closed status or you do not own this board");
    }
    return data;
  }
  async delete(id, creatorEmail) {
    let data = await dbContext.Bugs.findOneAndRemove({
      _id: id, 
      creatorEmail, 
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }


}

export const bugsService = new BugsService();
