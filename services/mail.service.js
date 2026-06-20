const nodemailer = require("nodemailer");

// Ручная настройка Gmail через порт 587 (работает на Render)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false для порта 587, true для порта 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Иногда помогает обойти блокировки
  }
});

const sendCode = async (email, code) => {
  try {
    const info = await transporter.sendMail({
      from: `"Pure Aura" <${process.env.EMAIL}>`,
      to: email,
      subject: "Код подтверждения для Pure Aura",
      text: `Ваш код для входа в личный кабинет: ${code}`,
    });
    console.log("✅ Письмо успешно отправлено на:", email);
  } catch (error) {
    console.error("❌ Ошибка отправки письма:", error.message);
    throw error;
  }
};

module.exports = { sendCode };