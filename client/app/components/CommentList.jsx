import React from 'react';

import Comment from './Comment.jsx';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('data: props?', this.props.data);
    if(this.props.data.length) {
      var comments = this.props.data.map(function(comment) {
            return (
              <Comment author={comment.username} key={comment.id}>
                {comment.comment}
              </Comment>
            );
          });
    } else {
      comments = "Be the first to comment!";
    }

    return (
      <div className="commentList">
        {comments}
      </div>
    );
  }
}
