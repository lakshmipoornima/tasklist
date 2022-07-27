import React, { useContext } from 'react'
import './Listtasks.css'
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import moment from "moment"
import { ParentContext } from '../../store/ParentContextProvider';


export default function Listtasks({ task }) {

    const navigate = useNavigate()
    let context = useContext(ParentContext)

    const onClickHandler = () => {
        context.addTask(task)
        navigate(`/addmaintask`)
    }


    return (
        <>
            <div className="taskbox">
                <div className="title">{task.title}</div>
                <div className="duedate">
                    {moment(task.due).format("YYYY-MMM-DD")}
                   
                        <div className="addchild">
                            Add Subtask
                            <AddCircleOutlineSharpIcon className='taskicon'
                                onClick={onClickHandler}
                                style={{ backgroundColor: 'purple', color: 'white', fontSize: '20px' }} />
                        </div>
                       
                </div>
            </div>
        </>
    )
}
