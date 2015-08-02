/** @jsx React.DOM */

var React = require('react');
var Form = require('./Form');
var LocalForm = require('./LocalForm');
var QuestionList = require('./QuestionList');
var Navigation = require('react-router').Navigation;
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
  

var PollCreateForm = module.exports = React.createClass({
	mixins: [Navigation, ReactFireMixin],
	contextTypes: {
        dbName: React.PropTypes.string,
        rootUrl: React.PropTypes.string.isRequired
    },
	getInitialState: function() {
		return {
			questionFormFields: [
				{fieldName: 'name', label: 'Name', type: 'text'},
				{fieldName: 'tag', label: 'Tag (description)', type: 'text'},
				{fieldName: 'fromDate', label: 'Date of start', type: 'date'},
				{fieldName: 'toDate', label: 'Date of end', type: 'date'}
			],
			answerFormFields: [
				{fieldName: 'text', label: 'Text', type: "text"}
			],
			questions: []
		}
	},
	componentWillMount: function() {
		this.dbRef = new Firebase(this.context.rootUrl + this.context.dbName);
		this.bindAsArray(this.dbRef, 'rows');
	},
	createNewQuiz: function() {

		var serializedForm = this.refs.mainForm.serializeForm();
		serializedForm.questions = this.state.questions;

		this.firebaseRefs.rows.push(serializedForm);

		this.goBack();
	},
	addQuestion: function() {

		var question = this.refs.questionForm.serializeForm();
		this.state.questions.push({text: question.text});

		this.setState({
			questions: this.state.questions
		});
	},
	cancelCreate: function() {
		this.goBack();
	}, 
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="panel panel-info">
						<div className="panel-heading">
							<h4>Create new poll</h4>
						</div>
						<div className="panel-body container">
							<div className="col-xs-6">
								<Form ref="mainForm" title="" fields={this.state.questionFormFields} ok={""}/>
								<LocalForm ref="questionForm" title="" fields={this.state.answerFormFields} ok={this.addQuestion} okText="Добавить"/>
							</div>
							<div className="col-xs-6">
								<QuestionList rows={this.state.questions}/>
							</div>
						</div>
						<div className="panel-footer">
							<button className="btn btn-default" onClick={this.createNewQuiz}>Create</button>
							<button className="btn btn-primary" onClick={this.cancelCreate}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
})