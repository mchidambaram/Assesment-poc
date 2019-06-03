import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';

import {
    FETCH_EMPLOYEE,
    fetchEmployeeFailure,
    fetchEmployeeSuccess
} from "../actions";

const url = 'https://reqres.in/api/users/';

function fetchEmployeeEpic(action$, state) { // action$ is a stream of actions
    // action$.ofType is the outer Observable
   
    return action$
        .ofType(FETCH_EMPLOYEE) // ofType(FETCH_EMPLOYEE) is just a simpler version of .filter(x => x.type === FETCH_EMPLOYEES)
        .switchMap((action) => {
            // ajax calls from Observable return observables. This is how we generate the inner Observable
            return ajax
                .getJSON(url + action.payload) // getJSON simply sends a GET request with Content-Type application/json
                .map((data ) => data)
            // at the end our inner Observable has a stream of an array of employee objects which will be merged into the outer Observable
        })
        .map((data) => fetchEmployeeSuccess(data)) // map the resulting array to an action of type FETCH_EMPLOYEE_SUCCESS
        // every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
        // if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
        .catch((error) => Observable.of(fetchEmployeeFailure(error.message)))
}


export const rootEpic = combineEpics(fetchEmployeeEpic);