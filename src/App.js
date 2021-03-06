import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask, editTask, fetchTasks, filterTasks } from "./actions";
import FlashMessage from "./components/FlashMessage";
import TasksPage from "./components/TasksPage";
import {
  getFilteredTasks,
  getGroupedAndFilteredTasks,
  getGroupedTask,
} from "./reducers";

/* 
  Get data from the Redux store via connect.
  Use mapStateToProps to pass only relevant data to the component being connected.
  Render presentational components.
*/

class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };
  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }));
  };
  onSearch = (searchTerm) => {
    this.props.dispatch(filterTasks(searchTerm));
  };
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

  render() {
    return (
      <div className="container">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main-content">
          {/* tasks will be available via props after connected to the store */}
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onStatusChange={this.onStatusChange}
            isLoading={this.props.isLoading}
            onSearch={this.onSearch}
          />
        </div>
      </div>
    );
  }
}

/* 
  The state argument is the entire contents of the Redux store, 
  specifically the result of calling getState on the store instance.
*/
function mapStateToProps(state) {
  /* 
  The return value of mapStateToProps is passed into the App component as props,
   which is why render can reference this.props.tasks. 
  */
  const { isLoading, error, timer } = state.tasks;

  return {
    tasks: getGroupedAndFilteredTasks(state),
    isLoading,
    error,
    timer,
  };
}

export default connect(mapStateToProps)(App);
