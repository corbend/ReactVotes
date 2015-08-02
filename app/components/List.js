/** @jsx React.DOM */

var React = require('react');
var PollSessionAnswerRow = require("./PollSessionAnswerRow");


module.exports = React.createClass({
	getInitialState: function() {
		return {
			questions: []
		}
	},
	getDefaultProps: function() {
		return {
			rows: []
		}
	},
	unselectAll: function(ignore) {
		this.props.rows.forEach(function(row, index) {
			if (ignore !== row) {
				this.refs["answer_checkbox_" + index].props.selected = false;
			}
		}, this)
	},
	onSelectItem: function(checkedAnswer) {

		this.unselectAll(checkedAnswer);
		var indx = this.props.rows.indexOf(checkedAnswer);

		if (typeof checkedAnswer === "undefined") {
			alert("Select an answer for question");
			return;
		}

		checkedAnswer.idx = indx;
		this.props.checkAnswerLink(checkedAnswer);

	},
	render: function() {
		var self = this;
		return (
			<ul className="col-md-12 list-group">
				<li className="list-group-item"><h4>Please pick your answer</h4></li>
				{this.props.rows.map(function(question, index) {
					return (
						<PollSessionAnswerRow ref={"answer_checkbox_" + index} key={index} entity={question} selected={question.selected} onSelect={self.onSelectItem.bind(null, question)}/>
					)
				})}
			</ul>
		)
	}
});