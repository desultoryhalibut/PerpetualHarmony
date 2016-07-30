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

  getComments(){
    console.log('getComments() invoked', this.props.url);
    $.ajax({
      url: this.props.url,
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }.bind(this)
    });
  }

  componentDidMount() {
    this.getComments();
    //setInterval(this.getComments, 10000).bind(this);
  }

  render() {
    return (
    	<div className="commentsContainer">
	      <h2>Comments</h2>
	      <CommentList data={this.state.data}/>
	      <CommentForm />
	    </div>
    );
  }
}