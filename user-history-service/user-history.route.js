let router = require("express").Router();
const UserHistory = require("./user-history.controller");

router.get("/", UserHistory.getAllUserHistory);
router.post("/", UserHistory.addUserHistory);
router.patch("/", UserHistory.updateUserHistoryById);
router.delete("/", UserHistory.deleteUserHistoryById);
router.get("/health", UserHistory.getHealthStatus);

router.get("/:username", UserHistory.getUserHistoryByName);

module.exports = router;
