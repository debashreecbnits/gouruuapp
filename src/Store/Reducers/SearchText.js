import { SET_SEARCH_TEXT } from "../ActionTypes";
const initialState = {
    searchText: [],
};
export default function SetSearchText(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_TEXT:
            // return [
            //     ...state,
            //     {userDetails: action.payload}
            // ]
            return { ...state, searchText: action.payload };

        default:
            return state;
    }
}
