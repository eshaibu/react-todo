import React from "react";
import { Link } from "react-router-dom";
import selective from "../../images/selective.svg";

export const Filter = () => {
  return (
    <section className="todo-filter-section">
      <div className="container">
        <div className="col-md-8 offset-md-2">
          <div className="todo-header row">
            <div className="col-md-9 col-sm-12 d-flex align-items-center">
              <span className="filters-label">
                <img className="filter-icon" src={selective} alt="Filter icon" height="30" />
                Filters:
              </span>
              <span className="filters">Completed</span>
              <span className="filters filters-active">Active</span>

              <select name="todo-order" className="ml-4 form-control">
                <option value="1">Latest</option>
                <option value="1">Oldest</option>
              </select>
            </div>
            <div className="col-md-3 col-sm-12 text-right">
              <Link to="/todos/create">
                <button className="btn add-todo-btn">Add Todo</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
