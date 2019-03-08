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
var drag;
(function (drag) {
    var BaseEvent = Pan3d.BaseEvent;
    var DragEvent = /** @class */ (function (_super) {
        __extends(DragEvent, _super);
        function DragEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragEvent.DRAG_ENTER = "DRAG_ENTER";
        DragEvent.DRAG_DROP = "DRAG_DROP";
        return DragEvent;
    }(BaseEvent));
    drag.DragEvent = DragEvent;
})(drag || (drag = {}));
//# sourceMappingURL=DragEvent.js.map