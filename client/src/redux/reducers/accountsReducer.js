import { GET_ACCOUNTS } from "../types/types";

export const accountsReducer = (state = [], action) =>{
    const { type, payload } = action
  switch (type) {
    case GET_ACCOUNTS:
      return payload;
      

    default:
      return state;
}

}
