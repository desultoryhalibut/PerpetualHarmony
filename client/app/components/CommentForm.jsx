import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var comment = this.state.comment.trim();
    if (!comment) {
      return;
    }
    // TODO: send request to the server
    this.setState({comment: ''});
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Leave a comment..."
          value={this.state.comment}
          onChange={this.handleComment}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
