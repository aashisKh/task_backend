const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
