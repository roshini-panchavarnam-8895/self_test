import { _defineProperty } from "@slyte/core/src/lyte-utils";
import './lyte-multislider.js';
import './lyte-popover.js';
import './lyte-dropdown.js';
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";
import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

/**
 * This component is used to render a audio content in the document
 * @component lyte-voicenote
 * @version 3.29.0
 * @dependency lyte-dropdown
 * 	components/lyte-dropdown.js
 *  theme/compiledCSS/default/ltr/lyte-ui-dropdown.css
 * @dependency lyte-popover
 *  components/lyte-popover.js
 *  theme/compiledCSS/default/ltr/lyte-ui-popover.css
 *  components/lyte-wormhole
 * @dependency lyte-multislider
 *  components/lyte-multislider
 * 	theme/compiledCSS/default/ltr/lyte-ui-slider.css
 * @methods onVolumeChange, onProgress, onPause, onPlay
 **/


class LyteVoicenoteComponent extends Component {
    constructor() {
        super();
    }

    init() {
		var __data = this.data;

		if( __data.ltPropPrefetch ){
			__data.renderPrefetch = true;
		}
	}

    didConnect() {

		if( this.data.renderPrefetch ){
			return;
		}

		this._audio = this.$node.querySelector( "audio" );
		this._hander = this.$node.getElementsByClassName( "lyteVoiceNoteHandler" )[ 0 ];
		this._completion = this.$node.getElementsByClassName( 'lyteVoiceNoteCompletion' )[ 0 ];
		this._defaultVolume = 0.5;

		this.setData( 'fullVolume', this.data.ltPropVolume == 1 ? ' lyteVoiceNoteFullVolumeIcon' : "" );
	}

    didDestroy() {
		delete this._audio;
		delete this._hander;
		delete this._completion;
		delete this._defaultVolume;

		if( this.__preloaded ){
			var src = this.data.ltPropSrc[ 0 ];
			src && window.URL.revokeObjectURL( src.src );
		}
	}

    left() {
		return window._lyteUiUtils.getRTL() ? "right" : "left";
	}

