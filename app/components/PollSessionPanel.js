/** @jsx React.DOM */

var React = require('react');
var Navigation = require('react-router').Navigation;
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var List = require('./List');
 

module.exports = React.createClass({
	mixins: [Navigation, ReactFireMixin],
	contextTypes: {
        entityId: React.PropTypes.string,
        dbName: React.PropTypes.string,
        rootUrl: React.PropTypes.string.isRequired
    },
	getInitialState: function() {
		return {
			checkedAnswer: null,
			questions: [],
			entity: {
				name: ''
			},
			dirty: false
		}
	},
	cancelSession: function() {
		this.goBack();
	},
	calculatePercentage: function() {

		var amounts = new Array(this.state.entity.questions.length);
		this.state.entity.answers.forEach(function(a, index) {
			if (!amounts[a.value]) {
				amounts[a.value] = 0;
			}
			amounts[a.value] += 1;
		})
		var sum = 0;
		amounts.forEach(function(a) {
			sum += a;
		})

		amounts.forEach(function(a, index) {
			this.state.entity.questions[index].results = Math.floor((a/sum) * 100);
		}, this);

	},
	vote: function() {

		var answerIndex = this.state.entity.questions.indexOf(this.state.checkedAnswer);

		if (answerIndex != -1) {
			if (!this.state.entity.answers) {
				this.state.entity.answers = [];	
			}

			this.state.entity.answers.push({
				value: answerIndex
			})

			this.calculatePercentage();

			var toUpdate = {
				answers: this.state.entity.answers,
				polls: (this.state.entity.polls || 0) + 1,
				questions: this.state.entity.questions
			}

			this.firebaseRefs['entity'].update(toUpdate);
		};

		//TODO - перекидываем на результаты
		this.transitionTo('/polls/' + this.state.entity['.key'] + "/" + 'results');
	},
	componentWillMount: function() {

		var baseUrl = this.context.rootUrl + this.context.dbName;
		var dbUrl = baseUrl + "/" + this.props.params.id;
		//this.dbRef = new Firebase(this.context.rootUrl + this.context.dbName);
		this.entityRef = new Firebase(dbUrl);
		this.bindAsObject(this.entityRef, 'entity', function(e) {
			console.error("error on firebase=");
			console.error(e);
		});

	},
	componentDidUpdate: function(prevProps, prevState) {
		if (!this.state.dirty && prevState.entity && prevState.entity.questions) {
			this.state.dirty = true;
			this.setState({
				questions: prevState.entity.questions || [],
				dirty: true
			})
		}
	},
	componentDidUnmount: function() {
		this.entityRef.off();
	},
	saveCheckedAnswer: function(checkedAnswer) {
		this.setState({
			checkedAnswer: checkedAnswer
		})
	},
	render: function() {

		var name = this.state.entity && this.state.entity.name;
		var questions = this.state.entity && this.state.entity.questions;

		return (
			<div className="container">
				<div className="row">
					<div className="panel panel-info">
						<div className="panel-heading">{name}</div>
						<div className="panel-body">
							<div className="container">
								<List ref="answerList" rows={questions} checkAnswerLink={this.saveCheckedAnswer} entity={this.state.entity}>
								</List>
							</div>
						</div>
						<div className="panel-footer">
							<button className="btn btn-success" onClick={this.vote}>
								Vote
							</button>
							<button className="btn btn-primary" onClick={this.cancelSession}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
});