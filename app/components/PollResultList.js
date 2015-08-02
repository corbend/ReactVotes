/** @jsx React.DOM */

var React = require('react');
var PollResultListRow = require('./PollResultListRow');
var Navigation = require('react-router').Navigation;
var ReactFireMixin = require('reactfire');


module.exports = React.createClass({
	mixins: [Navigation, ReactFireMixin],
	contextTypes: {
        dbName: React.PropTypes.string.isRequired,
        rootUrl: React.PropTypes.string.isRequired
    },
	getInitialState: function() {
		return {
			questions: [],
			dirty: false
		};
	},
	componentWillMount: function() {
		this.dbRef = new Firebase(this.context.rootUrl + this.context.dbName + "/" + this.props.params.id);
		this.bindAsObject(this.dbRef, 'entity');
	},
	componentDidUpdate: function(prevProps, prevState) {

		if (!this.state.dirty && prevProps.entity && 
			prevProps.entity.questions) {

			this.state.dirty = true;

			this.setState({
				questions: prevState.entity.questions,
				dirty: true
			});
		}
	}, 
	componentDidUnmount: function() {
		this.dbRef.off();
	},
	cancelSession: function() {
		this.transitionTo('/polls');
	},
	render: function() {
		var name = this.state.entity && this.state.entity.name;
		var pollsCount = (this.state.entity && this.state.entity.polls) || 0;
		var questions = (this.state.entity && this.state.entity.questions) || [];

		return (
			<div className="container">
				<div className="row">
					<div className="panel panel-info">
						<div className="panel-heading">Results of poll: {name}</div>
						<div className="panel-body">
							<h1>People vote: {pollsCount}</h1>
							<ul className="list-group">
								{questions.map(function(question, index) {
									return (
										<PollResultListRow key={index} entity={question}/>
									)
								})}
							</ul>
						</div>
						<div className="panel-footer">
							<button className="btn btn-primary" onClick={this.cancelSession}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
});