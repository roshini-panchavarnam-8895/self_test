import { _defineProperty } from "@slyte/core/src/lyte-utils";
import './lyte-wormhole.js';
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";
import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

/* @Slicer.otherframeworkStart */
import "../../plugins/lyte-draggable.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/lyte-resize.js";

/*  @Slicer.otherframeworkEnd */

class LytePipComponent extends Component {
    constructor() {
		super();
	}

    data(arg1) {
		return Object.assign(super.data({
			'ltPropPipMode': prop('boolean', { 'default': false }),
			'ltPropHeaderYield': prop('boolean', { 'default': false }),
			'ltPropFooterYield': prop('boolean', { 'default': false }),
			'ltPropPipWindowWidth': prop('string', { 'default': '320px' }),
			'ltPropPipWindowHeight': prop('string', { 'default': '250px' }),

			'ltPropResizeMinWidth': prop('number'),
			'ltPropResizeMaxWidth': prop('number'),
			'ltPropResizeMinHeight': prop('number'),
			'ltPropResizeMaxHeight': prop('number'),

			'ltPropResize': prop('boolean', { 'default': true }),
			'ltPropDraggable': prop('boolean', { 'default': true }),

			'ltPropUseBrowserApi': prop('boolean', { 'default': false }),

			'ltPropWrapperClass': prop('string', { 'default': 'lytePipContainer' }),

			'actualVideoWidth': prop('number'),
			'actualVideoHeight': prop('number')
		}), arg1);
	}

    didConnect() {
		this.wormhole = this.$node.querySelector('lyte-wormhole');
	}

    didDestroy() {
		if (window._lyteUiUtils.pictureInPictureElement === this.$node) {
			window._lyteUiUtils.pictureInPictureElement = null;
		}
	}

    enablePip() {
		var useBrowser = this.useBrowser();

		if (useBrowser) {
			this.useBrowserApi();
		}
		else {
			this.buildManually();
		}
	}

    useBrowserApi() {
		var video = this.getVideo();

		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		}

		video.addEventListener('leavepictureinpicture', this.resetPipFlag.bind(this));
		video.requestPictureInPicture();
	}

    resetPipFlag() {

		// User can leave pip mode without calling lt-prop-pip-mode false. In that case we need to set it to false
		this.data.ltPropPipMode = false;
	}

    buildManually() {
		var wormhole = this.wormhole;

		this.closeOtherPipWindows();
		this.setPipWindowWidth();
		wormhole.classList.add('lytePipEnabled');
		this.addResize();
		this.addDraggable();

		window._lyteUiUtils.pictureInPictureElement = this.$node;
	}

    closeOtherPipWindows() {
		var pictureInPictureElement = window._lyteUiUtils.pictureInPictureElement;

		if (pictureInPictureElement && pictureInPictureElement !== this.$node) {
			pictureInPictureElement.ltProp('pipMode', false);
		}
	}

    setPipWindowWidth() {
		var clientWidth = this.getVideo().clientWidth;
		var clientHeight = this.getVideo().clientHeight;

		var aspectRatio = clientWidth / clientHeight
		var wormhole = this.wormhole,
			pipWidth = this.getData('ltPropPipWindowWidth'),
			pipHeight = parseFloat(pipWidth) / aspectRatio;
		pipHeight = pipHeight + 'px'
		wormhole.style.width = pipWidth;
		wormhole.style.height = pipHeight;
		// Create a ResizeObserver to watch for changes in video dimensions
		const resizeObserver = new window.ResizeObserver(entries => {
		  this.updatePipWindow();
		});

		// Start observing changes in the video element's size
		resizeObserver.observe(wormhole);
	}

    updatePipWindow() {
		var wormhole = this.wormhole;
		var wormholeWidth = wormhole.style.width
		var wormholeHeight = wormhole.style.height
		this.getVideo().style.width = wormholeWidth;
		this.getVideo().style.height = wormholeHeight;
	}

    addResize() {
		if( !this.getData( 'ltPropResize' ) ) {
			return ;
		}

		var resizeConfig = this.buildResizeConfig();

		$L( this.wormhole ).enableResize( resizeConfig );
	}

    buildResizeConfig() {
		var config = {},
			minWidth = this.getData('ltPropResizeMinWidth'),
			maxWidth = this.getData('ltPropResizeMaxWidth'),
			minHeight = this.getData('ltPropResizeMinHeight'),
			maxHeight = this.getData('ltPropResizeMaxHeight');

		if (minWidth) {
			config.minWidth = minWidth;
		}

		if (maxWidth) {
			config.maxWidth = maxWidth;
		}

		if (minHeight) {
			config.minHeight = minHeight;
		}

		if (maxHeight) {
			config.maxHeight = maxHeight;
		}

		return config;
	}

    addDraggable() {
		if( !this.getData( 'ltPropDraggable' ) ) {
			return ;
		}

		$L(this.wormhole).draggable({
			onDragStart: this.dragStart.bind(this),
			onStop: this.onStop.bind(this),
			cancel: '.lyteVideoProgressBar'
		} );
	}

    dragStart() {
		this.playing = this.isPlaying();
	}

    isPlaying() {
		var video = this.getVideo();

		return !!( video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2 );
	}

    onStop() {
		setTimeout( function() {
			var video = this.getVideo(),
				playingBeforeDrag = this.playing,
				playingAfterDrag = this.isPlaying();

			if (playingBeforeDrag && !playingAfterDrag) {
				video.play();
			}
			else if (!playingBeforeDrag && playingAfterDrag) {
				video.pause();
			}
		}.bind( this ), 0 );
	}

    disablePip() {
		var useBrowser = this.useBrowser();

		if (useBrowser) {
			this.disableBrowserPip();
		}
		else {
			this.disableManualPip();
		}
	}

    disableBrowserPip() {
		if( document.pictureInPictureElement ) {
			document.exitPictureInPicture();
		}
	}

    disableManualPip() {
		var wormhole = this.wormhole;

		wormhole.classList.remove('lytePipEnabled');
		wormhole.setAttribute('style', '');
		this.setNormalWindowWidth();
		this.removeResize();
		this.removeDraggable();

		window._lyteUiUtils.pictureInPictureElement = null;
	}

    setNormalWindowWidth() {
		var wormhole = this.wormhole;

		wormhole.style.width = '';
		wormhole.style.height = '';
	}

    removeResize() {
		if( !this.getData( 'ltPropResize' ) ) {
			return ;
		}

		$L( this.wormhole ).enableResize( 'destroy' );
	}

    removeDraggable() {
		if( !this.getData( 'ltPropDraggable' ) ) {
			return ;
		}

		$L( this.wormhole ).draggable( 'destroy' );
	}

    getVideo() {
		return this.wormhole.querySelector( 'video' );
	}

    getPipVideoContainer() {
		return this.$node.querySelector( '.lytePipVideoContainer' );
	}

    useBrowser() {
		return this.getData( 'ltPropUseBrowserApi' ) && document.pictureInPictureEnabled;
	}

    static actions(arg1) {
        return Object.assign(super.actions({
            enableFullScreen: function(){
                window.video = this.getVideo()
                if (window.video.requestFullscreen) {
                    window.video.requestFullscreen();
                  } else if (window.video.mozRequestFullScreen) {
                    window.video.mozRequestFullScreen();
                  } else if (window.video.webkitRequestFullscreen) {
                    window.video.webkitRequestFullscreen();
                  } else if (window.video.msRequestFullscreen) {
                    window.video.msRequestFullscreen();
                  }
            },
            disablePip: function () {
                window.video = this.getVideo()
                this.$node.ltProp( 'pipMode', false );
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            pipObserver: function() {
                var shouldEnablePip = this.getData( 'ltPropPipMode' );

                if( shouldEnablePip ) {
                    this.enablePip();
                }
                else {
                    this.disablePip();
                }
            }.observes( 'ltPropPipMode' )
        }), arg1);
    }

    _() {
        _;
    }
}

