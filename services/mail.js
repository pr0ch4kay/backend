const nodemailer = require("nodemailer");

// Настройка SMTP через Mail.ru (работает без корпоративной почты и без API-ключей)
const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
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