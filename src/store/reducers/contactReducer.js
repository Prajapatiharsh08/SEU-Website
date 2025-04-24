import {
    SUBMIT_CONTACT_FORM_REQUEST,
    SUBMIT_CONTACT_FORM_SUCCESS,
    SUBMIT_CONTACT_FORM_FAILURE,
    RESET_CONTACT_FORM,
} from '../action/contactActions';

const initialState = {
    loading: false,
    success: false,
    error: null,
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_CONTACT_FORM_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case SUBMIT_CONTACT_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case SUBMIT_CONTACT_FORM_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        case RESET_CONTACT_FORM:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default contactReducer;
