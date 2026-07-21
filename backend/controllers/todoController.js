const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
    try {

        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.json(todo);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};