let router = require("express").Router();
const UserHistory = require("./user-history.controller");

router.get("/", UserHistory.getAllUserHistory);
router.post("/", UserHistory.addUserHistory);

router.get("/:username", UserHistory.getUserHistoryByName);

router.patch("/:id", UserHistory.updateUserHistoryById);
router.delete("/:id", UserHistory.deleteUserHistoryById);


module.exports = router;
