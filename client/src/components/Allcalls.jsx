import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/UserProvider.jsx'
import Call from "./Call.jsx"

export default function AllCalls() {

    const { getAllCalls } = useContext(UserContext)

    const [allCalls, setAllCalls] = useState([])

    useEffect(() => {
        getAllCalls()
          .then(data => {
            setAllCalls(data);
          })
          .catch(err => {
            console.error("Error fetching calls:", err);
          });
      }, []);  

      const mappedCalls = allCalls.map(eachCall => {
        return <Call {...eachCall} key={eachCall._id} />
    })

    return (
        <div className="allCallsContainer">
            {mappedCalls}
        </div>
    )
}