import { _defineProperty } from "@slyte/core/src/lyte-utils";
import "../helpers/helpers-dev.js";
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";
import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

/**
 * Renders a progressbar
 * @component lyte-progressbar
 * @version 1.0.0
 */
class LyteProgressbarComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({
			// ltPropValue : Lyte.attr("string",{"default":'0'}),

			/**
						 * @componentProperty {string} ltPropType
						 * @version 1.0.0
						 * @default bar
						 * @options bar,circle,stacked,vertical
						 */
			ltPropType: prop("string", { "default": 'bar' }),	//circle,vertical,stacked,bar

			/**
						 * @componentProperty {colorString} ltPropProgressFillColor
						 * @version 1.0.0
						 * @default #42a2eb
						 */
			ltPropProgressFillColor: prop("string", { "default": '#42a2eb' }),

			/**
						 * @componentProperty {colorString} ltPropCompletedFillColor
						 * @version 1.0.0
						 * @default #3fbd5f
						 */
			ltPropCompletedFillColor: prop("string", { "default": '#3fbd5f' }),

			/**
						 * @componentProperty {string} ltPropWidth
						 * @version 1.0.0
						 * @default 100%
						 * @suffix px,pt,cm,mm,vh,vm,em,%
						 */
			ltPropWidth: prop("string"/*,{"default":'100%'}*/),

			/**
						 * @componentProperty {string} ltPropHeight
						 * @version 1.0.0
						 * @default 12px
						 * @suffix px,pt,cm,mm,vh,vm,em
						 */
			ltPropHeight: prop("string"/*,{"default":'12px'}*/),

			/**
						 * @componentProperty {string} ltPropRadius
						 * @version 1.0.0
						 * @default 50
						 */
			ltPropRadius: prop("string", { "default": '50' }),

			/**
						 * @componentProperty {string} ltPropStroke
						 * @version 1.0.0
						 * @default 5
						 */
			ltPropStroke: prop("string", { "default": '5' }),

			/**
						 * @experimental ltPropValueCopy
						 */
			ltPropValueCopy: prop("string", { "default": '0' }),

			/**
						 * @componentProperty {boolean} ltPropAnimated
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			ltPropAnimated: prop("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropShowPercentage
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			ltPropShowPercentage: prop("boolean", { "default": true }),
			/**
			 * @typedef {object} progressProperty
			 * @property {string} value
			 * @property {string} duration
			 */
			/**
						 * @componentProperty {object} ltPropProgressProperty
						 * @version 1.0.0
						 * @default {"value":"0","duration" : "0s"}
						 */
			ltPropProgressProperty: prop('object', { "default": { "value": "0", "duration": "0s" } }),

			/**
						 * @componentProperty {string} ltPropLabel
						 * @version 1.0.0
						 */
			ltPropLabel: prop("string"),

			/**
						 * @componentProperty {string} ltPropFontSize
						 * @version 2.2.8
						 */
			ltPropFontSize: prop("string"),

			/**
						 * @componentProperty {colorString} ltPropLabelColor
						 * @version 3.1.0
						 */
			ltPropLabelColor: prop("string"),

			/**
						 * @experimental ltPropIndeterminate
						 */
			ltPropIndeterminate: prop("boolean", { "default": false }),

			/**
						 * @componentProperty {array} ltPropStack
						 * @version 3.1.0
						 */
			ltPropStack: prop("array", { "default": [] }),

			/**
						 * @componentProperty {up|down} ltPropDirection
						 * @version 3.1.0
						 * @default up
						 */
			ltPropDirection: prop("string", { "default": "up" }),		//up,down

			/**
						 * @componentProperty {boolean} ltPropPercentage
						 * @version 3.1.0
						 * @default true
						 * 
						 */
			ltPropPercentage: prop("boolean", { "default": true }),
			ltPropTooltip: prop("boolean", { "default": false }),
			lyteUnbound : prop("boolean", {"default" : false } ),
			ltPropAriaLabel: prop("string",{"default":'loading'}),
			percentage: prop('string', { "default": '0' }),
			duration: prop('string', { "default": '2s' }),
			timingfn: prop('string', { "default": 'linear' }),
			percentageDisplay: prop('string', { "default": '0' }),
			checkIndeterminate: prop("number", { "default": 0 }),
			chunks: prop("array", { "default": [] }),
			prevValues: prop("array", { "default": [] })
		}), arg1);
	}

    init() {
		if (!(this.getData('ltPropWidth'))) {
			this.setData('ltPropWidth', this.getData('ltPropType') == "vertical" ? '20px' : '100%');
		}
		if (!(this.getData('ltPropHeight'))) {
			this.setData('ltPropHeight', this.getData('ltPropType') == "vertical" ? '200px' : '12px');
		}
	}

    didConnect() {
		// this.setData('ltPropValueCopy',this.getData('ltPropValue'));
		if (this.getData('ltPropIndeterminate')) {
			this.setData('checkIndeterminate', this.getData('checkIndeterminate') + 1);
		}
		else {
			if (this.getData('ltPropType') == "stacked") {
				this.stackId = [];
			}
			$L.fastdom.mutate(this.setBackground.bind(this));
		}
		var _this = this;
		this.$node.value = function(value){
			_this.setData('ltPropProgressProperty.value',value);
		}


	}

    PerValue(value) {
		var type = this.getData('ltPropType');
		var duration =  this.getData('duration');
		var timingfn =  this.getData('timingfn');
		var percentage = this.getData('percentage');
		var _this = this;
		switch(type){
			case 'circle':
				var radius = this.data.ltPropRadius;
				var stroke =this.data.ltPropStroke;
				var r = (radius)-(stroke)/2;
				var strokeDash =  2 * 3.14159 * r;
				var circle = this.$node.querySelector('.ltProgressFillCircle');
				circle.style.transition = 'stroke-dashoffset '+ duration + ' ' + timingfn;
				var per = strokeDash * (1 - (value)/100);
				setTimeout(function(){
					circle.setAttribute('stroke-dashoffset', per);
				},10);
				break;
			case 'stacked':
				var progressbars = $L('.lyteProgressStatusStack',_this.$node);
					var stack = this.getData('ltPropStack')
				var addWidth =  function(){
					for(var index = 0; index < stack.length ; index++){
						progressbars[index].style.width = stack[index].value + '%'; 
					}
				}	
				var progressbars = $L('.lyteProgressStatusStack',_this.$node);
				var stack = this.getData('ltPropStack')
				for(var index = 0; index < stack.length ; index++){
					var timingfn = stack[index].timingfn|| 'linear';
					var duration = stack[index].duration || '0s';
					progressbars[index].style.transition = 'width ' + duration + ' ' + timingfn ; 
				}
				setTimeout(function(){
					addWidth();
				},10);
				break;
			default:
				if(type == 'vertical'){
					var progressbar = $L('.lyteProgressStatusVertical',_this.$node)[0];
				}else{
					var progressbar = $L('.lyteProgressStatus',_this.$node)[0];
				}
				
				progressbar.style.transition= 'width ' + duration + ' ' + timingfn;
				break;		
		}
			
	}

    ChangePercentage() {
		if (this.getData('ltPropIndeterminate')) {
			return;
		}
		this.setBackground();
	}

    setBackground() {
		var value = parseFloat(this.getData('ltPropProgressProperty').value);
		var duration = this.getData('ltPropProgressProperty').duration ? this.getData('ltPropProgressProperty').duration : this.getData('duration');
		if (this.getData('ltPropProgressProperty').timingfn) {
			this.setData('timingfn', this.getData('ltPropProgressProperty').timingfn);
		}
		if (this.getData('ltPropType') === 'circle') {
			if (parseInt(value) >= 100) {
				this.setData('duration', duration);
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('percentage', '100');
				duration = parseFloat(duration) * 1000;
				var self = this;
				if (this.sid) {
					window.clearTimeout(this.sid);
					this.sid = false;
				}
				this.sid = setTimeout(function () {
					self.sid = false;
					if (!self.$node) {
						clearTimeout(self.sid);
						return;
					}
					self.$node.querySelector('.lyteProgressBar').classList.add('lyteProgressCompleted');
					self.setData('ltPropBackground', self.getData('ltPropCompletedFillColor'));
				}, duration);
			}
			else {
				if (this.sid) {
					clearTimeout(this.sid);
					this.sid = false;
				}
				this.$node.querySelector('.lyteProgressBar').classList.remove('lyteProgressCompleted');
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('duration', duration);
				this.setData('percentage', value + "");
			}


		}
		else if (this.getData('ltPropType') === 'stacked') {
			// this.setChunks();
			var stacks = this.getData('ltPropStack');
			var bars = this.$node.querySelectorAll('.lyteProgressStatusStack');
			var prevValues = this.getData('prevValues');
			var left = 0;
			this.setData('duration', duration);
			for (var i = 0; i < stacks.length; i++) {
				value = parseFloat(stacks[i].value);
				// bars[i].style.width = value + "%";
				if (stacks[i].animated) {
					var animatedSpan = bars[i].querySelector('.ltPropProgressAnimated');
					animatedSpan.classList.add('progressMovingObj');
					animatedSpan.style.transition = 'left ' + duration + ' linear, width ' + duration + ' linear';
					animatedSpan.style.left = left + '%';
					animatedSpan.style.width = value + '%';
				}
				left += value;
				if (stacks[i].label) {
					bars[i].querySelector('.lyteProgressPercentageStack').innerHTML = stacks[i].label;
				}
				else {
					window.dur = parseFloat(stacks[i].duration || duration);
					if (this.stackId[i]) {
						clearInterval(this.stackId[i]);
						this.stackId[i] = false;
					}
					var p = prevValues[i] || 0,
						self = this,
						curr = { ind: i, value: value, ele: bars[i].querySelector('.lyteProgressPercentageStack'), p: p, stack: stacks[i] };
					if (dur == 0) {
						prevValues[i] = value;
						if (this.getData('ltPropShowPercentage')) {
							curr.ele.textContent = value + (this.getData('ltPropPercentage') ? "%" : "");
						}
					}
					else if (p > value) {
						var diff = p - value;
						curr.margin = ((diff / (dur * 1000)) * 100);
						this.stackId[i] = setInterval(this.changePercentageDisplay, 100, "dec", curr, this);
					}
					else if (p < value) {
						var diff = value - p;
						curr.margin = ((diff / (dur * 1000)) * 100);
						this.stackId[i] = setInterval(this.changePercentageDisplay, 100, "inc", curr, this);
					}
				}
			}
			this.PerValue(this.data.ltPropProgressProperty.value);
			return;
		}
		else if (this.getData('ltPropType') === 'vertical') {
			if (parseInt(value) >= 100) {
				this.setData('duration', duration);
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('percentage', '100');
				// this.$node.querySelector('.lyteProgressStatus').style.width = "100%";
				duration = parseFloat(duration) * 1000;
				var self = this;
				if (this.sid) {
					window.clearTimeout(this.sid);
					this.sid = false;
				}
				this.sid = setTimeout(function () {
					self.sid = false;
					self.$node.querySelector('.lyteProgressBar').classList.add('lyteProgressCompleted');
					self.setData('ltPropBackground', self.getData('ltPropCompletedFillColor'));
					// if(self.getData('ltPropAnimated')){
					// 	self.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.remove('progressMovingObj');	
					// }
				}, duration);
			}
			else {
				if (this.sid) {
					clearTimeout(this.sid);
					this.sid = false;
				}
				this.$node.querySelector('.lyteProgressBar').classList.remove('lyteProgressCompleted');
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				// if(this.getData('ltPropAnimated')){
				// 	this.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.add('progressMovingObj');	
				// }
				this.setData('duration', duration);
				this.setData('percentage', value + "");

				// this.$node.querySelector('.lyteProgressStatus').style.width = value + "%";
			}
		}
		else {
			if (parseInt(value) >= 100) {
				this.setData('duration', duration);
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				this.setData('percentage', '100');
				// this.$node.querySelector('.lyteProgressStatus').style.width = "100%";
				duration = parseFloat(duration) * 1000;
				var self = this;
				if (this.sid) {
					window.clearTimeout(this.sid);
					this.sid = false;
				}
				this.sid = setTimeout(function () {
					self.sid = false;
					self.$node.querySelector('.lyteProgressBar').classList.add('lyteProgressCompleted');
					self.setData('ltPropBackground', self.getData('ltPropCompletedFillColor'));
					if (self.getData('ltPropAnimated')) {
						self.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.remove('progressMovingObj');
					}
				}, duration);
			}
			else {
				if (this.sid) {
					clearTimeout(this.sid);
					this.sid = false;
				}
				this.$node.querySelector('.lyteProgressBar').classList.remove('lyteProgressCompleted');
				this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
				if (this.getData('ltPropAnimated')) {
					this.$node.querySelector('.lyteProgressBar .ltPropProgressAnimated').classList.add('progressMovingObj');
				}
				this.setData('duration', duration);
				this.setData('percentage', value + "");

				// this.$node.querySelector('.lyteProgressStatus').style.width = value + "%";
			}
		}
		if (this.iId) {
			clearInterval(this.iId);
			this.iId = false;
		}
		var p = parseFloat(this.getData('percentageDisplay')),
			self = this;
		if (parseInt(this.getData('duration')) == 0) {
			this.setData('percentageDisplay', value + "");
		}
		else if (p > value) {
			var diff = p - value;
			var margin = ((diff / (parseInt(this.getData('duration')) * 1000)) * 100);
			this.iId = setInterval(function () {
				p -= margin;
				if (!self.$node) {
					clearInterval(self.iId);
					self.iId = false;
					return;
				}
				self.setData('percentageDisplay', Math.max(parseFloat(p.toFixed(2)), value) + "");
				if (parseFloat(p) == value) {
					clearInterval(self.iId);
					self.iId = false;
				}
			}, 100)
		}
		else if (p < value) {
			var diff = value - p;
			var margin = ((diff / (parseInt(this.getData('duration')) * 1000)) * 100);
			this.iId = setInterval(function () {
				p += margin;
				if (!self.$node) {
					clearInterval(self.iId);
					self.iId = false;
					return;
				}
				self.setData('percentageDisplay', Math.min(parseFloat(p.toFixed(2)), value) + "");
				if (parseFloat(p) >= value) {
					clearInterval(self.iId);
					self.iId = false;
				}
			}, 100)
		}
		this.PerValue(this.data.ltPropProgressProperty.value);

	}

    changePercentageDisplay(cond, chunk, comp) {
		
		if (cond == "inc") {
			chunk.p += chunk.margin;
		}
		else {
			chunk.p -= chunk.margin
		}
		if (!comp.$node) {
			clearInterval(comp.stackId[chunk.ind]);
			comp.stackId[chunk.ind] = false;
			return;
		}
		var pd = cond == "inc" ? Math.min(parseFloat(chunk.p.toFixed(2)), chunk.value) : Math.max(parseFloat(chunk.p.toFixed(2)), chunk.value);
		if (comp.getData('ltPropShowPercentage')) {
			chunk.ele.textContent = pd + (comp.getData('ltPropPercentage') ? "%" : "");
		}
		if ((cond == "inc" && parseFloat(pd) >= chunk.value) || (cond == "dec" && parseFloat(pd) == chunk.value)) {
			clearInterval(comp.stackId[chunk.ind]);
			comp.$addon.arrayUtils(comp.getData('prevValues'), 'replaceAt', chunk.ind, chunk.value);
			comp.stackId[chunk.ind] = false;
		}
	}

    setCircleStroke(circle, val) {
		var per = circle.getAttribute('stroke-dasharray') * (1 - parseInt(val) / 100);
		circle.setAttribute('stroke-dashoffset', per);
	}

    didDestroy() {
		if (this.sid) {
			window.clearTimeout(this.sid);
			this.sid = false;
		}
		if (this.iId) {
			window.clearInterval(this.iId);
			this.iId = false;
		}
		if (this.stackId) {
			this.stackId.forEach(function (item, index) {
				if (item) {
					window.clearTimeout(this.sid);
					item = false;
				}
			});
		}
	}

    static observers(arg1) {
        return Object.assign(super.observers({
            setChunks: function () {
                if (this.getData('ltPropType') != "stacked") {
                    return;
                }
                var chunks = this.getData('chunks');
                var prop = this.getData('ltPropStack');
                var prevValues = this.getData('prevValues');
                if (chunks.length != prop.length) {
                    chunks = [];
                    for (var i = 0; i < prop.length; i++) {
                        chunks.push(i);
                    }
                    this.setData('chunks', chunks);
                    if (prevValues.length == 0) {
                        for (var i = 0; i < prop.length; i++) {
                            prevValues.push(0);
                        }
                    }
                    else if (prevValues.length > prop.length) {
                        prevValues.splice(prop.length);
                    }
                    else if (prevValues < prop.length) {
                        for (var i = prevValues.length; i < prop.length; i++) {
                            prevValues.push(0);
                        }
                    }
                    this.setData('prevValues', prevValues);
                }
            }.observes('ltPropStack.[]').on('init'),

            observeIndeterminate: function () {
                if (this.getData('ltPropType') == "bar") {
                    if (this.getData('ltPropIndeterminate') && this.getData('ltPropAnimated')) {
                        this.setData('ltPropBackground', this.getData('ltPropProgressFillColor'));
                        this.setData('duration', '0s');
                        this.setData('percentage', '100');
                    }
                }
            }.observes('ltPropIndeterminate', 'checkIndeterminate'),

            setProgressFillColor : function(){
                if($L('.lyteProgressStatus',this.$node)[0]){
                    $L('.lyteProgressStatus',this.$node)[0].style.backgroundColor = this.getData('ltPropProgressFillColor');
                }else if($L('.ltProgressFillCircle',this.$node)[0]){
                    $L('.ltProgressFillCircle',this.$node)[0].setAttribute('stroke',this.getData('ltPropProgressFillColor'));
                }else if($L('.lyteProgressStatusVertical',this.$node[0])){
                    $L('.lyteProgressStatusVertical',this.$node)[0].style.backgroundColor = this.getData('ltPropProgressFillColor');
                }	
                this.data.ltPropBackground = this.getData('ltPropProgressFillColor');
            }.observes('ltPropProgressFillColor'),

            percentageChange: function (obj) {
                this.ChangePercentage();
            }.observes('ltPropProgressProperty', 'ltPropStack.[]', 'ltPropProgressProperty.value')
        }), arg1);
    }

    _() {
        _;
    }
}

