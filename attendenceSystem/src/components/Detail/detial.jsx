import React from 'react'
import './detail.css'
import TablePaginationActions from '../TeacherInfo/teacherinfo'
import mayankSir from '../../Images/mayankSir.jpg'

function detial() {
    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (

        <div className="widgetLg">

            <div className='teacherImage center' >
                <img
                    src={mayankSir}
                    alt=""
                    id="demo"

                />
            </div>
            <h3 className="widgetLgTitle" style={{ marginTop: "30px", marginBottom: "30px"}}>Personal Information</h3>
            <div className='row'>
               <TablePaginationActions/>
            </div>

        </div>

    );
}


export default detial;