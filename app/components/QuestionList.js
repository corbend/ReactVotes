/** @jsx React.DOM */

var React = require('react');

var QuestionListRow = require('./QuestionListRow');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			questions: [],
			dirty: false
		}
	},
	removeQuestion: function(question) {
		this.props.questions.splice(this.props.questions.indexOf(question), 1);

		this.setState({
			questions: this.props.questions
		})
	},
	componentDidUpdate: function(prevProps, prevState) {

		if (!this.state.dirty && prevProps.rows && prevProps.rows.length > 0) {
			this.state.dirty = true;
			this.setState({
				dirty: true,
				questions: prevProps.rows || []
			});
		}
	},
	render: function() {
		var self = this;

		var rows = this.state.questions.map(function(question, index) {
			return (
				<QuestionListRow key={index} entity={question} remove={self.removeQuestion.bind(null, question)}/>
			);
		});

		return (
			<ol className="list-group">
				<li className="list-group-item">
					<h4>
						Questions
					</h4>
				</li>
				{rows}
			</ol>
		);
	}
});