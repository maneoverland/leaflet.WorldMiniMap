leaflet.WorldMiniMap
========================

This plugin for [Leaflet](https://leafletjs.com/) allows you to add a small world-map-image, in which the actual view of the Leaflet-map is shown.

Support
-------
This plugin was developed and tested with Leaflet 1.8.0 and Microsoft Edge 102.0.1245.

![screenshot](https://raw.github.com/maneoverland/leaflet.WorldMiniMap/master/OSM-Demo.PNG "Default look of WorldMiniMap")

Demo:
* [OSM-map with standard-options](https://maneoverland.github.io/leaflet.WorldMiniMap/)
* [TopPlusOpen-map with user-options](https://maneoverland.github.io/leaflet.WorldMiniMap/tpo.html)

Usage
-----
### Download
| Version          |  Description |
| ---             | --- |
| [V1.0.0](https://github.com/maneoverland/leaflet.WorldMiniMap/archive/refs/tags/v1.0.0.zip)        | Initial release. |

In the zip-archive are folders 'src' and 'dist'. Each folder contains a js- and a svg-file - in the 'dist'-folder is the minified version of the js-file from the 'src'-folder. The two files of a folder are needed by default to create the minimap-control.

The control needs the actual js-script 'Control.WorldMiniMap.js' and a world-image (by default with the same name in the same folder as the js-script, but with '.svg' extension instead of '.js').

### Using downloaded version
To create the minimap from downloaded version include following line in your js
```js
<script src="dist/Control.WorldMiniMap.js"></script>
```

### Using hosted version
To create the minimap from hosted version include following line in your js
```js
<script src="https://cdn.jsdelivr.net/gh/maneoverland/leaflet.WorldMiniMap@1.0.0/dist/Control.WorldMiniMap.js" integrity="sha512-PFw8St3qenU1/dmwCfiYYN/bRcqY1p3+sBATR+rZ6622eyXOk/8izVtlmm/k8qW7KbRIJsku838WCV5LMs6FCg==" crossorigin=""></script>
```

### Example of using the included js-script
Then the minimap-control can either be created via option in map-creation
```js
var map = new L.Map('map', {worldMiniMapControl: true});
```
or alternatively with extra create-command including additional options
```js
var worldMiniMap = L.control.worldMiniMap({position: 'topright', style: {opacity: 0.9, borderRadius: '0px', backgroundColor: 'lightblue'}}).addTo(map);
```
