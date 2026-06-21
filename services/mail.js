const API_KEY = "6mc6k5bpujh6ijghchy5hs879bcf1871uwc6rm8y";

export const sendCode = async (email, code) => {
  try {
    // Используем правильный формат Unisender: поля передаются как form-data (x-www-form-urlencoded), а не JSON
    const params = new URLSearchParams();
    params.append('api_key', API_KEY);
    params.append('email', email);
    params.append('sender_name', 'Pure Aura');
    params.append('sender_email', 'noreply@unisender.com');
    params.append('subject', 'Код подтверждения для Pure Aura');
    params.append('body', `Ваш код для входа в личный кабинет: ${code}`);

    const res = await fetch("https://api.unisender.com/ru/api/sendEmail?format=json", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const data = await res.json();
    
    if (data.error) {
      console.error("❌ Ошибка Unisender (полный ответ):", data);
      throw new Error(data.error);
    }
    
    console.log("✅ Письмо успешно отправлено на:", email);
  } catch (error) {
    console.error("❌ Ошибка отправки письма:", error.message);
    throw error;
  }
};