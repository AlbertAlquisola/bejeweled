/** @jsx React.DOM */

app.Views.BejeweledBoard = React.createClass({displayName: 'BejeweledBoard',
  render: function() {
    var board;

    if (this.props.board) {
      board = this.props.board.map(function(cell) {
        return app.Views.Cell({value: cell.value, id: cell.position})
      })
    }

    return (
      React.DOM.div(null, board)
    )
  }
})