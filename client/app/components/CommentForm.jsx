import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  handleComment(e) {
    this.setState({ comment: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var comment = this.state.comment.trim();
    if (!comment) {
      return;
    }
    this.props.onNewComment({comment: comment}, this.props.url);
    this.setState({comment: ''});
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Leave a comment..."
          value={this.state.comment}
          onChange={this.handleComment.bind(this)}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
