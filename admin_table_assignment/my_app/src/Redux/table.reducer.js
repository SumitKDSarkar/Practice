import { DELETEDATA, FETCHDATA } from "./table.type";


let array = {

    data : []
};

export const tableReducer = (state = array,{type, payload})=>{

switch(type){

    case FETCHDATA : {
        return{
            ...state,data:payload
        }
    }

    case DELETEDATA : {
        return {
            ...state, data:[]
           
        }
    }
    default:
      return state;
}


}






