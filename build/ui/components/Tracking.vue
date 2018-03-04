<template>
    <div class="row" id="name">
		<iframe height="450" frameborder="0" style="border:0; width:100%;" :src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyAEJcKeFg1HiUfjGsOyWfaIMO8x0WDYqu0&q=' + location.lat + ',' + location.lng + '&zoom=15'" allowfullscreen></iframe>
	</div>
</template>

<script>

var maps = require('vue2-google-maps');

module.exports = {
    name: "Tracking",

    data() {
        return {
            location : {
                lat: 44.4411961,
                lng: 26.05138569999997
            }
        }
    },

    methods: {
        calcCrow: function(lat1, lon1, lat2, lon2) {
            var R = 6371; // km
            var dLat = toRad(lat2 - lat1);
            var dLon = toRad(lon2 - lon1);
            var lat1 = toRad(lat1);
            var lat2 = toRad(lat2);

            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d;
        },

        // Converts numeric degrees to radians
        toRad: function(Value) {
            return Value * Math.PI / 180;
        },

        CreateCustomAlert: function(text) {

            var ALERT_TITLE = "ATENTIE  ⚠️";
            var ALERT_BUTTON_TEXT = "Ok";

            if (document.getElementById("modalContainer")) return;

            mObj = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
            mObj.id = "modalContainer";
            mObj.style.height = d.documentElement.scrollHeight + "px";

            alertObj = mObj.appendChild(d.createElement("div"));
            alertObj.id = "alertBox";
            if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
            alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
            alertObj.style.visiblity = "visible";

            h1 = alertObj.appendChild(d.createElement("h1"));
            h1.appendChild(d.createTextNode(ALERT_TITLE));

            msg = alertObj.appendChild(d.createElement("p"));
            //msg.appendChild(d.createTextNode(txt));
            msg.innerHTML = txt;

            btn = alertObj.appendChild(d.createElement("a"));
            btn.id = "closeBtn";
            btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
            btn.href = "#";
            btn.focus();
            btn.onclick = function () { removeCustomAlert(); return false; }

            alertObj.style.display = "block";

        },

        removeCustomAlert: function() {
            document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
        },

        ful: function() {
            alert('Alert this page');
        },

        // Note: This example requires that you consent to location sharing when
        // prompted by your browser. If you see the error "The Geolocation service
        // failed.", it means you probably did not give permission for the browser to
        // locate you.

        initMap: function() {
            // var sound1 = new Audio('dun.mp3');
            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 17
            });
            var infoWindow = new google.maps.InfoWindow;

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {

                    this.location.lat = position.coords.latitude;
                    this.location.lng = position.coords.longitude;

                    var pos1 = {
                        lat: 44.3167,
                        lng: 23.8
                    };

                    marker = new google.maps.Marker({
                        map: map,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: { lat: this.location.lat, lng: this.location.lng }
                    });

                    marker1 = new google.maps.Marker({
                        map: map,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: { lat: pos1.lat, lng: pos1.lng }
                    });

                    if (parseFloat(calcCrow(this.location.lat, this.location.lng, pos1.lat, pos1.lng) > 0.5)) {
                        // sound1.play();
                        alert('VINE O AMBULANTA');
                    }
                   /* infoWindow.setPosition(pos);
                    infoWindow.setContent('Your location');
                    infoWindow.open(map);*/
                    map.setCenter(this.location);
                    
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });

            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        },

        handleLocationError: function(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        },

        geolocation: function() {
            var geocoder = new google.maps.Navigator();
            navigator.geolocation.getCurrentPosition((position) => {
                this.position = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            });
        }
    },

    created: {
        alert: function() {
            this.geolocation();

            // this.initMap();

            // if (document.getElementById) {
            //     window.alert = function(txt) {
            //         createCustomAlert(txt);
            //     }
            // }
        }
    }
};
</script>
