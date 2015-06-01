/** @jsx React.DOM */

var React = require("react/addons");

var CommentBox = React.createClass({
  render: function () {

    return (
      <div className="CommentBox">
        Hello, World! I am a comment box.
      </div>
    );
  }
});


module.exports = CommentBox;
