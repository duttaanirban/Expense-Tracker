const XLSX = require('xlsx');
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
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        await Income.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        // prepare data for excel
        const data = incomes.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
        XLSX.writeFile(workbook, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (error) {
        console.error("Error downloading income Excel:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};