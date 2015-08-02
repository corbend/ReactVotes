/** @jsx React.DOM */

var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
	getInitialState: function() {
		return {};
	},
	getDefaultProps: function() {
		return {type: 'text'}
	},
	componentDidMount: function() {
		this.refs['field__' + this.props.name].getDOMNode().value = "";
	},
	componentDidUpdate: function() {
		var initValue = this.props.entity && this.props.entity[this.props.name];

		if (typeof initValue !== "undefined") {
			var value = initValue;
			if (this.props.type == "date") {
				value = moment(initValue).format('MM-DD-YYYY hh:mm:ss');
			}
			this.refs['field__' + this.props.name].getDOMNode().value = value;
		}
	},
	render: function() {
		return (	
			<div className="form-group">
				<label for="name" className="col-xs-4 control-label">
					<span className="push-left">
						{this.props.options.label}
					</span> 
				</label>
				<div className="col-xs-8">
					<input type="text" ref={"field__" + this.props.name} className="form-control" id={"field__" + this.props.name} name={this.props.name} />
				</div>
			</div>
		)
	}
})