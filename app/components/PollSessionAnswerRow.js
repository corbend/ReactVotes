	
var React = require('react');

module.exports = React.createClass({
	componentDidUpdate: function(prevProps, prevState) {
 
		if (typeof prevProps.selected !== "undefined") {
			React.findDOMNode(this.refs['checkbox']).checked = prevProps.selected ? "checked": "";
		}
	},	
	render: function() {
		return (
			<li className="list-group-item">
				<input ref="checkbox" type="checkbox" onClick={this.props.onSelect}/>
				{this.props.entity.text}
			</li>
		)
	}
});