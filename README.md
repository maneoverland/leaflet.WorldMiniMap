leaflet.WorldMiniMap
========================

This plugin for [Leaflet](https://leafletjs.com/) allows you to add a small world-map-image, in which the actual view of the Leaflet map is shown.

Support
-------
This plugin was developed and tested with Leaflet 1.8.0 and Microsoft Edge 102.0.1245.

![screenshot](https://raw.github.com/maneoverland/leaflet.WorldMiniMap/master/OSM-Demo.PNG "Default look of WorldMiniMap")

Demo:
* [OSM-map with standard-options](https://maneoverland.github.io/leaflet.WorldMiniMap/)
* [TopPlusOpen-map with user-options](https://maneoverland.github.io/leaflet.WorldMiniMap/tpo.html)

Usage
-----
The control needs the actual js-script 'Control.WorldMiniMap.js' and a world-image (by default with the same name in the same folder as the js-script, but with '.svg' extension instead of '.js').

Include js-script either from downloaded version (attention: you have to download and save the file 'Control.WorldMiniMap.svg' in the same folder as the js-file by default)
```js
<script src="dist/Control.WorldMiniMap.js"></script>
```
or alternatively from hosted version
```js
<script src="https://cdn.jsdelivr.net/gh/maneoverland/leaflet.WorldMiniMap@1.0.0/dist/Control.WorldMiniMap.js" integrity="sha512-PFw8St3qenU1/dmwCfiYYN/bRcqY1p3+sBATR+rZ6622eyXOk/8izVtlmm/k8qW7KbRIJsku838WCV5LMs6FCg==" crossorigin=""></script>
```

Then the minimap-control can be created via option in map-creation
```js
var map = new L.Map('map', {worldMiniMapControl: true});
```
or with extra create-command including additional options
```js
var worldMiniMap = L.control.worldMiniMap({position: 'topright', style: {opacity: 0.9, borderRadius: '0px', backgroundColor: 'lightblue'}}).addTo(map);
```
