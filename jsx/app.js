/** @jsx React.DOM */

app.Views.App = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  render: function() {
    return (
      <div>
        <app.Views.BejeweledBoard board={this.props.collection}/>
      </div>
    )
  }
})

React.renderComponent(<app.Views.App collection={app.GameCreator.Board} />, document.getElementById('bejeweled'))

