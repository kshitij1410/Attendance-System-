import React, { useState } from 'react'
import Excel from '../excel/Excel.jsx'
import VideoEle from "../videoEle/VideoEle.js"


function UserList() {
  const [attendance, addToAttendance] = useState([])
  return (
    <>
    <div style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", flexDirection: "row" }}>
        <VideoEle style={{ flexDirection: "column" }} attendance={attendance} addToAttendance={addToAttendance} />

        <div style={{ marginLeft: "10px", width: "300px", flexDirection: "column" }}>
          <h2 style={{ textAlign: "center", }}>Students: </h2>


          <div style={{ overflowY: "auto" }}>


            {attendance.map((user) => (

              <div className="user" style={{ fontSize: "20px", borderBottom: "1px solid #ddd" }}>{user.name}</div>
            ))}



          </div>

        </div>


      </div>
      <div className='heading' style={{ display: "flex", flexDirection: "row", }}>
        <Excel attendance={attendance} />

      </div>
    </div>

      

      






    </>

  )
}

export default UserList
