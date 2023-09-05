const fingerprintService = require("../services/fingerprintService");

const getAllFingerprints = (req, res) => {
  const { mode } = req.query;
  try {
    const allFingerprints = fingerprintService.getAllFingerprints({ mode });
    res.send({ status: "OK", data: allFingerprints });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const getOneFingerprint = (req, res) => {
  const {
    params: { fingerprintId },
  } = req;

  if (!fingerprintId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':fingerprintId' can not be empty" },
    });
    return;
  }

  try {
    const fingerprint = fingerprintService.getOneFingerprint(fingerprintId);
    res.send({ status: "OK", data: fingerprint });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const createNewFingerprint = (req, res) => {
  const { body } = req;

  // if (
  //   !body.name ||
  //   !body.mode ||
  //   !body.equipment ||
  //   !body.exercises ||
  //   !body.trainerTips
  // ) {
  //   res.status(400).send({
  //     status: "FAILED",
  //     data: {
  //       error:
  //         "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
  //     },
  //   });
  // }

  // const newFingerprint = {
  //   name: body.name,
  //   mode: body.mode,
  //   equipment: body.equipment,
  //   exercises: body.exercises,
  //   trainerTips: body.trainerTips,
  // };

  try {
    const createdFingerprint = fingerprintService.createNewFingerprint(body);
    res.status(201).send({ status: "OK", data: createdFingerprint });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILDED", data: { error: error.message || error } });
  }
};

const updateOneFingerprint = (req, res) => {
  const {
    body,
    params: { fingerprintId },
  } = req;

  if (!fingerprintId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':fingerprintId' can not be empty" },
    });
  }

  try {
    const updatedFingerprint = fingerprintService.updateOneFingerprint(fingerprintId, body);
    res.send({ status: "OK", data: updatedFingerprint });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

const deleteOneFingerprint = (req, res) => {
  const {
    params: { fingerprintId },
  } = req;

  if (!fingerprintId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':fingerprintId' can not be empty" },
    });
  }

  try {
    fingerprintService.deleteOneFingerprint(fingerprintId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

module.exports = {
  getAllFingerprints,
  getOneFingerprint,
  createNewFingerprint,
  updateOneFingerprint,
  deleteOneFingerprint,
};
