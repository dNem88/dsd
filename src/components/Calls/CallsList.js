import React, {Fragment} from 'react'
import Call from './Call'
import {useNavigate} from 'react-router-dom'

function CallsList({calls}) {
    const navigate = useNavigate()

    function addCall() {
        navigate('/calls/add')
    }
     function viewStats() {
        navigate('/calls/stats')
    }
    return (
        <Fragment>
            <button onClick={addCall}>добави</button>
            <button onClick={viewStats}>статистика</button>
            {calls.calls && calls.calls.map(x => {
                return <Call key={x._id} _id={x._id} calls={x.calls || 'N/A'} valid={x.valid || 'N/A'} date={x.date || ''} />
            } )}
        </Fragment>
            
    )
}

export default CallsList