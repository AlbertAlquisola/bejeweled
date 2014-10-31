/** @jsx React.DOM */

app.Views.Cell = React.createClass({
  render: function() {
    return (
      <div className="cell">
        {this.props.value}
      </div>
    )
  }
})