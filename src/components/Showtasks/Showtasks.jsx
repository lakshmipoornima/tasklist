import React, { useEffect, useState, useContext } from 'react'
import Header from '../Header/Header'
import './Showtasks.css'
import { useNavigate } from 'react-router-dom'
import AddTaskIcon from '@mui/icons-material/AddTask';
import Listtasks from '../listtasks/Listtasks'
import ListIcon from '../listicon/ListIcon';
import axios from 'axios'
import { ParentContext } from '../../store/ParentContextProvider';
import moment from "moment"


export default function Showtasks() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([])
  const [parent, setParent] = useState({})

  let context = useContext(ParentContext)


  const onClickHandler = () => {
    context.addTask(null)
    navigate(`/addmaintask`)
  }

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await axios.get("http://3.95.225.208/api/tasks/")
        let sortedtasks = res.data.sort((a, b) => new Date(...a.due.split('-').reverse()) - new Date(...b.due.split('-').reverse()))
        setTasks([...sortedtasks])
      }
      catch (err) {
        console.log(err)
      }
    }
    loadTasks();

  }, [tasks?.id])


  return (
    <>
      <Header />
      <div className="showtasksmain">
        <div className="addtask">
          <span> Add Task</span>
          <AddTaskIcon className='taskicon'
            onClick={onClickHandler}
            style={{ backgroundColor: 'purple', color: 'white', fontSize: '40px' }} />
        </div>

        <div className="showtasks">
          <div className="showtasksheading">
            <div className="col-sm-2"></div>
            <div className="col-sm-5">
              <h3>Title</h3>
            </div>
            <div className="col-sm-6" >
              <h3>Due Date</h3>
            </div>
          </div>

          {
            tasks.map((task) => (
              <div className="listtaskcontainer">
                <ul className="listtasks">
                  <div className="listicon col-sm-2">
                    {(task.parent_task)
                      ?
                      <></>
                      :
                    <ListIcon className="listicon" task={task} tasks={tasks}  />
                    }
                  </div>
                  <div className="tasklist col-sm-10">
                  {task.parent_task
                  ?
                  <></>
                  :
                    <Listtasks className="tasklist" task={task} />
                  }
                  </div>
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
