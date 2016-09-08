import React from 'react';
import Comment from './Comment.jsx';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.currentEatupComments
    }
  }

  render() {

    if (!this.props.currentEatupComments) {
      return (
        <div>Comments loading...</div>
      )
    }

    if(this.props.currentEatupComments.length) {
      var comments = this.props.currentEatupComments.map(function(comment) {
        return (
          <div>
            <strong>{comment.User.username}</strong>: {comment.comment}
          </div>
        );
      });
    } else {
      comments = <div>Be the first to comment!</div>;
    }

    return (
      <div className="commentList">
        {comments}
      </div>
    );
  }
}
