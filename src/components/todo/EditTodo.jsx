import React from "react";
import { Link } from "react-router-dom";
import { TitleInput } from "../common/TitleInput";
import { TextArea } from "../common/TextArea";

export const EditTodo = () => {
  return (
    <section className="todo-form-section mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 bg-white">
            <h2 className="create-todo-header m-0">Edit todo</h2>
            <form className="todo-form">
              <TitleInput onChange={() => {}} value="" />
              <TextArea error />
              <Link to="/">
                <button className="btn" type="button">
                  Save
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
