/** @jsx React.DOM */

var lodash = require('lodash');
var React = require('react');
var Form = require('./Form');
var LocalForm = require('./LocalForm');
var QuestionList = require('./QuestionList');
var Navigation = require('react-router').Navigation;
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');


module.exports = React.createClass({
	mixins: [Navigation, ReactFireMixin],
	contextTypes: {
        dbName: React.PropTypes.string.isRequired,
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
				{fieldName: 'text', label: 'Text', type: 'text'}
			],
			questions: [],
			entity: {questions: []},
			dirty: false
		}
	},
	componentWillMount: function() {
		var dbUrl = this.context.rootUrl + this.context.dbName + "/" + this.props.params.id
		this.entityRef = new Firebase(dbUrl);
		this.bindAsObject(this.entityRef, 'entity', function(e) {
			console.error(e);
		});
	},
	componentDidUpdate: function(prevProps, prevState) {

		if (!this.state.dirty) {
			this.setState({
			 	questions: this.state.entity.questions || []
			});

			this.state.dirty = true;
		}
	},
	componentWillUnmount: function() {
		this.entityRef.off();
	},
	addQuestion: function() {
		var question = this.refs.questionForm.serializeForm();

		this.state.questions.push(lodash.clone(question));
		this.state.entity.questions = this.state.questions;

		this.setState({
			questions: this.state.questions,
			entity: this.state.entity
		});
	}, 
	updateQuiz: function() {

		var serializedForm = this.refs.mainForm.serializeForm();
		serializedForm.questions = this.state.questions;
		this.firebaseRefs['entity'].update(serializedForm);
		this.goBack();
	},
	cancelCreate: function() {
		this.goBack();
	}, 
	render: function() {

		var questions = this.state.entity && this.state.entity.questions;

		return (
			<div className="container">
				<div className="row">
					<div className="panel panel-info">
						<div className="panel-heading">
							<h4>Create new poll</h4>
						</div>
						<div className="panel-body container">
							<div className="col-xs-6">
								<Form ref="mainForm" title="" entity={this.state.entity} fields={this.state.questionFormFields} ok={""}/>
								<LocalForm ref="questionForm" title="" fields={this.state.answerFormFields} ok={this.addQuestion} okText="Добавить"/>
							</div>
							<div className="col-xs-6">
								<QuestionList rows={questions}/>
							</div>
						</div>
						<div className="panel-footer">
							<button className="btn btn-default" onClick={this.updateQuiz}>Update</button>
							<button className="btn btn-primary" onClick={this.cancelCreate}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
});