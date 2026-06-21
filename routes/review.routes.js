const express = require("express");
const router = express.Router();

// Временное хранилище отзывов (в памяти)
let reviews = [];

// GET all reviews (получить все отзывы)
router.get("/", (req, res) => {
  res.json(reviews);
});

// POST review (создать новый отзыв)
router.post("/", (req, res) => {
  // Получаем данные из запроса
  const { text, stars, master, name } = req.body;

  // Создаём объект отзыва с полной информацией
  const newReview = {
    id: reviews.length + 1,
    text: text || "Без текста",
    stars: stars || 5, // Если звёзд нет — ставим 5 по умолчанию
    master: master || "", // Если мастер не выбран — пустая строка
    name: name || "Анонимный клиент", // Если имя не передано — ставим Аноним
    date: new Date().toLocaleDateString('ru-RU') // Автоматическая дата
  };

  // Добавляем отзыв в массив
  reviews.push(newReview);
  
  // Возвращаем созданный отзыв на фронт
  res.status(201).json(newReview);
});

module.exports = router;