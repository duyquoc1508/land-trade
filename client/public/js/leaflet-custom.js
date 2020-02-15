$(document).ready(function () {
    if (document.getElementById("map") !== null) {
        if ($('#map').attr('data-map-scroll') == 'true' || $(window).width() < 992) {
            var scrollEnabled = false;
        } else {
            var scrollEnabled = true;
        }
        var mapOptions = {
            gestureHandling: scrollEnabled,
        }
        window.map = L.map('map', mapOptions);
        $('#scrollEnabling').hide();
        
        function locationData(locationURL, locationImg, locationTitle, locationAddress, locationRating, location_bed, location_bath, location_garage, location_area) {
            return ('' +
                '<div class="container map_container">' +
                '<div class="row">' +
                '<div class="col-md-12 px-0">' +
                '<div class="marker-info" id="marker_info">' +
                '<img src="' + locationImg + '" alt="..."/>' +

                '<div class = "marker_price trend-open">' +
                '<p>' + '$' + locationAddress +
                '<span>month</span>' +
                '</p>' +
                '</div>' +
                '<span class="featured_btn">' + locationRating + '</span>' +
                '</div>' +
                '<div class="marker-text">' +
                '<h3 class="marker_title"><a href="' + locationURL + '">' + locationTitle + '</a></h3>' +
                '<ul class ="map_property_info">' +
                '<li>' + location_bed + '<span>Bed</span>' +
                '</li>' +
                '<li>' + location_bath + '<span>Bath</span>' +
                '</li>' +
                '<li>' + location_area + '<span>Sq Ft</span>' +
                '</li>' +
                '<li>' + location_garage + '<span>Garage</span>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
              
                   )
        }
        var locations = [
            [locationData('single-listing-one.html', 'images/property/property_1.jpg', "Villa on Hartfold", '15000', 'For Rent', '4', '3','2','2240'), 28.550913, -81.456819],
            [locationData('single-listing-two.html', 'images/property/property_3.jpg', 'Family home in Glasgow', '7500', 'For Rent', '3', '2','1','1982'), 28.521706, -81.065418 ],
            [locationData('single-listing-three.html', 'images/property/property_8.jpg', 'Comfortable Family Apartment', '9200', 'For Rent', '5', '4','2','2048'), 28.419960, -80.990052],
            [locationData('single-listing-four.html', 'images/property/property_9.jpg', 'Luxury Condo in Mariwood', '125000', 'For Rent', '6', '4','2','2400'), 28.617477, -81.172400],
            [locationData('single-listing-one.html', 'images/property/property_2.jpg', 'Bay view Apartment', '4500', 'For Rent', '3', '2','1','1240'), 28.574847, -81.167921, ],
            [locationData('single-listing-five.html', 'images/property/property_5.jpg', 'Luxury Villa in Orlando', '10000', 'For Rent', '5', '4','2','3000'), 28.481659, -81.339207],
            [locationData('single-listing-three.html', 'images/property/property_6.jpg', 'Apartment in Cecil Lake', '63000', 'For Rent', '3', '2','1','1982'), 28.420938, -81.467646],
            [locationData('single-listing-two.html', 'images/property/property_7.jpg', 'Villa on Sunbury', '13000', 'For Rent', '5', '4','1','2400'), 28.632825, -81.231335],
        ];
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
            attribution: " &copy;  <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy;  <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
            maxZoom: 10,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoidmFzdGVyYWQiLCJhIjoiY2p5cjd0NTc1MDdwaDNtbnVoOGwzNmo4aSJ9.BnYb645YABOY2G4yWAFRVw'
        }).addTo(map);
        markers = L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
        });
        for (var i = 0; i < locations.length; i++) {
            var listeoIcon = L.divIcon({
                iconAnchor: [20, 51],
                popupAnchor: [0, -51],
                className: 'listeo-marker-icon',
                html: '<div class="marker-container">' +
                    '<div class="marker-card">' +
                    '<img src="images/others/marker.png" alt="..."/>' +
                    '</div>' +
                    '</div>'
            });
            var popupOptions = {
                'maxWidth': '270',
                'className': 'leaflet-infoBox'
            }
            var markerArray = [];
            marker = new L.marker([locations[i][1], locations[i][2]], {
                icon: listeoIcon,
            }).bindPopup(locations[i][0], popupOptions);
            marker.on('click', function (e) {});
            map.on('popupopen', function (e) {
                L.DomUtil.addClass(e.popup._source._icon, 'clicked');
            }).on('popupclose', function (e) {
                if (e.popup) {
                    L.DomUtil.removeClass(e.popup._source._icon, 'clicked');
                }
            });
            markers.addLayer(marker);
        }
        map.addLayer(markers);
        markerArray.push(markers);
        if (markerArray.length > 0) {
            map.fitBounds(L.featureGroup(markerArray).getBounds().pad(0.2));
        }
        map.removeControl(map.zoomControl);
        var zoomOptions = {
            zoomInText: '<i class="fas fa-plus" aria-hidden="true"></i>',
            zoomOutText: '<i class="fas fa-minus" aria-hidden="true"></i>',
        };
        var zoom = L.control.zoom(zoomOptions);
        zoom.addTo(map);
    }
});
