import {Control, Map, DomUtil, DomEvent} from 'leaflet';

/*
 * @class WorldMiniMap
 * @inherits Control
 *
 * A class showing a 'World-Mini-Map' with an outline of the cutout shown on Map
 *
 * @example
 * ...
 * new WorldMiniMap({position: 'topright', circleColor: 'red', containerStyle: {opacity: 0.9, borderRadius: '0px', backgroundColor: 'lightblue'}}).addTo(map);
 * ...
*/

// default style-options for the WorldMiniMap-control
const defaultOptions = {
	position: 'bottomleft',
	width: 168,
	height: 84,
	view: 'auto',
	lineWidth: 2,
	lineColor: 'white',
	circleRadius: 3,
	circleColor: 'white',
	// see https://commons.wikimedia.org/wiki/File:Equirectangular_projection_world_map_without_borders.svg?uselang=de
	map: 'https://cdn.jsdelivr.net/gh/maneoverland/leaflet.WorldMiniMap@master/WorldMap.svg',
	containerStyle: {
		backgroundColor: '#919eac',
		border: '2px solid black',
		borderRadius: '5px',
		padding: '3px'
	}
};

// class-code
export class WorldMiniMap extends Control {
	// map where the control is shown
	#map = null;
	// DOM-HTML-object of WorldMiniMap-control
	#container = null;
	// drawing-context of WorldMiniMap for outlinig cutout
	#MMWCtx = null;
	// world-image as background of WorldMiniMap-control
	#WMMImg = null;

