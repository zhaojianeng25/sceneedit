/**
* name
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
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
                // var direct:number = Number(angle + Direct.ANGLE_RADIANS_90 ) / Direct.ANGLE_RADIANS_45;
                var direct = angle / 45;
                var d = Math.round(direct) % Direct.MAX_DIRECT;
                return d;
            };
            /**
     * 转换成8方向的数值,Math.round
     * @param angle 0-2PI的弧度值
     * @return
     *
     */
            Direct.GetDirect2 = function (vec2) {
                switch (vec2) {
                    case 0:
                        return Direct.UP;
                    case 1:
                        return Direct.UPPER_RIGHT;
                    case 2:
                        return Direct.RIGHT;
                    case 3:
                        return Direct.BOTTOM_RIGHT;
                    case 4:
                        return Direct.BOTTOM;
                    case 5:
                        return Direct.BOTTOM_LEFT;
                    case 6:
                        return Direct.LEFT;
                    case 7:
                        return Direct.UPPER_LEFT;
                }
                return vec2;
            };
            /**
            
            /**
             * 转换绝对的0-7的8方向枚举，例如-1就是枚举7
             * @param direct
             * @return
             *
             */
            Direct.AbsDirect = function (direct) {
                return (direct + 8) % Direct.MAX_DIRECT;
            };
            /**
             * 根据8方向数值获得弧度
             * @param direct 0-7方向
             * @return
             *
             */
            Direct.GetAngle = function (direct) {
                return (direct + 6) % Direct.MAX_DIRECT * Direct.ANGLE_RADIANS_45;
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
                return Direct.GetDirect(ang);
            };
            Direct.UP = 6;
            Direct.UPPER_RIGHT = 7;
            Direct.RIGHT = 0;
            Direct.BOTTOM_RIGHT = 1;
            Direct.BOTTOM = 2;
            Direct.BOTTOM_LEFT = 3;
            Direct.LEFT = 4;
            Direct.UPPER_LEFT = 5;
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
            Direct.ANGLE_RADIANS_120 = Direct.ANGLE_RADIANS_90 + Direct.ANGLE_RADIANS_30;
            /**
             * 360角度弧度值
             */
            Direct.ANGLE_RADIANS_360 = Math.PI * 2;
            return Direct;
        }());
        utils.Direct = Direct;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=Direct.js.map