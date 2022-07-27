import React from 'react'
import './ListChild.css'
import moment from "moment"

export default function ListChild({ task }) {
    return (
        <div className="childtaskbox">
            <div className="bullet"></div>
            <div className="childtitle">{task.title}</div>
            <div className="childduedate">
                {moment(task.due).format("YYYY-MMM-DD")}
            </div>
        </div>
    )
}
