import React from "react";

export default function(props) {

    const { call, location, notes, response, time, _id } = props

    function handleCallDivClick(id){
        console.log(id)
    }

    return (
        <div className="callDiv" onClick={() => handleCallDivClick(_id)}>
            <p>Time: {time}</p>
            <p>Incident type: {call}</p>
            <p>Location: {location}</p>
            <p>Units Responding: truckRouter and trucks coming soon</p>
            <p>Current Notes: {notes}</p>
        </div>
    )
}

//moment js