	// @object-constructor constructor (options: Object)
	// Creates WorldMiniMap-control with specified options
	// options: Object with content like "defaultOptions"
	constructor (options) {
		// @section
		// create options for control
		//
		// set default-options
		super (defaultOptions);
		// merge given style to local style
		this.setOptions (options);

		// @section
		// create DOM-objects for control
		//
		// create container and stop events from spilling through to the main map
		this.#container = DomUtil.create('canvas', 'leaflet-control-worldminimap');
		DomEvent.disableClickPropagation(this.#container);
		DomEvent.on(this.#container, 'mousewheel', DomEvent.stopPropagation);
		this.#MMWCtx = this.#container.getContext('2d');
		// create world-map-image
		this.#WMMImg = new Image ();
	}

	// @method setOptions (options: Object)
	// Sets or changes options of the WorldMiniMap
	// options: Object with content like "defaultOptions"
	setOptions (options) {
		// @section
		// validate input parameter; default if not valid
		if (typeof options !== 'object')
			options = {containerStyle: {}};
		if (typeof options.containerStyle !== 'object')
			options.containerStyle = {};

		// @section
		// update given style to actual style
		//
		// merge given container-style to actual container-style
		var tempStyle = {...this.options.containerStyle, ...options.containerStyle};
		// merge given options to actual options
		this.options = {...this.options, ...options};
		// take container-style
		this.options.containerStyle = tempStyle;
		// refresh control with new options
		if (this.#map !== null)
			this.addTo (this.#map);
	}

	// @method onAdd (map: Map): container-HTML-Element
	// Adds WorldMiniMap-control to the map
	// map: map that WorldMiniMap-control is to be added
	onAdd (map) {
		// save context for img-onload-function
		var aktObj = this;
		// URL of world-map
		this.#WMMImg.src = this.options.map;
		// apply actual style to DOM-object
		Object.assign (this.#container.style, this.options.containerStyle);
		this.#container.style.visibility = 'hidden';
		// async-load of world-map-image
		this.#WMMImg.onload = function() {
			// scale image, when height and/or width given
			if (aktObj.options.height > 0)
				this.height = aktObj.options.height;
			if (aktObj.options.width > 0)
				this.width = aktObj.options.width;
			// apply image-size to canvas-element
			aktObj.#container.height = this.height;
			aktObj.#container.width = this.width;
			aktObj.#container.style.height = this.height + 'px';
			aktObj.#container.style.width = this.width + 'px';
			// show world-map-image
			aktObj.#container.style.visibility = 'visible';
			aktObj.#showMap(map);
		}
		this.#map = map;
		// event to update frame on map
		map.on ('moveend', this.#onMoveEnd, this);
		return this.#container;
	}

	// @method onRemove (map: Map)
	// Removes listeners of WorldMiniMap-control from the map
	// map: map from which WorldMiniMap-control is to be removed
	onRemove (map) {
		// remove event to update frame on map
		map.off ('moveend', this.#onMoveEnd, this);
		this.#map = null;
	}

	// @method #onMoveEnd (e: Event)
	// Update map after map-movement or map-zoom
	// e: base-event-object from which event was fired (map)
	#onMoveEnd (e) {
		// update frame on map after moveend
		this.#showMap (e.target);
	}

	// @method #coord2Px (coord: Number, maxDegree: Number, pxWidth: Number): Number
	// calculate pixel-position in world-map-image (equirectangular projection) from coordinate
	// coord: coordinate in 0 to 360 degrees latitude or -90 to +90 degrees longitude
	// maxDegree: rightmost respecively lowest degree of coordinate on world-map-image
	// pxWidth: rightmost respecively lowest pixel on world-map-image
	// returns: pixel for the coordinate on the world-map-image
	#coord2Px (coord, maxDegree, pxWidth) {
		// calculate pixel-position in world-map-image (equirectangular projection) from coordinate
		return Math.round((coord / maxDegree + .5) * pxWidth);
	}

	// @method #showMap (map: Map)
	// Show WorldMiniMap-control on map
	// map: map on which WorldMiniMap-control is to be shown including map-view-frame
	#showMap (map) {
		var wPxKorr;

		// @section
		// translate map-view-bounds to image-pixels on world-map-image in equirectangular projection
		var wPx = this.#coord2Px(map.getBounds().getWest(),360,this.#container.width);
		var ePx = this.#coord2Px(map.getBounds().getEast(),360,this.#container.width);
		var nPx = this.#coord2Px(map.getBounds().getNorth(),-180,this.#container.height);
		var sPx = this.#coord2Px(map.getBounds().getSouth(),-180,this.#container.height);

		// @section
		// adjusting calculated image-pixels
		var borderFrame = this.options.lineWidth / 2;
		// adjust north - south
		if (nPx < borderFrame)
			nPx = borderFrame;
		if (sPx > this.#container.height - borderFrame)
			sPx = this.#container.height - borderFrame;
		if (sPx-nPx < this.options.lineWidth)
			sPx = nPx + this.options.lineWidth;
		// adjust east - west, especially for horizontal scroll
		if (ePx-wPx > this.#container.width) {
			wPx = borderFrame;
			ePx = this.#container.width - borderFrame;
		} else {
			wPxKorr = wPx % this.#container.width;
			if (wPxKorr < 0)
				wPxKorr += this.#container.width;
			wPxKorr -= wPx;
			wPx += wPxKorr;
			ePx += wPxKorr;
		}
		if (ePx-wPx < this.options.lineWidth)
			ePx = wPx + this.options.lineWidth;

		// @section
		// show world-map including view-frame respecively view-circle
		//
		// first clear old image
		this.#MMWCtx.clearRect(0, 0, this.#container.width, this.#container.height);
		// draw world-map-image as background
		this.#MMWCtx.drawImage(this.#WMMImg,0, 0, this.#container.width, this.#container.height);
		// create view-frame on background-image depending from frame-size
		if ((ePx-wPx > 2 * this.options.circleRadius || sPx-nPx > 2 * this.options.circleRadius) && this.options.view == 'auto' || this.options.view == 'both' || this.options.view == 'square') {
			// show actual view as rectangle on world-map-image
			this.#MMWCtx.beginPath();
			this.#MMWCtx.lineWidth = this.options.lineWidth;
			this.#MMWCtx.strokeStyle = this.options.lineColor;
			this.#MMWCtx.rect(wPx,nPx,ePx-wPx,sPx-nPx);
			this.#MMWCtx.stroke();
			// show second view-frame on left side when first view-frame exceeds right border of background-image
			if (ePx > this.#container.width) {
				this.#MMWCtx.rect(wPx-this.#container.width,nPx,ePx-wPx,sPx-nPx);
				this.#MMWCtx.stroke();
			}
		}
		// create view-circle on background-image depending from frame-size
		if ((ePx-wPx <= 2 * this.options.circleRadius && sPx-nPx <= 2 * this.options.circleRadius) && this.options.view == 'auto' || this.options.view == 'both' || this.options.view == 'circle') {
			// show center of actual view as filled circle on world-map-image
			this.#MMWCtx.fillStyle = this.options.circleColor;
			this.#MMWCtx.beginPath();
			this.#MMWCtx.arc((wPx+ePx)*.5,(nPx+sPx)*.5, this.options.circleRadius, 0, 2 * Math.PI);
			this.#MMWCtx.fill();
		}
	}
}

// add standard-map-option; so this control can be created with creation of map
Map.mergeOptions({
	worldMiniMapControl: false
});

// create WorldMiniMap with standard-map-option
Map.addInitHook(function () {
	if (this.options.worldMiniMapControl) {
		this.worldMiniMapControl = (new WorldMiniMap()).addTo(this);
	}
});