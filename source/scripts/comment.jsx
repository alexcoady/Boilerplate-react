var React = require("react/addons");


var Comment = React.createClass({


  render: function () {

    return (
      <div className="Comment">
        <h2 className="CommentAuthor">{this.props.author}</h2>
        {this.props.children}
      </div>
    );
  }
});


module.exports = Comment;
