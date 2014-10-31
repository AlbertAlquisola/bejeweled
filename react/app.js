/** @jsx React.DOM */

app.Views.App = React.createClass({displayName: 'App',
  mixins: [Backbone.React.Component.mixin],

  render: function() {
    return (
      React.DOM.div(null, 
        app.Views.BejeweledBoard({board: this.props.collection})
      )
    )
  }
})

React.renderComponent(app.Views.App({collection: app.GameCreator.Board}), document.getElementById('bejeweled'))

