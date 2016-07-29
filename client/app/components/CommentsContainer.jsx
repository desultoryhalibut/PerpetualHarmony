import React from 'react';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

export default class CommentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: 1, author: "Christine", text: "This is one comment"},
        {id: 2, author: "Carlos", text: "This is a comment too"},
        {id: 3, author: "Quin", text: "This is another comment"},
        {id: 4, author: "Tabitha", text: "This too!"}
      ]
    }

  }

  render() {
    return (
    	<div>
	      <div className="commentsContainer">
	        Hello! I am inside the CommentsContainer component.
	      </div>
	      <h2>Comments</h2>
	      <CommentList data={this.state.data}/>
	      <CommentForm />
	    </div>
    );
  }
}