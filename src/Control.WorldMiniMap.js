// Following https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md
(function (factory, window) {

	// define an AMD module that relies on 'leaflet'
	if (typeof define === 'function' && define.amd) {
		define(['leaflet'], factory);

	// define a Common JS module that relies on 'leaflet'
	} else if (typeof exports === 'object') {
		module.exports = factory(require('leaflet'));
	}

	// attach your plugin to the global 'L' variable
	if (typeof window !== 'undefined' && window.L) {
		window.L.Control.WorldMiniMap = factory(L);
		window.L.control.worldMiniMap = function (layer, options) {
			return new window.L.Control.WorldMiniMap(layer, options);
		};
	}
}(function (L) {
	var WorldMiniMap = L.Control.extend({
		options: {
			position: 'bottomleft',
			width: 168,
			height: 84,
			view: 'auto',
			lineWidth: 2,
			lineColor: 'white',
			circleRadius: 3,
			circleColor: 'white',
			// see https://commons.wikimedia.org/wiki/File:Equirectangular_projection_world_map_without_borders.svg?uselang=de
			map: document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('.')) + '.svg',
			style: {}
		},
		// i've decided, to style canvas-element inline and not by extern css
		// so each user can give style-options with create
		style: {
			backgroundColor: '#919eac',
			border: '2px solid black',
			borderRadius: '5px',
			padding: '3px'
		},
		initialize: function (options) {
			L.Util.setOptions(this, options);
			// Merge given style to local style
			if (typeof options === 'object')
				L.Util.extend(this.style, options.style);
			// Creating the container and stopping events from spilling through to the main map.
			this._container = L.DomUtil.create('canvas', 'leaflet-control-worldminimap');
			L.DomEvent.disableClickPropagation(this._container);
			L.DomEvent.on(this._container, 'mousewheel', L.DomEvent.stopPropagation);
			this._MMWCtx = this._container.getContext('2d');
			// Load world-map
			this._WMMImg = new Image ();
			this._WMMImg.src = this.options.map;
			// Merge local style to container-style
			L.Util.extend(this._container.style,this.style);
			this._container.style.visibility = 'hidden';
		},
		onAdd: function (map) {
			var aktObj = this;
			this._WMMImg.onload = function() {
				// Scale image, when height and/or width given
				if (aktObj.options.height > 0)
					this.height = aktObj.options.height;
				if (aktObj.options.width > 0)
					this.width = aktObj.options.width;
				// Apply image-size to canvas-element
				aktObj._container.height = this.height;
				aktObj._container.width = this.width;
				aktObj._container.style.height = this.height + 'px';
				aktObj._container.style.width = this.width + 'px';
				aktObj._container.style.visibility = 'visible';
				aktObj._showMap(map);
			}
			// Event to update frame on map
			map.on ('moveend', this._onMoveEnd, this);
			return this._container;
		},
		onRemove: function (map) {
			// Remove event to update frame on map
			map.off ('moveend', this._onMoveEnd, this);
		},
		_onMoveEnd: function (e) {
			// Update frame on map after moveend
			this._showMap (e.target);
		},
		_coord2Px: function (coord, maxDegree, pxWidth) {
			// translate coordinates to image-pixels on an world-map-image in equirectangular projection
			return Math.round((coord / maxDegree + .5) * pxWidth);
		},
		// Show world-map-image with view-frame in canvas-element
		_showMap: function (map) {
			// translage view-coordinates to image-pixels on an world-map-image in equirectangular projection
			var wPx = this._coord2Px(map.getBounds().getWest(),360,this._container.width);
			var wPxKorr;
			var ePx = this._coord2Px(map.getBounds().getEast(),360,this._container.width);
			var nPx = this._coord2Px(map.getBounds().getNorth(),-180,this._container.height);
			var sPx = this._coord2Px(map.getBounds().getSouth(),-180,this._container.height);
			var borderFrame = this.options.lineWidth / 2;
			// adjust north - south
			if (nPx < borderFrame)
				nPx = borderFrame;
			if (sPx > this._container.height - borderFrame)
				sPx = this._container.height - borderFrame;
			if (sPx-nPx < this.options.lineWidth)
				sPx = nPx + this.options.lineWidth;
			// adjust east - west, especially for horizontal scroll
			if (ePx-wPx > this._container.width) {
				wPx = borderFrame;
				ePx = this._container.width - borderFrame;
			} else {
				wPxKorr = wPx % this._container.width;
				if (wPxKorr < 0)
					wPxKorr += this._container.width;
				wPxKorr -= wPx;
				wPx += wPxKorr;
				ePx += wPxKorr;
			}
			if (ePx-wPx < this.options.lineWidth)
				ePx = wPx + this.options.lineWidth;
			// to show map and view-frame, first clear old image
			this._MMWCtx.clearRect(0, 0, this._container.width, this._container.height);
			// draw world-map-image as background
			this._MMWCtx.drawImage(this._WMMImg,0, 0, this._container.width, this._container.height);
			// view-frame on background-image
			if ((ePx-wPx > 2 * this.options.circleRadius || sPx-nPx > 2 * this.options.circleRadius) && this.options.view == 'auto' || this.options.view == 'both' || this.options.view == 'square') {
				// show actual view as rectangle on world-map-image
				this._MMWCtx.beginPath();
				this._MMWCtx.lineWidth = this.options.lineWidth;
				this._MMWCtx.strokeStyle = this.options.lineColor;
				this._MMWCtx.rect(wPx,nPx,ePx-wPx,sPx-nPx);
				this._MMWCtx.stroke();
				// show second view-frame on left side, if first view-frame exceeds right border of background-image
				if (ePx > this._container.width) {
					this._MMWCtx.rect(wPx-this._container.width,nPx,ePx-wPx,sPx-nPx);
					this._MMWCtx.stroke();
				}
			}
			// view-circle on background-image
			if ((ePx-wPx <= 2 * this.options.circleRadius && sPx-nPx <= 2 * this.options.circleRadius) && this.options.view == 'auto' || this.options.view == 'both' || this.options.view == 'circle') {
				// show center of actual view as filled circle on world-map-image
				this._MMWCtx.fillStyle = this.options.circleColor;
				this._MMWCtx.beginPath();
				this._MMWCtx.arc((wPx+ePx)*.5,(nPx+sPx)*.5, this.options.circleRadius, 0, 2 * Math.PI);
				this._MMWCtx.fill();
			}
		}
	});
	// Add standard-map-option; so this control can be created with creation of map
	L.Map.mergeOptions({
		worldMiniMapControl: false
	});
	// Create WorldMiniMap with standard-map-option
	L.Map.addInitHook(function () {
		if (this.options.worldMiniMapControl) {
			this.worldMiniMapControl = (new WorldMiniMap()).addTo(this);
		}
	});
	return WorldMiniMap;
}, window));