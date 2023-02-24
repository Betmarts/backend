const express = require("express");
const router = express.Router();
const withdrawController = require("../controller/withdrawController");

router.post("/withdraw", withdrawController.createWithdraw);
router.get("/withdraw", withdrawController.getWithdraws);
router.get("/withdraw/:id", withdrawController.getWithdraw);
router.patch("/withdraw/:id", withdrawController.updateWithdraw);
router.delete("/withdraw/:id", withdrawController.deleteWithdraw);

module.exports = router;
