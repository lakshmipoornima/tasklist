import React, { useState, useRef, useContext } from 'react'
import Header from '../Header/Header'
import './Addmaintask.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import axios from 'axios'
import { ParentContext } from '../../store/ParentContextProvider';


export default function Addmaintask() {

  const [startDate, setStartDate] = useState(new Date());
  const [parent, setParent] = useState(null)
  let titleRef = useRef("");
  let context=useContext(ParentContext)

  
  const addTaskHandler = async (event) => {
        event.preventDefault();
        const title = titleRef.current.value;
        let duedate = moment(startDate).format('YYYY-MM-DD')
        if(context.ptask){
          duedate=context.ptask.due
          
        }
        
        try {
          const newtask = { title: title, due: duedate, parent_task: context.ptask?.id}
          const res = await axios.post("http://3.95.225.208/api/tasks/", newtask)
          console.log(res.data)
        }
        catch (err) {
          console.log(err)
        }
  }
  
  const isParentHandler=()=>{
    if(context.ptask!==null)
    {
      console.log(context.ptask.parent_task)
      setParent(context.ptask.parent_task)
    }
    else
    setParent(null)
  }

  return (
    <>
      <Header />
      <div className="taskform">
        <form >
          <div className="taskfields form-group">
            <label htmlFor="">Title</label>
            <input type="text" className='form-control' ref={titleRef} />
          </div>
          <div className="taskfields form-group">
            <label htmlFor="">Duedate</label>
            <span className='form-control'>  
                <DatePicker className='datepicker'
                  selected={startDate}
                  onChange={date=>{
                    console.log(date)
                    setStartDate(date)
                  }}
                  value={context.ptask ?`${moment(context.ptask?.due).format("MM/DD/YYYY")}`:startDate}

                />
            </span>
          </div>
          <div className="taskfields form-group">
            <label htmlFor="">Task type</label>
            <select className="form-select" aria-label="Default select example" onChange={isParentHandler}>  
                <option disabled selected value={context.ptask?.id}>
                 
                  {context.ptask?.id?`${context.ptask?.id}`:"null"}
                  </option>
                
            </select>
          </div>
          <div className="addtaskbtn">
            <button type="submit" className='btn ' onClick={addTaskHandler}>+</button>
          </div>
        </form>
      </div>
    </>
  )
}
