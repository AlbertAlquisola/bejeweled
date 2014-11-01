/** @jsx React.DOM */

app.Views.Cell = React.createClass({displayName: 'Cell',
  render: function() {
    return (
      React.DOM.div({className: "cell", id: this.props.id}, 
        this.props.value
      )
    )
  }
})