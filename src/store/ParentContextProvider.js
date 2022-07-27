import React, { useState } from 'react'


export const ParentContext = React.createContext({//data that needs to be shared using this context is added here

    ptask: {},
    addTask: (task) => { },
    iclicked:false,
    isClicked:()=>{},
    tasks:[],
    addTasks:(tasks)=>{},
    childtasks:[],
    addChildTasks:(task)=>{}
    
})

export function ParentContextProvider(props) {

    let [parenttask, setParentTask] = useState({})
    const [clicked, setIsClicked] = useState(false)
    const [childtasks, setChildTasks] = useState([])
    const [tasks, setTasks] = useState([])

    const addTaskHandler = (task) => {
        setParentTask(task)//parenttask=task
    }
    const isClickedHandler = () => {
        setIsClicked(!clicked)
    }
    const addChildTasksHandler = (task) => {
        console.log(task)
        setChildTasks(tasks.filter((t) =>t.parent_task === task?.id))
        
      }

      const addTasksHandler=(tasks)=>{
        setTasks(tasks)
      }

    const context = {
        ptask: parenttask,
        addTask: addTaskHandler,
        iclicked:clicked,
        isClicked:isClickedHandler,
        tasks:tasks,
        addTasks:addTasksHandler,
        childtasks:childtasks,
        addChildTasks:addChildTasksHandler
    }

    return (
    <ParentContext.Provider value={context}>
        {props.children}
    </ParentContext.Provider>
    )

}