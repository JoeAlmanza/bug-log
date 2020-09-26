import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import { notesService } from "../services/NotesService";

//PUBLIC
export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/notes", this.getNotesByBugId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.softDelete);
  }

  async getAll(req, res, next) {
    try {
      let data = await bugsService.getAll(req.query);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await bugsService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getNotesBySubId(req, res, next) {
    try {
      let data = await notesService.find({ bug: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      let id = req.params.id;
      let data = await notesService.getNotesByBugId({ bug: id });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      let data = await bugsService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await bugsService.delete(req.params.id, req.userInfo.email);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
  async softDelete(req, res, next) {
    try {
      req.body.id = req.params.id
      let data = await bugsService.softDelete(
        req.params.id,
        req.userInfo.email, 
        req.body
        );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

}
