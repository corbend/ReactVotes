	
/** @jsx React.DOM */

var React = require('react');
var FormMixin = require('./mixins/FormMixin');
var FormField = require('./FormField');
 
module.exports = React.createClass({
	mixins: [FormMixin],
	getInitialState: function() {
		return {
			entity: {}
		}
	},
	render: function() {
		var self = this;
		return (
			<form className="col-md-12 form-inline well">
				{this.props.fields.map(function(field, index) {
					return (
						<FormField ref={"field_" + field.fieldName} key={index} name={field.fieldName} options={field} entity={self.state.entity}/>
					)
				})}
				<div className="form-group pull-right">
					<div className="btn btn-success" onClick={this.props.ok}>{this.props.okText}</div>
				</div>
			</form>
		)
	}
});
	