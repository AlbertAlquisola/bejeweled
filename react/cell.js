/** @jsx React.DOM */

app.Views.Cell = React.createClass({displayName: 'Cell',
  render: function() {
    React.DOM.div(null, 
      this.props.test
    )
  }
})