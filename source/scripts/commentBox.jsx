var React = require("react/addons");
var $ = require("jquery");

var CommentList = require("./commentList.jsx");
var CommentForm = require("./commentForm.jsx");


var CommentBox = React.createClass({


  getInitialState: function () {

    return { data: [] };
  },


  componentDidMount: function () {


  },


  render: function () {

    return (
      <div className="CommentBox">
        <h1>Comments</h1>
          <div className="CommentBox-commentList"><CommentList data={this.state.data} /></div>
          <div className="CommentBox-commentForm"><CommentForm /></div>
      </div>
    );
  }
});


module.exports = CommentBox;
