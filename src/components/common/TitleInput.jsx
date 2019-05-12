import React from "react";
import { func, string } from "prop-types";

export const TitleInput = ({ onChange, value, error }) => {
  return (
    <React.Fragment>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={onChange}
        value={value}
        aria-describedby="titleHelpBlock"
      />
      <label />
      <small id="titleHelpBlock" className="form-text text-danger input-error">
        {error && error}
      </small>
    </React.Fragment>
  );
};

TitleInput.propTypes = {
  onChange: func.isRequired,
  value: string.isRequired,
  error: string,
};
