const initialState = {
    details: [], // for this example we'll make an app that fetches and lists details
    isLoading: false,
    error: false
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}