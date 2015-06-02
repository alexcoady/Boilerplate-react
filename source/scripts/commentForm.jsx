var React = require("react/addons");


var CommentForm = React.createClass({


  handleSubmit: function ( ev ) {

    ev.preventDefault();
    var author = React.findDOMNode( this.refs.author ).value.trim();
    var text = React.findDOMNode( this.refs.text ).value.trim();

    if ( !author || !text ) return;

    this.props.onCommentSubmit({
      author: author,
      text: text
    });

    React.findDOMNode( this.refs.author ).value = "";
    React.findDOMNode( this.refs.text ).value = "";

    return;
  },


  render: function () {

    return (
      <form className="CommentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Your comment" ref="text" />
        <button type="submit">Post</button>
      </form>
    );
  }
});


module.exports = CommentForm;
