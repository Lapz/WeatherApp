var React = require('react');

var CityComponent = React.createClass({

  getInitialState:function(){
    return {
      city: "London",
      // weather:"",
      // weatherCode: 0,
      // temperature: 0 ,

    }
},

  render: function() {
        return (
            <div>
                <p> {this.state.city } </p>


                <button onClick={this.executeRequest}>
                    Fetch Weather
                </button>
            </div>

        )

    }, /// Render finish

    // Custom function




      /// Callbacks
      // executeRequest -> locationSucess -> returns a url -> url passed to getData -> AJAX request -> returns data
      // ->updateState

      executeRequest:function(){
      this.getLocation(this.locationSuccess, this.locationError)
    },

    locationHandler: function(longitude,latitude){
      // Tempelate string that will contain the url insereted with the users
    	return `http://api.openweathermap.org/data/2.5/find?lat=${latitude}5&lon=${longitude}&cnt=2&appid=ae274f9fa95742d9eb8ba702e2259052&units=metric`;
    },



    locationSuccess:function(pos,locationHandler, requestHandler){
      	var crd = pos.coords;

      	var url = locationHandler(crd.longitude, crd.latitude);

      	this.getData(dataHandler, url);

    },

    locationError: function(err){
      console.warn('ERROR(' + err.code + '): ' + err.message);

      alert("error");
    },

    updateState:function(city){
      var newCity = this.state.city

      this.setState({
        city:newCity
      })

    },

    getData: function(callback,url) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.status == 200 && request.readyState == 4) {
                var response = request.responseText;

                var cityName = callback(response);

                this.updateState(cityName);

            } else if (request.status > 300 && request.status < 515 && request.readyState == 4) {
                alert("error");
            }
        };

        request.open("GET", url);
        request.send();

    },

    getLocation:function(success,error){
      var options = {
    		enableHighAccuracy: true,
    		timeout: 10000,
    		maximumAge: 0
    	};

      navigator.geolocation.getCurrentPosition(success, error, options)

    },

    dataHandler:function(result){

      var parsedData = JSON.parse(result);

      var cityName = parsedData.list[0].name;

      return cityName;

    }



})

module.exports = CityComponent;
