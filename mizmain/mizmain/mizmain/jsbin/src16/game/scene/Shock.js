/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Shock = /** @class */ (function () {
            function Shock() {
                this._isRunning = false;
                //每次刷新的时间
                this.PreEndTime = 0;
            }
            /**
             * 震动开始
             * @param duration 持续时间 单位/ms
             *
             */
            Shock.prototype.start = function (duration) {
                this._isRunning = true;
                //时间计算
                this._startTime = Laya.timer.currTimer;
                this._duration = duration;
                this._overTime = this._startTime + this._duration;
            };
            /**
             * 震动更新心态
             * @param diff 时间差
             *
             */
            Shock.prototype.update = function () {
                if (!this._isRunning)
                    return false;
                //防止帧率太高，抖动太厉害了
                //			if(PreEndTime > getTimer())return true;
                //			PreEndTime = getTimer() + 33;
                this.offsetX = MathU.randomBoolen() ? 6 : -6;
                this.offsetY = MathU.randomBoolen() ? 6 : -6;
                if (Laya.timer.currTimer > this._overTime) {
                    this.stop();
                }
                return true;
            };
            /**
             * 结束
             *
             */
            Shock.prototype.stop = function () {
                this._isRunning = false;
                this.offsetX = 0;
                this.offsetY = 0;
            };
            Shock.prototype.isShocking = function () {
                return this._isRunning;
            };
            return Shock;
        }());
        scene.Shock = Shock;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=Shock.js.map