LyteProgressbarComponent._template = "<template tag-name=\"lyte-progressbar\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiIfEquals(ltPropType,'circle')}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lyteProgressBar lyteCircle\" style=\"{{lyteUiConcat('width:',lyteUiSetWH(ltPropRadius),'px; height:',lyteUiSetWH(ltPropRadius),'px;')}}\" role=\"progressbar\" tabindex=\"0\" aria-valuenow=\"{{percentage}}\" aria-label=\"{{ltPropAriaLabel}}\" aria-live=\"polite\"> <div class=\"lyteCircleType\"> <svg class=\"svgValueEle\" width=\"{{lyteUiSetWH(ltPropRadius)}}\" height=\"{{lyteUiSetWH(ltPropRadius)}}\"> <circle class=\"ltProgressCircle\" cx=\"{{ltPropRadius}}\" cy=\"{{ltPropRadius}}\" r=\"{{lyteUiSetRadius(ltPropRadius,ltPropStroke)}}\" fill=\"none\" stroke=\"#DCE0E3\" stroke-width=\"{{ltPropStroke}}\"></circle> <circle class=\" ltProgressFillCircle\" cx=\"{{ltPropRadius}}\" cy=\"{{ltPropRadius}}\" r=\"{{lyteUiSetRadius(ltPropRadius,ltPropStroke)}}\" fill=\"none\" stroke=\"{{ltPropBackground}}\" stroke-width=\"{{ltPropStroke}}\" stroke-dasharray=\"{{lyteUiSetDashArray(ltPropRadius,ltPropStroke)}}\" stroke-dashoffset=\"{{lyteUiSetDashArray(ltPropRadius,ltPropStroke)}}\" lt-prop-title=\"{{if(ltPropTooltip,lyteUiConcat(percentage,'%'),'')}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;left&quot;}\"></circle> </svg> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowPercentage}}\" is=\"case\" lc-id=\"lc_id_0\"> <svg width=\"{{lyteUiSetWH(ltPropRadius)}}\" height=\"{{lyteUiSetWH(ltPropRadius)}}\" style=\"transform:{{lyteUiTextTransform(ltPropRadius)}}\" viewBox=\"{{lyteUiConcat('0 ','0 ',lyteUiSetWH(ltPropRadius),' ',lyteUiSetWH(ltPropRadius))}}\" fill=\"{{if(ltPropLabelColor,ltPropLabelColor,'#333')}}\" aria-hidden=\"true\"> <text font-size=\"{{if(ltPropFontSize,ltPropFontSize,'1.5rem')}}\" text-anchor=\"middle\" dy=\".2em\" x=\"50%\" y=\"50%\"> {{lyteUiProgressbarLabel(ltPropLabel,percentageDisplay,ltPropPercentage)}} </text> </svg> </template></template> </div> </div> </template><template case=\"{{lyteUiIfEquals(ltPropType,'stacked')}}\" is=\"case\" lc-id=\"lc_id_1\"> <div class=\"{{lyteUiConcat('lyteProgressBar',' lyteHorizontal',' lyteStacked')}}\" style=\"{{lyteUiConcat('width:',ltPropWidth,';height:',ltPropHeight)}}\" role=\"progressbar\" tabindex=\"0\" aria-valuenow=\"{{percentage}}\" aria-label=\"{{ltPropAriaLabel}}\"> <template items=\"{{chunks}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"> <span class=\"lyteProgressStatusStack\" style=\"{{lyteUiConcat('width: ',percentage,'% ;','background:',lyteUiGetStackValue(ltPropStack,index,'color'),';')}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiGetStackValue(ltPropStack,index,'animated')}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"ltPropProgressAnimated progressMovingObj\"></span> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowPercentage}}\" is=\"case\" lc-id=\"lc_id_0\"> <span case=\"true\" class=\"lyteProgressPercentageStack\" lt-prop-title=\"{{if(ltPropTooltip,lyteUiProgressbarLabel(lyteUiGetStackValue(ltPropStack,index,'value'),''),'')}}\" style=\"{{lyteUiConcat('line-height:',ltPropHeight,'; font-size: ',if(ltPropFontSize,ltPropFontSize,'12px'),'; color: ',if(lyteUiGetStackValue(ltPropStack,index,'labelColor'),lyteUiGetStackValue(ltPropStack,index,'labelColor'),'#fff'),';')}}\" aria-hidden=\"true\"> {{lyteUiProgressbarLabel(lyteUiGetStackValue(ltPropStack,index,'label'),'')}} </span> </template></template> </span> </template> </div> </template><template case=\"{{lyteUiIfEquals(ltPropType,'vertical')}}\" is=\"case\" lc-id=\"lc_id_2\"> <div class=\"lyteProgressBar lyteVertical\" style=\"{{lyteUiConcat('width:',ltPropWidth,';height:',ltPropHeight)}}\" role=\"progressbar\" tabindex=\"0\" aria-valuenow=\"{{percentage}}\" aria-label=\"{{ltPropAriaLabel}}\"> <span class=\"{{lyteUiConcat('lyteProgressStatusVertical ',ltPropDirection)}}\" lt-prop-title=\"{{if(ltPropTooltip,lyteUiConcat(percentage,'%'),'')}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;left&quot;}\" style=\"{{lyteUiConcat('height: ',percentage,'% ;','transition:','height ',duration,' ',timingfn,';','background: ',ltPropBackground,';','display: block')}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowPercentage}}\" is=\"case\" lc-id=\"lc_id_0\"> <span case=\"true\" class=\"lyteProgressPercentage\" style=\"{{lyteUiConcat('line-height:',ltPropHeight,'; font-size: ',if(ltPropFontSize,ltPropFontSize,'12px'),'; color: ',if(ltPropLabelColor,ltPropLabelColor,'#fff'),';')}}\" aria-hidden=\"true\"> {{lyteUiProgressbarLabel(ltPropLabel,percentageDisplay,ltPropPercentage)}} </span> </template></template> </span> </div> </template><template default=\"\"> <div class=\"{{lyteUiConcat('lyteProgressBar',' lyteHorizontal',if(ltPropIndeterminate,' lyteIndeterminate',''))}}\" style=\"{{lyteUiConcat('width:',ltPropWidth,';height:',ltPropHeight)}}\" role=\"progressbar\" tabindex=\"0\" aria-valuenow=\"{{percentage}}\" aria-label=\"{{ltPropAriaLabel}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(expHandlers(ltPropAnimated,'!'),'&amp;&amp;',ltPropIndeterminate)}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"inc\" style=\"{{lyteUiConcat('position: absolute; height: 100%; background: ',ltPropProgressFillColor)}}\"></span> <span class=\"dec\" style=\"{{lyteUiConcat('position: absolute; height: 100%; background: ',ltPropProgressFillColor)}}\"></span> </template><template default=\"\"> <span class=\"lyteProgressStatus\" lt-prop-title=\"{{if(ltPropTooltip,lyteUiConcat(percentage,'%'),'')}}\" style=\"{{lyteUiConcat('width: ',percentage,'% ;','transition: ','width ',duration,' ',timingfn,';','background:',ltPropBackground)}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropAnimated}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"ltPropProgressAnimated progressMovingObj\"></span> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(expHandlers(ltPropIndeterminate,'!'),'&amp;&amp;',ltPropShowPercentage)}}\" is=\"case\" lc-id=\"lc_id_0\"> <span case=\"true\" class=\"lyteProgressPercentage\" style=\"{{lyteUiConcat('line-height:',ltPropHeight,'; font-size: ',if(ltPropFontSize,ltPropFontSize,'12px'),'; color: ',if(ltPropLabelColor,ltPropLabelColor,'#fff'),';')}}\" aria-hidden=\"true\"> {{lyteUiProgressbarLabel(ltPropLabel,percentageDisplay,ltPropPercentage)}} </span> </template></template> </span> </template></template> </div> </template></template> </template>";;
LyteProgressbarComponent._dynamicNodes = [{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'",null,"'px; height:'",null,"'px;'"]}}},"cn":"lc_id_0"},{"t":"a","p":[1,1,1],"cn":"lc_id_0"},{"t":"a","p":[1,1,1,1],"cn":"lc_id_0"},{"t":"a","p":[1,1,1,3],"cn":"lc_id_0"},{"t":"s","p":[1,1,3],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'transform:'",{"type":"helper","value":{"name":"lyteUiTextTransform","args":["ltPropRadius"]}}]}}},"cn":"lc_id_0"},{"t":"a","p":[1,1],"cn":"lc_id_0"},{"t":"tX","p":[1,1,1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true},"lc_id_1":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","';height:'","ltPropHeight"]}}},"cn":"lc_id_1"},{"t":"a","p":[1,1],"cn":"lc_id_1"},{"t":"f","p":[1,1],"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width: '","percentage","'% ;'","'background:'",null,"';'"]}}}},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"sibl":[0]},{"t":"s","p":[1,3],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'line-height:'","ltPropHeight","'; font-size: '",null,"'; color: '",null,"';'"]}}},"cn":"lc_id_0"},{"t":"tX","p":[1,1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"]}],"cn":"lc_id_1"}],"cdp":{"t":"a","p":[1]},"dcn":true},"lc_id_2":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","';height:'","ltPropHeight"]}}},"cn":"lc_id_2"},{"t":"a","p":[1,1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'height: '","percentage","'% ;'","'transition:'","'height '","duration","' '","timingfn","';'","'background: '","ltPropBackground","';'","'display: block'"]}}},"cn":"lc_id_2"},{"t":"s","p":[1,1,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'line-height:'","ltPropHeight","'; font-size: '",null,"'; color: '",null,"';'"]}}},"cn":"lc_id_0"},{"t":"tX","p":[1,1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"cn":"lc_id_2"}],"cdp":{"t":"a","p":[2]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","';height:'","ltPropHeight"]}}},"cn":"default"},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'position: absolute; height: 100%; background: '","ltPropProgressFillColor"]}}},"cn":"lc_id_0"},{"t":"a","p":[3],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'position: absolute; height: 100%; background: '","ltPropProgressFillColor"]}}},"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width: '","percentage","'% ;'","'transition: '","'width '","duration","' '","timingfn","';'","'background:'","ltPropBackground"]}}},"cn":"default"},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"sibl":[0],"cn":"default"},{"t":"s","p":[1,3],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'line-height:'","ltPropHeight","'; font-size: '",null,"'; color: '",null,"';'"]}}},"cn":"lc_id_0"},{"t":"tX","p":[1,1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"cn":"default"}]},"dc":{"lc_id_0":{},"default":{}},"hd":true,"co":["lc_id_0"],"cn":"default"}]},"dc":{"lc_id_0":{},"lc_id_1":{},"lc_id_2":{},"default":{}},"hd":true,"co":["lc_id_0","lc_id_1","lc_id_2"]}];;

LyteProgressbarComponent._observedAttributes = [
    "ltPropType",
    "ltPropProgressFillColor",
    "ltPropCompletedFillColor",
    "ltPropWidth",
    "ltPropHeight",
    "ltPropRadius",
    "ltPropStroke",
    "ltPropValueCopy",
    "ltPropAnimated",
    "ltPropShowPercentage",
    "ltPropProgressProperty",
    "ltPropLabel",
    "ltPropFontSize",
    "ltPropLabelColor",
    "ltPropIndeterminate",
    "ltPropStack",
    "ltPropDirection",
    "ltPropPercentage",
    "ltPropTooltip",
    "lyteUnbound",
    "ltPropAriaLabel",
    "percentage",
    "duration",
    "timingfn",
    "percentageDisplay",
    "checkIndeterminate",
    "chunks",
    "prevValues"
];

/**
 * @syntax nonYielded 
 * @attribute ltPropType=circle
 * <lyte-progressbar lt-prop = '{"type":"circle","progressProperty" : {"value" : "20", "duration" : "2s"}}'>
 * </lyte-progressbar>
 */

/**
* @syntax nonYielded 
* @attribute ltPropType=bar
* <lyte-progressbar lt-prop = '{"progressProperty" : {"value": "25.89", "duration" : "2s"}}'>
* </lyte-progressbar>
*/

export { LyteProgressbarComponent };

LyteProgressbarComponent.register("lyte-progressbar", {
    hash: "LyteProgressbarComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});