    data(arg1) {
		var default_values = window._lyteUiUtils.getDefault( 'lyte-voicenote' );
		return Object.assign(super.data({
			/**
			 * @componentProperty {Object[]} ltPropSrc
			 * @default []
			 * @version 3.29.0
			 */
			ltPropSrc : prop( "array", { default : [] } ),
			/**
			 * @componentProperty {boolean} ltPropVolumeControl=true
			 * @version 3.29.0
			 */
			ltPropVolumeControl : prop( "boolean", { default : default_values.volumeControl == false ? false :true}),
			/**
			 * @componentProperty {number} ltPropVolume=1
			 * @version 3.29.0
			 */
			ltPropVolume : prop( "number", { default : default_values.volume || 1 }),

			/**
			 * @componentProperty {string} ltPropPreload=metadata
			 * @version 3.54.0
			 */

			ltPropPreload : prop( 'string', { default : default_values.preload || 'metadata' } ),
			/**
			 * @componentProperty {string} ltPropPopover={"freeze" : false, "showCloseButton" : false}
			 * @component lyte-popover
			 * @version 3.29.0
			 */
			ltPropPopover : prop( 'string', { default : default_values.popover || '{"freeze" : false, "showCloseButton" : false}' } ),
			/**
			 * @componentProperty {number} ltPropPlaybackRate=1
			 * @version 3.29.0
			 */
			ltPropPlaybackRate : prop( 'number', { default : default_values.playbackRate || 1 } ),

			/**
			 * @typedef optionsDef
			 * @property {string} label
			 * @property {string} value
			 */

			/**
			 * @componentProperty {optionsDef[]} ltPropPlaybackOptions
			 * @default [{"label":"0.25x","value":0.25},{"label":"0.5x","value":0.5},{"label":"0.75x","value":0.75},{"label":"1x","value":1},{"label":"1.25x","value":1.25},{"label":"1.5x","value":1.5},{"label":"1.75x","value":1.75}]
			 * @version 3.29.0
			 */

			ltPropPlaybackOptions : prop( 'array', { default : default_values.playbackOptions || [
				{
					label : "0.25x",
					value : 0.25
				},
				{
					label : "0.5x",
					value : 0.5
				},
				{
					label : "0.75x",
					value : 0.75
				},
				{
					label : "1x",
					value : 1
				},
				{
					label : "1.25x",
					value : 1.25
				},
				{
					label : "1.5x",
					value : 1.5
				},
				{
					label : "1.75x",
					value : 1.75
				}
			] } ),

			/**
			 * @componentProperty {boolean} ltPropPrefetch
			 * @version 3.54.0
			 */

			ltPropPrefetch : prop( 'boolean', { default : default_values.prefetch } ),
			/**
			 * @componentProperty {object} ltPropPrefetchOptions
			 * @default {"method":"GET","mode":"cors","credentials":"include"}
			 * @version 3.54.0
			 */
			ltPropPrefetchOptions : prop( 'object', { default : default_values.prefetchOptions || {
					method:'GET',
					mode:'cors',
					credentials:'include'
				}  
			}),
			/**
			 * @componentProperty {boolean} ltPropRefresh=false
			 * @version 3.54.0
			 */
			ltPropRefresh : prop( 'boolean', { default : false } ),
			/**
			 * @componentProperty {string} ltPropLoadingMessage=''
			 * @version 3.54.0
			 */
			ltPropLoadingMessage : prop( 'string', { default : default_values.loadingMessage || "" } ),

			/**
			 * @componentProperty {boolean} ltPropDurationHandling=true
			 * @version 3.87.0
			 */

			ltPropDurationHandling : prop( 'boolean', { default : default_values.durationHandling == false ? false : true } ),

			// system data

			renderPrefetch : prop( 'boolean', { default : false } ),
			prefetchLoading : prop( 'string', { default : '' } ),

			state : prop( "string", { default : "paused" } ),
			duration : prop( "string", { default : "0.00" } ),
			datetimeFormat : prop( "string", { default : "" } ),
			elapsedTime : prop( "string", { default : "0.00" } ),
			elapsedFormat : prop( "string", { default : "" } ),
			progressLoad : prop( 'string', { default : "width:0" } ),
			muted : prop( 'boolean', { default : false } ),
			popShow : prop( 'boolean', { default : false } ),
			randomClass : prop( 'string', { default : "lyteVoice" + Date.now() } ),

			fullVolume : prop( 'string', { default : "" } )
		}), arg1);		
	}

    read_duration(sec_check) {
		var abs = Math.round( sec_check ),
		secs = abs % 60,
		mins_check = parseInt( abs / 60 ),
		mins = mins_check % 60,
		hrs = parseInt( mins_check / 60 );

		return{
			sec : secs,
			min : mins,
			hr : hrs
		};
	}

    display_format(arg, obj) {
		var str = '',
		___sec = arg.sec;

		if( arg.hr ){
			str += ( arg.hr + ( obj.hr || ":" ) );
		}

		str += ( ( arg.min || 0 ) + ( obj.min || ":" ) );
		str += ( ( ___sec > 9 ? ___sec : ( '0' + ___sec )  ) + ( obj.sec || '' ) );

		return str;
	}

    update_time(evt) {
		var elem = evt.target,
		bcr = this._bcr || elem.getBoundingClientRect(),
		left = this.left(),
		width = bcr.width,
		diff = Math.min( Math.abs( evt.clientX - bcr[ left ] ), width ),
		audio = this._audio,
		duration = this.getDuration( audio );

		if( isNaN( duration ) ){
			return;
		}

		audio.currentTime = Math.max( 0, Math.min( duration - 1, ( duration * ( diff / width ) ).toFixed( 2 ) ) ); 
	}

