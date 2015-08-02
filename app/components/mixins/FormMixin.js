/** @jsx React.DOM */

var moment = require("moment");

module.exports = {
	deformatValue: function(field, oValue) {
		switch (field.props.type) {
			case "date":
				return moment(oValue).toISOString();
				break;
			default:
				return oValue;
		}
	},
	serializeForm: function() {
		var serializedEntity = {};

		this.props.fields.forEach(function(field) {
			var fieldRef = this.refs["field_" + field.fieldName];
			var origValue = fieldRef.getDOMNode().lastChild.lastChild.value;
			serializedEntity[field.fieldName] = this.deformatValue(fieldRef, origValue);
		}, this);

		this.setState({entity: serializedEntity});

		return serializedEntity;
	},
	validate: function() {
		var validateInfo = this.validateForm();
	}
}