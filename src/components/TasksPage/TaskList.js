import React, {Fragment} from 'react'
import Task from './Task'
import {useNavigate} from 'react-router-dom'
import Title from '../title/Title'
import LinkButton from '../LinkButton/LinkButton'

function TaskList({tasks}) {
    const navigate = useNavigate()

    return (
        <Fragment>
            <Title content={'Задачи'} button={<LinkButton href={'/tasks/add'} content={'добави'} clickHandler={() => {navigate('/tasks/add')}} image={'add'}/>}/>
            {tasks && tasks.tasks.map((x,i) => {
                return <Task key={x._id} expiresAt={x.expiresAt} id={x._id} task={x.task}/>
            })}
        </Fragment>
    )
}

export default TaskList