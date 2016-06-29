export default function() {

	var modules = {};

	modules.detectChiQueryNodes = function(nodes) {
		return nodes.hasOwnProperty('isChiQuery');
	};

	modules.detectNodeItem = function(node) {
		return typeof node === "object" && typeof node.nodeName==="string" && typeof node.nodeType === "number";
	};

	modules.unwrapChiQueryNodes = function(nodes) {
		return Array.prototype.slice.call(nodes);
	};

	return modules;

}
