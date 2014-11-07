/** @jsx React.DOM */

app.Views.Cell = React.createClass({displayName: 'Cell',
  render: function() {
    var backgroundColor = {backgroundColor : this.props.cell.value}
    return (
        React.DOM.div({className: "cell", id: this.props.cell.position, style: backgroundColor}
        )
    )
  }
})