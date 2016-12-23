var React =  require('react');

var ReactDOM = require('react-dom');

// Import Components

var CityComponent = require('./CityComponent')


////////

var WeatherApp = React.createClass({
    render: function(){
      return (
        <div>

            <CityComponent onClick />


        </div>
      )
    }


})


ReactDOM.render(<WeatherApp />, document.getElementById('WeatherApp'))
