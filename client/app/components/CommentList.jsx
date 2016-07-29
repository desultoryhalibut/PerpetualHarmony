import React from 'react';

import Comment from './Comment.jsx';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('data: ',this.props.data);
    var comments = this.props.data.map(function(comment) {
          return (
            <Comment author={comment.author} key={comment.id}>
              {comment.text}
            </Comment>
          );
        });

    return (
      <div className="commentList">
        {comments}
      </div>
    );
  }
}
