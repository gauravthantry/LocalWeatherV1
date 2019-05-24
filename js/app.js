$(document).ready(function () {
	$(".text-center").fadeIn();
	var lon, lat, weatherType, ftemp, ktemp, ctemp, wspeed;

	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(function (position) {
			lon = position.coords.longitude;
			lat = position.coords.latitude;
			var api = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=bb4b778076b0c8c79c7eb8fcd1fd4330';
			$.getJSON(api, function (data) {     //data holds all the weather information and forecast of the city(found by the longitude and latitude whereever the user logins)
				var city = data.city.name;
				weatherType = data.list[0].weather[0].description; //eg: clear sky
				ktemp = data.list[0].main.temp;    //ktemp holds the temperature in kelvin
				console.log(ktemp);
				ftemp = (9 / 5 * (ktemp - 273) + 32).toFixed(1);       //Farenheit
				ctemp = (5 / 9 * (ftemp - 32)).toFixed(1);             //Celsius
				wspeed = data.list[0].wind.speed;                      //Windspeed
				wspeed = (wspeed * 5 / 18).toFixed(1);                 //Windspeed in kmph
				$("#city").addClass("animated fadein");
				$("#city").html(city);
				$("#weatherType").html(weatherType);
				$("#temp").html(ctemp + " ℃");
				$("#degree-toggle").attr("value", $("<div/>").html("℉").text());
				var celsius = true;
				$("#degree-toggle").on("click", function () {
					if (celsius === true) { //This condition is executed if the user is trying to change to farenheit from celsius
						$("#temp").html().fadeOut();
						//$("#temp").html(ftemp + " ℉");
						//$("#temp").fadeIn();
						$("#degree-toggle").attr("value", $("<div/>").html("℃").text());
						celsius = false;
					} else {                             //This condition is executed if the user is trying to change to Celsius from Farenheit
						//$("#temp").html(ctemp + " ℃");
						$("#temp").html().fadeOut();
						//$("#temp").fadeIn();
						$("#degree-toggle").attr("value", $("<div/>").html("℉").text());
						celsius = true;
					}
				});
				$("#wspeed").html(wspeed + " kmph");
				weatherType = weatherType.toLowerCase();
				if (weatherType == "clear sky")         //One of these conditions are executed depending on the weather type. Eg: the first background will be displayed if the weather type is clear sky/
					$("body").css({
						'background-image': 'url(\'images/clear-sky.png\')',
						'background-size': '100% 100%'
					});
				else if (weatherType == "few clouds")
					$("body").css({
						'background-image': 'url(\'images/few-clouds.jpg\')',
						'background-size': '100% 100%'
					});
				else if (weatherType == "cloudy")
					$("body").css({
						'background-image': 'url(\'images/cloudy.jpg\')',
						'background-size': '100% 100%'
					});
				else if (weatherType == "sunny")
					$("body").css({
						'background-image': 'url(\'images/sunny.jpg\')',
						'background-size': '100% 100%'
					});
				else if (weatherType == "showers")
					$("body").css({
						'background-image': 'url(\'images/showers.jpg\')',
						'background-size': '100% 100%'
					});
				else if (weatherType == "overcast clouds")
					$("body").css({
						'background-image': 'url(\'images/overcast-clouds.jpg\')',
						'background-size': '100% 100%'
					});
				else
					$("body").css({
						'background-image': 'url(\'images/others.jpg\')',
						'background-size': '100% 100%',
						'font-weight':'bold'
					});
			});
		});
	}
});
