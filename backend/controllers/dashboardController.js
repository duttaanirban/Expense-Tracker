const Income = require('../models/Income');
const Expense = require('../models/Expense');
const {isValidObjectId, Types} = require('mongoose');


exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = Types.ObjectId(userId);

        //fetch total income & expenses
        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, total: {$sum: "amount"}}}
        ]);

        //get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},

        }).sort({date: -1});

        //get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //get expense transactions in the last 30 days
        const last30daysExpenseTransactions = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1});

        //get total expense for last 30 days
        const expenseLast30Days = last30daysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //fetch last 5 transactions (income + expenses)
        const last5IncomeTransactions = [
            ...((await Income.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: 'income',
                })
            )),
            ...((await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: 'expense',
                })
            )),
        ]
        .sort((a, b) => b.date - a.date)
        .slice(0, 5);

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30daysExpenseTransactions: {
                total: expenseLast30Days,
                transactions: last30daysExpenseTransactions,
            },
            last60DaysIncomeTransactions: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            last5Transactions: last5IncomeTransactions,
        })
    } catch (error) {
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};