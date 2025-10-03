leaflet.WorldMiniMap
========================

This plugin for [Leaflet](https://leafletjs.com/) allows you to add a small world-map-image, in which the actual view of the Leaflet-map is shown.

Support
-------
This plugin was developed and tested with Leaflet 2.0.0-alpha.1, Windows 11 Home 24H2 and Microsoft Edge 140.0.3537.57.

![screenshot](https://raw.github.com/maneoverland/leaflet.WorldMiniMap/master/OSM-Demo.PNG "Default look of WorldMiniMap")

Demo:
* [OSM-map with standard-options](https://maneoverland.github.io/leaflet.WorldMiniMap/)
* [TopPlusOpen-map with user-options](https://maneoverland.github.io/leaflet.WorldMiniMap/tpo.html)
* [TopPlusOpen-map including burger-menu for testing](https://maneoverland.github.io/leaflet.WorldMiniMap/test.html)

Usage
-----
### Download
| Version          |  Description |  Required leaflet-version |
| ---             | --- | --- |
| [v1.0.0](https://github.com/maneoverland/leaflet.WorldMiniMap/archive/refs/tags/v1.0.0.zip)        | Initial release. | leaflet-V1 |
| [v2.0.0](https://github.com/maneoverland/leaflet.WorldMiniMap/archive/refs/tags/v2.0.0.zip)        | Updated release for changes of leafelet-V2. | leaflet-V2 |

In the zip-archive are folders 'src' and 'dist'. Each folder contains a js-file - in the 'dist'-folder is the minified version of the js-file from the 'src'-folder.

The control needs the actual js-script 'WorldMiniMap.js' and a world-image (by default the 'WorldMap.svg' in the master-base-folder of this github-repository).

### Using downloaded version
It's not recommended to use a downloaded version of the plugin. It's just reasonable for development in the plugin.

### Using hosted version
The control is also available on free CDN [jsDelivr](https://cdn.jsdelivr.net/gh/maneoverland/leaflet.WorldMiniMap@2.0.0/dist/WorldMiniMap.js).
To create the minimap from hosted version include following lines in your js close to the includes of leaflet as in many tutorials:
```js
...
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@2.0.0-alpha.1/dist/leaflet.css" crossorigin="" />
		<script type="importmap">{
			"imports": {
				  "leaflet": "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.js"
				, "WorldMiniMap": "http://localhost/WorldMiniMap/dist/WorldMiniMap.js"
			}
		}</script>
...
				import {Map, TileLayer} from 'leaflet';
				import {WorldMiniMap} from 'WorldMiniMap';
...
```

### Example of using the included js-script
When the js-script is included, then the minimap-control can either be created via option in map-creation
```js
var map = new Map('map', {worldMiniMapControl: true});
```
or alternatively with extra create-command including additional options
```js
var wMM = new WorldMiniMap({position: 'topright', circleColor: 'red', containerStyle: {opacity: 0.9, borderRadius: '0px', backgroundColor: 'lightblue'}}).addTo(map);
```

### Changing options on-the-fly
In class-method "setOptions" create-options for the WorldMiniMap-control can be changed on-the-fly. A simple example can be seen in [test.html](https://github.com/maneoverland/leaflet.WorldMiniMap/blob/main/test.html)

### Available Options (merged in a singloe option-Object)
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| position | String | 'bottomleft' | The position of the control (one of the map corners). Possible values are 'topleft', 'topright', 'bottomleft' or 'bottomright' |
| width | Number | 168 | The width of the world-image in pixels |
| height | Number | 84 | The height of the world-image in pixels |
| view | String | 'auto' | Controls the display of the map-view as a square or a circle. Possible values are 'auto', 'both', 'square', 'circle' |
| lineWidth | Number | 2 | Line width of the square in pixels |
| lineColor | String | 'white' | Line color of the square in HTML-syntax (e.g. '#123456') |
| circleRadius | Number | 3 | Radius of the circle in pixels |
| circleColor | String | 'white' | Color of the circle in HTML-syntax (e.g. '#123456') |
| map | String | ':control:.svg' | Link to world-image in equirectangular projection, on which the square and circle of the map-view is shown |
| containerStyle | Object | {} | Style-options for canvas-element in HTML-syntax |

Building minified version
-------------------------
The minified version of js-script in 'dist'-folder is created from js-script in 'src'-folder by [Toptal JavaScript-Minifier](https://www.toptal.com/developers/javascript-minifier).
