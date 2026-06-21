const router = require("express").Router();
const c = require("../controllers/auth.controller");
const auth = require("../middleware/auth"); // 1. Подключаем мидлвар

router.post("/register", c.register);
router.post("/verify", c.verify);
router.post("/login", c.login);
router.get("/me", auth, c.getMe); // 2. Добавляем защищённый маршрут

module.exports = router;