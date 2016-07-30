import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default class CommentsContainer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
    	<div>
	      <div className="commentsContainer">
	        Hello! I am inside the CommentsContainer component.
	      </div>
	      <h2>Comments</h2>
	      <CommentList />
	      <CommentForm />
	    </div>
    );
  }
}