var React = require("react/addons");
var $ = require("jquery");

var CommentList = require("./commentList.jsx");
var CommentForm = require("./commentForm.jsx");


var CommentBox = React.createClass({


  getInitialState: function () {

    return { data: [] };
  },


  loadCommentsFromServer: function () {

    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: function ( data ) {
        this.setState({ data: data });
      }.bind(this),
      error: function ( xhr, status, err ) {
        console.log( this.props.url, status, err.toString() );
      }.bind(this)
    });
  },


  componentDidMount: function () {

    this.loadCommentsFromServer();
    setInterval( this.loadCommentsFromServer, this.props.pollInterval );
  },


  handleCommentSubmit: function ( comment ) {

    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({ data: newComments });

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


  render: function () {

    return (
      <div className="CommentBox">
        <h1>Comments</h1>
        <div className="CommentBox-commentList"><CommentList data={this.state.data} /></div>
        <div className="CommentBox-commentForm"><CommentForm onCommentSubmit={this.handleCommentSubmit} /></div>
      </div>
    );
  }
});


module.exports = CommentBox;
