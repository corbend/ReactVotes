/** @jsx React.DOM */

var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var ListRow = require("./PollListRow");
var PollEditForm = require('./PollEditForm');
var PollSessionPanel = require('./PollSessionPanel');

   
module.exports = React.createClass({
	mixins: [ReactFireMixin],
	contextTypes: {
        dbName: React.PropTypes.string.isRequired,
        rootUrl: React.PropTypes.string.isRequired
    },
	getInitialState: function() {
		return {rows: []};
	},
	componentWillMount: function() {
		var dbUrl = this.context.rootUrl + this.context.dbName;
		this.db = new Firebase(dbUrl);
		this.bindAsArray(this.db, "rows");
	},
	componentDidMount: function() {

		console.log("TEST ENTITY=", this.state.pollEntity);
		console.log("TEST ROWS=", this.state.rows);
	},
	componentDidUpdate: function(prevProps, prevState) {
		console.log("PRE=", prevProps, ",PRE STATE=", prevState);
	},
	componentWillUnmount: function() {
		console.log("unmount---");
  		this.db.off();
	},
	removePoll: function(key) {
		this.firebaseRefs['rows'].child(key).remove();
	},
	render: function() {
		var self = this;
		return (
			<div className="col-xs-12">
				<ul className="list-group">
					<li className="list-group-item">
						<h3>All available polls</h3>
					</li>
					{this.state.rows.map(function(entity, index) {
						return (
							<ListRow key={index} entity={entity} onRemove={self.removePoll.bind(null, entity['.key'])}/>
						)
					})}
				</ul>
			</div>
		);
	}
})