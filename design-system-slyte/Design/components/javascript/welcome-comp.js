/* No import/export here: lyte-cli componentCopy uses espree without sourceType:module. */
Lyte.Component.register("welcome-comp", {
	data: function () {
		return {
			features: Lyte.attr("array", {
				default: [
					{ module: "Router", url: "http://lyte/2.0/doc/route/introduction" },
					{ module: "Components", url: "http://lyte/2.0/doc/components/introduction" },
					{ module: "Data", url: "http://lyte/2.0/doc/data/introduction" },
					{ module: "CLI", url: "http://lyte/2.0/doc/cli/introduction" }
				]
			})
		};
	}
});
