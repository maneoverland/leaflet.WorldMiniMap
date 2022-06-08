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
| [v1.0.0](https://github.com/maneoverland/leaflet.WorldMiniMap/archive/refs/tags/v1.0.0.zip)        | Initial release. |

In the zip-archive are folders 'src' and 'dist'. Each folder contains a js- and a svg-file - in the 'dist'-folder is the minified version of the js-file from the 'src'-folder. The two files of a folder are needed by default to create the minimap-control.

The control needs the actual js-script 'Control.WorldMiniMap.js' and a world-image (by default with the same name in the same folder as the js-script, but with '.svg' extension instead of '.js').

### Using downloaded version
To create the minimap from downloaded version include following line in your js
```js
<script src="dist/Control.WorldMiniMap.js"></script>
```

### Using hosted version
The control is also available on free CDN [jsDelivr](https://cdn.jsdelivr.net/gh/maneoverland/leaflet.WorldMiniMap@1.0.0/dist/Control.WorldMiniMap.js).
To create the minimap from hosted version include following line in your js
```js
<script src="https://cdn.jsdelivr.net/gh/maneoverland/leaflet.WorldMiniMap@1.0.0/dist/Control.WorldMiniMap.js" integrity="sha512-PFw8St3qenU1/dmwCfiYYN/bRcqY1p3+sBATR+rZ6622eyXOk/8izVtlmm/k8qW7KbRIJsku838WCV5LMs6FCg==" crossorigin=""></script>
```

### Example of using the included js-script
When the js-script is included, then the minimap-control can either be created via option in map-creation
```js
var map = new L.Map('map', {worldMiniMapControl: true});
```
or alternatively with extra create-command including additional options
```js
var worldMiniMap = L.control.worldMiniMap({position: 'topright', style: {opacity: 0.9, borderRadius: '0px', backgroundColor: 'lightblue'}}).addTo(map);
```

### Available Options
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| position | String | 'bottomleft' | The position of the control (one of the map corners).<br/>Possible values are 'topleft', 'topright', 'bottomleft' or 'bottomright' |
| width | Number | 168 | The width of the world-image in pixels |
| height | Number | 84 | The height of the world-image in pixels |
| view | String | 'auto' | Controls the display of the map-view as a square or a circle.<br/>Possible values are 'auto', 'both', 'square', 'circle' |
| lineWidth | Number | 2 | Line width of the square in pixels |
| lineColor | String | 'white' | Line color of the square in HTML-syntax (e.g. '#123456') |
| circleRadius | Number | 3 | Radius of the circle in pixels |
| circleColor | String | 'white' | Color of the circle in HTML-syntax (e.g. '#123456') |
| map | String | ':control:.svg' | Link to world-image in equirectangular projection,<br/>on which the square and circle of the map-view is shown |
| style | Object | {<br/>backgroundColor: '#919eac',<br/>border: '2px solid black',<br/>borderRadius: '5px',<br/>padding: '3px'<br/>} | Style-options for canvas-element in HTML-syntax |

Building minified version
-------------------------
The minified version of js-script in 'dist'-folder is created from js-script in 'src'-folder by [JSCompress](https://jscompress.com/).

Creating integrity-hash
-----------------------
The hash for the integrity-option of hosted version is created by [SRI Hash Generator](https://www.srihash.org/).
