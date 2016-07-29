import React from 'react';

import Comment from './Comment';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="commentList">
        <Comment author="Jim">Comment!!!</Comment>
        <Comment author="Bill">*more* comment!</Comment>
      </div>
    );
  }
}
