var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var Groundposition = /** @class */ (function () {
            function Groundposition() {
            }
            Groundposition.getGroundPos = function ($x, $y) {
                var $ty = -500;
                if (!this._plantObjectMath) {
                    var A = new me.Vector3D(0, $ty, 500);
                    var B = new me.Vector3D(-500, $ty, 0);
                    var C = new me.Vector3D(500, $ty, 0);
                    this._plantObjectMath = me.Calculation._PanelEquationFromThreePt(A, B, C);
                    this._plantnormal = new me.Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
                    this._plantnormal.normalize();
                    this._plane_a = new me.Vector3D(A.x, A.y, A.z);
                }
                //计算直线与平面交点
                var line_a = me.MathUtil.mathDisplay2Dto3DWorldPos(new me.Vector2D($x, $y), 500);
                var line_b = new me.Vector3D(me.Scene_data.cam3D.x, me.Scene_data.cam3D.y, me.Scene_data.cam3D.z);
                var crossPoint = me.Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
                return crossPoint;
            };
            return Groundposition;
        }());
        me.Groundposition = Groundposition;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Groundposition.js.map