/** @jsx React.DOM */
var socketService = new SocketService();

var Comment = React.createClass({displayName: 'Comment',
	render: function() {
		return (
			React.DOM.div( {className:"comment"}, 
				React.DOM.h2( {className:"commentAuthor"}, this.props.author),
				React.DOM.span(null, this.props.children.toString())
			)
			);
	}
});

var CommentBox = React.createClass({displayName: 'CommentBox',
	requestComments: function() {
		this.setState({data: []});
		var socket = this.props.socketService;

		socket.sendRequest({$type: 'commentsRequested'}, function(message) {
			if (message.$type === 'dataReceived') {
				if(!message.data) return;
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
	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		comments.push(comment);
		this.setState({data: comments});
		console.log('TODO - submit comment');
	},
	getInitialState: function() {
		return {data: []};
	},
	componentWillMount: function() {
		this.requestComments();
	},
	render: function() {
		return (
			React.DOM.div( {className:"commentBox"}, 
				React.DOM.h1(null, "Comments"),
				React.DOM.input( {type:"submit", value:"Refresh", onClick:this.requestComments} ),
				CommentList( {data:this.state.data} ),
				CommentForm( {onCommentSubmit:this.handleCommentSubmit} )
			)
			);
	}
});

var CommentList = React.createClass({displayName: 'CommentList',
	render: function() {
		var commentNodes = this.props.data.map(function (comment, index) {
			return Comment( {key:index, author:comment.author}, comment.text);
		});
		return React.DOM.div( {className:"commentList"}, commentNodes);
	}
});

var CommentForm = React.createClass({displayName: 'CommentForm',
	handleSubmit: function() {
		var author = this.refs.author.getDOMNode().value.trim();
		var text = this.refs.text.getDOMNode().value.trim();
		this.props.onCommentSubmit({author: author, text: text});
		this.refs.author.getDOMNode().value = '';
		this.refs.text.getDOMNode().value = '';
		return false;
	},
	render: function() {
		return (
			React.DOM.form( {className:"commentForm", onSubmit:this.handleSubmit}, 
				React.DOM.input( {type:"text", placeholder:"Your name", ref:"author"} ),
				React.DOM.input( {type:"text", placeholder:"Say something...", ref:"text"} ),
				React.DOM.input( {type:"submit", value:"Post"} )
			)
			);
	}
});

React.renderComponent(
	CommentBox( {socketService:socketService} ),
	document.body
);
