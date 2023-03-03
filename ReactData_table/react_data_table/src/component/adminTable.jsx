import React, { useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from 'react';
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import _ from 'lodash';




function AdminTable() {


    // Selected checkbox data state
    const [selectedRows, setSelectedRows] = useState([]);

    // Admin State
    const [adminData, setAdminData] = useState([]);
    
    // Search State
    const [search, setSearch] = useState("");
    
    // Filter state (Using this state because we don't want empty row's from start )
    const [filterData, setFilterData] = useState([]);

    const [toggleCleared, setToggleCleared] = useState(false);

    


    // Data fetch using axios
    const getAdminData = async ()=>{
      try{
  
        const res = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
        // console.table(res.data);
        setAdminData(res.data);
        setFilterData(res.data);
      }catch(err){
        console.log(err);
      }
  
    };

    //single data delete function
    const handleDelete = (id) => {
        let x = adminData.filter((row) => row.id !== id);
        setAdminData(x);
        setFilterData(x)
        // console.log(x);
      };

      // Select the checkbox value
      const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
        // console.log(state.selectedRows)
      }, []);

      // Delete by select function
      const contextAction = useMemo(() => {
        const handleSelectedDelete = () => {
			
          if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(el => el.id )}?`)) {
            setToggleCleared(!toggleCleared);
           
            setFilterData(_.differenceBy (filterData, selectedRows));
            
            
           
          }
        };
        return (
          // Selected data delete button
          <button className="button" key="delete" onClick={handleSelectedDelete} style={{ backgroundColor: 'red' }}>
            Delete Selected
          </button>
        );

      },[adminData,filterData, selectedRows, toggleCleared])
  

     // Making array of object about data 
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
        // Single edit and delete button
        cell : (row) => <div className="actionDiv">
            <button onClick={() => alert(row.id)} className="edit" ><FaPen/></button>
            <button  onClick={() => handleDelete(row.id)} className="delete" ><FaTrash /></button>
        </div>,
      },
      
    ]

    // admin Data fetch
    useEffect(()=>{
      getAdminData()
  
    },[])

    //search fuction
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
      contextActions={contextAction}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      subHeaderComponent={
        <input placeholder="Search by name, role, email"
         type="text" 
         className="search" 
         value={search}
         onChange={(e)=>setSearch(e.target.value)}
         
         />
      }
      />
    </div>
  );
}

export default AdminTable;
