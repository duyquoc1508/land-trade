	(function (A) {

	    if (!Array.prototype.forEach)
	        A.forEach = A.forEach || function (action, that) {
	            for (var i = 0, l = this.length; i < l; i++)
	                if (i in this)
	                    action.call(that, this[i], i, this);
	        };

	})(Array.prototype);

	var
	    mapObject,
	    markers = [],
	    markersData = {
	        'Marker': [
	            {
	                location_latitude: 28.550913,
	                location_longitude: -81.456819,
	                type_point: 'For Rent',
	                bed_num: '4',
	                bath_num: '3',
	                garage_num: '2',
	                total_area: '2240',
	                map_image_url: 'images/property/property_1.jpg',
	                price: '15000',
	                name_point: 'Villa on Hartfold',
	                url_point: 'single-listing-one.html',
			},
	            {
	                location_latitude: 28.521706,
	                location_longitude: -81.065418,
	                type_point: 'For sale',
	                bed_num: '3',
	                bath_num: '2',
	                garage_num: '1',
	                total_area: '1982',
	                map_image_url: 'images/property/property_3.jpg',
	                price: '7500',
	                name_point: 'Family home in Glasgow',
	                url_point: 'single-listing-one.html',
			},
	            {
	                location_latitude: 28.419960,
	                location_longitude: -80.990052,
	                type_point: 'For Rent',
	                bed_num: '5',
	                bath_num: '4',
	                garage_num: '2',
	                total_area: '2048',
	                map_image_url: 'images/property/property_8.jpg',
	                price: '9200',
	                name_point: 'Comfortable Family Apartment',
	                url_point: 'single-listing-three.html'
			},
	            {
	                location_latitude: 28.617477,
	                location_longitude: -81.172400,
	                type_point: 'For Sale',
	                bed_num: '6',
	                bath_num: '5',
	                garage_num: '2',
	                total_area: '2400',
	                map_image_url: 'images/property/property_9.jpg',
	                price: '125000',
	                name_point: 'Luxury Condo in Mariwood',
	                url_point: 'single-listing-two.html'
			},
	            {
	                location_latitude: 28.574847,
	                location_longitude: -81.167921,
	                type_point: 'For Rent',
	                bed_num: '3',
	                bath_num: '2',
	                garage_num: '1',
	                total_area: '1240',
	                map_image_url: 'images/property/property_2.jpg',
	                price: '1400',
	                name_point: 'Bay view Apartment',
	                url_point: 'single-listing-two.html'
			},
	            {
	                location_latitude: 28.481659,
	                location_longitude: -81.339207,
	                type_point: 'For Rent',
	                bed_num: '5',
	                bath_num: '4',
	                garage_num: '2',
	                total_area: '3000',
	                map_image_url: 'images/property/property_5.jpg',
	                price: '21000',
	                name_point: 'Luxury Villa in Orlando',
	                url_point: 'single-listing-one.html'
			},

	            {
	                location_latitude: 28.420938,
	                location_longitude: -81.467646,
	                type_point: 'For Rent',
	                bed_num: '3',
	                bath_num: '2',
	                garage_num: '1',
	                total_area: '1240',
	                map_image_url: 'images/property/property_6.jpg',
	                price: '2300',
	                name_point: 'Apartment in Cecil Lake',
	                url_point: 'single-listing-two.html'
			},
	            {
	                location_latitude: 28.501623,
	                location_longitude: -81.231335,
	                type_point: 'For Rent',
	                bed_num: '5',
	                bath_num: '4',
	                garage_num: '2',
	                total_area: '2048',
	                map_image_url: 'images/property/property_7.jpg',
	                price: '9200',
	                name_point: 'Villa on Sunbury',
	                url_point: 'single-listing-one.html'
			}
			]

	    };

	var mapOptions = {
	    zoom: 10,
	    center: new google.maps.LatLng(28.574847, -81.167921),
	    mapTypeId: google.maps.MapTypeId.ROADMAP,

	    mapTypeControl: false,
	    mapTypeControlOptions: {
	        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
	        position: google.maps.ControlPosition.LEFT_CENTER
	    },
	    panControl: false,
	    panControlOptions: {
	        position: google.maps.ControlPosition.TOP_RIGHT
	    },
	    zoomControl: true,
	    zoomControlOptions: {
	        position: google.maps.ControlPosition.RIGHT_BOTTOM
	    },
	    scrollwheel: false,
	    scaleControl: false,
	    scaleControlOptions: {
	        position: google.maps.ControlPosition.TOP_LEFT
	    },
	    streetViewControl: true,
	    streetViewControlOptions: {
	        position: google.maps.ControlPosition.LEFT_TOP
	    },
	    styles: [
	        {
	            "featureType": "administrative",
	            "elementType": "geometry",
	            "stylers": [
	                {
	                    "visibility": "off"
      }
    ]
  },
	        {
	            "featureType": "administrative.land_parcel",
	            "elementType": "labels",
	            "stylers": [
	                {
	                    "visibility": "off"
      }
    ]
  },
	        {
	            "featureType": "poi",
	            "stylers": [
	                {
	                    "visibility": "off"
      }
    ]
  },
	        {
	            "featureType": "road",
	            "elementType": "labels.icon",
	            "stylers": [
	                {
	                    "visibility": "off"
      }
    ]
  },
	        {
	            "featureType": "road.local",
	            "elementType": "labels",
	            "stylers": [
	                {
	                    "visibility": "off"
      }
    ]
  },
	        {
	            "featureType": "transit",
	            "stylers": [
	                {
	                    "visibility": "off"
      }
    ]
  }
]
	};
    
	var marker;
	mapObject = new google.maps.Map(document.getElementById('map_right_listing'), mapOptions);
	for (var key in markersData)
	    markersData[key].forEach(function (item) {
	        marker = new google.maps.Marker({
	            position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
	            map: mapObject,
	            icon: 'images/others/marker.png',
	        });

	        if ('undefined' === typeof markers[key])
	            markers[key] = [];
	        markers[key].push(marker);
	        google.maps.event.addListener(marker, 'click', (function () {
	            closeInfoBox();
	            getInfoBox(item).open(mapObject, this);
	            mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
	        }));

	    });

	new MarkerClusterer(mapObject, markers[key]);

	function hideAllMarkers() {
	    for (var key in markers)
	        markers[key].forEach(function (marker) {
	            marker.setMap(null);
	        });
	};



	function closeInfoBox() {
	    $('div.infoBox').remove();
	};

	function getInfoBox(item) {
	    return new InfoBox({
	        content: '<div class="container map_container">' +
	            '<div class="row">' +
	            '<div class="col-md-12 px-0">' +
	            '<div class="marker-info" id="marker_info">' +
	            '<img src="' + item.map_image_url + '" alt="..."/>' +

	            '<div class = "marker_price trend-open">' +
	            '<p>' + '$' + item.price +
	            '<span>month</span>' +
	            '</p>' +
	            '</div>' +
	            '<span class="featured_btn">' + item.type_point + '</span>' +
	            '</div>' +
	            '<div class="marker-text">' +
	            '<h3 class="marker_title"><a href="' + item.url_point + '">' + item.name_point + '</a></h3>' +
	            '<ul class ="map_property_info">' +
	            '<li>' + item.bed_num + '<span>Bed</span>' +
	            '</li>' +
	            '<li>' + item.bath_num + '<span>Bath</span>' +
	            '</li>' +
	            '<li>' + item.total_area + '<span>Sq Ft</span>' +
	            '</li>' +
	            '<li>' + item.garage_num + '<span>Garage</span>' +
	            '</li>' +
	            '</ul>' +
	            '</div>' +
	            '</div>' +
	            '</div>' +
	            '</div>',
	        disableAutoPan: false,
	        maxWidth: 0,
	        pixelOffset: new google.maps.Size(10, 92),
	        closeBoxMargin: '',
	        closeBoxURL: "images/others/close_infobox.png",
	        isHidden: false,
	        alignBottom: true,
	        pane: 'floatPane',
	        enableEventPropagation: true
	    });
	};

	function onHtmlClick(location_type, key) {
	    google.maps.event.trigger(markers[location_type][key], "click");
	}
