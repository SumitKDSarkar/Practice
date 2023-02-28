import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from 'react';
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";



function AdminTable() {

    const [adminData, setAdminData] = useState([]);
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState([]);

    const getAdminData = async ()=>{
      try{
  
        const res = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
        console.table(res.data);
        setAdminData(res.data);
        setFilterData(res.data);
      }catch(err){
        console.log(err);
      }
  
    };

    const handleDelete = (id) => {
        let x = adminData.filter((row) => row.id !== id);
        setAdminData(x);
        setFilterData(x)
        // console.log(x);
      };
  
    const columns = [
      {
        name: 'Name',
        selector : (row) => row.name,
        sortable : true,
      },
      {
        name: 'Email',
        selector : (row) => row.email,
        sortable : true,
      },
      {
        name: 'Role',
        selector : (row) => row.role,
        sortable : true,
      },
      {
        name: 'Action',
        cell : (row) => <div className="actionDiv">
            <button onClick={() => alert(row.id)} className="edit" ><FaPen/></button>
            <button  onClick={() => handleDelete(row.id)} className="delete" ><FaTrash /></button>
        </div>,
      },
      
    ]
    useEffect(()=>{
      getAdminData()
  
    },[])

    useEffect(()=>{

        const result = adminData.filter((employeData) => {
            return employeData.name.toLowerCase().match(search.toLowerCase())
        })
        setFilterData(result)
        
    
      },[search])

  return (
    <div className="App">

      <DataTable 
      title="Admin UI" 
      columns={columns} 
      data={filterData} 
      pagination
      fixedHeader
      fixedHeaderScrollHeight="400px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input placeholder="Search by name, role, email"
         type="text" 
         className="search" 
         value={search}
         onChange={(e)=>setSearch(e.target.value)}
         
         />
      }
      
      />
      <button className="button">Delete Selected</button>
    </div>
  );
}

export default AdminTable;
