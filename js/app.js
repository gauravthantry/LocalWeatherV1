$(document).ready(function () {
	$(".text-center").fadeIn();
	var lon, lat, weatherType, ftemp, ktemp, ctemp, wspeed;

	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(function (position) {
			lon = position.coords.longitude;
			lat = position.coords.latitude;
			var api = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=bb4b778076b0c8c79c7eb8fcd1fd4330';
			$.getJSON(api, function (data) {
				// $("#data").html(api);
				var city = data.city.name;
				weatherType = data.list[0].weather[0].description;
				//weatherType="clear sky";
				ktemp = data.list[0].main.temp;
				console.log(ktemp);
				ftemp = (9 / 5 * (ktemp - 273) + 32).toFixed(1);
				ctemp = (5 / 9 * (ftemp - 32)).toFixed(1);
				wspeed = data.list[0].wind.speed;
				wspeed = (wspeed * 5 / 18).toFixed(1);
				/* $("#city").addClass("animated fadein",function(){
							 $("#city").html(city);
							 }); */
				$("#city").addClass("animated fadein");
				$("#city").html(city);
				$("#weatherType").html(weatherType);
				$("#temp").html(ctemp + " ℃");
				//$("[name='my-checkbox']").bootstrapSwitch();
				$("#degree-toggle").attr("value", $("<div/>").html("℉").text());
				var celsius = true;
				$("#degree-toggle").on("click", function () {
					if (celsius === true) {
						$("#temp").html(ftemp + " ℉");
						$("#temp").fadeIn();
						$("#degree-toggle").attr("value", $("<div/>").html("℃").text());
						celsius = false;
					} else {
						$("#temp").html(ctemp + " ℃");
						$("#temp").fadeIn();
						$("#degree-toggle").attr("value", $("<div/>").html("℉").text());
						celsius = true;
					}
				});
				$("#wspeed").html(wspeed + " kmph");
				weatherType = weatherType.toLowerCase();
				if (weatherType === "clear sky")
					$("body").css({
						'background-image': 'url(\'images/clear sky.png\')',
						'background-size': '100% 100%'
					});
				else if (weatherType === "few clouds")
					$("body").css({
						'background-image': 'url(\'images/few clouds\')',
						'background-size': '100% 100%'
					});
				else if (weatherType === "cloudy")
					$("body").css({
						'background-image': 'url(\'images/cloudy\')',
						'background-size': '100% 100%'
					});
				else if (weatherType === "sunny")
					$("body").css({
						'background-image': 'url(\'images/sunny\')',
						'background-size': '100% 100%'
					});
				else if (weatherType === "showers")
					$("body").css({
						'background-image': 'url(\'images/showers\')',
						'background-size': '100% 100%'
					});
				else if (weatherType === "overcast clouds")
					$("body").css({
						'background-image': 'url(\'images/overcast clouds\')',
						'background-size': '100% 100%'
					});
				else
					$("body").css({
						'background-image': 'url(\'images/others\')',
						'background-size': '100% 100%'
					});
			});
		});
	}
});
