import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import { deleteTable, tableUrl } from '../Redux/table.action';
import Css from "../Component/adminTable.module.css";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";



const columns = [
  { field:[], width: 250 },

  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    // type: 'number',
    width: 210,
    editable: true,
  },

  { field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {

    return (
     <div>
         <button
         className={Css.edtbutton}
        // onClick={(e) => onButtonClick(e, params.row)}
        variant="contained"
      >
        <FaPen/>
      </button>
      <button
      className={Css.edtbutton}
    //   onClick={() => handleDelete(el.id)}
        // onClick={(e) => onButtonClick(e, params.row)}
        variant="contained"
      >
        <FaTrash/>
      </button>
     </div>
    );
  } }
];







export default function DataTable() {

    
        const [arrayids, setArrayIds] =useState([])
        const dispatch = useDispatch();
        const {data} = useSelector(store => store.table);
        useEffect( () =>{

           dispatch(tableUrl ()) 

        },[])

const handleDeleteAll=()=>{

// const updatedData = data.filter(ids=>arrayids.includes(ids))
// setArrayIds(updatedData)
// console.log(updatedData)
dispatch(deleteTable())
// console.log(arrayids)



}
// function handleDelete(id) {
//     let x = data1.filter((el) => el.id !== id);
//     setData1(x);
//     console.log(x);
//   };







  return (

    
    <div style={{ height: 500, width: '98%', margin:'auto' }}>
      <input type="text" placeholder="Search by name, email or role" className={Css.search}/>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        
        onSelectionModelChange={(id)=>{
            setArrayIds(id);
            // console.log(row)
        }}
        options={{
            selection:true
        }}
        // actions={[
        //     {
        //         icon:'delete',
        //         onClick:()=>handleDeleteAll()
        //     }
        // ]}
      />
      <button onClick={() =>handleDeleteAll()} className={Css.button} >Delete Selected</button>
    </div>
  );
}
