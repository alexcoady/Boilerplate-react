var React = require("react/addons");


var Comment = require("./comment.jsx");


var CommentList = React.createClass({


  render: function () {

    return (
      <div className="CommentList">
        <Comment author="Alex Coady">Here be a comment</Comment>
        <Comment author="Joe Bloggs">Here be another comment</Comment>
      </div>
    );
  }
});


module.exports = CommentList;
