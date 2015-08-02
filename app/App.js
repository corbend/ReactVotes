/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
 
var PollListPanel = require('./components/PollListPanel');
var PollCreateForm = require('./components/PollCreateForm');
var PollEditForm = require('./components/PollEditForm');
var PollSessionPanel = require('./components/PollSessionPanel');
var PollResultList = require('./components/PollResultList');

var App = React.createClass({
	childContextTypes: {
        dbName: React.PropTypes.string,
        entityId: React.PropTypes.string,
        rootUrl: React.PropTypes.string
    },
    getChildContext: function() {
    	var entityId = this.props.params && this.props.params.id && this.props.params.id.toString();

        return { 
        	rootUrl: "https://dazzling-heat-916.firebaseio.com/",
        	dbName: "polls",
        	entityId: entityId
        };
    },
	render: function() {
		return (
			<div>
				<RouteHandler/>
			</div>
		);
	}
});


// var DbView = React.createClass({
// 	// childContextTypes: {
//  //        dbName: React.PropTypes.string,
//  //        entityId: React.PropTypes.string
//  //    },
//  //    getChildContext: function() {
//  //    	var entityId = this.props.params.id && this.props.params.id.toString();

//  //        return { 
//  //        	dbName: "polls",
//  //        	entityId: entityId
//  //        };
//  //    },
// 	render: function() {
// 		return (
// 			<div className="wrapper">
// 				{this.props.children}
// 			</div>
// 		)
// 	}
// });


// var PollListPanelDB = React.createClass({
// 	contextTypes: {
//         dbName: React.PropTypes.string
//     },
// 	render: function() {
// 		return (
// 			<DbView params={this.props.params}>
// 				<PollListPanel />
// 			</DbView>
// 		)
// 	}
// });
 
// var PollCreateFormDB = React.createClass({
// 	contextTypes: {
//         dbName: React.PropTypes.string
//     },
// 	render: function() {
// 		return (
// 			<DbView params={this.props.params}>
// 				<PollCreateForm context/>
// 			</DbView>
// 		)
// 	}
// })

// var PollEditFormDB = React.createClass({
// 	contextTypes: {
//         entityId: React.PropTypes.string
//     },
// 	render: function() {
// 		return (
// 			<DbView params={this.props.params}>
// 				<PollEditForm />
// 			</DbView>
// 		)
// 	}
// })

// var PollSessionPanelDB = React.createClass({
// 	contextTypes: {
//         entityId: React.PropTypes.string
//     },
// 	render: function() {
// 		return (
// 			<DbView params={this.props.params}>
// 				<PollSessionPanel />
// 			</DbView>
// 		)
// 	}
// })

  
var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="polls" path="/polls" handler={PollListPanel}></Route>
		<Route name="create" path="/polls/create" handler={PollCreateForm} />
		<Route name="edit" path="/polls/:id/edit" handler={PollEditForm} />
		<Route name="session" path="/polls/:id/session" handler={PollSessionPanel} />
		<Route name="results" path="/polls/:id/results" handler={PollResultList} />
		<DefaultRoute handler={PollListPanel}/>
	</Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.body);
});