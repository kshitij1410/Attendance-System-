import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

var dataSet2 = [
    {
        name: "Johnson",
        total: 25,
        remainig: 16
    },
    {
        name: "Josef",
        total: 25,
        remainig: 7
    }
];

export default function Excel({attendance}) {
    
    
        return (
            
            // {props.attendance.map((user)=>{
            //     console.log(user)   
            //    })
            //    }

             <ExcelFile element={<button>Download Excel File</button>}>
              
                <ExcelSheet data={attendance} name="Leaves">
                    <ExcelColumn label="Name" value="name" />
                    <ExcelColumn label="Id" value="id" />
                    <ExcelColumn label="Roll No." value="rollNo" />
                    <ExcelColumn label="Time" value="time" />
                   
                </ExcelSheet>
            </ExcelFile>
          
        );
    
}