    mousemove(ev) {
		var touches = ev.touches || [],
		length = touches.length,
		evt = touches[ 0 ] || ev;

		if( length > 1 ){
			return;
		}

		if( length ){
			ev.preventDefault();
		}

		var bcr = this._bcr,
		clientX = Math.min( Math.max( bcr.left, evt.clientX ), bcr.right ),
		node = this._hander,
		tooltip = node.tooltip;

		if( tooltip && tooltip.refresh ){
            tooltip.refresh( { clientX : evt.clientX }, tooltip.tooltipSpan );
        }

		this.update_time( { clientX : clientX } );

	}

    mouseup(evt) {

		var isTch = ( evt.touches || [] ).length;

		this.bind_evt( 'removeEventListener', isTch );
		if( this._downstate ){
			this.play();
		}

		this.$node.classList.remove( 'lyteVoiceNoteSlideDown' );

		delete this._move;
		delete this._up;
		delete this._bcr;
		delete this._downstate;
	}

    bind_evt(fn, isTch) {
		var doc = document;

		doc[ fn ]( isTch ? 'touchmove' : 'mousemove', this._move, true );
		doc[ fn ]( isTch ? 'touchend' : 'mouseup', this._up, true );
	}

    set_format(time, name1, name2) {
		var format = this.read_duration( time );

		this.setData( name1, this.display_format( format, {} ) );
		this.setData( name2, "PT" + this.display_format( format, { hr : "H", min : "M", sec : "S" } ) );
	}

    play() {

		if( this.__ignoreplay ){
			return;
		}

		var audio = this._audio,
		_this = this,
		fn = function(){
			delete _this._happening;
			var final = _this._final,
			cb = 'onPlay';
			_this.getMethods( cb ) && _this.executeMethod( cb, _this.$node );

			if( final ){
				delete _this._final;
				_this[ final ]();
			}
		};

		if( this._happening ){
			this._final = 'play';
		} else if( audio.paused ){
			this._happening = true;
			audio.play().then( fn ).catch( fn );
		}
	}

    pause() {
		if( this._happening ){
			this._final = 'pause';
		} else {
			this._audio.pause();
			var cb = 'onPause';
			this.getMethods( cb ) && this.executeMethod( cb, this.$node );
		}
	}

    progress() {
		if( this.data.ltPropPreload == "auto" ){
			var elem = this._audio,
			range = 0,
			buffer = elem.buffered,
			time = elem.currentTime,
			__length = ( buffer || [] ).length;

			if( __length > 0 ){
				while( ( range < __length ) && !( buffer.start( range ) <= time && time <= buffer.end( range ) ) ){
			        range += 1;
			    }
			    if( range < __length ){
			    	var duration = this.getDuration( elem ),
			    	loadStartPercentage = buffer.start( range ) / duration,
				    loadEndPercentage = buffer.end( range ) / duration,
				    loadPercentage = loadEndPercentage - loadStartPercentage;

				    this.setData( 'progressLoad', 'width:' + ( ( isNaN( loadPercentage ) ? 0 : loadPercentage ) * 100 )+ '%' );
			    }
			}
		}
	}

