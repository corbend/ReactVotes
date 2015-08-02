/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
	render: function() {
		return ( 
			<li className="list-group-item cleafix">
				<span className="">{this.props.entity.text}</span>
				<span className="">
					<button className="btn btn-danger" onClick={this.props.remove.bind(null, this.props.entity)}>Remove</button>
				</span>
			</li>
		)
	}
}); 