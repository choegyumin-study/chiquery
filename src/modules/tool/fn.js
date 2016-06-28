export function tool_fn() {

	var modules = {};

	modules.detectChiQueryNodes = function(nodes) {
		return nodes.hasOwnProperty('isChiQuery');
	};

	modules.detectNodeItem = function(node) {
		return typeof node === "object" && typeof node.nodeName==="string" && typeof node.nodeType === "number";
	};

	return modules;

}
