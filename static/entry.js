var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
	var u="//g1y.innocraft.cloud/";
	_paq.push(['setTrackerUrl', u+'piwik.php']);
	_paq.push(['setSiteId', '1']);
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();

function addPins(map) {
	fetch('/entries').then(function(response) {
		return response.json();
	}).then(function(responseJson) {
		responseJson.map(function(entry) {
			if ("maps_geocode" in entry) {
				var loc = entry.maps_geocode[0].geometry.location
				var type = entry.type ? entry.type : "";
				var title = entry.call_comments ? type + ": " + entry.call_comments: "";
				var infoWindow = new google.maps.InfoWindow({
					content: title,
				});

				var marker = new google.maps.Marker({
					position: loc,
					map: map,
					title: title,
				});
				
				marker.addListener('click', function() {
					infoWindow.open(map, marker);
				});
			}
		});
	});
}

function initMap() {
		var uluru = {lat: 35.2827524, lng: -120.6596156};
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: uluru,
		});

		addPins(map);

		var marker = new google.maps.Marker({
			position: uluru,
			map: map,
		});
}

window.initMap = initMap;
