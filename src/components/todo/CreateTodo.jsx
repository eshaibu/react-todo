import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { func, object } from "prop-types";
import { createTodoItem } from "../../redux/actions/todo.actions";
import { TitleInput } from "../common/TitleInput";
import { TextArea } from "../common/TextArea";

/**
 * CreateTodo class declaration
 * @class CreateTodo
 * @extends {React.Component}
 */
export class CreateTodo extends React.Component {
  state = {
    title: "",
    description: "",
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.createTodoItem(this.state);
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
              <h2 className="create-todo-header m-0">Create new todo</h2>
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
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

CreateTodo.propTypes = {
  createTodoItem: func.isRequired,
  errorState: object,
};

const mapStateToProps = (state) => ({
  errorState: state.todoReducer.error.data,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ createTodoItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTodo);
