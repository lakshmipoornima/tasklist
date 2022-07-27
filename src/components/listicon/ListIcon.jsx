import React, { useContext, useEffect, useState } from 'react'
import './ListIcon.css'
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import ListChild from '../ListChild/ListChild';
import { ParentContext } from '../../store/ParentContextProvider';



export default function ListIcon({ task, tasks }) {

    let context = useContext(ParentContext)
    const [clicked, setIsClicked] = useState(false)
    const [childtasks, setChildtasks] = useState([])

    const isClickedHandler = () => {
        setIsClicked(!clicked)
        context.isClicked(clicked)
    }

    useEffect(() => {
        const getChildtasks = () => {
            setChildtasks(tasks.filter((t) => t.parent_task === task.id))
        }
        getChildtasks()
    }, [tasks, task.id])

    return (
        <div className="listicon">
            {clicked
                ?
                <>
                    <KeyboardArrowDownSharpIcon
                        className='icon'
                        style={{ backgroundColor: 'purple', color: 'white', fontSize: '40px' }} onClick={isClickedHandler} />
                    {
                        childtasks.length !== 0
                            ?
                            <div className="listtaskbox col-sm-6">
                                {console.log(childtasks)}
                                {childtasks.map((t) =>
                                    <ListChild task={t} />
                                )}

                            </div>
                            :
                            null
                    }
                </>
                :
                <KeyboardArrowRightSharpIcon
                    className='icon'
                    style={{ backgroundColor: 'purple', color: 'white', fontSize: '40px' }} onClick={isClickedHandler} />

            }

        </div>
    )
}
