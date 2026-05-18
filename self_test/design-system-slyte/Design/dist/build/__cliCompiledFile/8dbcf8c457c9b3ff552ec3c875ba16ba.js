import { _defineProperty } from "@slyte/core/src/lyte-utils";
import "../helpers/helpers-dev.js";
import './lyte-input.js';
import './lyte-dropdown.js';
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";

/* @Slicer.otherframeworkStart */
import "../../plugins/lyte-search.js";

/*  @Slicer.otherframeworkEnd */


import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

/**
 * Renders a combobox
 * @component lyte-combobox
 * @version  3.0.0
 * @dependencies lyte-dropdown,lyte-input,lyte-tooltip
 * /plugins/lyte-search.js
 * /theme/compiledCSS/default/ltr/lyte-ui-scrollbar.css
 * /components/lyte-input.js
 * /theme/compiledCSS/default/ltr/lyte-ui-input.css
 * /components/lyte-dropdown.js
 * /theme/compiledCSS/default/ltr/lyte-ui-dropdown.css
 * /components/lyte-tooltip.js
 * /theme/compiledCSS/default/ltr/lyte-ui-tooltip.css
 * @methods onOptionSelect,onSearch,onShow,onBeforeShow,onHide,onBeforeHide,onUserScroll,onClear
 * @utility toggle,open,close
 * @import lyte-dropdown
 * @ignoreProperties ltPropYield, ltPropType, ltPropShow, ltPropOptions, ltPropDisabledList,ltPropSelected, ltPropTooltip
 * @ignoreUtility toggle,open,close
 */
class LyteComboboxComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({
			/** 
			 * @componentProperty {object} ltPropDropdown={}
			 * @version 3.0.0
			 */
			'ltPropDropdown' : prop( 'object', {
			 	'default' : {}
			} ),
			/** 
			 * @componentProperty {array} ltPropOptions=[]
			 * @version 3.0.0
			 */
			'ltPropOptions' : prop( 'array', {
				'default' : []
			} ),
			/** 
			 * @componentProperty {string} ltPropDropdownSelected
			 * @version 3.0.0
			 */
			'ltPropDropdownSelected' : prop( 'string' ),
			/** 
			 * @componentProperty {string} ltPropNoResultMessage=No Results Found
			 * @version 3.0.0
			 */
			'ltPropNoResultMessage' : prop( 'string', {
			 'default' :  window._lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'noResultMessage', window._lyteUiUtils.i18n( 'no.results.found' ) ) 


			} ),
			/** 
			 * @componentProperty {array} ltPropDisabledList=[]
			 * @version 3.0.0
			 */
			'ltPropDisabledList': prop('array',{"default":[]}),
			/** 
			 * @componentProperty {boolean} ltPropYield=false
			 * @version 3.0.0
			 */
			'ltPropYield' : prop( 'boolean', {
			 'default' : false 
			} ),
			/** 
			 * @componentProperty {boxSearch | buttonSearch} ltPropType=boxSearch
			 * @version 3.0.0
			 */
			'ltPropType' : prop( 'string' ,{
				'default' : window._lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'type', 'boxSearch' )
			} ),
			/** 
			 * @componentProperty {flat | box} ltPropDropboxSearchAppearance=flat
			 * @version 3.0.0
			 */
			'ltPropDropboxSearchAppearance' : prop( 'string', {
				'default' : window._lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'dropboxSearchAppearance', 'flat' )
			} ),
			/** 
			 * @componentProperty {string} ltPropSearchplaceholder=''
			 * @version 3.0.0
			 */
			'ltPropSearchplaceholder' : prop( 'string', {
				'default' : window._lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'searchplaceholder', '' )
			} ),
			/** 
			 * @componentProperty {number} ltPropMinSearchValue
			 * @version 3.0.0
			 */
			'ltPropMinSearchValue' : prop( 'number' ),
			/**
   			 * @componentProperty {object} ltPropTooltip
   			 * @component lyte-tooltip ltPropTooltipConfig
   			 * @default {'position': 'bottom', 'appearance': 'box', 'margin': 5, 'keeptooltip': true} 
			 */
			'ltPropTooltip': prop( 'object', { 'default':window._lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'tooltip', { 
	   				'position': 'bottom', 
	   				'appearance': 'box',
	   				'margin': 5,
	   				'keeptooltip': true 
   				} )
			   } ),
			   /**
   			 * @componentProperty {object} ltPropBoxClass=''
   			 * @version 3.1.0 
			 */
   			'ltPropBoxClass' :	prop('string',{'default':window._lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'boxClass', '' )}),
			 /**
   			 * @componentProperty {object} ltPropDropdownClass=''
   			 * @version 3.1.0 
			 */
			'ltPropDropdownClass' :	prop('string',{'default':window._lyteUiUtils.resolveDefaultValue( 'lyte-combobox', 'dropdownClass', '' )}),
			/**
			 * @componentProperty {boolean} ltPropAria = false
			 * @version 3.1.0
			 */
			'ltPropAria' : prop( 'boolean', {
				'default':true
			}) ,
            'ltPropAriaDropButton': prop('object', { 'default': {}, watch: true }),

			// Keeping this property hidden for now because we don't know if we need it.
			'ltPropAriaDropBox': prop('object', { 'default': {}, watch: true }),

			'ltPropAriaDropBody': prop('object', { 'default': {}, watch: true }),
			'ltPropAriaInput': prop('object', { 'default': {}, watch: true }),

			'ltPropTabIndex' : prop('number',{
				'default' : 0
			}),
			'ltPropDataTabIndex' : prop('number',{
				'default' : 0
			}),
			/**
			 * @componentProperty {boolean} ltPropShowRemoveIcon = false
			 * @version 3.77.0
			 */
			'ltPropShowRemoveIcon': prop( 'boolean', { 'default': false } ),
			'setAriaOnActiveElem' : prop( 'boolean', { 'default': false } ),

			'selectValue' : prop( 'string' ), 
			'initialValue': prop( 'string' ), 
			'showNoResult' : prop( 'boolean', {
				'default' : false
			} ),
			'isSearch' : prop('boolean', {
			 'default' : false 
			} )
		}), arg1);		
	}

    init()  {
		var options = this.getData( 'ltPropOptions' ),
			dropDown = this.getData('ltPropDropdown')
		if( options && options.length >0 ) {
			this.checkForSearch()
		}
		this._currentDisplay = dropDown.displayValue
		if(this.getData('ltPropType') === 'boxSearch'){
			this.setData('setAriaOnActiveElem', false)
		} else{
			this.setData('setAriaOnActiveElem', true)
		}
	}

    didConnect() {
        var dropBody = this.$node.querySelector('lyte-drop-body'),
            dropBox = this.$node.querySelector('lyte-drop-button'),
            disabledList = this.getData('ltPropDisabledList');

        if (this.getData('isSearch')) {
            var searchEle = this.$node.querySelector('lyte-input')
            var dropBody = this.$node.querySelector('lyte-drop-body')
            var dropDown = this.$node.querySelector('lyte-dropdown')

            if (this.getData('ltPropType') == 'boxSearch') {
                dropBox = dropDown.component.childComp || dropDown.querySelector('lyte-drop-box')
                searchEle = dropBox.querySelector('lyte-input')
                dropBody = dropBox.querySelector('lyte-drop-body')
            } else {
                dropDown.setData('ltPropFreeze', false)
            }
            if (searchEle) {
                $L(searchEle).search({ 'scope': dropBody, 'search': 'lyte-drop-item', 'related': 'lyte-drop-group', 'onSearch': this.Search.bind(this), trim: true })
            }
            if (dropBody && this.getData('ltPropAria')) {
                var dropBodyId = dropBody.getAttribute('id')
                var attr = {}
                attr['aria-autocomplete'] = 'list';
                attr['aria-controls'] = dropBodyId ? dropBodyId : false;
                if (searchEle) {
                    searchEle.setData('ltPropAria', true);
                    searchEle.setData('ltPropAriaAttributes', attr)

                }
            }
            this._searchEle = searchEle
        }
        var options = this.getData('ltPropOptions')
        if (options && options.length > 0) {
            if (!this.getData('ltPropYield')) {
                this.setDropdownValue()
            }

        }
        this.$node.open = function () {
            var dropDown = this.querySelector('lyte-dropdown')
            dropDown.open();

        }

        this.$node.close = function () {
            var dropDown = this.querySelector('lyte-dropdown')
            dropDown.close();


        }
        this.$node.toggle = function () {
            var dropDown = this.querySelector('lyte-dropdown')
            dropDown.toggle();

        }

	}

    checkForSearch() {
		var option = this.getData('ltPropOptions'),
		minValue = this.getData('ltPropMinSearchValue'),
		count = 0,
		options = this.getData('ltPropOptions'),
		firstElement = options[ 0 ]

		if( firstElement.constructor == Object ){
			if( Object.keys( firstElement ).length == 1 ) {
	              	var value = firstElement[ Object.keys( firstElement )[ 0 ] ];
	              	if( value.constructor == Array ) {
	                   	for(var i =0;i<option.length;i++){
	                   		for(var key in option[i]){
								count += option[i][key].length
								if(count >= minValue){
											this.setData('isSearch',true)
											return
								}
							}
						}
					}
	        } else {
				if(options.length >= minValue){
					this.setData('isSearch',true)
					return
				}
			}
		} else{
			if(options.length >= minValue){
					this.setData('isSearch',true)
					return
			}
		}
		
	}

    setDropdownValue() {
		var dropDown = this.getData( 'ltPropDropdown' ),
		name = dropDown.userValue,
		value = dropDown.systemValue,
		drop = this.$node.querySelector( 'lyte-dropdown' )
		if(	 dropDown.placeholder == undefined  && dropDown.displayValue == undefined  && (!this.getData( 'ltPropDropdownSelected')) )  {
			var displayName = drop.getInitialSelected();
			this.setData( 'ltPropDropdownSelected', displayName )
		}
		if(dropDown.placeholder==undefined && dropDown.displayValue && !this.getData('ltPropDropdownSelected')){
			var displayName = drop.getInitialSelected();
			this.setData( 'ltPropDropdownSelected', displayName )
			this.setData( 'selectValue', dropDown.displayValue )

		}
		if( this.getData( 'ltPropDropdownSelected' ) && dropDown.displayValue == undefined ) {
			var displayName = drop.getDisplayValue();
			this.setData( 'selectValue', displayName )
		}
		
	}

    addComboboxClass(dropBox) {
		dropBox.classList.add('lyteComboboxFiltering')
	}

    removeComboboxClass(dropBox) {
		dropBox.classList.remove('lyteComboboxFiltering')
	}

    Search(visibleList, event, value) {
		this.setData( "showNoResult", visibleList.length == 0 );
		if( this.getMethods( "onSearch" ) ) {
			return this.executeMethod( "onSearch", visibleList, event, value );
		}
	}

    isVisible(item) {
		return !!( item.offsetWidth || item.offsetHeight || item.getClientRects().length );
	}

    isEmpty(obj) {
		for( var key in obj ) {
			return false;
		}

		return true;
	}

    static methods(arg1) {
        return Object.assign(super.methods({
            keyNavigation : function( component, item ) {
                if( !this.getData('ltPropAria') ){
                    return
                }
                var id = item.getAttribute('id')
                if( !this._searchEle ) {
                    if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
                         this._searchEle = this.$node.querySelector( 'lyte-input' ); 
                    } else {
                        var dropBox = component.childComp
                         this._searchEle = dropBox.querySelector( 'lyte-input' ); 
                    }
                }
                if( this._searchEle ) {
                        if( item.tabIndex <= -1 ) {
                            item.setAttribute('tabindex',this.getData('ltPropTabIndex'))
                            item.setAttribute('data-tabindex',this.getData('ltPropDataTabIndex'))
                            this.$addon.objectUtils(this._searchEle.getData('ltPropAriaAttributes'), 'add', 'aria-activedescendant', id );
                            setTimeout(function(){
                                item.tabIndex = -1
                            }, 250 )
                        }
                        item.focus()

                }
            },
            optionSelect : function( event, value, component, item ) {

                this.setData( 'ltPropDropdownSelected', value )
                // this.setData( 'selectValue', item.innerText )
                var dropButton = component.$node.querySelector('lyte-drop-button')
                dropButton.classList.remove('lyteComboboxFiltering')
                if( !this._searchEle ){
                    if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
                          this._searchEle = this.$node.querySelector( 'lyte-input' ); 
                    } else {
                        var dropBox = component.childComp

                         this._searchEle = dropBox.querySelector( 'lyte-input' ); 
                    }
                }
                 
                if(  this._searchEle !==null ) {
                    $L( this._searchEle )[0].setValue('');
                }
                if( this.getMethods( 'onOptionSelect' ) ) {
                    this.executeMethod( 'onOptionSelect', event, value, component, item )
                }
            },
            dropBoxOpen : function( event, component ) {

                if( !this._searchEle ) {
                    if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
                         this._searchEle = this.$node.querySelector( 'lyte-input' ); 
                    } else {
                        var dropBox = component.childComp
                         this._searchEle = dropBox.querySelector( 'lyte-input' ); 
                    }
                }
                 
                if( this._searchEle!==null && !this.getData('ltPropDropdown').animate) {
                     this._searchEle.focus();
                    $L( this._searchEle)[0].setValue('');
                    
                }
                if( this._searchEle!==null && this.getData('ltPropAria') ){
                    this.$addon.objectUtils(this._searchEle.getData('ltPropAriaAttributes'), 'add', 'aria-activedescendant',false);
                }
                if( this.getMethods( 'onShow' ) ) {
                    this.executeMethod( 'onShow', event, component );
                }
                
            },
            onAnimateEnd : function(event,component){
                if( !this._searchEle ) {
                    if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
                         this._searchEle = this.$node.querySelector( 'lyte-input' ); 
                    } else {
                        var dropBox = component.childComp
                         this._searchEle = dropBox.querySelector( 'lyte-input' ); 
                    }
                }
                 
                if( this._searchEle!==null  ) {
                     this._searchEle.focus();
                    $L( this._searchEle)[0].setValue('');
                }
                if( this.getMethods( 'onAnimationEnd' ) ) {
                    this.executeMethod( 'onAnimationEnd', event, component );
                }
            },
            searchList : function( object , input){
                var dropDown = this.$node.querySelector( 'lyte-dropdown' ),
                    dropButton = dropDown.querySelector( 'lyte-drop-button' ),
                    dropBox = dropDown.component.childComp || dropDown.querySelector( 'lyte-drop-box' )
                // if(object.newValue != ""){
                // 	dropButton.classList.add('lyteComboboxFiltering')
                // }
                // else{
                // 	dropButton.classList.remove('lyteComboboxFiltering')
                // }
                if(dropBox){
                    var elems = dropBox.querySelectorAll( 'lyte-drop-item:not(.lyteSearchHidden):not(.lyteDropdownActive)' ),
                    cur = dropBox.querySelector( '.lyteDropdownSelection' ),elem
                    for(var i=0 ; i < elems.length; i++ ) {
                        if( this.isVisible( elems[ i ] )
                            && elems[ i ].getAttribute( 'disabled' ) !== "true" 
                        ) {
                            elem = elems[ i ];
                            break;
                        }
                    }

                    if( cur ) {
                        cur.classList.remove( 'lyteDropdownSelection' );
                    }

                    if( elem ) {
                        elem.classList.add( 'lyteDropdownSelection' );
                        return ;
                    }
                }
            },
            beforeDropboxShow:function( event, component ) {
                if( this.getMethods( 'onBeforeShow' ) ) {
                    return this.executeMethod( 'onBeforeShow', event, component )
                };
            },
            hideDropbox:function( event, component ) {
                if( !this._searchEle ) {
                    if( this.getData( 'ltPropType' ) != 'boxSearch' ) {
                         this._searchEle = this.$node.querySelector( 'lyte-input' ); 
                    } else {
                        var dropBox = component.childComp
                         this._searchEle = dropBox.querySelector( 'lyte-input' ); 
                    }
                }
                 
                if( this._searchEle!==null ) {
                    $L(this._searchEle)[0].setValue('');
                }
                if( this._searchEle!==null && this.getData('ltPropAria') ){
                    this.$addon.objectUtils(this._searchEle.getData('ltPropAriaAttributes'), 'add', 'aria-activedescendant',false);
                }
                if( this.getMethods( 'onHide' ) ) {
                    return this.executeMethod( 'onHide', event, component );
                };

            },
            beforeHideDropbox:function( event, component ) {
                // debugger
                var dropButton = this.$node.querySelector( 'lyte-drop-button' )
                dropButton.classList.remove('lyteComboboxFiltering')
                if(this._preventClose){
                    delete this._preventClose
                    return false;

                }
                if( this.getMethods( 'onBeforeHide' ) ) {
                    return	this.executeMethod( 'onBeforeHide', event, component )
                };
            },
            scrollDropBox : function( event, dropdownComp ) {
                if( this.getMethods( 'onUserScroll' ) ) { 
                    this.executeMethod( 'onUserScroll', event, dropdownComp ); 
                }
            },
            onSearchClear : function( event, element ){
                
                if( element!==null ) {
                    $L(element)[0].setValue('');
                }
                if( this.getMethods( 'onClear' ) ) {
                    return this.executeMethod( 'onClear', event, element );
                };
                if(this.getData('ltPropType').toLowerCase() == 'buttonsearch'){
                    this._preventClose = true
                }
            },
			beforeSelect : function(event, value, component, dropItem, currentValue){
				if( this.getMethods( 'onBeforeSelect' ) ) {
					return this.executeMethod( 'onBeforeSelect', event, value, component, dropItem, currentValue );
				};
				return true
			}
        }), arg1);
    }

    static actions(arg1) {
        return Object.assign(super.actions({
            toolTipConfig: function( button ) {
                var width = button.offsetWidth,
                scrollWidth = button.scrollWidth,
                config = this.getData( 'ltPropTooltip' );

                this.setData( 'showToolTip', ( width < scrollWidth ) && !this.isEmpty( config ) );
            },
            oninput: function(self){
                var dropButton = this.$node.querySelector( 'lyte-drop-button' ),
                input = self.querySelector('input')
                if(input.value != ""){
                    dropButton.classList.add('lyteComboboxFiltering')
                }
                else{
                    dropButton.classList.remove('lyteComboboxFiltering')
                }
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            displayObs : function(){
                if( this._currentDisplay != this.getData('ltPropDropdown').displayValue ){
                    this.setData('selectValue',this.getData('ltPropDropdown').displayValue)
                    this._currentDisplay = this.getData('ltPropDropdown').displayValue
                }
            }.observes('ltPropDropdown.displayValue'),

            optionObs : function() {
                var options = this.getData( 'ltPropOptions' ),
                 dropDown = this.$node.querySelector('lyte-dropdown')
                this.setData( 'isSearch', false )
                this._searchEle = null
                this.setData('selectValue',undefined)
                this.setData('showNoResult',false)
                if( dropDown ) {
                    dropDown.component.showNoResultDiv()
                }
                if( options && options.length >0 ){
                    if( !this.getData( 'ltPropYield' ) ) {
                        this.setDropdownValue()
                    }
                    this.checkForSearch()
                }
                if( this.getData( 'isSearch' ) && dropDown ) {
                    
                     var searchEle = this.$node.querySelector( 'lyte-input' ),
                     dropBox = dropDown.component.childComp || dropDown.querySelector( 'lyte-drop-box' ),
                     dropBody = dropBox.querySelector( 'lyte-drop-body' )

                    if( this.getData( 'ltPropType' ) == 'boxSearch' ) {
                        searchEle = dropBox.querySelector( 'lyte-input' )

                    }
                    this._searchEle = searchEle
                    $L( searchEle ).search( { 'scope' : dropBody, 'search' : 'lyte-drop-item', 'related' : 'lyte-drop-group' ,'onSearch' : this.Search.bind( this ),trim:true } )
                }
                
            }.observes( 'ltPropOptions.[]' ),

            disabledListObs : function() {
                var dropDown = this.$node.querySelector(' lyte-dropdown' )
                dropDown.setData( 'ltPropDisabledList', this.getData( 'ltPropDisabledList' ) )
            }.observes('ltPropDisabledList.[]'),

            dropDownSelectedObs : function(){
                if( this.getData('ltPropDropdownSelected') != "" && this.getData('ltPropDropdownSelected') != undefined ){
                    var dropDown = this.$node.querySelector( 'lyte-dropdown' ) 
                    this.setData( 'selectValue', dropDown.getDisplayValue())
                } else{
                    this.setData( 'selectValue', undefined )
                }
            }.observes( 'ltPropDropdownSelected')
        }), arg1);
    }

    _() {
        _;
    }
}

