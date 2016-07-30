import React from 'react';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="comment">
        <div className="author"> <strong>{this.props.author}</strong></div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