    prefetch() {
        var lyteSelf = this;
        var __fetch = window.fetch,
		__this = this,
		__data = __this.data,
		ns = 'prefetchLoading',
		__ns = 'lyteVoiceNotePrefetch',
		renderPrefetch = 'renderPrefetch',
		__error = function( err ){
			__this.setData( ns, __ns + "Error" );

			var cb = "onPrefetchError";

			/**
			 * @method onPrefetchError
			 * @version 3.54.0
			 */
			
			if( __this.getMethods( cb ) && __this.executeMethod( cb, err, __this.$node ) == false ){
				return;
			}

			// var msg = err.message;

			// if( !msg || /Access\-Control\-Allow\-Origin/i.test( msg ) || /failed\sto\sfetch/i.test( msg ) ){
				__this.setData( renderPrefetch, false );
				// __this.play();
			// }

		},
		src = __data.ltPropSrc[ 0 ] || {};

        if( __this.__preloaded ){
			return;
		}

        if( __fetch ){

			var cb = "onBeforePrefetch";

			/**
			 * @method onBeforePrefetch
			 * @version 3.54.0
			 */

			if( __this.getMethods( cb ) && __this.executeMethod( cb, __this.$node ) == false ){
				return;
			}

			__this.setData( ns, __ns + 'Loading' );
			__fetch( src.src || "", __data.ltPropPrefetchOptions ).then( function( res ){
				if( /^2..$/.test( res.status ) ){
					return res.blob();
				} else {
					__error( {} );
				}
			}).then( function( blob ){

				if( !blob ){
					return;
				}
				
				__this.setData( ns, __ns + 'Success' );

				var __url = window.URL.createObjectURL( blob ),
				cb = "onPrefetchSuccess";

				/**
				 * @method onPrefetchSuccess
				 * @version 3.54.0
				 */
				
				lyteSelf.$addon.objectUtils( src, 'add', 'src', __url );
				__this.getMethods( cb ) && __this.executeMethod( cb, __url, __this.$node );

				__this.setData( renderPrefetch, !( __this.__preloaded = true ) );

				// __this.play();
			}.bind( __this ) ).catch( __error );
		}
    }

    getDuration(elem) {
		var ret = this.__final_dur || elem.duration;

		if( ret == Infinity ){
			ret = elem.currentTime;

			if( !this.data.ltPropDurationHandling ){
				this.set_format( ret, 'duration', 'datetimeFormat' );
			}
		}

		return ret;
	}

    findDuration(audio, cb) {
		/* solution taken from https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity?noredirect=1&lq=1 */

		var __this = this,
		__audio = new window.Audio( ( __this.data.ltPropSrc[ 0 ] || {} ).src || "" );

		__this.__ignoreplay = true;

		__audio.ondurationchange = function(){
			var __dur = this.duration;
			if( __dur != Infinity ){
				__this.__final_dur = __dur;
				delete __this.__ignoreplay;
				__this.play();
				cb && cb();
			}
		};

		__audio.load();
	    __audio.currentTime = 1e10;
	    __audio.volume = 0;
	    __audio.play();
	}

