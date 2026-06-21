const API_KEY = "sp_apikey_409b0104c3725b6143d6d6cc3e58cbd57c4c11aa8ef0ed072a5b09e5fa7fa962";

export const sendCode = async (email, code) => {
  try {
    // Отправка через API SendPulse (работает без портов, 100% на Render)
    const res = await fetch("https://api.sendpulse.com/smtp/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
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