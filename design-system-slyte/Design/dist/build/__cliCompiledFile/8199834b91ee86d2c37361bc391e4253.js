import { _defineProperty } from "@slyte/core/src/lyte-utils";
import "../helpers/helpers-dev.js";
import './lyte-checkbox.js';
import './lyte-text.js';
import './lyte-hovercard.js';
import './lyte-dropdown.js';

//need to add observers from v3
import { prop } from "../../../../@slyte/core/index.js";

import { Component } from "../component.js";
import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

/**
 * Renders a multi-dropdown
 * @component lyte-multi-dropdown
 * @version 3.0.0
 * @methods onShow,onBeforeShow,onScroll,onPositionChanged,onChange,beforeSelect,onHide,onBeforeHide,onAdd,onBeforeAdd,onRemove,onBeforeRemove,onOptionSelected
 * @dependencies lyte-dropdown,lyte-checkbox,lyte-text,lyte-hovercard
 */

class LyteMultiDropdownComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({

				/**
				 * @componentProperty {array} ltPropData
				 * @default []
				 * @version 3.0.0
				 */

				'ltPropData': prop('array',{'default': []}),

				/**
				 * @componentProperty {number} ltPropMaxCount
				 * @default undefined
				 * @version 3.0.0
				 */

				'ltPropMaxCount': prop('number', {'default' : undefined}),

				/**
				 * @componentProperty {array} ltPropSelected
				 * @default []
				 * @version 3.0.0
				 */

				'ltPropSelected': prop('array',{'default':[]}),

				/**
				 * @componentProperty {array} ltPropDisabledList
				 * @default []
				 * @version 3.0.0
				 */

				'ltPropDisabledList': prop('array',{'default':[]}),

				/**
				 * @componentProperty {boolean} ltPropDisbled
				 * @default false
				 * @version 3.0.0
				 */

				'ltPropDisabled': prop('boolean',{'default': false}),

				/**
				 * @componentProperty {boolean} ltPropYield
				 * @default false
				 * @version 3.0.0
				 */

				'ltPropYield': prop('boolean',{'default': false}),

				/**
				 * @componentProperty {string} ltPropType
				 * @default 'default'
				 * @version 3.0.0
				 */

				'ltPropType': prop('string',{ "default": 'default'}),

				'multiTextArray': prop('array',{'default': []}),

				'multiText': prop('string',{'default':""}),

				// 'ltPropClear': Lyte.attr('boolean',{'default':true}),

				'multiTextForHovercard': prop('string',{'default':""}),
				
				'numInText': prop('number',{'default': 0}),

				/**
				 * @componentProperty {string} ltPropUserValue
				 * @default ''
				 * @version 3.0.0
				 */

				'ltPropUserValue': prop('string',{'default':''}),

				/**
				 * @componentProperty {string} ltPropSystemValue
				 * @default ''
				 * @version 3.0.0
				 */

				'ltPropSystemValue': prop('string',{'default':''}),

				/**
				 * @componentProperty {boolean} ltPropShowCount
				 * @default false
				 * @version 3.0.0
				 */

				'ltPropShowCount': prop('boolean',{'default':false}),

				'showPlace': prop('boolean',{ 'default': true}),

				/**
				 * @componentProperty {boolean} ltPropDataYield
				 * @default false
				 * @version 3.0.0
				 */

				'ltPropDataYield': prop('boolean',{'default': false}),

				/**
				 * @componentProperty {string} ltPropPlaceholder
				 * @default 'Select Value'
				 * @version 3.0.0
				 */

				'ltPropPlaceholder': prop('string',{'default': 'Select Value'})
		}), arg1);		
	}

    static actions(arg1) {
        return Object.assign(super.actions({
            multiRemoveitem: function(){
                if((window.event.target.tagName=="LYTE-DROP-ITEM"  && window.event.target.classList.contains('lyteDropdownActive')) || ( $L(window.event.target).closest('lyte-drop-item')[0] && $L(window.event.target).closest('lyte-drop-item')[0].classList.contains('lyteDropdownActive'))){
                    if(window.event && window.event.stopPropagation ){
                        window.event.stopPropagation();
                    }

                    var cont=window.event.target;
                    if(window.event.target.tagName!="LYTE-DROP-ITEM"){
                        cont=$L(cont).closest('lyte-drop-item')[0];
                    }
        
                    var selList=$L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList');
                    var currValue=(cont.getAttribute('data-value'));
                    var disabledList = this.getData('ltPropDisabledList');

                    if( disabledList.includes(currValue)){	//when a item is already in selected list and already disabled, this prevents to unselect that item
                        return;
                    }

                    var itemToBeRemoved;
                    selList.forEach(function(listItem,index){
                        if(listItem.value===currValue){
                                itemToBeRemoved=listItem;
                        };
                    });
                    if(itemToBeRemoved){
                        this.$addon.arrayUtils($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList'),'removeObjects',itemToBeRemoved);
                    }

                    var dropCtxt=$L(this.$node).find('lyte-dropdown')[0].component;

                    // if(selList.length==0){
                    // 	// this.setData('showPlace','true');
                    // }
                    var multicalbck = $L(this.$node).find('lyte-dropdown')[0].component.childComp.querySelectorAll("lyte-drop-item[data-value='"+currValue+"']")[0];
                    if(this.getMethods('onRemove')){
                        this.executeMethod('onRemove',window.event,currValue,dropCtxt.getData('ltPropSelected'),this,'click',multicalbck);
                    }
                }
            },
            clearAll: function(){
                while($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList').length>0){
                    this.$addon.arrayUtils($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList'),'pop');
                    this.$addon.arrayUtils(this.getData('multiTextArray'),'pop');
                };
                this.setData('multiText','');
            }
        }), arg1);
    }

    static methods(arg1) {
        return Object.assign(super.methods({

            defaultBeforeAdd: function(event,selected,ltSelected,cthis,item){

                if(event.target.tagName==="LYTE-DROP-ITEM"){
                    if($L(event.target).find('lyte-checkbox')[0].getData('ltPropChecked')){
                        window._lyteUiUtils.multiDropEvent = event; 
                        $L(event.target).find('lyte-checkbox')[0].setData('ltPropChecked','false');
                        return false;
                    }
                    else
                    {
                        $L(item).find('lyte-checkbox')[0].setData('ltPropChecked','true') ;
                    }
                }

                var selList=cthis.$node.getData('ltPropSelectedList');
                var count=(selList.length);

                if(count>=parseInt(this.getData('ltPropMaxCount'))){
                    $L(item).find('lyte-checkbox')[0].setData('ltPropChecked','false') ;
                    return false;
                }
                if(this.getMethods('onBeforeAdd')){
                    this.executeMethod('onBeforeAdd',event,selected,ltSelected,cthis,item);
                }
            },
            defaultAdd: function(event,selected,ltSelected,cthis,item){

                this.setData('showPlace','false');	
                this.RemoveAndAddSelection(item);

                if(this.getMethods('onAdd')){ 
                    this.executeMethod('onAdd',event,selected,ltSelected,this,item);
                }
            },

            defaultBeforeUnchecked: function(input,cthis,event,action){

                if(event && event.stopPropagation){
                    event.stopPropagation();
                }

                var selList=$L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList');
                var currValue=($L(cthis.$node).closest('lyte-drop-item')[0].getAttribute('data-value'));

                var itemToBeRemoved;
                selList.forEach(function(listItem,index){
                    if(listItem.value===currValue){
                            itemToBeRemoved=listItem;
                    };
                });

                if(itemToBeRemoved){
                    this.$addon.arrayUtils($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList'),'removeObjects',itemToBeRemoved);
                }
                var calbckItem=$L(cthis.$node).closest('lyte-drop-item')[0];
                
                var dropCtxt=$L(this.$node).find('lyte-dropdown')[0].component;

                //to stop calling callback when item is not even added,
                // but control is here because of unchecking the checkbox when manually unchecking the box due to reaching maxcount.
                var count=(selList.length);
                if(count>=parseInt(this.getData('ltPropMaxCount'))){
                    return ;
                }
                // if(count==0){
                // 	// this.setData('showPlace','true')
                // }
                
                //when not clicked in label or checkbox of drop-item the event attribute becomes empty
                
                if(action == 'script' && window._lyteUiUtils && window._lyteUiUtils.multiDropEvent){
                    event = window._lyteUiUtils.multiDropEvent;
                }
                if(this.getMethods('onRemove')){
                    this.executeMethod('onRemove',event,currValue,dropCtxt.getData('ltPropSelected'),this,'click',calbckItem);
                }

            },

            multiBeforeAdd: function(event,selected,ltSelected,cthis,item){
                var selList=cthis.$node.getData('ltPropSelectedList');
                var count=(selList.length);

                if(count>=parseInt(this.getData('ltPropMaxCount'))){
                    return false;
                }

                if(this.getMethods('onBeforeAdd')){ 
                    this.executeMethod('onBeforeAdd',event,selected,ltSelected,cthis,item);
                }
                
            },

            multiAdd: function(event,selected,ltSelected,cthis,item){
                this.setData('showPlace','false');
                this.RemoveAndAddSelection(item);

                if(this.getMethods('onAdd')){ 
                    this.executeMethod('onAdd',event,selected,ltSelected,this,item);
                }

            },

            onOptionSelected: function(){},
            onShow: function(){},
            onBeforeShow: function(){},
            onHide: function(){},
            onBeforeHide: function(){},
            onBeforeRemove: function(){},
            onPositionChanged: function(){},
            beforeSelect: function(){},
            onChange: function(){},
            onScroll: function(){},
            onSearch: function(){}
            
        }), arg1);
    }

    checkboxCheck(val, bool) {

			//checking the checkbox if ltPropSelected is changed through js
			var drop = $L(this.$node).find('lyte-dropdown')[0].component;
			var par;
			
			if( drop && drop.childComp ){
				par = drop.childComp;
			}
			else{
				par = drop.$node.querySelector('lyte-drop-body');
			}
			if( !drop || !par ){ return; }
			var item = par.querySelector("lyte-drop-item[data-value='"+val+"']");
			if( item ){
				var chkbox = item.querySelector('lyte-checkbox');
			}
			if( chkbox && chkbox.getData('ltPropChecked') !== bool ){
				chkbox.setData('ltPropChecked',bool);
			}
	}

    RemoveAndAddSelection(item) {
		var nextElement=item.nextElementSibling,nextParent,prevElem=item.previousElementSibling;
		var parent = item.parentElement;
		if( parent ){
			nextParent = parent.nextElementSibling;
		}

		if(parent.tagName === 'LYTE-DROP-GROUP' && !item.nextElementSibling && nextParent &&
			nextParent.tagName === 'LYTE-DROP-GROUP' && nextParent.children && nextParent.children[1] &&
				nextParent.children[1].classList && nextParent.children[1].classList.contains('lyteDropdownSelection')){
					nextParent.children[1].classList.remove('lyteDropdownSelection');
					item.classList.add('lyteDropdownSelection');
		}
		else if(nextElement && nextElement.classList && nextElement.classList.contains('lyteDropdownSelection')){
			nextElement.classList.remove('lyteDropdownSelection');
			item.classList.add('lyteDropdownSelection');
		}
		else if(prevElem && prevElem.classList && prevElem.classList.contains('lyteDropdownSelection')){
			prevElem.classList.remove('lyteDropdownSelection');
			item.classList.add('lyteDropdownSelection');
		}
	}

    static observers(arg1) {
        return Object.assign(super.observers({
            updateButton: function( change ){
                var lyteSelf = this;
                if( !this.getData('ltPropSelected') ){	//if selected is undefined, setting it to empty arr
                    this.setData('ltPropSelected',[]);
                }
                var changedItem = change.insertedItems ? change.insertedItems : change.removedItems;
                if( !changedItem ){
                    changedItem = change.newValue;
                }
                if( !changedItem ){
                    return;
                }
                if( change.newValue || change.oldValue ){
                    while( this.getData('multiTextArray').length > 0 ){
                        this.$addon.arrayUtils(this.getData('multiTextArray'),'pop');
                    }
                }
                changedItem.forEach(function( item ){
                    var usr=this.getData('ltPropUserValue');
                    var sys=this.getData('ltPropSystemValue');

                    var updateValue = item[usr];
                    if(this.getData('ltPropDataYield') ){
                        var data=this.getData('ltPropData');
                        
                        for( var i=0;i<data.length;i++ ){
                            if( data[i][sys]==item[sys] ){
                                updateValue = data[i][usr] ;
                                break;
                            }
                        }
                    }
                    if( change.insertedItems && updateValue && this.getData( 'multiTextArray' ).indexOf( updateValue ) === -1  ){
                        lyteSelf.$addon.arrayUtils( this.getData( 'multiTextArray' ), 'push', updateValue );
                    }
                    else if( change.removedItems  ){
                        for( var i = 0; i < this.getData( 'multiTextArray' ).length; i++ ) {
                            if( this.getData( 'multiTextArray' )[ i ] == updateValue ) {
                                lyteSelf.$addon.arrayUtils( this.getData( 'multiTextArray' ), 'removeAt', i, 1 );
                                break;
                            }
                        }
                    }
                    else if( (change.newValue || change.oldValue)  ){
                        lyteSelf.$addon.arrayUtils( this.getData( 'multiTextArray' ), 'push', updateValue );
                    }

                }.bind(this));

                if( this.getData('ltPropType')=='checkbox'){
                    this.getData('ltPropData').forEach( function( element ){
                        var usr = this.getData('ltPropUserValue');
                        var sys = this.getData('ltPropSystemValue');
                        // if( !this.getData('ltPropDisabledList').includes(element[sys])){
                            this.checkboxCheck( element[this.getData('ltPropSystemValue')], this.getData('multiTextArray').includes(element[usr]) );
                        // }
                    }.bind(this));
                }

                if(this.getData('ltPropSelected').length > 0 && this.getData('showPlace')){
                    this.setData('showPlace',false);
                }
                else if( this.getData('ltPropSelected').length == 0 && !this.getData('showPlace')){
                    this.setData('showPlace',true);
                }
                var text=this.getData('multiTextArray').join(", ");
                this.setData('multiText',text);
                text=this.getData('multiTextArray').join('<br>');
                this.setData('multiTextForHovercard',text);

                if(!this.getData('ltPropShowCount')){
                    var buttonWidth=$L(this.$node).find('lyte-drop-button')[0].offsetWidth;
                    if(parseInt(buttonWidth)>=330){
                        $L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','true');
                        // this.checkForCount();
                    }
                    else{
                        $L(this.$node).find('lyte-drop-button')[0].setAttribute('lyte-hovercard','');
                    }
                }
            }.observes('ltPropSelected.[]'),

            disableCheckbox: function(){
                if( !this.getData('ltPropType') === 'checkbox'){
                    return;
                }
                var drop = $L(this.$node).find('lyte-dropdown')[0].component;
                var par;
                if( drop && drop.childComp ){
                    par = drop.childComp;
                }
                else{
                    par = drop.$node.querySelector('lyte-drop-body');
                }
                if( !drop || !par ){ return; }

                var options = par.querySelectorAll('lyte-drop-item');
                for( var ind=0;ind<options.length;ind++ ){
                    var val = options[ind].getAttribute('data-value');
                    var bool = this.getData('ltPropDisabledList').includes(val);
                    var box = options[ind].querySelector('lyte-checkbox');
                    if( box ){
                        box.setData('ltPropDisabled',bool);
                    }
                }
            }.observes('ltPropDisabledList.[]','ltPropDisabledList').on('didConnect'),

            hoverCardInit: function(){
                if(!window._lyteUiUtils.multiDropGlobe){
                    window._lyteUiUtils.multiDropGlobe={'ind':0};
                }
                else{
                    window._lyteUiUtils.multiDropGlobe.ind+=1;
                }
            }.observes('ltPropType').on('init'),

            //to manually show hovercard
            // checkForCount: function(){
            // 	if(this.getData('ltPropShowCount')){
            // 		var dupMultiTextArray=Array.from(this.getData('multiTextArray'));
            // 		while($L(this.$node).find('lyte-drop-button')[0].offsetWidth>=330){
            // 			dupMultiTextArray.pop();
            // 			this.setData('multiText',dupMultiTextArray.join(",")+'dummy text.....');
            // 		}
            // 		var dupText=dupMultiTextArray.join(', ');
            // 		this.setData('numInText',($L(this.$node).find('lyte-dropdown')[0].getData('ltPropSelectedList').length)-(dupMultiTextArray.length));
            // 		this.setData('multiText',dupText+`  &${this.getData('numInText')} more...`);
            // 	}
            // }
            hovercardUtil: function(){
                var lyteSelf = this;
                var cthis=this;
                if( !this.getData('ltPropSelected') ){
                    this.setData('ltPropSelected',[]);
                }
                if(this.getData('ltPropSelected').length>0){

                    var arr=Array.from($L(this.$node).find('lyte-dropdown')[0].querySelectorAll('lyte-drop-item'));
                    var arrOfKeys=[];
                    this.setData('showPlace','false');
                    cthis.getData('ltPropSelected').forEach(function(item){
                        arrOfKeys.push(item[cthis.getData('ltPropSystemValue')]);
                    });
                    if(this.getData('ltPropType')=='checkbox'){
                        arr.forEach(function(item){
                            var checkbox=$L(item).find('lyte-checkbox')[0];
                            var namevalueToAdd=checkbox.getAttribute('lt-prop-label');
                            var datavalueToAdd=item.getAttribute('data-value');
                            if(arrOfKeys.includes(datavalueToAdd) && cthis.getData( 'multiTextArray' ).indexOf( namevalueToAdd ) === -1){
                                        checkbox.setData('ltPropChecked','true');
                                        lyteSelf.$addon.arrayUtils( cthis.getData( 'multiTextArray' ), 'push', namevalueToAdd );

                            }
                        });
                    }
                    else{
                        arr.forEach(function(item){
                            var namevalueToAdd=item.innerText.trim();
                            var datavalueToAdd=item.getAttribute('data-value');
                            if(arrOfKeys.includes(datavalueToAdd) && cthis.getData( 'multiTextArray' ).indexOf( namevalueToAdd ) === -1){
                                        lyteSelf.$addon.arrayUtils( cthis.getData( 'multiTextArray' ), 'push', namevalueToAdd );

                            }
                        });
                    }
                    var text=this.getData('multiTextArray').join(', ');
                    this.setData('multiText',text);
                    text=this.getData('multiTextArray').join('<br>');
                    this.setData('multiTextForHovercard',text);
                }
            }.observes('ltPropType').on('didConnect')
        }), arg1);
    }

    _() {
        _;
    }
}

LyteMultiDropdownComponent._template = "<template tag-name=\"lyte-multi-dropdown\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropType,'==','checkbox')}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-dropdown lt-prop-options=\"{{ltPropData}}\" lt-prop-disabled-list=\"{{ltPropDisabledList}}\" lt-prop-disabled=\"{{ltPropDisabled}}\" lt-prop-user-value=\"{{ltPropUserValue}}\" lt-prop-system-value=\"{{ltPropSystemValue}}\" lt-prop-selected-list=\"{{ltPropSelected}}\" lt-prop-type=\"multiple\" lt-prop-no-result=\"\" on-before-add=\"{{method('defaultBeforeAdd')}}\" on-add=\"{{method('defaultAdd')}}\" on-option-selected=\"{{method('onOptionSelected')}}\" on-show=\"{{method('onShow')}}\" on-before-show=\"{{method('onBeforeShow')}}\" on-hide=\"{{method('onHide')}}\" on-before-hide=\"{{method('onBeforeHide')}}\" on-before-remove=\"{{method('onBeforeRemove')}}\" on-position-changed=\"{{method('onPositionChanged')}}\" before-select=\"{{method('beforeSelect')}}\" on-change=\"{{method('onChange')}}\" on-scroll=\"{{method('onScroll')}}\" on-search=\"{{method('onSearch')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropYield}}\" is=\"case\" lc-id=\"lc_id_0\"><lyte-yield yield-name=\"yield\"></lyte-yield></template><template default=\"\"><lyte-drop-button id=\"{{lyteUiGetMultiDropId()}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{showPlace}}\" is=\"case\" lc-id=\"lc_id_0\"><span class=\"lyteDropPlaceholderMultiple\">{{ltPropPlaceholder}}</span></template><template default=\"\"><div class=\"lyteMultiDropSelectedText\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowCount}}\" is=\"case\" lc-id=\"lc_id_0\"><lyte-text lt-prop-array=\"{{multiTextArray}}\" lt-prop-hovercard=\"{&quot;placement&quot;:&quot;right&quot;}\" lt-prop-suffix=\" and <span class ='prefixClass'>{0} others</span>\" lt-prop-min-count=\"1\"></lyte-text></template><template default=\"\"> {{multiText}} </template></template> </div></template></template> </lyte-drop-button></template></template> <lyte-hovercard lt-prop-origin-elem=\"#{{lyteUiGetMultiDropId()}}\" lt-prop-auto-show=\"true\" lt-prop-max-width=\"250px\" lt-prop-placement=\"right\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"lyteMultiDropdownHovercardContent\"> {{unescape(multiTextForHovercard)}} </lyte-hovercard-content> </template> </lyte-hovercard> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropDataYield}}\" is=\"case\" lc-id=\"lc_id_0\"><lyte-drop-box class=\"lyteMultiDropdownCheckBoxTypeDropbox\"> <lyte-drop-body> <template items=\"{{ltPropData}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiOptGroupCheck(item)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-group> <lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label> <template items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subItem\" index=\"indexval\" is=\"for\" _new=\"true\"> <lyte-drop-item data-value=\"{{subItem[ltPropSystemValue]}}\"> <lyte-checkbox lt-prop-tabindex=\"-1\" lt-prop-label=\"{{subItem[ltPropUserValue]}}\" on-unchecked=\"{{method('defaultBeforeUnchecked')}}\"></lyte-checkbox> </lyte-drop-item> </template> </lyte-drop-group> </template><template default=\"\"> <lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\"> <lyte-checkbox lt-prop-tabindex=\"-1\" lt-prop-label=\"{{item[ltPropUserValue]}}\" on-unchecked=\"{{method('defaultBeforeUnchecked')}}\" lt-prop-yield=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"lytedropboxyield\" drop-item=\"{{item}}\"></lyte-yield> </template> </lyte-checkbox> </lyte-drop-item> </template></template> </template> </lyte-drop-body> </lyte-drop-box></template><template default=\"\"><lyte-drop-box class=\"lyteMultiDropdownCheckBoxTypeDropbox\"> <lyte-drop-body> <template items=\"{{ltPropData}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiOptGroupCheck(item)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-group> <lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label> <template items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subItem\" index=\"indexval\" is=\"for\" _new=\"true\"> <lyte-drop-item data-value=\"{{subItem[ltPropSystemValue]}}\"> <lyte-checkbox lt-prop-tabindex=\"-1\" lt-prop-label=\"{{subItem[ltPropUserValue]}}\" on-unchecked=\"{{method('defaultBeforeUnchecked')}}\"></lyte-checkbox> </lyte-drop-item> </template> </lyte-drop-group> </template><template default=\"\"> <lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\"> <lyte-checkbox lt-prop-tabindex=\"-1\" lt-prop-label=\"{{item[ltPropUserValue]}}\" on-unchecked=\"{{method('defaultBeforeUnchecked')}}\"></lyte-checkbox> </lyte-drop-item> </template></template> </template> </lyte-drop-body> </lyte-drop-box></template></template> </template> </lyte-dropdown> </template><template default=\"\"> <lyte-dropdown lt-prop-type=\"multiple\" lt-prop-options=\"{{ltPropData}}\" lt-prop-disabled=\"{{ltPropDisabled}}\" lt-prop-disabled-list=\"{{ltPropDisabledList}}\" lt-prop-user-value=\"{{ltPropUserValue}}\" lt-prop-system-value=\"{{ltPropSystemValue}}\" lt-prop-selected-list=\"{{ltPropSelected}}\" lt-prop-no-result=\"\" on-before-add=\"{{method('multiBeforeAdd')}}\" on-add=\"{{method('multiAdd')}}\" on-option-selected=\"{{method('onOptionSelected')}}\" on-show=\"{{method('onShow')}}\" on-before-show=\"{{method('onBeforeShow')}}\" on-hide=\"{{method('onHide')}}\" on-before-hide=\"{{method('onBeforeHide')}}\" on-before-remove=\"{{method('onBeforeRemove')}}\" on-position-changed=\"{{method('onPositionChanged')}}\" before-select=\"{{method('beforeSelect')}}\" on-change=\"{{method('onChange')}}\" on-scroll=\"{{method('onScroll')}}\" on-search=\"{{method('onSearch')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropYield}}\" is=\"case\" lc-id=\"lc_id_0\"><lyte-yield yield-name=\"yield\"></lyte-yield></template><template default=\"\"><lyte-drop-button id=\"{{lyteUiGetMultiDropId()}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{showPlace}}\" is=\"case\" lc-id=\"lc_id_0\"><span class=\"lyteDropPlaceholderMultiple\">{{ltPropPlaceholder}}</span></template><template default=\"\"><div class=\"lyteMultiDropSelectedText\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowCount}}\" is=\"case\" lc-id=\"lc_id_0\"><lyte-text lt-prop-array=\"{{multiTextArray}}\" lt-prop-hovercard=\"{&quot;placement&quot;:&quot;right&quot;}\" lt-prop-suffix=\" and <span class ='prefixClass'>{0} others</span>\" lt-prop-min-count=\"1\"></lyte-text></template><template default=\"\"> {{multiText}} </template></template> </div></template></template> </lyte-drop-button></template></template> <lyte-hovercard lt-prop-origin-elem=\"#{{lyteUiGetMultiDropId()}}\" lt-prop-auto-show=\"true\" lt-prop-max-width=\"250px\" lt-prop-placement=\"right\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content class=\"lyteMultiDropdownHovercardContent\"> {{unescape(multiTextForHovercard)}} </lyte-hovercard-content> </template> </lyte-hovercard> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropDataYield}}\" is=\"case\" lc-id=\"lc_id_0\"><lyte-drop-box onclick=\"{{action('multiRemoveitem')}}\" class=\"lyteMultiDropdownDropbox\"> <lyte-drop-body> <template items=\"{{ltPropData}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiOptGroupCheck(item)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-group> <lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label> <template items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subItem\" index=\"indexval\" is=\"for\" _new=\"true\"> <lyte-drop-item data-value=\"{{subItem[ltPropSystemValue]}}\">{{subItem[ltPropUserValue]}}</lyte-drop-item> </template> </lyte-drop-group> </template><template default=\"\"> <lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\"> <lyte-yield yield-name=\"lytedropboxyield\" drop-item=\"{{item}}\"></lyte-yield> </lyte-drop-item> </template></template> </template> </lyte-drop-body> </lyte-drop-box></template><template default=\"\"><lyte-drop-box onclick=\"{{action('multiRemoveitem')}}\" class=\"lyteMultiDropdownDropbox\"> <lyte-drop-body> <template items=\"{{ltPropData}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiOptGroupCheck(item)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-group> <lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label> <template items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subItem\" index=\"indexval\" is=\"for\" _new=\"true\"> <lyte-drop-item data-value=\"{{subItem[ltPropSystemValue]}}\">{{subItem[ltPropUserValue]}}</lyte-drop-item> </template> </lyte-drop-group> </template><template default=\"\"> <lyte-drop-item data-value=\"{{item[ltPropSystemValue]}}\"> {{item[ltPropUserValue]}} </lyte-drop-item> </template></template> </template> </lyte-drop-body> </lyte-drop-box></template></template> </template> </lyte-dropdown> </template></template> </template>";;
LyteMultiDropdownComponent._dynamicNodes = [{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"r","p":[1,1],"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"i","p":[0],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[0],"cn":"default"},{"t":"s","p":[0,1],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[0,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"s","p":[0,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[0],"cn":"lc_id_0"},{"t":"cD","p":[0],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"tX","p":[1],"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"default"}]},"dc":{"lc_id_0":{},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[0],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":3,"sibl":[2]},{"t":"a","p":[3]},{"t":"r","p":[3,1],"dN":[{"t":"tX","p":[1,1]},{"t":"cD","p":[1],"in":0}],"dc":[0],"hc":true,"trans":true,"in":2,"sibl":[1]},{"t":"cD","p":[3],"in":1,"sibl":[0]},{"t":"s","p":[5],"c":{"lc_id_0":{"dN":[{"t":"a","p":[0,1,1],"cn":"lc_id_0"},{"t":"f","p":[0,1,1],"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1,0],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"a","p":[1,3],"cn":"lc_id_0"},{"t":"f","p":[1,3],"dN":[{"t":"a","p":[1]},{"t":"a","p":[1,1]},{"t":"cD","p":[1,1],"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0}],"dc":[1,0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"a","p":[1,1],"cn":"default"},{"t":"r","p":[1,1,1],"dN":[{"t":"a","p":[1]},{"t":"i","p":[1],"in":0}],"dc":[0],"hc":true,"trans":true,"in":2,"sibl":[1],"cn":"default"},{"t":"cD","p":[1,1],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[2,1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[0],"hc":true,"trans":true,"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"cD","p":[0,1],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[0],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[0,1,1],"cn":"default"},{"t":"f","p":[0,1,1],"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1,0],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"a","p":[1,3],"cn":"lc_id_0"},{"t":"f","p":[1,3],"dN":[{"t":"a","p":[1]},{"t":"a","p":[1,1]},{"t":"cD","p":[1,1],"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0}],"dc":[1,0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"a","p":[1,1],"cn":"default"},{"t":"cD","p":[1,1],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[0],"hc":true,"trans":true,"in":2,"sibl":[1],"cn":"default"},{"t":"cD","p":[0,1],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[0],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[2,1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[3,2,1,0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"r","p":[1,1],"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"i","p":[0],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[0],"cn":"default"},{"t":"s","p":[0,1],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[0,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"s","p":[0,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[0],"cn":"lc_id_0"},{"t":"cD","p":[0],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"tX","p":[1],"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"default"}]},"dc":{"lc_id_0":{},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[0],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":3,"sibl":[2]},{"t":"a","p":[3]},{"t":"r","p":[3,1],"dN":[{"t":"tX","p":[1,1]},{"t":"cD","p":[1],"in":0}],"dc":[0],"hc":true,"trans":true,"in":2,"sibl":[1]},{"t":"cD","p":[3],"in":1,"sibl":[0]},{"t":"s","p":[5],"c":{"lc_id_0":{"dN":[{"t":"a","p":[0],"cn":"lc_id_0"},{"t":"a","p":[0,1,1],"cn":"lc_id_0"},{"t":"f","p":[0,1,1],"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1,0],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"a","p":[1,3],"cn":"lc_id_0"},{"t":"f","p":[1,3],"dN":[{"t":"a","p":[1]},{"t":"tX","p":[1,0]},{"t":"cD","p":[1],"in":0}],"dc":[0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"a","p":[1,1],"cn":"default"},{"t":"i","p":[1,1],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[0],"hc":true,"trans":true,"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"cD","p":[0,1],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[0],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[0],"cn":"default"},{"t":"a","p":[0,1,1],"cn":"default"},{"t":"f","p":[0,1,1],"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1,0],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"a","p":[1,3],"cn":"lc_id_0"},{"t":"f","p":[1,3],"dN":[{"t":"a","p":[1]},{"t":"tX","p":[1,0]},{"t":"cD","p":[1],"in":0}],"dc":[0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"tX","p":[1,1],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[0],"hc":true,"trans":true,"in":2,"sibl":[1],"cn":"default"},{"t":"cD","p":[0,1],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[0],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[2,1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[3,2,1,0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[1,0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;

LyteMultiDropdownComponent._observedAttributes = [
    "ltPropData",
    "ltPropMaxCount",
    "ltPropSelected",
    "ltPropDisabledList",
    "ltPropDisabled",
    "ltPropYield",
    "ltPropType",
    "multiTextArray",
    "multiText",
    "multiTextForHovercard",
    "numInText",
    "ltPropUserValue",
    "ltPropSystemValue",
    "ltPropShowCount",
    "showPlace",
    "ltPropDataYield",
    "ltPropPlaceholder"
];

export { LyteMultiDropdownComponent };

LyteMultiDropdownComponent.register("lyte-multi-dropdown", {
    hash: "LyteMultiDropdownComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});


