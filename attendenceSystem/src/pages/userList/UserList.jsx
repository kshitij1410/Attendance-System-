// import "./userList.css";
// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function UserList() {
//   const [data, setData] = useState(userRows);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "user",
//       headerName: "User",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="userListUser">
//             <img className="userListImg" src={params.row.avatar} alt="" />
//             {params.row.username}
//           </div>
//         );
//       },
//     },
//     { field: "email", headerName: "Email", width: 200 },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 120,
//     },
//     {
//       field: "transaction",
//       headerName: "Transaction Volume",
//       width: 160,
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={"/user/" + params.row.id}>
//               <button className="userListEdit">Edit</button>
//             </Link>
//             <DeleteOutline
//               className="userListDelete"
//               onClick={() => handleDelete(params.row.id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="userList">
//       <DataGrid
//         rows={data}
//         disableSelectionOnClick
//         columns={columns}
//         pageSize={8}
//         checkboxSelection
//       />
//     </div>
//   );
// }

import React, {useState}from 'react'
// import Video from '../videoPlayer/VideoPlayer.js'
import VideoEle from "../videoEle/VideoEle.js"
import userData from "../../dummyData";


function UserList() {
  const [attendance, addToAttendance] = useState([])
  // const [changecolor,setchangecolor]=useState('black');
  return (
    <>
   
      <VideoEle attendance={attendance} addToAttendance={addToAttendance}/>
      <div style={{ marginLeft: "10px", width: "400px" }}>
        <h2 style={{ textAlign: "center", }}>Students: </h2>

        
        <div style={{overflowY: "auto"}}>

       
          {attendance.map((user) => (
            
            <div className="user" style={{fontSize:"20px",  borderBottom:"1px solid #ddd"}}>{user.name}</div>
          ))}
       
        </div>

      </div>

    </>

  )
}

export default UserList
