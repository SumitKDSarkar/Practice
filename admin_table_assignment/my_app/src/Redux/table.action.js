import axios from "axios";
import { DELETEDATA, FETCHDATA } from "./table.type";

export  const tableUrl = () => async (dispatch) => {

    let res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")

    // console.log(res.data);
    dispatch({

        type:FETCHDATA ,
        payload: res.data
    })

}

export const deleteTable = () => async (dispatch) =>{

    dispatch({
        type:DELETEDATA,
        
    })

    // try {
    //     await axios.delete(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json` + id);
    //     // console.log(response);
    //     dispatch({ type: DELETEDATA });
    //     dispatch(tableUrl(null, id));
    //   } catch (e) {
    //     console.log(e.message);
    //   }
}