const DB = require("./fingerprintDB.json");
const { saveToDatabase } = require("./utils");

/**
 * @openapi
 * components:
 *   schemas:
 *     Fingerprint:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
const getAllFingerprints = (filterParams) => {
  try {
    let fingerprints = DB.fingerprints;
    if (filterParams.incognito) {
      return DB.fingerprints.filter((fingerprint) =>
        fingerprint.incognito.toLowerCase().includes(filterParams.incognito)
      );
    }
    return fingerprints;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneFingerprint = (visitorId) => {
  try {
    const fingerprint = DB.fingerprints.find((fingerprint) => fingerprint.visitorId === visitorId);

    if (!fingerprint) {
      throw {
        status: 400,
        message: `Can't find fingerprint with the id '${visitorId}'`,
      };
    }

    return fingerprint;
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

const createNewFingerprint = (newFingerprint) => {
  try {
    const isAlreadyAdded =
      DB.fingerprints.findIndex((fingerprint) => fingerprint.visitorId === newFingerprint.visitorId) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Fingerprint with the name '${newFingerprint.visitorId}' already exists`,
      };
    }

    DB.fingerprints.push(newFingerprint);
    saveToDatabase(DB);

    return newFingerprint;
  } catch (error) {
    throw { status: 500, message: error.message || error };
  }
};

const updateOneFingerprint = (visitorId, changes) => {
  try {
    const isAlreadyAdded =
      DB.fingerprints.findIndex((fingerprint) => fingerprint.visitorId === changes.visitorId) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Fingerprint with the name '${changes.visitorId}' already exists`,
      };
    }

    const indexForUpdate = DB.fingerprints.findIndex(
      (fingerprint) => fingerprint.visitorId === visitorId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find fingerprint with the id '${visitorId}'`,
      };
    }

    const updatedFingerprint = {
      ...DB.fingerprints[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.fingerprints[indexForUpdate] = updatedFingerprint;
    saveToDatabase(DB);

    return updatedFingerprint;
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

const deleteOneFingerprint = (visitorId) => {
  try {
    const indexForDeletion = DB.fingerprints.findIndex(
      (fingerprint) => fingerprint.visitorId === visitorId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find fingerprint with the id '${visitorId}'`,
      };
    }
    DB.fingerprints.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

module.exports = {
  getAllFingerprints,
  getOneFingerprint,
  createNewFingerprint,
  updateOneFingerprint,
  deleteOneFingerprint,
};
