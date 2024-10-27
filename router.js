const express = require("express");
const Task = require("./MODEL/Task");

const router = express.Router();

// add task

router.post("/add_task", async (req, res) => {
  let { title, description } = req.body;
  try {
    let taskSaved = await Task.create({ title, description });
    if (taskSaved) {
      console.log("Task created");
      return res.json({
        msg: "Task created successfully",
        status: true,
      });
    }
  } catch (err) {
    return res.json({
      msg: "Task creation failed",
      status: false,
    });
  }
});

router.get("/get_task", async (req, res) => {
  try {
    console.log("get task");
    let getTask = await Task.find({});
    console.log(getTask);
    return res.json({
      msg: "Task found Successfully !!!",
      status: true,
      data: getTask,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Task fetch failed",
      status: false,
    });
  }
});

router.post("/delete_task", async (req, res) => {
  let taskId = req.params.id;
  let deleted = await Task.deleteOne({ id: taskId });
  if (deleted) {
    return res.json({
      msg: "Task is deleted successfully !!!",
      status: true,
    });
  } else {
    return res.json({
      msg: "Task cannot be deleted !!!",
      status: false,
    });
  }
});

router.put("/update_task", async (req, res) => {
  let taskId = req.params.id;
  let { title, description, status } = req.body;
  let updated = await Task.findByIdAndUpdate(taskId, {
    title,
    description,
    status,
  });
  if (updated) {
    return res.json({
      msg: "Task is updated successfully",
      status: true,
    });
  } else {
    return res.json({
      msg: "Task cannot be updated !!!",
      status: false,
    });
  }
});

router.patch("/toggle_task_status/:id/status", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { status: completed },
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({
      msg: "Task updation failed",
      status: false,
    });
  }

  res.json({
    msg: "Task status updated successfully",
    task: updatedTask,
    status: true,
  });
});

module.exports = router;