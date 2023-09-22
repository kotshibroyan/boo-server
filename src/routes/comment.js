"use strict";

const express = require("express");
const router = express.Router();
const CommentController = require("../modules/comment/comment.controller");
const CreateCommentDto = require("../modules/comment/dto/create-comment.dto");
const CommentPageOptionsDto = require("../modules/comment/dto/comment-page-options.dto");
const {
  validateCreateBody,
  validateUserId,
  validatePageOptions,
} = require("../middlewares/comment.middleware");
const validateUuid = require("../middlewares/uuid.middleware");

const { create, getOne, getAll } = new CommentController();

module.exports = function () {
  router.get("/", validatePageOptions, async function (req, res) {
    const pageOptionsDto = new CommentPageOptionsDto(req.query);
    const celebritiesPage = await getAll(pageOptionsDto);
    res.status = 200;
    res.send(celebritiesPage);
  });

  router.get("/:id", validateUuid("id"), async function (req, res) {
    const comment = await getOne(req.params.id);

    if (!comment) {
      return res.status(400).json({ error: "error.commentNotFound" });
    }
    res.status = 200;
    res.send(comment);
  });

  router.post(
    "/",
    validateUserId,
    validateCreateBody,
    async function (req, res) {
      const createCommentDto = new CreateCommentDto(req.body);
      const commentDto = await create(req.user, createCommentDto);
      if (!commentDto) {
        return res.status(400).json({ error: "error.celebrityNotFound" });
      }
      res.status = 201;
      res.send(commentDto);
    },
  );

  return router;
};
