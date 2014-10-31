/** @jsx React.DOM */

app.Views.App = React.createClass({displayName: 'App',
  mixins: [Backbone.React.Component.mixin],

  render: function() {
    return (
      React.DOM.div(null, 
        app.Views.BejeweledBoard(null)
      )
    )
  }
})

React.renderComponent(app.Views.App(null), document.getElementById('bejeweled'))