LyteComboboxComponent._template = "<template tag-name=\"lyte-combobox\"> <lyte-dropdown class=\"{{ltPropDropdownClass}} {{if(ifEquals(ltPropType,'buttonSearch'),'lyteComboboxButtonSearch','lyteComboboxBoxSearch')}} {{if(isSearch,'lyteComboboxSearchPresent')}}\" lt-prop-selected=\"{{lbind(ltPropDropdownSelected)}}\" lt-prop-options=\"{{ltPropOptions}}\" lt-prop-aria-button=\"{{ltPropAriaDropButton}}\" lt-prop-aria-box=\"{{ltPropAriaDropBox}}\" lt-prop-aria-body=\"{{ltPropAriaDropBody}}\" lt-prop-disabled-list=\"{{ltPropDisabledList}}\" on-option-selected=\"{{method('optionSelect')}}\" on-show=\"{{method('dropBoxOpen')}}\" on-animation-end=\"{{method('onAnimateEnd')}}\" on-key-navigation=\"{{method('keyNavigation')}}\" on-before-show=\"{{method('beforeDropboxShow')}}\" before-select=\"{{method('beforeSelect')}}\" on-hide=\"{{method('hideDropbox')}}\" on-before-hide=\"{{method('beforeHideDropbox')}}\" on-scroll=\"{{method('scrollDropBox')}}\" lt-prop-active-element=\".lyteCombobboxInput\" lt-prop-yield=\"true\" lt-prop=\"{{stringify(ltPropDropdown)}}\" lt-prop-set-aria-on-active-element=\"{{setAriaOnActiveElem}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropYield,'!')}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-button> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(selectValue,'!')}}\" is=\"case\" lc-id=\"lc_id_0\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropDropdown.displayValue}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyteMarginRight lyteDropdownLabel\" onmouseenter=\"{{action('toolTipConfig',this)}}\" lt-prop-title=\"{{if(showToolTip,ltPropDropdown.displayValue,'')}}\" lt-prop-tooltip-config=\"{{ltPropTooltip}}\">{{ltPropDropdown.displayValue}}</span> </template><template case=\"{{ltPropDropdown.placeholder}}\" is=\"case\" lc-id=\"lc_id_1\"> <span class=\"lyteDropPlaceholderNormal\">{{ltPropDropdown.placeholder}}</span> </template><template default=\"\"> <span class=\"lyteMarginRight lyteDropdownLabel\" onmouseenter=\"{{action('toolTipConfig',this)}}\" lt-prop-title=\"{{if(showToolTip,initialValue,'')}}\" lt-prop-tooltip-config=\"{{ltPropTooltip}}\">{{initialValue}}</span> </template></template> </template><template default=\"\"> <span class=\"lyteMarginRight lyteDropdownLabel\" onmouseenter=\"{{action('toolTipConfig',this)}}\" lt-prop-title=\"{{if(showToolTip,selectValue,'')}}\" lt-prop-tooltip-config=\"{{ltPropTooltip}}\">{{selectValue}}</span> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(selectValue,'&amp;&amp;',ltPropShowRemoveIcon)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-remove class=\"lyteDropdownDeselectIcon\"></lyte-drop-remove> </template></template> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(isSearch,'&amp;&amp;',expHandlers(ltPropType,'==','buttonSearch'))}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-input class=\"lyteComboboxBtnSearchInput\" lt-prop-type=\"search\" lt-prop-aria=\"{{ltPropAria}}\" lt-prop-close-icon=\"true\" lt-prop-appearance=\"{{ltPropDropboxSearchAppearance}}\" lt-prop-class=\"lyteComboboxBtnSearchOrigIpt lyteCombobboxInput\" lt-prop-placeholder=\"{{ltPropSearchplaceholder}}\" on-value-change=\"{{method('searchList')}}\" on-clear=\"{{method('onSearchClear')}}\" oninput=\"{{action('oninput',this)}}\" lt-prop-aria-attributes=\"{{ltPropAriaInput}}\"></lyte-input> </template></template> <lyte-icon class=\"dropdown\"></lyte-icon> </lyte-drop-button> <lyte-drop-box class=\"{{ltPropBoxClass}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(isSearch,'&amp;&amp;',expHandlers(ltPropType,'==','boxSearch'))}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-header> <lyte-input lt-prop-close-icon=\"true\" lt-prop-type=\"search\" lt-prop-aria=\"{{ltPropAria}}\" class=\"lyteComboboxDropboxSearch\" lt-prop-class=\"lyteComboboxDropboxSearchOrigIpt\" lt-prop-appearance=\"{{ltPropDropboxSearchAppearance}}\" lt-prop-placeholder=\"{{ltPropSearchplaceholder}}\" on-value-change=\"{{method('searchList')}}\" on-clear=\"{{method('onSearchClear')}}\" lt-prop-aria-attributes=\"{{ltPropAriaInput}}\"></lyte-input> </lyte-drop-header> </template></template> <lyte-drop-body> <template items=\"{{ltPropOptions}}\" item=\"item\" index=\"indexVal\" is=\"for\" _new=\"true\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiOptGroupCheck(item)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-group> <lyte-drop-label>{{lyteUiReturnOnlyKey(item)}}</lyte-drop-label> <template items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subitem\" index=\"indexval\" is=\"for\" _new=\"true\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiIsObject(subitem)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-item data-value=\"{{subitem[ltPropDropdown.systemValue]}}\" disabled=\"{{lyteUiCheckDisabled(ltPropDisabledList,subitem[ltPropDropdown.systemValue])}}\">{{subitem[ltPropDropdown.userValue]}}</lyte-drop-item> </template><template default=\"\"> <lyte-drop-item data-value=\"{{subitem}}\" disabled=\"{{lyteUiCheckDisabled(ltPropDisabledList,subitem)}}\">{{subitem}}</lyte-drop-item> </template></template> </template> </lyte-drop-group> </template><template default=\"\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiIsObject(item)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-item data-value=\"{{item[ltPropDropdown.systemValue]}}\" disabled=\"{{lyteUiCheckDisabled(ltPropDisabledList,item[ltPropDropdown.systemValue])}}\">{{item[ltPropDropdown.userValue]}}</lyte-drop-item> </template><template default=\"\"> <lyte-drop-item data-value=\"{{item}}\" disabled=\"{{lyteUiCheckDisabled(ltPropDisabledList,item)}}\">{{item}}</lyte-drop-item> </template></template> </template></template> </template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{showNoResult}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lyteDropdownNoResult lyteComboboxNoResult\"> {{ltPropNoResultMessage}} </div> </template></template> </lyte-drop-body> </lyte-drop-box> </template><template default=\"\"> <lyte-drop-button> <lyte-yield is=\"registerYield\" yield-name=\"headerYield\"> </lyte-yield> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(isSearch,'&amp;&amp;',expHandlers(ltPropType,'==','buttonSearch'))}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-input class=\"lyteComboboxBtnSearchInput\" lt-prop-close-icon=\"true\" lt-prop-aria=\"{{ltPropAria}}\" lt-prop-appearance=\"{{ltPropDropboxSearchAppearance}}\" lt-prop-type=\"search\" lt-prop-class=\"lyteComboboxBtnSearchOrigIpt lyteCombobboxInput\" lt-prop-placeholder=\"{{ltPropSearchplaceholder}}\" on-value-change=\"{{method('searchList')}}\" on-clear=\"{{method('onSearchClear')}}\" lt-prop-aria-attributes=\"{{ltPropAriaInput}}\" oninput=\"{{action('oninput',this)}}\"></lyte-input> </template></template> </lyte-drop-button> <lyte-drop-box class=\"{{ltPropBoxClass}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(isSearch,'&amp;&amp;',expHandlers(ltPropType,'==','boxSearch'))}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-drop-header> <lyte-input class=\"lyteComboboxDropboxSearch\" lt-prop-close-icon=\"true\" lt-prop-aria=\"{{ltPropAria}}\" lt-prop-appearance=\"{{ltPropDropboxSearchAppearance}}\" lt-prop-class=\"lyteComboboxDropboxSearchOrigIpt\" lt-prop-placeholder=\"{{ltPropSearchplaceholder}}\" on-value-change=\"{{method('searchList')}}\" lt-prop-type=\"search\" on-clear=\"{{method('onSearchClear')}}\" lt-prop-aria-attributes=\"{{ltPropAriaInput}}\"></lyte-input> </lyte-drop-header> </template></template> <lyte-drop-body> <lyte-yield is=\"registerYield\" yield-name=\"bodyYield\"> </lyte-yield> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{showNoResult}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lyteDropdownNoResult lyteComboboxNoResult\"> {{ltPropNoResultMessage}} </div> </template></template> </lyte-drop-body> <lyte-yield is=\"registerYield\" yield-name=\"footerYield\"> </lyte-yield> </lyte-drop-box> </template></template> </template> </lyte-dropdown> </template>";;
LyteComboboxComponent._dynamicNodes = [{"t":"a","p":[1]},{"t":"r","p":[1,1],"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"tX","p":[1,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true},"lc_id_1":{"dN":[{"t":"tX","p":[1,0],"cn":"lc_id_1"}],"cdp":{"t":"a","p":[1]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"tX","p":[1,0],"cn":"default"}]},"dc":{"lc_id_0":{},"lc_id_1":{},"default":{}},"hd":true,"co":["lc_id_0","lc_id_1"],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"tX","p":[1,0],"cn":"default"},{"t":"s","p":[3],"c":{"lc_id_0":{"dN":[{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"default"}]},"dc":{"lc_id_0":{},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":8,"sibl":[7],"cn":"lc_id_0"},{"t":"s","p":[1,3],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":7,"sibl":[6],"cn":"lc_id_0"},{"t":"cD","p":[1,5],"in":6,"sibl":[5],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":5,"sibl":[4],"cn":"lc_id_0"},{"t":"a","p":[3],"cn":"lc_id_0"},{"t":"s","p":[3,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1,1],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":4,"sibl":[3],"cn":"lc_id_0"},{"t":"a","p":[3,3,1],"cn":"lc_id_0"},{"t":"f","p":[3,3,1],"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1,0],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"a","p":[1,3],"cn":"lc_id_0"},{"t":"f","p":[1,3],"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"tX","p":[1,0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"tX","p":[1,0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"tX","p":[1,0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"tX","p":[1,0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[0],"hc":true,"trans":true,"in":3,"sibl":[2],"cn":"lc_id_0"},{"t":"s","p":[3,3,3],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"cD","p":[3,3],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[3],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"i","p":[1,1],"in":8,"sibl":[7],"cn":"default"},{"t":"s","p":[1,3],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":7,"sibl":[6],"cn":"default"},{"t":"cD","p":[1],"in":6,"sibl":[5],"cn":"default"},{"t":"a","p":[3],"cn":"default"},{"t":"s","p":[3,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1,1],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":5,"sibl":[4],"cn":"default"},{"t":"i","p":[3,3,1],"in":4,"sibl":[3],"cn":"default"},{"t":"s","p":[3,3,3],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":3,"sibl":[2],"cn":"default"},{"t":"cD","p":[3,3],"in":2,"sibl":[1],"cn":"default"},{"t":"i","p":[3,5],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[3],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[8,7,6,5,4,3,1,0],"hc":true,"trans":true},"default":{"dc":[8,7,6,5,4,2,1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[0],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0},{"type":"dc","trans":true,"hc":true,"p":[1,0]}];;

