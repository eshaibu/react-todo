import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { array, bool, func, shape, object } from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTodoItems, deleteTodoItem } from "../../redux/actions/todo.actions";
import { Filter } from "../common/Filter";
import { TodoItem } from "./TodoItem";

/**
 * Home class declaration
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {
  state = {
    id: "",
    showDeleteAlert: false,
  };

  componentDidMount(props) {
    this.props.getTodoItems();
  }

  handleDeleteIconClick = (id) => {
    this.setState({ showDeleteAlert: true, id });
  };

  onCancelDelete = () => {
    this.setState({ showDeleteAlert: false, id: "" });
  };

  onConfirmDelete = () => {
    this.props.deleteTodoItem(this.state.id);
    this.setState((state) => {
      return { showDeleteAlert: false, id: "" };
    });
  };

  render() {
    const {
      loading,
      todoItems: { todos },
    } = this.props;
    return (
      <React.Fragment>
        <Filter />
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
                      handleDelete={this.handleDeleteIconClick}
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
          onCancel={this.onCancelDelete}
        >
          You will not be able to retrieve if you delete this todo item
        </SweetAlert>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  getTodoItems: func.isRequired,
  deleteTodoItem: func.isRequired,
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
  bindActionCreators({ getTodoItems, deleteTodoItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
