import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import history from '../utils/history';
import { Header } from "./common/Header";
import { Todo } from "./todo/Todo";
import { CreateTodo } from "./todo/CreateTodo";
import { EditTodo } from "./todo/EditTodo";


/**
 * App class declaration
 * @class App
 * @extends {React.Component}
 */
class App extends Component {
  constructor(props) {
    super(props);

    history.listen(() => {
      console.log('route changed')
      // this.props.dispatchAction();
    });
  }

  render() {
    return (
      <Router history={history}>
        <main className="pb-5">
          <Header/>
          <Switch>
            <Route exact path="/" component={Todo} />
            <Route exact path="/todos/create" component={CreateTodo} />
            <Route exact path="/todos/:todoId/edit" component={EditTodo} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
