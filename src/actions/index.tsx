export const FETCH_EMPLOYEE = 'FETCH_EMPLOYEE';
export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS';
export const FETCH_EMPLOYEE_FAILURE = 'FETCH_EMPLOYEE_FAILURE';

export const fetchEmployee = (id:any) => ({
    type: FETCH_EMPLOYEE,
    payload: id
});

export const fetchEmployeeSuccess = (data: any) => ({
    type: FETCH_EMPLOYEE_SUCCESS,
    payload: data
});

export const fetchEmployeeFailure = (message: any) => ({
    type: FETCH_EMPLOYEE_FAILURE,
    payload: message
});