import { useState } from "react";
import Css from "../Component/adminTable.module.css";
import DataTable from "./table";



function AdminTable() {

    // const [text, setText ] = useState("");





  return (
    <div className="AdminTable">

        {/* <input type="text" placeholder="Search by name, email or role" className={Css.search}/> */}

        <DataTable/>
        



        
      
    </div>
  );
}

export default AdminTable;
