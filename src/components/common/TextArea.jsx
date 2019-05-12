import React from "react";
import { func, string } from "prop-types";

export const TextArea = ({ error, onChange, value }) => {
  return (
    <React.Fragment>
      <textarea
        className={`${error ? "error" : ""}`}
        onChange={onChange}
        value={value}
        placeholder="Todo description goes here..."
        aria-describedby="descriptionHelpBlock"
      />
      <small id="descriptionHelpBlock" className="form-text text-danger">
        {error && error}
      </small>
    </React.Fragment>
  );
};

TextArea.propTypes = {
  onChange: func.isRequired,
  value: string.isRequired,
  error: string,
};
