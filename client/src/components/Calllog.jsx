import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../context/UserProvider.jsx'
import Call from "./Call.jsx"

export default function Calllog() {

    const { getAllCalls } = useContext(UserContext)

    const [recentCalls, setRecentCalls] = useState([])

    useEffect(() => {
        getAllCalls()
            .then(data => {
                console.log(data)
                const sortedCalls = data.sort((a, b) => new Date(b.time) - new Date(a.time));
                setRecentCalls(sortedCalls.slice(0, 10));
            })
            .catch(err => {
                console.error("Error fetching calls:", err);
            });
    }, [getAllCalls]);

    const mappedRecentCalls = recentCalls.map(eachCall => {
        return <Call {...eachCall} key={eachCall._id} />
    })

    return (
        <div className="calllogContainer">
                {mappedRecentCalls}
        </div>
    )
}