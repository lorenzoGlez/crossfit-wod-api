const express = require("express");
const fingerprintController = require("../../controllers/fingerprintController");
const recordController = require("../../controllers/recordController");

const router = express.Router();

/**
 * @openapi
 * /api/v1/fingerprints:
 *   get:
 *     tags:
 *       - Fingerprints
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a fingerprint
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Fingerprint"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router
  .get("/", fingerprintController.getAllFingerprints)
  .get("/:fingerprintId", fingerprintController.getOneFingerprint)
  .post("/", fingerprintController.createNewFingerprint)
  .patch("/:fingerprintId", fingerprintController.updateOneFingerprint)
  .delete("/:fingerprintId", fingerprintController.deleteOneFingerprint);

module.exports = router;
