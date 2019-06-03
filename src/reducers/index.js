import {
    FETCH_EMPLOYEE,
    FETCH_EMPLOYEE_FAILURE,
    FETCH_EMPLOYEE_SUCCESS

} from '../actions';

const initialState = {
    details: [],
    isLoading: false,
    error: null
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_EMPLOYEE:
            return {
                ...state,
                // whenever we want to fetch the details, set isLoading to true to show a spinner
                isLoading: true,
                error: null
            };
        case FETCH_EMPLOYEE_SUCCESS:
            return {
                ...action.payload,
               // details: [...action.payload],
                // whenever the fetching finishes, we stop showing the spinner and then show the data
                isLoading: false,
                error: null
            };
        case FETCH_EMPLOYEE_FAILURE:
            return {
                details: [],
                isLoading: false,
                // same as FETCH_EMPLOYEE_SUCCESS, but instead of data we will show an error message
                error: action.payload
            };
        default:
            return state;
    }
}