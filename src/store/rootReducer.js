import { combineReducers } from 'redux';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
    contact: contactReducer,
    // Add other reducers here as needed
});

export default rootReducer;
