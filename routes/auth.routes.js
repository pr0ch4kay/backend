
const router = require("express").Router();
const c = require("../controllers/auth.controller");

router.post("/register",c.register);
router.post("/verify",c.verify);
router.post("/login",c.login);

module.exports = router;
