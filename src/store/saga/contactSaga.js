import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    SUBMIT_CONTACT_FORM_REQUEST,
    submitContactFormSuccess,
    submitContactFormFailure
} from '../action/contactActions';

// API call function
const submitContactFormAPI = (formData) => {
    return axios.post('https://seu-backend.onrender.com/api/contact', formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

// Worker saga
function* submitContactFormWorker(action) {
    try {
        const response = yield call(submitContactFormAPI, action.payload);
        yield put(submitContactFormSuccess(response.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to send message';
        yield put(submitContactFormFailure(errorMessage));
    }
}

// Watcher saga
export function* contactWatcherSaga() {
    yield takeLatest(SUBMIT_CONTACT_FORM_REQUEST, submitContactFormWorker);
}
