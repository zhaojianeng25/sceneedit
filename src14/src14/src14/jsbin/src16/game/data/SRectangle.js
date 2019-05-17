/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var SRectangle = /** @class */ (function () {
            function SRectangle(__x, __y, __width, __height) {
                if (__x === void 0) { __x = 0; }
                if (__y === void 0) { __y = 0; }
                if (__width === void 0) { __width = 0; }
                if (__height === void 0) { __height = 0; }
                this.centerPoint = new data.point();
                this.centerPostion = new data.point();
                this.x = __x;
                this.y = __y;
                this.width = __width;
                this.height = __height;
                this.update();
            }
            Object.defineProperty(SRectangle.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    this._x = value;
                    this.update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SRectangle.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    this._y = value;
                    this.update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SRectangle.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this.update();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SRectangle.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this.update();
                },
                enumerable: true,
                configurable: true
            });
            SRectangle.prototype.update = function () {
                this.centerPoint.x = this.width / 2;
                this.centerPoint.y = this.height / 2;
                this.centerPostion.x = this.x + this.centerPoint.x;
                this.centerPostion.y = this.y + this.centerPoint.y;
                this._left = this._x;
                this._right = this._x + this._width;
                this._top = this._y;
                this._bottom = this._y + this._height;
            };
            /**
             * 设置宽度，将自动更新中心点x
             */
            SRectangle.prototype.setWidth = function (newWidth) {
                this.width = newWidth;
                this.update();
            };
            /**
             * 设置高度，将自动更新中心点y
             */
            SRectangle.prototype.setHeight = function (newHeight) {
                this.height = newHeight;
                this.update();
            };
            /**
             * 指示点是否被包含在矩形区域
             * px X轴
             * py Y轴
             * roundWidening 四周扩宽
             */
            SRectangle.prototype.contains2 = function (px, py, roundWidening) {
                if (roundWidening === void 0) { roundWidening = 0; }
                return px > (this._left - roundWidening) && px < (this._right + roundWidening) &&
                    py > (this._top - roundWidening) && py < (this._bottom + roundWidening);
            };
            /**
             * 指示点是否被包含在矩形区域
             * px X轴
             * py Y轴
             * roundWidening 四周扩宽
             */
            SRectangle.prototype.contains = function (px, py) {
                return px >= this._left && px < this._right
                    && py >= this._top && py < this._bottom;
            };
            /**
             * 区域碰撞检测
             * @param rect 目标区域
             * @return
             *
             */
            SRectangle.prototype.hitTest = function (rect, exp) {
                if (exp === void 0) { exp = 0; }
                if (exp == 0)
                    return !(rect.right < this._left || rect.x > this._right || rect.bottom < this._top || rect.y > this._bottom);
                else
                    return !(rect.right < this._left - exp || rect.x > this._right + exp || rect.bottom < this._top - exp || rect.y > this._bottom + exp);
            };
            SRectangle.prototype.toString = function () {
                return "SRectangle{x:" + this._x + " y:" + this._y + " width:" + this._width + " height:" + this.height + "}";
            };
            return SRectangle;
        }());
        data.SRectangle = SRectangle;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SRectangle.js.map