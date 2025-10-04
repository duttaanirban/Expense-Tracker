const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { Types } = require('mongoose');


exports.getDashboardData = async (req, res) => {
    try {
        // extra debug logging to help diagnose invalid user ids
        console.log('getDashboardData - raw req.user:', req.user);

        // Defensive checks
        if (!req.user) {
            console.error('getDashboardData: req.user is missing');
            return res.status(401).json({ message: 'Unauthorized: user not found' });
        }

        const userId = req.user.id || req.user._id || req.user;
        console.log('getDashboardData - derived userId:', userId, 'type:', typeof userId);
        if (!userId) {
            console.error('getDashboardData: userId could not be derived from req.user', req.user);
            return res.status(401).json({ message: 'Unauthorized: invalid user' });
        }

        let userObjectId;
        // If userId is already an ObjectId instance, use it. If it's a string, construct a new ObjectId.
        if (Types.ObjectId.isValid(userId)) {
            if (typeof userId === 'string') {
                try {
                    userObjectId = new Types.ObjectId(userId);
                } catch (e) {
                    console.error('getDashboardData: failed to construct ObjectId from string', userId, e.message);
                    return res.status(400).json({ message: 'Bad Request: invalid user id' });
                }
            } else {
                userObjectId = userId;
            }
        } else {
            console.error('getDashboardData: invalid userId format', userId);
            return res.status(400).json({ message: 'Bad Request: invalid user id' });
        }

        // fetch total income & expenses using correct $sum syntax
        const [totalIncomeAgg, totalExpenseAgg] = await Promise.all([
            Income.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            Expense.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
        ]);

        const totalIncome = totalIncomeAgg[0]?.total || 0;
        const totalExpense = totalExpenseAgg[0]?.total || 0;

        // get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + Number(transaction.amount || 0),
            0
        );

        // get expense transactions in the last 30 days
        const last30daysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expenseLast30Days = last30daysExpenseTransactions.reduce(
            (sum, transaction) => sum + Number(transaction.amount || 0),
            0
        );

        // fetch last 5 transactions (income + expenses)
        const [recentIncomes, recentExpenses] = await Promise.all([
            Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5),
            Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5),
        ]);

        const last5IncomeTransactions = [
            ...recentIncomes.map((txn) => ({ ...txn.toObject(), type: 'income' })),
            ...recentExpenses.map((txn) => ({ ...txn.toObject(), type: 'expense' })),
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        return res.status(200).json({
            totalBalance: totalIncome - totalExpense,
            totalIncome,
            totalExpense,
            last30daysExpenseTransactions: {
                total: expenseLast30Days,
                transactions: last30daysExpenseTransactions,
            },
            last60DaysIncomeTransactions: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            last5Transactions: last5IncomeTransactions,
        });
    } catch (error) {
        console.error('getDashboardData error:', error.stack || error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};