import { _defineProperty } from "@slyte/core/src/lyte-utils";
import './lyte-button.js';
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";
import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

/* @Slicer.otherframeworkStart */
import "../../plugins/code-snippet/builder.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/code-snippet/registrationClient.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/tokenizer/lyte-css-tokenizer.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/tokenizer/lyte-html-tokenizer.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/tokenizer/lyte-js-tokenizer.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/tokenizer/lyte-json-tokenizer.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/tokenizer/lyte-xml-tokenizer.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/tokenizer/lyte-java-tokenizer.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/tokenizer/lyte-python-tokenizer.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "../../plugins/tokenizer/lyte-lytejs-tokenizer.js";

/*  @Slicer.otherframeworkEnd */

/* @Slicer.otherframeworkStart */
import "./lyte-messagebox.js";

/*  @Slicer.otherframeworkEnd */

class LyteCodeSnippetComponent extends Component {
    constructor() {
		super();
	}

    data(arg1) {
		return Object.assign(super.data({
			'ltPropCode': prop('string', { 'default': '' }),
			'ltPropType': prop('string', { 'default': 'js' }),
			'ltPropInitialLineCount': prop('number', { 'default': 100 }),
			'ltPropLinesPerScroll': prop('number', { 'default': 100 }),
			'ltPropLazyLoading': prop('boolean', { 'default': false }),
			'ltPropCopyMessagePreview': prop('boolean', { 'default': true }),
			'ltPropShowLineNumber': prop('boolean', { 'default': true }),
			'ltPropTitle': prop('string', { 'default': '' }),
			'ltPropCopyMessageOnSuccess': prop('string', { 'default': _lyteUiUtils.i18n('lyte.codesnippet.success.message') }),
			'ltPropCopyMessageOnFailure': prop('string', { 'default': _lyteUiUtils.i18n('lyte.codesnippet.failure.message') }),
			'ltPropCopyButtonAppearance': prop('string', { 'default': window._lyteUiUtils.resolveDefaultValue('lyte-code-snippet', 'copyButtonAppearance', 'text') }),
			'ltPropCopyTooltipText': prop('string', { 'default': window._lyteUiUtils.resolveDefaultValue('lyte-code-snippet', 'copyTooltipText', window._lyteUiUtils.i18n("lyte.codesnippet.copy")) })
		}), arg1);
	}

    didConnect() {
		this.createMessageBox();
	}

    createMessageBox() {
		if (this.getMessageBox()) {
			return;
		}

		var messageBox = document.createElement('lyte-messagebox');

		messageBox.setAttribute('id', 'lyteCSMessageBox');

		// document.body.appendChild(messageBox);
		if (window._lyteUiUtils.appendLocation === 'first') {
			document.body.insertBefore(messageBox, document.body.children[0]);
		}
		else {
			document.body.appendChild(messageBox);
		}

	}

    buildLineNumbers(totalLines) {
		var docFrag = document.createDocumentFragment(),
			showLineNumber = this.getData('ltPropShowLineNumber');

		if (!showLineNumber) {
			return;
		}

		for (var i = 1; i <= totalLines; i++) {
			var line = document.createElement('span');

			line.setAttribute('class', 'lyteCSLineNumber');
			line.textContent = i;
			docFrag.appendChild(line);
		}

		this.getLineNumberContainer().appendChild( docFrag );
	}

    isContainerEmpty() {
		var children = this.getChildren();

		return children.length === 0;
	}

    getChildren() {
		var container = this.getSnippetContainer();

		return container.children;
	}

    removeBuiltCode() {
		var container = this.getSnippetContainer(),
			lineNumberContainer = this.getLineNumberContainer();

		container.innerHTML = '';

		if (lineNumberContainer) {
			lineNumberContainer.innerHTML = '';
		}
	}

    fixDimensionsAndAppend(snippet, highlighterObj) {
		var lazyLoading = this.getData( 'ltPropLazyLoading' ),
		container = this.getSnippetContainer(),
		lineCount = ( highlighterObj || {} ).lineCount;

		if( lazyLoading ) {
			window.totalHeight = window.height * lineCount;
			container.style.height = totalHeight + 'px';
		}

		container.appendChild( snippet );
	}

    getSnippetContainer() {
		return this.$node.querySelector( '.lyteCSCodeContainer' );
	}

    getLineNumberContainer() {
		return this.$node.querySelector( '.lyteCSLineNumberContainer' );
	}

    isEmpty(element) {
		return !element.querySelector( '*' );
	}

    displaySuccessMessage() {
		var messageBox = this.getMessageBox();

		messageBox.ltProp( 'message', this.getData( 'ltPropCopyMessageOnSuccess' ) );
		messageBox.ltProp( 'type', 'success' );
		messageBox.ltProp( 'show', true );
	}

