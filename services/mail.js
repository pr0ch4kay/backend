const RESEND_API_KEY = "re_LQpHEJA9_hcdCvw3mKQY6LLiYTxUaJYun";

export const sendCode = async (email, code) => {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: `"Pure Aura" <onboarding@resend.dev>`,
        to: [email],
        subject: "Код подтверждения Pure Aura",
        text: `Ваш код для входа: ${code}`
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Ошибка отправки");
    
    console.log("✅ Письмо успешно отправлено на:", email);
  } catch (error) {
    console.error("❌ Ошибка отправки письма:", error.message);
    throw error;
  }
};