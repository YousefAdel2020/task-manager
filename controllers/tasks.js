const Task = require("../models/tasks");
const asyncwrapper=require('../middlewares/async')
const {createCustomError}=require('../error/custum-error');

const getallTasks =asyncwrapper(  async (req, res) => {
  
    const tasks = await Task.find({});
    //res.status(200).json({ task });
    res
      .status(200)
      .json({ status: 'success', data: { tasks, nbHits: tasks.length } });
  
});

const createTask =asyncwrapper( async (req, res) => {
  
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  
});

const gettask =asyncwrapper( async (req, res,next) => {
  
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return next(createCustomError(`no task with id : ${taskID}`,404))
     // res.status(404).json({ msg: `no task with id : ${taskID}` }); //if id do not match with any one in database
    }
    res.status(200).json({ task });
  
});

const updatetask =asyncwrapper( async (req, res) => {
  
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, //to return the updated value in res
      runValidators: true,
    });
    if (!task) {
      return next(createCustomError(`no task with id : ${taskID}`,404))
    }
    res.status(200).json({ task });
  
});

const deletetask =asyncwrapper( async (req, res) => {
  
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return next(createCustomError(`no task with id : ${taskID}`,404))
    }
    res.status(200).json({ task });
  
});

module.exports = {
  getallTasks,
  gettask,
  createTask,
  updatetask,
  deletetask,
};
