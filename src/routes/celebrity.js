"use strict";

const express = require("express");
const router = express.Router();
const CelebrityController = require("../modules/celebrity/celebrity.controller");
const CreateCelebrityDto = require("../modules/celebrity/dto/create-celebrity.dto");
const { validateCreateBody } = require("../middlewares/celebrity.middleware");
const validateUuid = require("../middlewares/uuid.middleware");

const { create, getOne } = new CelebrityController();

module.exports = function () {
  router.get("/:id", validateUuid("id"), async function (req, res) {
    const celebrity = await getOne(req.params.id);
    res.status = 200;
    res.send(celebrity);
  });

  router.post("/", validateCreateBody, async function (req, res) {
    const createCelebrityDto = new CreateCelebrityDto(req.body);
    const celebrityDto = await create(createCelebrityDto);
    res.status = 201;
    res.send(celebrityDto);
  });

  return router;
};
