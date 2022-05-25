import React from 'react'
import "./recent.css"
function RecentAttendance() {

    const arr = JSON.parse(localStorage.getItem("attendance"));
    console.log(arr);
    if(!arr)
    {
        return <p>No Data</p>
    }
    return (
        <>
            <table>
                <tr>
                    <th>S.No</th>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Time</th>
                </tr>

                {arr && arr.length > 0 && arr.map((data, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{data.rollNo}</td>
                            <td>{data.name}</td>
                            <td>{data.isPresent ? "Present" : "Absent"}</td>
                            <td>{data.time}</td>
                        </tr>
                    )

                })}


            </table>




        </>
    )
}

export default RecentAttendance