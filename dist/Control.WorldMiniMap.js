﻿!function(t,i){"function"==typeof define&&define.amd?define(["leaflet"],t):"object"==typeof exports&&(module.exports=t(require("leaflet"))),void 0!==i&&i.L&&(i.L.Control.WorldMiniMap=t(L),i.L.control.worldMiniMap=function(t,o){return new i.L.Control.WorldMiniMap(t,o)})}(function(t){var i=t.Control.extend({options:{position:"topleft",width:168,height:84,view:"auto",lineWidth:2,lineColor:"white",circleRadius:3,circleColor:"white",map:document.currentScript.src.substring(0,document.currentScript.src.lastIndexOf("/"))+"/Control.WorldMiniMap.svg",style:{}},style:{backgroundColor:"#919eac",border:"2px solid black",borderRadius:"5px",padding:"3px"},initialize:function(i){t.Util.setOptions(this,i),"object"==typeof i&&t.Util.extend(this.style,i.style),this._container=t.DomUtil.create("canvas","leaflet-control-worldminimap"),t.DomEvent.disableClickPropagation(this._container),t.DomEvent.on(this._container,"mousewheel",t.DomEvent.stopPropagation),this._MMWCtx=this._container.getContext("2d"),this._WMMImg=new Image,this._WMMImg.src=this.options.map,t.Util.extend(this._container.style,this.style)},onAdd:function(t){var i=this;return this._WMMImg.onload=function(){i.options.height>0&&(this.height=i.options.height),i.options.width>0&&(this.width=i.options.width),i._container.height=this.height,i._container.width=this.width,i._container.style.height=this.height+"px",i._container.style.width=this.width+"px",i._showMap(t)},t.on("moveend",this._onMoveEnd,this),this._container},onRemove:function(t){t.off("moveend",this._onMoveEnd,this)},_onMoveEnd:function(t){this._showMap(t.target)},_mMWpx:function(t,i,o){return Math.round((t/i+.5)*o)},_showMap:function(t){var i,o=this._mMWpx(t.getBounds().getWest(),360,this._container.width),n=this._mMWpx(t.getBounds().getEast(),360,this._container.width),e=this._mMWpx(t.getBounds().getNorth(),-180,this._container.height),s=this._mMWpx(t.getBounds().getSouth(),-180,this._container.height),h=this.options.lineWidth/2;e<h&&(e=h),s>this._container.height-h&&(s=this._container.height-h),s-e<this.options.lineWidth&&(s=e+this.options.lineWidth),n-o>this._container.width?(o=h,n=this._container.width-h):((i=o%this._container.width)<0&&(i+=this._container.width),o+=i-=o,n+=i),n-o<this.options.lineWidth&&(n=o+this.options.lineWidth),this._MMWCtx.clearRect(0,0,this._container.width,this._container.height),this._MMWCtx.drawImage(this._WMMImg,0,0,this._container.width,this._container.height),((n-o>2*this.options.circleRadius||s-e>2*this.options.circleRadius)&&"auto"==this.options.view||"both"==this.options.view||"square"==this.options.view)&&(this._MMWCtx.beginPath(),this._MMWCtx.lineWidth=this.options.lineWidth,this._MMWCtx.strokeStyle=this.options.lineColor,this._MMWCtx.rect(o,e,n-o,s-e),this._MMWCtx.stroke(),n>this._container.width&&(this._MMWCtx.rect(o-this._container.width,e,n-o,s-e),this._MMWCtx.stroke())),(n-o<=2*this.options.circleRadius&&s-e<=2*this.options.circleRadius&&"auto"==this.options.view||"both"==this.options.view||"circle"==this.options.view)&&(this._MMWCtx.fillStyle=this.options.circleColor,this._MMWCtx.beginPath(),this._MMWCtx.arc(.5*(o+n),.5*(e+s),this.options.circleRadius,0,2*Math.PI),this._MMWCtx.fill())}});return t.Map.mergeOptions({worldMiniMapControl:!1}),t.Map.addInitHook(function(){this.options.worldMiniMapControl&&(this.worldMiniMapControl=(new i).addTo(this))}),i},window);