LytePipComponent._template = "<template tag-name=\"lyte-pip\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropPipMode,'&amp;&amp;',expHandlers(ltPropUseBrowserApi,'!'))}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lytePipPlaceholder\"> </div> </template></template> <lyte-wormhole lt-prop-append-on-creation=\"false\" lt-prop-append=\"{{expHandlers(ltPropPipMode,'&amp;&amp;',expHandlers(ltPropUseBrowserApi,'!'))}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"{{ltPropWrapperClass}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(expHandlers(ltPropHeaderYield,'&amp;&amp;',ltPropPipMode),'&amp;&amp;',expHandlers(ltPropUseBrowserApi,'!'))}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lytePipHeader\"> <lyte-yield yield-name=\"header\"></lyte-yield> </div> </template></template> <div class=\"lytePipVideoContainer\"> <lyte-yield yield-name=\"video\" class=\"lytePipVideoYield\"> <div class=\"lytePipFullScreenIconContainer\"> <div class=\"lytePipFullScreenIcon\" onclick=\"{{action('enableFullScreen',event)}}\"></div> </div> <div class=\"lytePipCloseIconContainer\"> <div class=\"lytePipCloseIcon\" onclick=\"{{action('disablePip',event)}}\"></div> </div> </lyte-yield> </div> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(expHandlers(ltPropFooterYield,'&amp;&amp;',ltPropPipMode),'&amp;&amp;',expHandlers(ltPropUseBrowserApi,'!'))}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lytePipFooter\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </div> </template></template> </div> </template> </lyte-wormhole> </template>";;
LytePipComponent._dynamicNodes = [{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":2,"sibl":[1]},{"t":"a","p":[3]},{"t":"r","p":[3,1],"dN":[{"t":"a","p":[1]},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[{"t":"i","p":[1,1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":2,"sibl":[1]},{"t":"a","p":[1,3,1,1,1]},{"t":"a","p":[1,3,1,3,1]},{"t":"i","p":[1,3,1],"in":1,"sibl":[0]},{"t":"s","p":[1,5],"c":{"lc_id_0":{"dN":[{"t":"i","p":[1,1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[2,1,0],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"cD","p":[3],"in":0},{"type":"dc","trans":true,"hc":true,"p":[1,0]}];;

LytePipComponent._observedAttributes = [
    "ltPropPipMode",
    "ltPropHeaderYield",
    "ltPropFooterYield",
    "ltPropPipWindowWidth",
    "ltPropPipWindowHeight",
    "ltPropResizeMinWidth",
    "ltPropResizeMaxWidth",
    "ltPropResizeMinHeight",
    "ltPropResizeMaxHeight",
    "ltPropResize",
    "ltPropDraggable",
    "ltPropUseBrowserApi",
    "ltPropWrapperClass",
    "actualVideoWidth",
    "actualVideoHeight"
];

export { LytePipComponent };

LytePipComponent.register("lyte-pip", {
    hash: "LytePipComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});