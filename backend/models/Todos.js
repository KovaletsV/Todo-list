const { Schema, Types, model } = require("mongoose");

const Todo = new Schema(
    {
        user: {
            type: Types.ObjectId,
            required: true,
            ref: "User"
        },
        text: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = model("Todo", Todo);
