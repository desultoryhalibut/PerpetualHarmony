import React from 'react';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

import auth from '../auth';

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

  handleNewComment(comment, url) {
    // console.log('handleNewComment STATE', this.state);
    // var currentComments = this.state.data;

    comment.username = auth.getToken();
    // var updatedComments = currentComments.concat([comment]);
    // this.setState({data: updatedComments});
    console.log('COMMENT: ', comment)
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(comment),
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(err) {
        console.log('ERR', err, 'posted to: ', url);
      }.bind(this)
    });
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
        console.log(this.props.url);
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
	      <CommentForm onNewComment={this.handleNewComment} url={this.props.url}/>
	    </div>
    );
  }
}