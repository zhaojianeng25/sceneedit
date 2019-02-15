var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var maineditor;
(function (maineditor) {
    var HierarchyFileNode = /** @class */ (function (_super) {
        __extends(HierarchyFileNode, _super);
        function HierarchyFileNode() {
            return _super.call(this) || this;
        }
        return HierarchyFileNode;
    }(maineditor.FileNode));
    maineditor.HierarchyFileNode = HierarchyFileNode;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=HierarchyFileNode.js.map