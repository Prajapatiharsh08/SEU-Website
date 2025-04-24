import { all, fork } from 'redux-saga/effects';
import { contactWatcherSaga } from './saga/contactSaga';

export default function* rootSaga() {
    yield all([
        fork(contactWatcherSaga),
        // Add other sagas here as needed
    ]);
}
