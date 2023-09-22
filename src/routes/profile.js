"use strict";

const express = require("express");
const router = express.Router();
const ProfileController = require("../modules/profile/profile.controller");
const CreateProfileDto = require("../modules/profile/dto/create-profile.dto");
const { validateCreateBody } = require("../middlewares/profile.middleware");
const validateUuid = require("../middlewares/uuid.middleware");

const { create, getOne } = new ProfileController();

module.exports = function () {
  router.get("/:id", validateUuid("id"), async function (req, res) {
    const profile = await getOne(req.params.id);
    if (!profile) {
      return res.status(400).json({ error: "error.profileNotFound" });
    }
    res.render("profile_template", {
      profile,
    });
  });

  router.post("/", validateCreateBody, async function (req, res) {
    const createProfileDto = new CreateProfileDto(req.body);
    const profileDto = await create(createProfileDto);
    res.status = 201;
    res.send(profileDto);
  });

  return router;
};
