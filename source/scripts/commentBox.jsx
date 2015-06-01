var React = require("react/addons");

var CommentList = require("./commentList.jsx");
var CommentForm = require("./commentForm.jsx");


var CommentBox = React.createClass({


  render: function () {

    return (
      <div className="CommentBox">
        <h1>Comments</h1>
          <div className="CommentBox-commentList"><CommentList /></div>
          <div className="CommentBox-commentForm"><CommentForm /></div>
      </div>
    );
  }
});


module.exports = CommentBox;
