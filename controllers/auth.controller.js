const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendCode } = require("../services/mail.service");

// Генерация 6-значного кода
const gen = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Проверяем, есть ли пользователь
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "Пользователь с таким email уже существует" });
    }

    // 2. Хешируем пароль и генерируем код
    const hash = await bcrypt.hash(password, 10);
    const code = gen();

    // 3. Создаём пользователя
    await User.create({ name, email, password: hash, verificationCode: code });

    // 4. ПЫТАЕМСЯ ОТПРАВИТЬ ПИСЬМО (если не уйдет - сервер НЕ упадет)
    try {
      console.log(`📧 Попытка отправить письмо на ${email} с кодом ${code}`);
      await sendCode(email, code);
      console.log(`✅ Письмо успешно отправлено на ${email}`);
    } catch (emailError) {
      console.error(`❌ Ошибка отправки письма на ${email}:`, emailError.message);
      // ВНИМАНИЕ: Мы не пробрасываем ошибку дальше, регистрация всё равно пройдёт!
    }

    // 5. Возвращаем успешный ответ фронту
    res.json({ success: true, message: 'code sent' });

  } catch (error) {
    console.error("Ошибка в регистрации:", error);
    res.status(500).json({ msg: "Ошибка сервера при регистрации" });
  }
};

exports.verify = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "Пользователь не найден" });
  }

  // ВАЖНО: Сравниваем коды. Убедитесь, что в БД лежит строка!
  if (user.verificationCode !== code) {
    return res.status(400).json({ msg: "wrong code" });
  }

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  const token = jwt.sign({ id: user._id, email: user.email }, "secret", { expiresIn: "7d" });
  return res.json({ success: true, token, user: { id: user._id, email: user.email } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "no user" });
  if (!user.isVerified) return res.status(403).json({ msg: "not verified" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: "wrong pass" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secret", { expiresIn: "7d" });
  res.json({ success: true, token, user: { id: user._id, email: user.email } });
};