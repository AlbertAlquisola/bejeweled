/** @jsx React.DOM */

app.Views.BejeweledBoard = React.createClass({
  render: function() {
    var board;

    if (this.props.board) {
      board = this.props.board.map(function(cell) {
        return <app.Views.Cell value={cell.value} id ={cell.position} />
      })
    }

    return (
      <div>{board}</div>
    )
  }
})