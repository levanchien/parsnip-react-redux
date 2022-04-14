//the take, takeEvery, and takeLatest methods will pass the action through to the function or saga

import {
  call,
  fork,
  put,
  take,
  takeLatest,
  takeEvery,
  delay,
} from "redux-saga/effects";
import * as api from "./api";
import { channel } from "redux-saga";

// channels are “objects used to send and receive messages between tasks.”

export function* rootSaga() {
  // The fork method, however, allows rootSaga to move onto the next yield without a resolution.
  // Each of these forks are said to be non-blocking even yield is stop
  // Because watchFetchTasks and watchSomethingElse is generator functions, have to call next
  /* yield fork(watchFetchTasks);
  yield fork(watchSomethingElse); */
  // takeLatest cancels old processes when a new one begins.
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasks);
  //Every time 'TIMER_STARTED' is dispatched, invoke the handleProgressTimer function.
  // yield takeEvery("TIMER_STARTED", handleProgressTimer);

  yield takeLatestById(["TIMER_STARTED", "TIMER_STOPPED"], handleProgressTimer);
}

function* fetchTasks() {
  /* No more infinite loop is required, because takeLatest continues to listen for the action type */
  try {
    const { data } = yield call(api.fetchTasks);
    yield put({
      type: "FETCH_TASKS_SUCCEEDED",
      payload: { tasks: data },
    });
  } catch (e) {
    yield put({
      type: "FETCH_TASKS_FAILED",
      payload: { error: e.message },
    });
  }
}

function* watchFetchTasks() {
  // use infinite loops to process actions as often as they’re needed.
  while (true) {
    // table is blocking
    // take command is used to wake up and engage a saga when a particular action type arrives
    // Only after a FETCH_TASKS_STARTED action is dispatched and take is called will the started! log appear in your console
    /* yield take('FETCH_TASKS_STARTED');
      console.log('started!'); 
    */

    // take() waits for a given action type before allowing the saga to proceed
    yield take("FETCH_TASKS_STARTED");
    try {
      const { data } = yield call(api.fetchTasks);
      /* put is used to dispatch an action. put = dispatched */
      yield put({
        type: "FETCH_TASKS_SUCCEEDED",
        payload: { tasks: data },
      });
    } catch (e) {
      yield put({
        type: "FETCH_TASKS_FAILED",
        payload: { error: e.message },
      });
    }
  }
}

function* watchSomethingElse() {
  console.log("watching something else!");
}

function* handleProgressTimer({ payload, type }) {
  if (type === "TIMER_STARTED") {
    while (true) {
      yield delay(1000);
      yield put({
        type: "TIMER_INCREMENT",
        payload: { taskId: payload.taskId },
      });
    }
  }
}

function* takeLatestById(actionType, saga) {
  const channelsMap = {};

  while (true) {
    const action = yield take(actionType);
    console.log(action);
    const { taskId } = action.payload;

    if (!channelsMap[taskId]) {
      channelsMap[taskId] = channel();
      yield takeLatest(channelsMap[taskId], saga);
    }

    yield put(channelsMap[taskId], action);
  }
}

export default rootSaga;
