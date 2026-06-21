const API_KEY = "6mc6k5bpujh6ijghchy5hs879bcf1871uwc6rm8y";

export const sendCode = async (email, code) => {
  try {
    // ПРАВИЛЬНАЯ структура для Unisender: "to" вместо "email", и вложенный объект
    const res = await fetch("https://api.unisender.com/ru/api/sendEmail?format=json&api_key=" + API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: email,
        from: {
          name: "Pure Aura",
          email: "noreply@unisender.com"
        },
        subject: "Код подтверждения для Pure Aura",
        body: `Ваш код для входа в личный кабинет: ${code}`
      })
    });

    const data = await res.json();
    if (data.error) {
      console.error("Ошибка Unisender:", data.error);
      throw new Error(data.error);
    }
    
    console.log("✅ Письмо успешно отправлено на:", email);
  } catch (error) {
    console.error("❌ Ошибка отправки письма:", error.message);
    throw error;
  }
};