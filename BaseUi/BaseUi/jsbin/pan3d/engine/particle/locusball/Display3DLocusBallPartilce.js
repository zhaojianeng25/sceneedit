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
        var Display3DLocusBallPartilce = /** @class */ (function (_super) {
            __extends(Display3DLocusBallPartilce, _super);
            //protected _posAry: Array<number>;
            //protected _angleAry: Array<number>;
            //protected _tangentAry: Array<number>;
            //protected _tangentSpeed:number;
            function Display3DLocusBallPartilce() {
                return _super.call(this) || this;
            }
            Display3DLocusBallPartilce.prototype.creatData = function () {
                this.data = new me.ParticleLocusballData;
            };
            return Display3DLocusBallPartilce;
        }(me.Display3DBallPartilce));
        me.Display3DLocusBallPartilce = Display3DLocusBallPartilce;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DLocusBallPartilce.js.map