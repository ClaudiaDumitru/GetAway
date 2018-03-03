<template>
   <div id="map"></div>
</template>

<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAemRQR3wHrD5Xw2TbDbOXCROVJr_NfX8&callback=initMap">
module.exports {
    name: "Tracking",
    data() {
        var ALERT_TITLE = "ATENTIE  ⚠️";
        var ALERT_BUTTON_TEXT = "Ok";

        if (document.getElementById) {
            window.alert = function (txt) {
                createCustomAlert(txt);
            }
        }

        function createCustomAlert(txt) {
            d = document;

            if (d.getElementById("modalContainer")) return;

            mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
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

        }

        function removeCustomAlert() {
            document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
        }
        function ful() {
            alert('Alert this pages');
        }

        var sound1 = new Audio('dun.mp3');
        // Note: This example requires that you consent to location sharing when
        // prompted by your browser. If you see the error "The Geolocation service
        // failed.", it means you probably did not give permission for the browser to
        // locate you.
        var map, infoWindow;
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 17
            });
            infoWindow = new google.maps.InfoWindow;

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var pos1 = {
                        lat: 	44.3167,
                        lng: 	23.8
                    };
                    marker = new google.maps.Marker({
                        map: map,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: { lat: pos.lat, lng: pos.lng }
                    });

                    marker1 = new google.maps.Marker({
                        map: map,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: { lat: pos1.lat, lng: pos1.lng }
                    });

                    if (pos.lat > pos1.lat) {
                        sound1.play();
                        alert('VINE O AMBULANTA');


                    }
                   /* infoWindow.setPosition(pos);
                    infoWindow.setContent('Your location');
                    infoWindow.open(map);*/
                    map.setCenter(pos);
                    
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });

            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }



}
};
</script>
