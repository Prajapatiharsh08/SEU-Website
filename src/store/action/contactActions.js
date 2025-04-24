// Action Types
export const SUBMIT_CONTACT_FORM_REQUEST = 'SUBMIT_CONTACT_FORM_REQUEST';
export const SUBMIT_CONTACT_FORM_SUCCESS = 'SUBMIT_CONTACT_FORM_SUCCESS';
export const SUBMIT_CONTACT_FORM_FAILURE = 'SUBMIT_CONTACT_FORM_FAILURE';
export const RESET_CONTACT_FORM = 'RESET_CONTACT_FORM';

// Action Creators
export const submitContactFormRequest = (formData) => ({
    type: SUBMIT_CONTACT_FORM_REQUEST,
    payload: formData,
});

export const submitContactFormSuccess = (response) => ({
    type: SUBMIT_CONTACT_FORM_SUCCESS,
    payload: response,
});

export const submitContactFormFailure = (error) => ({
    type: SUBMIT_CONTACT_FORM_FAILURE,
    payload: error,
});

export const resetContactForm = () => ({
    type: RESET_CONTACT_FORM,
});