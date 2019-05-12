import React, { Component } from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import { func, shape, string, object } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faEdit,
  faRedoAlt,
  faTrashAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import history from "../utils/history";
import { clearError } from "../redux/actions/todo.actions";
import { Header } from "./common/Header";
import Home from "./todo/Home";
import CreateTodo from "./todo/CreateTodo";
import EditTodo from "./todo/EditTodo";

library.add(faSpinner, faCheckSquare, faEdit, faRedoAlt, faTrashAlt);

/**
 * App class declaration
 * @class App
 * @extends {React.Component}
 */
export class App extends Component {
  constructor(props) {
    super(props);

    history.listen(() => {
      this.props.clearError();
    });
  }

  render() {
    const { triggeredBy: errorTrigger } = this.props.errorState;
    return (
      <Router history={history}>
        {errorTrigger !== "SERVER_DOWN" ? (
          <main className="pb-5">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/todos/create" component={CreateTodo} />
              <Route exact path="/todos/:todoId/edit" component={EditTodo} />
              <Redirect to="/" />
            </Switch>
          </main>
        ) : (
          <div className="row h-100 justify-content-center align-items-center">
            <h1 className="font-weight-bold">APP DOWN. TRY LATER</h1>
          </div>
        )}
      </Router>
    );
  }
}

App.propTypes = {
  clearError: func.isRequired,
  errorState: shape({
    data: object,
    triggeredBy: string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  errorState: state.todoReducer.error,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ clearError }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