    static actions(arg1) {
        return Object.assign(super.actions({

            prefetch : function(){
                this.prefetch();
            },

            togglePop : function(){
                this.setData( 'popShow', !this.data.popShow );
            },

            error : function( evt ){
                var cb = "onError",
                ns = "lyteVoiceNote";

                $L( this.$node ).addClass( ns + "Error" ).removeClass( ns + 'MetaLoaded' );

                this._audio.pause();

                /**
                 * @method onError
                 * @version 3.54.0
                 */

                this.getMethods( cb ) && this.executeMethod( cb, evt, this.$node );
            },

            keydown : function( evt ){
                var keycode = evt.which || evt.keyCode,
                audio = this._audio,
                duration = this.getDuration( audio ),
                currentTime = audio.currentTime;

                if( !/^3(7|9)$/.test( keycode ) ){
                    return;
                }

                evt.preventDefault();

                this._state = !audio.paused;

                this.pause();

                audio.currentTime = Math.max( 0, Math.min( duration - 1, currentTime + ( 5 * ( keycode == 37 ? -1 : 1 ) ) ) );
            },

            pause : function(){
                this.setData( "state", "paused" );
                return false;
            },

            play : function(){
                this.setData( "state", "" );
                return false;
            },

            progress : function(){
                this.progress();
            },

            mousedown : function( ev ){

                var touches = ev.touches || [],
                length = touches.length,
                isTch = length != 0,
                evt = touches[ 0 ] || ev,
                audio = this._audio;

                if( length > 1 ){
                    return;
                }

                if( this._downstate = !audio.paused ){
                    this.pause();
                }

                this._move = this.mousemove.bind( this );
                this._up = this.mouseup.bind( this );
                this._bcr = evt.target.parentNode.getBoundingClientRect();

                this.bind_evt( "addEventListener", isTch );
                ev.preventDefault();

                this.$node.classList.add( 'lyteVoiceNoteSlideDown' );

            },

            progressClick : function( evt ){
                var elem = evt.target;
                if( elem == this._hander ){
                    return;
                }
                this._state = !this._audio.paused;

                this.pause();

                this.update_time( evt );
            },

            meta : function( evt ){
                var audio = this._audio;
                if( !audio ){
                    return false;
                }
                var duration = audio.duration,
                ns = "lyteVoiceNote",
                __fn = function(){
                    this.set_format( this.getDuration( audio ), 'duration', 'datetimeFormat' );
                    $L( this.$node ).removeClass( ns + 'Error' ).addClass( ns + 'MetaLoaded' );
                }.bind( this );

                if( duration == Infinity && this.data.ltPropDurationHandling ){
                    return this.findDuration( audio, __fn ) && false;
                }

                __fn();

                return false;
            },

            toggle : function(){
                var audio = this._audio,
                fn = "pause";

                if( audio.paused ){
                    fn = "play";
                }

                this[ fn ]();
                return false;
            },

            update : function( evt ){

                this.progress();

                var audio = this._audio,
                time = audio.currentTime,
                duration = this.getDuration( audio ),
                handle = this._hander,
                tooltip = handle.tooltip;

                if( isNaN( duration ) ){
                    return;
                }

                if( tooltip && tooltip.refresh ){
                    tooltip.refresh( {}, tooltip.tooltipSpan );
                }

                handle.style[ this.left() ] = this._completion.style.width = ( time / duration * 100 ) + '%';

                $L( this.$node )[ ( audio.ended ? 'add' : "remove" ) + "Class" ]( "lyteVoiceNoteCompleted" );

                if( this._state ){
                    this.play();
                }
                delete this._state;

                this.set_format( time, 'elapsedTime', 'elapsedFormat' );

                this.getMethods('onProgress') && this.executeMethod( 'onProgress', audio, time, duration, evt,this.$node);
            },

            onMute : function(){
                var audio = this._audio;

                audio.muted = !audio.muted
            },

            changeVolume : function( evt ){
                var audio = this._audio,
                __data = this.data,
                new_vol,
                is_muted = audio.muted,
                vol = audio.volume,
                mute,
                cb = 'onVolumeChange';

                if( vol > 0 && __data.muted ) {
                    mute = audio.muted = false;
                    vol = new_vol = audio.volume;
                } else if( !is_muted && vol == 0 ) {
                    vol = new_vol = audio.volume = this._defaultVolume;
                } else if( is_muted ){
                    mute = true;
                    vol = new_vol = 0;
                }

                if( new_vol != void 0 ){
                    this.setData( 'ltPropVolume', new_vol );
                }

                if( mute != void 0 ){
                    this.setData( 'muted', mute );
                }

                this.getMethods( cb ) && this.executeMethod( cb, audio, evt ,this.$node );

                this.setData( 'fullVolume', vol == 1 ? ' lyteVoiceNoteFullVolumeIcon' : "" );
            }

        }), arg1);
    }

