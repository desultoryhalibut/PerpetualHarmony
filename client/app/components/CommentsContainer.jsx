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
    console.log('handleNewComment STATE', this.state);
    var currentComments = this.state.data;

    comment.username = auth.getToken();
    var updatedComments = currentComments.concat([comment]);
    this.setState({data: updatedComments});

    console.log('COMMENT: ', comment, 'URL: ', url);
    $.ajax({
      url: 'http://localhost:3000'+url,
      type: 'POST',
      data: JSON.stringify(comment),
      contentType: 'application/json'
    })
    .done(data => {
      console.log('Posted comment', data);
    })
    .fail(err => {
      console.log('error posting comment' , err);
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
  }

  render() {

    return (
    	<div className="commentsContainer">
	      <CommentList data={this.state.data} currentEatupComments={this.props.currentEatupComments}/>
        <br />
        <br />
	      <CommentForm onNewComment={this.handleNewComment.bind(this)} url={this.props.url}/>
	    </div>
    );

  }
}