LyteComboboxComponent._observedAttributes = [
    "ltPropDropdown",
    "ltPropOptions",
    "ltPropDropdownSelected",
    "ltPropNoResultMessage",
    "ltPropDisabledList",
    "ltPropYield",
    "ltPropType",
    "ltPropDropboxSearchAppearance",
    "ltPropSearchplaceholder",
    "ltPropMinSearchValue",
    "ltPropTooltip",
    "ltPropBoxClass",
    "ltPropDropdownClass",
    "ltPropAria",
    "ltPropAriaDropButton",
    "ltPropAriaDropBox",
    "ltPropAriaDropBody",
    "ltPropAriaInput",
    "ltPropTabIndex",
    "ltPropDataTabIndex",
    "ltPropShowRemoveIcon",
    "setAriaOnActiveElem",
    "selectValue",
    "initialValue",
    "showNoResult",
    "isSearch"
];

/**
 * @syntax nonYielded
 * <lyte-combobox lt-prop-options='[{"name": "Option 1", "value": "1"}, {"name": "Option 2", "value": "2"}]' lt-prop-user-value="name" lt-prop-system-value="value"></lyte-combobox>
 */

/**
* @syntax yielded
* <lyte-combobox>
*     <template is = 'registerYield'  yield-name = 'headerYield'>
*         <span>  Option 1   </span>
*     </template>
* 	   <template is = 'registerYield' yield-name = 'bodyYield'>
*             <lyte-drop-body>
*                 <lyte-drop-item data-value="1">Option 1</lyte-drop-item>
*                 <lyte-drop-item data-value="2">Option 2</lyte-drop-item>
*             </lyte-drop-body>
*      </template>
* </lyte-combobox>
*/

export { LyteComboboxComponent };

LyteComboboxComponent.register("lyte-combobox", {
    hash: "LyteComboboxComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});