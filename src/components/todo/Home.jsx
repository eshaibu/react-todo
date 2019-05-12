import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { array, bool, func, shape, object } from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTodoItems, deleteTodoItem, updateTodoItem } from "../../redux/actions/todo.actions";
import { Filter } from "../common/Filter";
import { TodoItem } from "./TodoItem";
import { getSortQuery } from "../../utils/helpers";

/**
 * Home class declaration
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {
  state = {
    sort: "LATEST",
    completeStatus: false,
    id: "",
    showDeleteAlert: false,
    showCompleteAlert: false,
    showReOpenAlert: false,
  };

  componentDidMount(props) {
    this.props.getTodoItems();
  }

  queryTodoItems = (event) => {
    this.setState({ sort: event.target.value });
    const query = getSortQuery(event.target.value);
    this.props.getTodoItems({ ...query, completedStatus: this.state.completeStatus });
  };

  toggleCompleteStatus = () => {
    this.setState({ sort: "LATEST" });
    this.props.getTodoItems({ completedStatus: !this.state.completeStatus });
    this.setState({ completeStatus: !this.state.completeStatus });
  };

  handleIconClick = (type, id) => {
    if (type === "delete") {
      this.setState({ showDeleteAlert: true, id });
    }
    if (type === "complete") {
      this.setState({ showCompleteAlert: true, id });
    }
    if (type === "re-open") {
      this.setState({ showReOpenAlert: true, id });
    }
  };

  closeAlert = () => {
    this.setState({
      showDeleteAlert: false,
      showCompleteAlert: false,
      showReOpenAlert: false,
      id: "",
    });
  };

  onConfirmDelete = () => {
    this.props.deleteTodoItem(this.state.id);
    this.setState((state) => {
      return { showDeleteAlert: false, id: "" };
    });
  };

  onConfirmCompleteTodo = () => {
    this.props.updateTodoItem({ completed: true }, this.state.id);
    this.setState((state) => {
      return { showCompleteAlert: false, id: "" };
    });
  };

  onConfirmReOpenTodo = () => {
    this.props.updateTodoItem({ completed: false }, this.state.id);
    this.setState((state) => {
      return { showReOpenAlert: false, id: "" };
    });
  };

  render() {
    const {
      loading,
      todoItems: { todos },
    } = this.props;
    return (
      <React.Fragment>
        <Filter
          completeStatus={this.state.completeStatus}
          toggleCompleteStatus={this.toggleCompleteStatus}
          queryTodoItems={this.queryTodoItems}
          todoOrderSelected={this.state.sort}
        />
        <section className="todo-list-section mt-3">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h2 className="create-todo-header mb-2 pl-3">Todo list</h2>
                {loading && <FontAwesomeIcon icon="spinner" size="6x" />}

                {!loading && todos.length === 0 && (
                  <div className="alert alert-danger" role="alert">
                    Todo list is empty
                  </div>
                )}

                {!loading &&
                  todos.length > 0 &&
                  todos.map((todo, index) => (
                    <TodoItem
                      key={index}
                      todoItem={todo}
                      completeStatus={this.state.completeStatus}
                      handleIconClick={this.handleIconClick}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>

        <SweetAlert
          warning
          showCancel
          show={this.state.showDeleteAlert}
          closeOnClickOutside={false}
          confirmBtnText="Yes, delete"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          cancelBtnCssClass="cancel-button"
          title="Are you sure?"
          onConfirm={this.onConfirmDelete}
          onCancel={this.closeAlert}
        >
          You will not be able to retrieve if you delete this todo item
        </SweetAlert>

        <SweetAlert
          warning
          showCancel
          show={this.state.showCompleteAlert}
          closeOnClickOutside={false}
          confirmBtnText="Yes"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="default"
          cancelBtnCssClass="cancel-button"
          title="Are you sure?"
          onConfirm={this.onConfirmCompleteTodo}
          onCancel={this.closeAlert}
        >
          Are you sure you want to complete this todo item
        </SweetAlert>

        <SweetAlert
          warning
          showCancel
          show={this.state.showReOpenAlert}
          closeOnClickOutside={false}
          confirmBtnText="Yes"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="default"
          cancelBtnCssClass="cancel-button"
          title="Are you sure?"
          onConfirm={this.onConfirmReOpenTodo}
          onCancel={this.closeAlert}
        >
          Are you sure you want to re-open this todo item
        </SweetAlert>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  getTodoItems: func.isRequired,
  deleteTodoItem: func.isRequired,
  updateTodoItem: func.isRequired,
  loading: bool.isRequired,
  todoItems: shape({
    todos: array,
    paginationMeta: object,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  todoItems: state.todoReducer.todoItems,
  loading: state.todoReducer.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getTodoItems, deleteTodoItem, updateTodoItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
