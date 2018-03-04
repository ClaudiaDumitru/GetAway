<template>
	<gmap-map :center="center" :zoom="7" style="width: 100%; height: 300px">
		<gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="getCoordinates"></gmap-marker>
	</gmap-map>
  
</template>

<script>

window.jQuery = require('jquery');
 
module.exports =  {
	name: 'GoogleMaps',
	data () {
		
		return {
			center: {lat: 30.0, lng: 80.0},
			lat: 0.0,
			lng: 0.0,
			markers: [{
				position: {lat: 10.0, lng: 10.0}
			}, {
				position: {lat: 11.0, lng: 11.0}
			}]
		};
	},
	
	methods: {
		
		getCoordinates: function (event) {
			alert('Latitude: ' + event.latLng.lat() + ' ' + ', longitude: ' + event.latLng.lng()); 
		}
	}

};

</script> 