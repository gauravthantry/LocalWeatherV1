$(document).ready(function() {
  $(".text-center").fadeIn();
            var lon, lat, weatherType, ftemp, ktemp, ctemp, wspeed;

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                        lon = position.coords.longitude;
                        lat = position.coords.latitude;
                        var api = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=bb4b778076b0c8c79c7eb8fcd1fd4330';
                        $.getJSON(api, function(data) {
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
                            $("#temp").html(ctemp + " &#8451;");
                            //$("[name='my-checkbox']").bootstrapSwitch();
                            $("#degree-toggle").attr("value", $("<div/>").html("&#8457;").text());
                            var celsius = true;
                            $("#degree-toggle").on("click", function() {
                                if (celsius === true) {
                                    $("#temp").html(ftemp + " &#8457;");
									$("#temp").fadeIn();
                                    $("#degree-toggle").attr("value", $("<div/>").html("&#8451;").text());
                                    celsius = false;
                                } else {
                                    $("#temp").html(ctemp + " &#8451;");
									$("#temp").fadeIn();
                                    $("#degree-toggle").attr("value", $("<div/>").html("&#8457;").text());
                                    celsius = true;
                                }
                            });
                            $("#wspeed").html(wspeed + " kmph");
							weatherType=weatherType.toLowerCase();
                            if (weatherType === "clear sky")
                                $("body").css("background-image", "url('https://static.pexels.com/photos/281260/pexels-photo-281260.jpeg')");
                            else if (weatherType === "few clouds")
                                $("body").css("background-image", "url('https://clearalliance.org/wp-content/uploads/2015/01/CLEAR-see-clear-flowers-e1422658973500.jpg')");
                            else if (weatherType === "cloudy")
                                $("body").css("background-image", "url('http://www.gazetteseries.co.uk/resources/images/5360796/')");
							else if (weatherType === "sunny")
							    $("body").css("background-image","url('https://i2-prod.examiner.co.uk/incoming/article10372520.ece/ALTERNATES/s1227b/JS75768352.jpg')");
							else if (weatherType==="showers")
							    $("body").css("background-image","url('http://ak8.picdn.net/shutterstock/videos/1479838/thumb/1.jpg')");
                          else if(weatherType==="overcast clouds") 
                                $("body").css("background-image","url('https://patchegal.files.wordpress.com/2012/07/img_2406.jpg')");
	                        else
							    $("body").css("background-image","url('https://www.almanac.com/sites/default/files/image_nodes/thanksgiving-weather.jpg')");
                        });
                    });
                }
            });
