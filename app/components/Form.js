/** @jsx React.DOM */

var React = require('react');
var FormField = require("./FormField");
var FormMixin = require("./mixins/FormMixin");
  

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
			<form className="col-md-12 form-horizontal">
				{this.props.fields.map(function(field, index) {
					return (
						<FormField ref={"field_" + field.fieldName} key={index} name={field.fieldName} options={field} entity={this.props.entity} type={field.type}/>
					)
				}, self)}
				{(function() {
					switch(self.props.ok) {
						case "":
							return (false);
							break;
						default:
							return (<button className="btn btn-success" onClick={self.props.ok}>{self.props.okText}</button>)
					}
				})()}
				
			</form>	
		);
	}
});