import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faEdit, faRedoAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const TodoItem = ({ todoItem }) => {
  const { title, description, completed, createdAt } = todoItem;
  return (
    <div className="todo-item">
      <h4 className="todo-title">{title}</h4>
      <p className="desc m-0">{description}</p>
      <div className="todo-footer">
        <div className="todo-actions">
          {!completed && (
            <div className="custom-tooltip">
              <FontAwesomeIcon icon={faCheckSquare} color="green" size="lg" />
              <span className="tooltiptext">Complete Todo</span>
            </div>
          )}

          {completed && (
            <div className="custom-tooltip">
              <FontAwesomeIcon icon={faRedoAlt} size="lg" />
              <span className="tooltiptext">Re-open Todo</span>
            </div>
          )}
          <div className="custom-tooltip">
            <FontAwesomeIcon icon={faEdit} color="#0652dd" size="lg" />
            <span className="tooltiptext">Complete Todo</span>
          </div>
          <div className="custom-tooltip">
            <FontAwesomeIcon icon={faTrashAlt} color="red" size="lg" />
            <span className="tooltiptext">Complete Todo</span>
          </div>
        </div>
        <div className="todo-time">{moment(createdAt).format("MMM D, YYYY")}</div>
      </div>
    </div>
  );
};
