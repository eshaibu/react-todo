import React from "react";
import { Link } from "react-router-dom";
import selective from "../../images/selective.svg";
import { bool, func, string } from "prop-types";

export const Filter = (props) => {
  const { todoOrderSelected, completeStatus, queryTodoItems, toggleCompleteStatus } = props;
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
              <div
                className={`filters ${completeStatus ? "filters-active" : ""}`}
                onClick={completeStatus ? () => {} : toggleCompleteStatus}
              >
                Completed
              </div>
              <div
                className={`filters ${!completeStatus ? "filters-active" : ""}`}
                onClick={!completeStatus ? () => {} : toggleCompleteStatus}
              >
                Active (Open)
              </div>

              <select
                name="todo-order"
                className="ml-4 form-control"
                onChange={queryTodoItems}
                value={todoOrderSelected}
              >
                <option value="LATEST">Latest</option>
                <option value="OLDEST">Oldest</option>
                <option value="TiTLE_ASC">Tile - Ascending</option>
                <option value="TiTLE_DESC">Tile - Descending</option>
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

Filter.propTypes = {
  queryTodoItems: func.isRequired,
  toggleCompleteStatus: func.isRequired,
  completeStatus: bool.isRequired,
  todoOrderSelected: string,
};
