/** @jsx React.DOM */

app.Views.App = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  render: function() {
    return (
      <div>
        <app.Views.BejeweledBoard />
      </div>
    )
  }
})

React.renderComponent(<app.Views.App />, document.getElementById('bejeweled'))

