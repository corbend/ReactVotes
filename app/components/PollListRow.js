/** @jsx React.DOM */

var moment = require('moment');
var React = require('react');
var Navigation = require('react-router').Navigation;
  
module.exports = React.createClass({
	mixins: [Navigation],
	getInitialState: function() {
		return {
			pollsCount: "-",
			fromDateFormatted: "-",
			toDateFormatted: "-",
			timeRemainingAll: "-",
			ended: null,
			timer: null
		}
	},
	startSession: function() {
		this.transitionTo('/polls/' + this.props.entity[".key"] + "/session");
	},
	editQuiz: function() {
		this.transitionTo('/polls/' + this.props.entity[".key"] + "/edit");
	},
	prepareTimers: function() {
			
		var self = this;
		var poll = this.props.entity;
		poll.toDateFormatted = moment(poll.toDate).format("DD-MM-YYYY hh:mm:ss");
		poll.fromDateFormatted = moment(poll.fromDate).format("DD-MM-YYYY hh:mm:ss");

		if (moment().isAfter(moment(poll.toDate))) {
			poll.ended = true;
		} 
 
		this.timer = setInterval(function() {

			var startTime = moment();
			var endTime = moment(poll.toDate);

			if (startTime.isAfter(endTime)) {
				self.setState({
					ended: true
				})
			} else {
				self.setState({
					ended: false
				})
			}

			self.setState({
				timeRemainingAll: endTime.from(startTime)
			});

		}, 1000);
	}, 
	componentWillUnmount: function() {
		clearInterval(this.timer);
	},
	render: function() {

		var self = this;
		var pollsCount = (this.props.entity && this.props.entity.polls) || 0;

		if (this.props.entity && !this.timer) {
			this.prepareTimers();
		}

		var RemainSpan = (function() {
			if (self.state.ended === true) {
				return (
					<span>Closed:</span>
				);
			} else if (self.state.ended === false) {
				return (
					<span>Remain:</span>
				);
			} else {
				return (
					<span></span>
				)
			}
		})()

		return (
			<li className="list-group-item">
				<div className="container">
					<div className="row poll-list-row">
						<div className="col-xs-8">
							<div className="well">
								{this.props.entity.name} 
								<span className="badge pull-right">
									{pollsCount}
								</span>
							</div>
							<div className="label label-success"> Started: {this.props.entity.fromDateFormatted}</div>
							<div className="label label-warning"> End at: {this.props.entity.toDateFormatted}</div>
							<div className="label label-danger">
								{RemainSpan}
								{this.state.timeRemainingAll}
							</div>
						</div>
						<div className="col-xs-4">
							<button className="btn btn-success" disabled={this.state.ended} onClick={this.startSession}>Take</button>
							<button className="btn btn-warning" onClick={this.editQuiz}>Edit</button>
							<button className="btn btn-danger" onClick={this.props.onRemove}>Remove</button>
						</div>
					</div>
				</div>
			</li>
		);
	}
});