/** @jsx React.DOM */

var React = require('react');
var Navigation = require('react-router').Navigation;
var PollList = require('./PollList');
  
module.exports = React.createClass({
	mixins: [Navigation],
	createPoll: function() {
		this.transitionTo('/polls/create');
	},
	render: function() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h1>Welcome to Poll Manager</h1>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<PollList dbName="polls"/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 text-center">
						<button className="btn btn-success" onClick={this.createPoll}>Create New Poll</button>
					</div>
				</div>
			</div>
		);
	}
});