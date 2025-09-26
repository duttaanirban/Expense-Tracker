const User = require('../models/User');
const Income = require('../models/Income');


//addIncome
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date
        });

        const savedIncome = await newIncome.save();
        res.status(201).json(savedIncome);
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllIncomes = async (req, res) => {

};

exports.deleteIncome = async (req, res) => {

};

exports.downloadIncomeExcel = async (req, res) => {

};