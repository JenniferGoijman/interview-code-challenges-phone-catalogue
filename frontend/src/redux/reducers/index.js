import { combineReducers } from "redux";
import phone from "./phone";

const reducer = combineReducers({
    phone
    // With the idea to make the project easily scalable, you can add the rest of the reducers here.
})
export default reducer;