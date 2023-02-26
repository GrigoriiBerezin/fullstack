const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.payload
        default:
            return state
    }
}

export const changeFilter = (value) => {
    return {
        type: 'CHANGE_FILTER',
        payload: value
    }
}

export default filterReducer
