import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bool, func, object } from "prop-types";
import { getTodoItem, updateTodoItem } from "../../redux/actions/todo.actions";
import { TitleInput } from "../common/TitleInput";
import { TextArea } from "../common/TextArea";

/**
 * EditTodo class declaration
 * @class EditTodo
 * @extends {React.Component}
 */
export class EditTodo extends React.Component {
  state = {
    title: "",
    description: "",
    updateFieldFromPropsFlag: true,
    todoId: "",
  };

  componentDidMount(props) {
    if (this.props.match.params && this.props.match.params.todoId) {
      this.setState({ todoId: this.props.match.params.todoId });
      this.props.getTodoItem(this.props.match.params.todoId);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { loadingState, todoItemState } = nextProps;
    if (prevState.updateFieldFromPropsFlag && !loadingState && todoItemState) {
      return {
        title: todoItemState.title,
        description: todoItemState.description,
        updateFieldFromPropsFlag: false,
      };
    }
    return null;
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description, todoId } = this.state;
    this.props.updateTodoItem({ title, description }, todoId);
  };

  render() {
    const { title, description } = this.state;
    const { errorState } = this.props;
    const errors = errorState ? errorState.errors : null;
    return (
      <section className="todo-form-section mt-5 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 bg-white">
              <h2 className="create-todo-header m-0">Update todo</h2>
              <form autoComplete="off" className="todo-form" onSubmit={this.handleFormSubmit}>
                <TitleInput
                  onChange={this.onChange}
                  value={title}
                  error={errors && errors.title ? errors.title[0] : ""}
                />
                <TextArea
                  onChange={this.onChange}
                  value={description}
                  error={errors && errors.description ? errors.description[0] : ""}
                />
                <button className="btn" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

EditTodo.propTypes = {
  updateTodoItem: func.isRequired,
  getTodoItem: func.isRequired,
  errorState: object,
  todoItemState: object,
  loadingState: bool.isRequired,
};

const mapStateToProps = (state) => ({
  errorState: state.todoReducer.error.data,
  todoItemState: state.todoReducer.todoItem,
  loadingState: state.todoReducer.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateTodoItem, getTodoItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodo);
