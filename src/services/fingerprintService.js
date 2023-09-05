const { v4: uuid } = require("uuid");
const Fingerprint = require("../database/FingerPrint");

const getAllFingerprints = (filterParams) => {
  try {
    const allFingerprints = Fingerprint.getAllFingerprints(filterParams);
    return allFingerprints;
  } catch (error) {
    throw error;
  }
};

const getOneFingerprint = (fingerprintId) => {
  try {
    const fingerprint = Fingerprint.getOneFingerprint(fingerprintId);
    return fingerprint;
  } catch (error) {
    throw error;
  }
};

const createNewFingerprint = (newFingerprint) => {
  const fingerprintToInsert = {
    ...newFingerprint,
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  fingerprintToInsert.visitorId = uuid();

  try {
    const createdFingerprint = Fingerprint.createNewFingerprint(fingerprintToInsert);
    return createdFingerprint;
  } catch (error) {
    throw error;
  }
};

const updateOneFingerprint = (fingerprintId, changes) => {
  try {
    const updatedFingerprint = Fingerprint.updateOneFingerprint(fingerprintId, changes);
    return updatedFingerprint;
  } catch (error) {
    throw error;
  }
};

const deleteOneFingerprint = (fingerprintId) => {
  try {
    Fingerprint.deleteOneFingerprint(fingerprintId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllFingerprints,
  getOneFingerprint,
  createNewFingerprint,
  updateOneFingerprint,
  deleteOneFingerprint,
};
