const phoneReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALL_PHONES':
            return {
                ...state,
                phones: action.payload
            }
        default:
            return state;
    }
};
export default phoneReducer;