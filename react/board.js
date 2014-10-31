/** @jsx React.DOM */

app.Views.BejeweledBoard = React.createClass({displayName: 'BejeweledBoard',
  render: function() {
    React.DOM.div(null, 
      app.Views.Cell({test: this.props.test})
    )
  }
})