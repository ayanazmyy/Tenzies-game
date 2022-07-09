import React from 'react'

const Die = (props) => {
    const isHeldStyles = {
        backgroundColor: props.isHeld ? '#59E391' : '',
    }

    return (
        <div className='col-md-2 col-4 gy-4'>
            <div style={isHeldStyles} className='die-face' onClick={()=> props.holdDie(props.id)}>
                <h2 className='die-num'>{props.value}</h2>
            </div>
        </div>
    )
}

export default Die