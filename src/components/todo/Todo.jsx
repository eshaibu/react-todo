import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import selective from '../../images/selective.svg'


export const Todo = () => {
  return (
    <React.Fragment>
      <section className="todo-filter-section">
        <div className="container">
          <div className="col-md-8 offset-md-2">
            <div className="todo-header row">
              <div className="col-md-9 col-sm-12 d-flex align-items-center">
                  <span className="filters-label">
                      <img
                        className="filter-icon"
                        src={selective}
                        alt="Search icon"
                        height="30"
                      />Filters:</span>
                <span className="filters">Completed</span>
                <span className="filters filters-active">Active</span>

                <select name="todo-order" className="ml-4 form-control">
                  <option value="1">Latest</option>
                  <option value="1">Oldest</option>
                </select>
              </div>
              <div className="col-md-3 col-sm-12 text-right">
                <Link to="/todos/create"
                >
                  <button className="btn add-todo-btn">Add Todo</button>
                </Link
                >
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="todo-list-section mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h2 className="create-todo-header mb-2 pl-3">Todo list</h2>
              <div className="todo-item">
                <h4 className="todo-title">Never ending story</h4>
                <p className="desc m-0">
                  Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Quod non fugiat odit officiis assumenda vel,
                  facere eius...
                </p>
                <div className="todo-footer">
                  <div className="todo-actions">
                    <FontAwesomeIcon icon={faCheckCircle} color="green" size="lg"/>
                    <FontAwesomeIcon icon={faEdit} color="#0652dd" size="lg" />
                    <FontAwesomeIcon icon={faTrashAlt} color="red" size="lg" />
                  </div>
                  <div className="todo-time">2 days ago</div>
                </div>
              </div>
              <div className="todo-item">
                <h4 className="todo-title">Never ending story</h4>
                <p className="desc m-0">
                  Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Quod non fugiat odit officiis assumenda vel,
                  facere eius...
                </p>
                <div className="todo-footer">
                  <div className="todo-actions">
                    sgdgsd
                  </div>
                  <div className="todo-time">2 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
