/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var point = /** @class */ (function () {
            function point(__x, __y) {
                if (__x === void 0) { __x = 0; }
                if (__y === void 0) { __y = 0; }
                this.x = __x;
                this.y = __y;
            }
            /**
             * 比较两个点是否相同的x,y
             * @param ept 需要比较的点
             * @return
             *
             */
            point.prototype.equals = function (ept) {
                return !(ept.x != this.x || ept.y != this.y);
            };
            point.prototype.toString = function () {
                return "x=" + this.x + ",y=" + this.y;
            };
            return point;
        }());
        data.point = point;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=point.js.map