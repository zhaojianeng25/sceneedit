/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data) {
        var Direct = /** @class */ (function () {
            function Direct() {
            }
            /**
             * 转换成8方向的数值,Math.round
             * @param angle 0-2PI的弧度值
             * @return
             *
             */
            Direct.GetDirect = function (angle) {
                var direct = angle + this.ANGLE_RADIANS_90 / this.ANGLE_RADIANS_45;
                var d = Math.round(direct) % this.MAX_DIRECT;
                return d;
            };
            /**
             * 转换绝对的0-7的8方向枚举，例如-1就是枚举7
             * @param direct
             * @return
             *
             */
            Direct.AbsDirect = function (direct) {
                return (direct + 8) % this.MAX_DIRECT;
            };
            /**
             * 根据8方向数值获得弧度
             * @param direct 0-7方向
             * @return
             *
             */
            Direct.GetAngle = function (direct) {
                return (direct + 6) % this.MAX_DIRECT * this.ANGLE_RADIANS_45;
            };
            /**
             * 根据原点到目标点，计算出8方向
             * @param sx 源点x
             * @param sy 原点y
             * @param dx 目标点x
             * @param dy 目标点y
             * @return 0-7方向
             *
             */
            Direct.ATan2 = function (sx, sy, dx, dy) {
                dx -= sx;
                dy -= sy;
                var ang = Math.atan2(dy, dx);
                ang = (ang >= 0) ? ang : 2 * Math.PI + ang;
                ang = Math.round((ang * 100)) / 100;
                return this.GetDirect(ang);
            };
            Direct.UP = 0;
            Direct.UPPER_RIGHT = 1;
            Direct.RIGHT = 2;
            Direct.BOTTOM_RIGHT = 3;
            Direct.BOTTOM = 4;
            Direct.BOTTOM_LEFT = 5;
            Direct.LEFT = 6;
            Direct.UPPER_LEFT = 7;
            Direct.MAX_DIRECT = 8;
            /**
             * 90角度的弧度值
             */
            Direct.ANGLE_RADIANS_90 = Math.PI / 2;
            /**
             * 45角度的弧度值
             */
            Direct.ANGLE_RADIANS_45 = Math.PI / 4;
            /**
             * 30角度的弧度值
             */
            Direct.ANGLE_RADIANS_30 = Math.PI / 6;
            /**
             * 15角度的弧度值
             */
            Direct.ANGLE_RADIANS_15 = Math.PI / 12;
            /**
             * 120角度的弧度值
             */
            Direct.ANGLE_RADIANS_120 = Math.PI / 2 + Math.PI / 6; //game.data.Direct.ANGLE_RADIANS_90 + game.data.Direct.ANGLE_RADIANS_30;
            /**
             * 360角度弧度值
             */
            Direct.ANGLE_RADIANS_360 = Math.PI * 2;
            return Direct;
        }());
        data.Direct = Direct;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=Direct.js.map