    static methods(arg1) {
        return Object.assign(super.methods({
            setVolume : function ( handlerIndex , currentValue, event, MultiSliderElement ){
                var audio = this._audio;
                
                if( currentValue.value == 0 ){
                    audio.muted = true;	
                }
                audio.volume = currentValue.value;
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            rateChange : function( arg ){
                var __data = this.data;
                if( __data.renderPrefetch ){
                    return;
                }

                if( arg && arg.item == "renderPrefetch" ){
                    this.didConnect();
                }

                this._audio.playBackRate = __data.ltPropPlaybackRate || 1;
            }.observes( 'ltPropPlaybackRate', 'renderPrefetch' ).on( 'didConnect' ),

            refresh_obs : function( arg ){
                if( arg.newValue ){
                    this.prefetch();
                    this.setData( arg.item, false );
                }
            }.observes( 'ltPropRefresh' ),

            class_obs : function( arg ){
                $L( this.$node ).addClass( arg.newValue ).removeClass( arg.oldValue );
            }.observes( 'prefetchLoading' )
        }), arg1);
    }

    _() {
        _;
    }
}

LyteVoicenoteComponent._template = "<template tag-name=\"lyte-voicenote\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{renderPrefetch}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lyteVoiceNotePrefetchContainer\"> <div class=\"lyteVoiceNotePrefetchPlayIcon\" onclick=\"{{action('prefetch')}}\"> <div class=\"lyteCircleLoader\"> <span class=\"lyteCircleInnerLoader\"></span> </div> </div> <div class=\"lyteVoiceNotePrefetchLoadBarWrap\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropLoadingMessage}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyteVoiceNotePrefetchMessage\">{{ltPropLoadingMessage}}</span> </template></template> <span class=\"lyteVoiceNotePrefetchLoadingBar\"></span> </div> </div> </template><template default=\"\"> <span class=\"lyteVoiceNotePausePlayIcon {{state}}\" onclick=\"{{action('toggle')}}\"></span> <audio onpause=\"{{action('pause')}}\" onplay=\"{{action('play')}}\" onvolumechange=\"{{action('changeVolume',event)}}\" onloadedmetadata=\"{{action('meta',event)}}\" ontimeupdate=\"{{action('update',event)}}\" preload=\"{{ltPropPreload}}\" onprogress=\"{{action('progress',this)}}\"> <template items=\"{{ltPropSrc}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"> <source onerror=\"{{action('error',event)}}\" src=\"{{item.src}}\" type=\"{{expHandlers(item.type,'||',&quot;audio/mpeg&quot;)}}\" label=\"{{item.label}}\"> </template> </audio> <div class=\"lyteVoiceNoteProgress\" tabindex=\"0\" onkeydown=\"{{action('keydown',event)}}\" onclick=\"{{action('progressClick',event)}}\"> <span class=\"lyteVoiceNoteCompletion\"></span> <span class=\"lyteVoiceNotePreload\" style=\"{{progressLoad}}\"></span> <span class=\"lyteVoiceNoteHandler\" lt-prop-tooltip-class=\"lyteVoiceNoteTooltip\" onmousedown=\"{{action('mousedown',event)}}\" lt-prop-title=\"{{elapsedTime}}\" lt-prop-tooltip-config=\"{&quot;showdelay&quot;:500,&quot;hidedelay&quot; : 500, &quot;position&quot; : &quot;bottom&quot;}\"></span> </div> </template></template> <time class=\"lyteVoiceNoteElapsedTime\" datetime=\"{{elapsedFormat}}\">{{elapsedTime}}</time> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{elapsedTime}}\" is=\"case\" lc-id=\"lc_id_0\"><span class=\"lyteVoiceNoteTimeSeparate\">/</span></template></template> <time class=\"lyteVoiceNoteDurationSpan\" datetime=\"{{datetimeFormat}}\">{{duration}}</time> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropVolumeControl}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lyteVoiceNoteVolumeController\"> <span class=\"lyteVoiceNoteVolumeControl {{randomClass}}{{if(muted,' lyteVoiceNoteMuteIcon','')}}{{fullVolume}}\" onclick=\"{{action('togglePop')}}\"></span> <lyte-popover lt-prop-scrollable=\"true\" lt-prop=\"{{ltPropPopover}}\" lt-prop-show=\"{{lbind(popShow)}}\" lt-prop-origin-elem=\".{{randomClass}}\" lt-prop-content-padding=\"\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"lyteVoiceNotePopover\"> <div class=\"lyteVoiceNoteVolumeSlider\"> <span class=\"lyteVoiceNoteVolumeIcon{{if(muted,' lyteVoiceNoteMuteIcon','')}}{{fullVolume}}\" onclick=\"{{action('onMute')}}\"></span> <lyte-multislider lt-prop-max=\"1\" lt-prop-fill-color=\"#ddd\" lt-prop-height=\"2px\" lt-prop-yield=\"true\" lt-prop-width=\"60px\" lt-prop-handler=\"lyteCircle\" lt-prop-value=\"[ { &quot;value&quot; : {{ltPropVolume}}, &quot;min&quot; : 0, &quot;max&quot; : 1 } ]\" on-change=\"{{method('setVolume')}}\" lt-prop-color=\"[&quot;#61A6E8&quot; ]\"></lyte-multislider> </div> </lyte-popover-content> </template> </lyte-popover> </div> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropPlaybackRate}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-dropdown class=\"lyteVoiceNotePlaybackRate\" lt-prop-selected=\"{{lbind(ltPropPlaybackRate)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box class=\"lyteVoiceNotePlaybackRateDropbox\"> <lyte-drop-body> <template items=\"{{ltPropPlaybackOptions}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"> <lyte-drop-item data-value=\"{{item.value}}\">{{item.label}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </template>";;
LyteVoicenoteComponent._dynamicNodes = [{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1,1],"cn":"lc_id_0"},{"t":"s","p":[1,3,1],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"a","p":[3],"cn":"default"},{"t":"a","p":[3,1],"cn":"default"},{"t":"f","p":[3,1],"dN":[{"t":"a","p":[1]}],"cn":"default"},{"t":"a","p":[5],"cn":"default"},{"t":"a","p":[5,3],"a":{"style":{"name":"style","dynamicValue":"progressLoad"}},"cn":"default"},{"t":"a","p":[5,5],"cn":"default"}]},"dc":{"lc_id_0":{},"default":{}},"hd":true,"co":["lc_id_0"],"in":3,"sibl":[2]},{"t":"a","p":[3]},{"t":"tX","p":[3,0]},{"t":"s","p":[5],"c":{"lc_id_0":{"dN":[],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":2,"sibl":[1]},{"t":"a","p":[7]},{"t":"tX","p":[7,0]},{"t":"s","p":[9],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1,1],"cn":"lc_id_0"},{"t":"a","p":[1,3],"cn":"lc_id_0"},{"t":"r","p":[1,3,1],"dN":[{"t":"a","p":[1,1,1]},{"t":"a","p":[1,1,3]},{"t":"cD","p":[1,1,3],"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0}],"dc":[1,0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1,3],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"s","p":[11],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"r","p":[1,1],"dN":[{"t":"a","p":[1,1,1]},{"t":"f","p":[1,1,1],"dN":[{"t":"a","p":[1]},{"t":"tX","p":[1,0]},{"t":"cD","p":[1],"in":0}],"dc":[0],"hc":true,"trans":true,"in":2,"sibl":[1]},{"t":"cD","p":[1,1],"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0}],"dc":[2,1,0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[1,0]}];;

LyteVoicenoteComponent._observedAttributes = [
    "ltPropSrc",
    "ltPropVolumeControl",
    "ltPropVolume",
    "ltPropPreload",
    "ltPropPopover",
    "ltPropPlaybackRate",
    "ltPropPlaybackOptions",
    "ltPropPrefetch",
    "ltPropPrefetchOptions",
    "ltPropRefresh",
    "ltPropLoadingMessage",
    "ltPropDurationHandling",
    "renderPrefetch",
    "prefetchLoading",
    "state",
    "duration",
    "datetimeFormat",
    "elapsedTime",
    "elapsedFormat",
    "progressLoad",
    "muted",
    "popShow",
    "randomClass",
    "fullVolume"
];

export { LyteVoicenoteComponent };

LyteVoicenoteComponent.register("lyte-voicenote", {
    hash: "LyteVoicenoteComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});