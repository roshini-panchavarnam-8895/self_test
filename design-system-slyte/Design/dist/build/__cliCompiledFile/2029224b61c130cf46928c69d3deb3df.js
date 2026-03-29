import { createCustomClass, getClass, _defineProperty } from "@slyte/core/src/lyte-utils";
import { Mixin } from "../../../@slyte/core/index.js";
import $L from "../../lyte-dom/modules/lyte-dom-utils.js";

let LyteAdvancedBreadcrumbMixin = createCustomClass(function(arg1, overrides, LyteAdvancedBreadcrumbMixin) {
    class _LyteAdvancedBreadcrumbMixin extends getClass([Mixin], arg1, LyteAdvancedBreadcrumbMixin) {
        render_advanced() {
            var __this = this,
            data = __this.data,
            __items = data.ltPropData,
            fastdom = $L.fastdom,
            hidden_class = 'lyteBreadcurmbHidden';

            if( !__items.length ){
                return __this.setData({
                    backwardItems : [],
                    middleItems : [],
                    dropdownClass : hidden_class,
                    middleSelected : ""
                });
            }

            fastdom.clear( __this.__fastdom );

            __this.setData( 'backwardItems', __items );

            __this.__fastdom = fastdom.measure( function(){
                delete __this.__fastdom;

                var elems = Array.from( __this.$node.getElementsByTagName( 'lyte-breadcrumb-structure' )[ 0 ].children ),
                __arr = elems.map( function( item ){
                    var __style = window.getComputedStyle( item );
                    return item.offsetWidth + parseFloat( __style.marginLeft ) + parseFloat( __style.marginRight );
                }),
                dropdown_width = __arr.shift(),
                __length = __arr.length,
                last_width = __arr[ __length - 1 ],
                overall = __this.$node.offsetWidth;

                fastdom.mutate( function(){
                    // if( last_width > overall ){
                    // 	return this.setData({
                    // 		dropdownClass : "",
                    // 		middleSelected : "",
                    // 		middleItems : __items
                    // 	});
                    // } else {

                        overall -= dropdown_width;

                        var __count = 0,
                        __obj;

                        overall -= last_width;

                        while( overall > 0 ){
                            __count++;
                            overall -= __arr.shift();
                        }

                        if( __count ){
                            var back = [],
                            __middle = [];

                            // if( overall < 0 && Math.abs( overall ) < dropdown_width ){

                            // }


                            for( var i = 0; i < __length; i++ ){
                                if( i + __count > __length ){
                                    back.push( __items[ i ] );
                                } else {	
                                    __middle.push( __items[ i ] );
                                }
                            }

                            __obj = {
                                dropdownClass : "",
                                backwardItems : back,
                                middleItems : __middle
                            };

                        } else {
                            __obj = {
                                dropdownClass : hidden_class,
                                backwardItems : [],
                                middleItems : __items
                            };
                        }

                        __obj.middleSelected = "";

                        __this.setData( __obj );
                    // }
                });
            });
        }

        static observers(arg1) {
            return Object.assign(super.observers(Object.assign(super.observers({
                render_cb : function(){
                    var data = this.data;

                    if( data.ltPropType == "advanced" ){
                        ( this.$node.refresh = this.render_advanced.bind( this ) )();
                    }

                }.on( 'didConnect' )
            }), arg1)), arg1);
        }

        _() {
            _;
        }
    }

    return overrides(_LyteAdvancedBreadcrumbMixin);
});

LyteAdvancedBreadcrumbMixin.register({
    hash: "LyteAdvancedBreadcrumbMixin_4",
    refHash: "@zoho/lyte-ui-component_3"
});

export { LyteAdvancedBreadcrumbMixin };