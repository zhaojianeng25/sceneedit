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
var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var SelectButton = /** @class */ (function (_super) {
            __extends(SelectButton, _super);
            function SelectButton() {
                var _this = _super.call(this) || this;
                _this._selected = false;
                return _this;
            }
            Object.defineProperty(SelectButton.prototype, "selected", {
                get: function () {
                    return this._selected;
                },
                set: function (value) {
                    this._selected = value;
                    if (this._selected) {
                        this._state = 1;
                    }
                    else {
                        this._state = 0;
                    }
                },
                enumerable: true,
                configurable: true
            });
            SelectButton.prototype.interactiveEvent = function (e) {
                if (!this.enable) {
                    return false;
                }
                if (e.type == me.InteractiveEvent.Down) {
                    if (this.testPoint(e.x, e.y)) {
                        this._selected = !this._selected;
                        if (this._selected) {
                            this._state = 1;
                        }
                        else {
                            this._state = 0;
                        }
                    }
                }
                return _super.prototype.interactiveEvent.call(this, e);
            };
            return SelectButton;
        }(me.BaseButton));
        me.SelectButton = SelectButton;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SelectButton.js.map