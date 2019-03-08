var drag;
(function (drag) {
    var DragSource = /** @class */ (function () {
        function DragSource() {
            this.dataHolder = {};
            this.formatHandlers = {};
            this._formats = [];
        }
        Object.defineProperty(DragSource.prototype, "formats", {
            get: function () {
                return this._formats;
            },
            enumerable: true,
            configurable: true
        });
        DragSource.prototype.addData = function (data, format) {
            this._formats.push(format);
            this.dataHolder[format] = data;
        };
        DragSource.prototype.addHandler = function (handler, format) {
            this._formats.push(format);
            this.formatHandlers[format] = handler;
        };
        DragSource.prototype.dataForFormat = function (format) {
            var data = this.dataHolder[format];
            if (data) {
                return data;
            }
            if (this.formatHandlers[format]) {
                return this.formatHandlers[format]();
            }
            return null;
        };
        DragSource.prototype.hasFormat = function (format) {
            var n = this._formats.length;
            for (var i = 0; i < n; i++) {
                if (this._formats[i] == format) {
                    return true;
                }
            }
            return false;
        };
        return DragSource;
    }());
    drag.DragSource = DragSource;
})(drag || (drag = {}));
//# sourceMappingURL=DragSource.js.map