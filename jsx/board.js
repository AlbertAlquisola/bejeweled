/** @jsx React.DOM */

app.Views.BejeweledBoard = React.createClass({
  render: function() {
    <div>
      <app.Views.Cell test={this.props.test}/>
    </div>
  }
})