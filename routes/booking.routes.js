const router = require("express").Router();
const auth = require("../middleware/auth");

// Временное хранилище записей в памяти (пока без MongoDB)
let bookings = [];

// 1. Получить все записи пользователя
router.get("/", auth, (req, res) => {
  // Фильтруем записи по ID пользователя (если нужно)
  const userBookings = bookings.filter(b => b.userId === req.user.id);
  res.json(userBookings);
});

// 2. Создать новую запись
router.post("/", auth, (req, res) => {
  const newBooking = {
    id: bookings.length + 1,
    ...req.body,
    userId: req.user.id, // Привязываем запись к конкретному пользователю
    createdAt: new Date()
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// 3. Отменить запись (удалить)
router.delete("/:id", auth, (req, res) => {
  const id = parseInt(req.params.id);
  bookings = bookings.filter(b => b.id !== id);
  res.json({ success: true });
});

module.exports = router;