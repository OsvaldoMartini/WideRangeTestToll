const optionReducer = (state: any, action: any) => {

    switch (action.type) {

        case "updateOption":
            return {
                ...state,
                value: state.value + action.payload
            }

        default:
            return state;
    }
}

export default optionReducer;