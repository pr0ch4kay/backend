const nodemailer = require("nodemailer");

// Настраиваем подключение к Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,       // Берём из переменных окружения
    pass: process.env.EMAIL_PASS   // Берём из переменных окружения
  }
});

// Функция отправки кода
const sendCode = async (email, code) => {
  try {
    const info = await transporter.sendMail({
      from: `"Pure Aura" <${process.env.EMAIL}>`,
      to: email,
      subject: "Код подтверждения для Pure Aura",
      text: `Ваш код для входа в личный кабинет: ${code}`,
    });
    console.log("✅ Письмо успешно отправлено на:", email);
    return info;
  } catch (error) {
    console.error("❌ Ошибка отправки письма:", error.message);
    throw error; // Пробрасываем ошибку, чтобы сервер знал о ней
  }
};

module.exports = { sendCode };