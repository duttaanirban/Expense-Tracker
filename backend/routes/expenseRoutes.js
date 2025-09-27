const express = require('express');
const {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpenses);
router.delete('/:id', protect, deleteExpense);
router.get('/download-excel', protect, downloadExpenseExcel);

module.exports = router;