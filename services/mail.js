const API_KEY = "sp_apikey_def25f50b512e6c619dbf55d4832d699456c482d95e89242cd10880d51445a56";

export const sendCode = async (email, code) => {
  try {
    // Отправка через API SendPulse (работает без портов, 100% на Render)
    const res = await fetch("https://api.sendpulse.com/smtp/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        email: {
          from: {
            email: "noreply@sendpulse.com",
            name: "Pure Aura"
          },
          to: [
            {
              email: email,
              name: "Клиент Pure Aura"
            }
          ],
          subject: "Код подтверждения для Pure Aura",
          text: `Ваш код для входа в личный кабинет: ${code}`
        }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Ошибка отправки");
    }
    
    console.log("✅ Письмо успешно отправлено на:", email);
  } catch (error) {
    console.error("❌ Ошибка отправки письма:", error.message);
    throw error;
  }
};