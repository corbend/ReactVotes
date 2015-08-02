/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
	render: function() {

		var currentValue = this.props.entity.results;

		var progressStyle = {
			width: this.props.entity.results + "%"
		}

		return (
			<li className="list-group-item">
				<div className="whell">{this.props.entity.text}</div>
				<div className="progress">
				  <div className="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow={currentValue} aria-valuemin="0" aria-valuemax="100" style={progressStyle}>
				    {this.props.entity.results}%
				  </div>
				</div>
			</li>
		);
	}
});