"use strict";

const express = require("express");
const router = express.Router();
const ProfileController = require("../modules/profile/profile.controller");
const { validateCreateBody } = require("../middlewares/profile.middleware");
const CreateProfileDto = require("../modules/profile/dto/create-profile.dto");

const { create, getOne } = new ProfileController();

module.exports = function () {
  router.get("/:id", async function (req, res) {
    const profile = await getOne(req.params.id);
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
