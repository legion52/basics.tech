import axios from "axios";
import { GET_ACCOUNTS } from "../types/types";


export const getaccounts = (todo) =>({
  type: GET_ACCOUNTS,
  payload: todo
})

export const getTodoFromServer = () => async(dispatch) => {
  const todo = await axios(`/api/v1/people`)
  dispatch(getaccounts(todo.data))
}
