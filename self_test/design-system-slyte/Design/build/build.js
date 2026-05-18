'use strict';

var path = require("path"),
includeStyle,
buildUtils;

module.exports = {
	version: "1.0.0-RC",
	setCustomConfiguration : function(options) {
		options.customConfig = {
			outputFolder : "dist",
			eslint : false
		};
	},

	build : async function (options)  {
		buildUtils = new (require(path.join(options.cliRoot,'lib','utilities','buildUtils')))();
		await buildUtils.init(options);
		await buildUtils.build(options);
	},

	builder : {
		copyAppDir : async function(module) {
			await buildUtils._super(module,{
				ignoreFolders : ['node_modules']
			});
		},
		routes : async function(module) {
			await buildUtils._super(module);
		},
		components : async function(module) {
			includeStyle = true;
			await buildUtils._super(module,{ includeStyle : includeStyle });
		},
		helpers : async function(module) {
			await buildUtils._super(module);
		},
		schemas : async function(module) {
			await buildUtils._super(module);
		},
		mixins : async function(module) {
			await buildUtils._super(module);
		}
	},

	watcher : {
		copyAppDir : async function(module,file,modification) {
			await buildUtils._super(module,{ file : file, modification : modification });
		},
		routes : async function(module,file,modification) {
			await buildUtils._super(module,{ file :file, modification : modification });
		},
		components : async function(module,file,modification) {
			await buildUtils._super(module,{ file : file, modification :modification, includeStyle : includeStyle });
		},
		helpers : async function(module,file,modification) {
			await buildUtils._super(module,{ file : file, modification : modification });
		},
		schemas : async function(module,file,modification) {
			await buildUtils._super(module,{ file :file, modification :modification });
		},
		mixins : async function(module,file,modification) {
			await buildUtils._super(module,{ file : file, modification :modification });
		}
	}
};
