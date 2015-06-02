var React = require("react/addons");


var CommentBox = require("./commentBox.jsx");


React.render(
  <CommentBox url="http://localhost:3000/comments.json" pollInterval={10000} />,
  document.body
);
