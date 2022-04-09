import * as api from "../api";

export function fetchTasksSucceeded(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEEDED",
    payload: {
      tasks,
    },
  };
}
function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}
function fetchTasksFailed(error) {
  return {
    type: "FETCH_TASKS_FAILED",
    payload: {
      error,
    },
  };
}
export function fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasksStarted());
    api
      .fetchTasks()
      .then((resp) => {
        if (new Date().getTime() % 2 === 0) {
          return setTimeout(() => {
            dispatch(fetchTasksSucceeded(resp.data));
          }, 2000);
        }
        throw new Error("Oh noes! Unable to fetch tasks!");
      })
      .catch((err) => {
        dispatch(fetchTasksFailed(err.message));
      });
  };
}

function createTaskSucceeded(task) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}
export function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    api.createTask({ title, description, status }).then((resp) => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

function editTaskSucceeded(task) {
  return {
    type: "EDIT_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}
export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    /* getState() return current state { tasks: { tasks: [], isLoading: false } } */
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);

    api.editTask(id, updatedTask).then((resp) => {
      dispatch(editTaskSucceeded(resp.data));
    });
  };
}

function getTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}
