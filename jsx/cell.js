/** @jsx React.DOM */

app.Views.Cell = React.createClass({
  render: function() {
    var backgroundColor = {backgroundColor : this.props.cell.value}
    return (
        <div className="cell" id={this.props.cell.position} style={backgroundColor}>
        </div>
    )
  }
})