"use strict";

const express = require("express");
const router = express.Router();
const CommentController = require("../modules/comment/comment.controller");
const CreateCommentDto = require("../modules/comment/dto/create-comment.dto");
const {
  validateCreateBody,
  validateUserId,
} = require("../middlewares/comment.middleware");
const validateUuid = require("../middlewares/uuid.middleware");

const { create, getOne } = new CommentController();

module.exports = function () {
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
