import React from 'react';
import { Link } from 'react-router-dom';

export const CreateTodo = () => {
  return (
    <section className="todo-form-section mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 bg-white">
            <h2 className="create-todo-header m-0">Create new todo</h2>
            <form className="create-todo-form">
              <input type="text" placeholder="Title"/>
              <label/>
              <textarea
                placeholder="Todo description goes here..."
              />
              <Link to="/">
                <button className="btn" type="button">Create</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