    getMessageBox() {
		return document.getElementById( 'lyteCSMessageBox' );
	}

    displayFailureMessage() {
		var messageBox = this.getMessageBox();

		messageBox.ltProp( 'message', this.getData( 'ltPropCopyMessageOnFailure' ) );
		messageBox.ltProp( 'type', 'error' );
		messageBox.ltProp( 'show', true );
	}

    static actions(arg1) {
        return Object.assign(super.actions({
            alignCodeAndLineContainer: function( event ) {
                var codeContainer = event.target,
                scrollPosition = codeContainer.scrollTop,
                showLineNumber = this.getData( 'ltPropShowLineNumber' );

                if( !showLineNumber ) {
                    return ;
                }

                this.getLineNumberContainer().scrollTop = scrollPosition;
            },

			copyCode: function () {
				if (this.getMethods('onBeforeCopy')) {
					this.executeMethod('onBeforeCopy', this);
				}
				var messagePreview = this.getData('ltPropCopyMessagePreview');
                var text = this.getData( 'ltPropCode' ) || '', that = this;

                if( window._lyteUiUtils.copy2clip ) {
					window._lyteUiUtils.copy2clip(text.replace(/&/g, '&amp;').replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/</g, '&lt;').replace(/>/g, '&gt;'),
						function () {
							if (messagePreview) {
								var messageBox = document.getElementById('lyteCSMessageBox');
								messageBox.ltProp('message', that.getData('ltPropCopyMessageOnSuccess'));
								messageBox.ltProp('type', 'success');
								messageBox.ltProp('show', true);
							}
						}, function () {
							if (messagePreview) {
								var messageBox = document.getElementById('lyteCSMessageBox');
								messageBox.ltProp('message', that.getData('ltPropCopyMessageOnFailure'));
								messageBox.ltProp('type', 'error');
								messageBox.ltProp('show', true);
							}
                    } )
                }
                else {
					if (messagePreview) {
						window.navigator.clipboard.writeText(text).then(function () {
							that.displaySuccessMessage();
						}, function (err) {
							that.displayFailureMessage();
						});
					}
                }
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            tokenizeAndBuild: function() {
                var type = this.getData( 'ltPropType' ) || 'js',
                code = this.getData( 'ltPropCode' );

                if( !this.isContainerEmpty() ) {
                    this.removeBuiltCode();
                }

                if( code ) {
                    var builder = $L.snippets.getBuilder( type, code ),
                    result = builder.build();
                    this.fixDimensionsAndAppend( result.snippet );
                    this.buildLineNumbers(result.lineCount);

                }

            }.observes(
                'ltPropCode'
            )
            .on( 'didConnect' )
        }), arg1);
    }

    _() {
        _;
    }
}

LyteCodeSnippetComponent._template = "<template tag-name=\"lyte-code-snippet\"> <div class=\"lyteCSHeader\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropTitle}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lyteCSTitle\"> {{ltPropTitle}} </div> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropCopyButtonAppearance,'===',&quot;text&quot;)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-button class=\"lyteCSCopyButton\" onclick=\"{{action('copyCode')}}\"> <template is=\"registerYield\" yield-name=\"text\"> copy </template> </lyte-button> </template><template default=\"\"> <span class=\"lyteCSCopyIcon\" onclick=\"{{action('copyCode')}}\" lt-prop-title=\"{{ltPropCopyTooltipText}}\" lt-prop-tooltip-config=\"{&quot;position&quot;: &quot;bottom&quot;}\"></span> </template></template> </div> <div class=\"lyteCSContainer\" style=\"height: 400px;\" onscroll=\"{{action('alignCodeAndLineContainer',event)}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowLineNumber}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lyteCSLineNumberContainer\"> </div> </template></template> <div class=\"lyteCSCodeContainer\"></div> </div> </template>";;
LyteCodeSnippetComponent._dynamicNodes = [{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":2,"sibl":[1]},{"t":"s","p":[1,3],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"r","p":[1,1],"dN":[],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"a","p":[3]},{"t":"s","p":[3,1],"c":{"lc_id_0":{"dN":[],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":0},{"type":"dc","trans":true,"hc":true,"p":[1]}];;

LyteCodeSnippetComponent._observedAttributes = [
    "ltPropCode",
    "ltPropType",
    "ltPropInitialLineCount",
    "ltPropLinesPerScroll",
    "ltPropLazyLoading",
    "ltPropCopyMessagePreview",
    "ltPropShowLineNumber",
    "ltPropTitle",
    "ltPropCopyMessageOnSuccess",
    "ltPropCopyMessageOnFailure",
    "ltPropCopyButtonAppearance",
    "ltPropCopyTooltipText"
];

export { LyteCodeSnippetComponent };

LyteCodeSnippetComponent.register("lyte-code-snippet", {
    hash: "LyteCodeSnippetComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});