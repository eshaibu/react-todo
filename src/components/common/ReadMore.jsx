import React from "react";
import PropTypes from "prop-types";

class ReadMore extends React.Component {
  state = {
    charLimit: this.props.charLimit,
  };

  initialState = this.state;

  getReadMoreContent() {
    const { charLimit } = this.state;
    const { children, readMoreText, readLessText } = this.props;
    if (children.length > charLimit) {
      return (
        <span className="description-text">
          {children.substr(0, charLimit)} &nbsp; ...
          <span className="readMoreText" role="presentation" onClick={this.showLongText}>
            {readMoreText}
          </span>
        </span>
      );
    } else if (children.length < charLimit) {
      return <span className="description-text">{children}</span>;
    }
    return (
      <span className="description-text">
        {children} &nbsp;
        <span className="readMoreText" role="presentation" onClick={this.showShortText}>
          {readLessText}
        </span>
      </span>
    );
  }

  showLongText = () => {
    const { children } = this.props;
    this.setState({ charLimit: children.length });
    this.getReadMoreContent();
  };

  showShortText = () => {
    this.setState(this.initialState);
    this.getReadMoreContent();
  };

  render() {
    return <div className={this.props.divClass || ""}>{this.getReadMoreContent()}</div>;
  }
}

ReadMore.propTypes = {
  charLimit: PropTypes.number,
  readMoreText: PropTypes.string,
  readLessText: PropTypes.string,
  divClass: PropTypes.string,
  children: PropTypes.string.isRequired,
};

ReadMore.defaultProps = {
  charLimit: 150,
  readMoreText: "Read more",
  readLessText: "Read less",
};

export default ReadMore;
