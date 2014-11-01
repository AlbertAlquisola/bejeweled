/** @jsx React.DOM */

app.Views.Cell = React.createClass({
  render: function() {
    return (
      <div className="cell" id={this.props.id}>
        {this.props.value}
      </div>
    )
  }
})