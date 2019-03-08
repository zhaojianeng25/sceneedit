var drag;
(function (drag) {
    var TempDrawManager = /** @class */ (function () {
        function TempDrawManager() {
        }
        TempDrawManager.prototype.doDrag = function (dragInitiator, dragSource, mouseEvent) {
            console.log(dragInitiator, dragSource, mouseEvent);
        };
        return TempDrawManager;
    }());
    drag.TempDrawManager = TempDrawManager;
    var DragManager = /** @class */ (function () {
        function DragManager() {
        }
        Object.defineProperty(DragManager, "impl", {
            get: function () {
                if (!this._impl) {
                    this._impl = new TempDrawManager();
                }
                return this._impl;
            },
            enumerable: true,
            configurable: true
        });
        DragManager.doDrag = function (dragInitiator, dragSource, mouseEvent, xOffset, yOffset, imageAlpha, allowMove) {
            if (xOffset === void 0) { xOffset = 0; }
            if (yOffset === void 0) { yOffset = 0; }
            if (imageAlpha === void 0) { imageAlpha = 0.5; }
            if (allowMove === void 0) { allowMove = true; }
            this.impl.doDrag(dragInitiator, dragSource, mouseEvent);
            Pan3d.ModuleEventManager.dispatchEvent(new drag.DragEvent(drag.DragEvent.DRAG_SHOW));
        };
        DragManager.NONE = "none";
        DragManager.COPY = "copy";
        DragManager.MOVE = "move";
        DragManager.LINK = "link";
        return DragManager;
    }());
    drag.DragManager = DragManager;
})(drag || (drag = {}));
//# sourceMappingURL=DragManager.js.map