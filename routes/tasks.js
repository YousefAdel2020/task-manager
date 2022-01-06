const express = require('express');

const router=express.Router();


const {getallTasks,gettask,createTask,updatetask,deletetask}=require('../controllers/tasks');

router.route('/')
.get(getallTasks)
.post(createTask)


router.route('/:id')
.get(gettask)
.patch(updatetask)
.delete(deletetask)


module.exports=router;