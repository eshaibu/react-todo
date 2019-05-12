import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { array, bool, func, shape, object } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTodoItems } from "../../redux/actions/todo.actions";
import { Filter } from "../common/Filter";
import { TodoItem } from "./TodoItem";

/**
 * Home class declaration
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {
  componentDidMount(props) {
    this.props.getTodoItems();
  }

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
                  todos.map((todo, index) => <TodoItem key={index} todoItem={todo} />)}
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  getTodoItems: func.isRequired,
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ getTodoItems }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
