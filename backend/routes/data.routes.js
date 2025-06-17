const router = require("express").Router();
const { dataController } = require("../controllers/data.controller");

router.get("/get-data", dataController);

module.exports = router;
