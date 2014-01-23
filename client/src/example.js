/** @jsx React.DOM */
var socketService = new SocketService();

var CommentBox = React.createClass({
	requestComments: function () {
		this.setState({data: []});
		var socket = this.props.socketService;

		socket.sendRequest({$type: 'commentsRequested'}, function (message) {
			if (message.$type === 'dataReceived') {
				if (!message.data) return;
				this.state.data.push(message.data);
			}
			if (message.$type === 'dataCompleted') {
				socket.requestComplete(message.$id);
				this.setState({data: this.state.data});
			}
			if (message.$type === 'error') {
				socket.requestComplete(message.$id);
			}
		}.bind(this));
	},
	handleCommentSubmit: function (comment) {
		var comments = this.state.data;
		comments.push(comment);
		this.setState({data: comments});
		console.log('TODO - submit comment');
	},
	getInitialState: function () {
		return {data: []};
	},
	componentWillMount: function () {
		this.requestComments();
	},
	render: function () {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<input type="submit" value="Refresh" onClick={this.requestComments} />
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
			);
	}
});

var Comment = React.createClass({
	render: function () {
		return (
			<div className="comment">
				<h2 className="commentAuthor">{this.props.author}</h2>
				<span>{this.props.children.toString()}</span>
			</div>
			);
	}
});

var CommentList = React.createClass({
	render: function () {
		var commentNodes = this.props.data.map(function (comment, index) {
			return <Comment key={index} author={comment.author}>{comment.text}</Comment>;
		});
		return <div className="commentList">{commentNodes}</div>;
	}
});

var CommentForm = React.createClass({
	handleSubmit: function () {
		var author = this.refs.author.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		this.props.onCommentSubmit({author: author, text: text});
		this.refs.author.getDOMNode().value = '';
		this.refs.text.getDOMNode().value = '';
		return false;
	},
	render: function () {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" ref="author" />
				<input type="text" placeholder="Say something..." ref="text" />
				<input type="submit" value="Post" />
			</form>
			);
	}
});

React.renderComponent(
	<CommentBox socketService={socketService} />,
	document.body
);
