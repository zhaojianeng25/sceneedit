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
var battle;
(function (battle) {
    var aciton;
    (function (aciton) {
        var stage;
        (function (stage) {
            /**
             * 1 移动
             */
            var Move = /** @class */ (function (_super) {
                __extends(Move, _super);
                function Move() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Move.prototype.onInit = function (result, stage_data, attacker, attacker_units, Ypos, Xpos, center_return, _moveflag) {
                    if (Ypos === void 0) { Ypos = 0; }
                    if (Xpos === void 0) { Xpos = 0; }
                    if (center_return === void 0) { center_return = false; }
                    if (_moveflag === void 0) { _moveflag = 0; }
                    _super.prototype.onInit.call(this, result, stage_data, attacker, attacker_units);
                    this.Ypos = Ypos;
                    this.Xpos = Xpos;
                    this.center_return = center_return;
                    this._moveflag = _moveflag;
                };
                Move.prototype.onSubLogic = function (delay) {
                    if (!this.reinit_end) {
                        var unit = this.getPhantomUnit();
                        if (!unit.userData) {
                            return;
                        }
                        this.reinit_end = true;
                        var target = this.battle.findRoleByIndex(this.result.targetID);
                        if (!target) {
                            this.is_stage_end = true;
                            return;
                        }
                        var x = target.fakeUnit.GetPosX();
                        var y = target.fakeUnit.GetPosY();
                        console.log("targetID======", this.result.targetID + "  " + unit.name);
                        if (target.isBottom) { //目标是己方
                            x -= 10;
                            y += 10;
                        }
                        else {
                            x += 10;
                            y -= 10;
                        }
                        var delay_1 = 0;
                        if (this._moveflag == 1 /* MATCH_RUN */ && this.Ypos > 0 && this.Xpos > 0) { //捕捉失败目标中心点折回
                            delay_1 = this.battle._scene.moveHalfForward(unit, this.Ypos, this.Xpos);
                        }
                        else if (this._moveflag == 1 /* MATCH_RUN */) { //捕捉跑动
                            delay_1 = this.battle._scene.moveCatchRun(unit, target.pos - 1, target.isBottom);
                        }
                        else if (this._moveflag == 2 /* MATCH_BACK */) { //捕捉返回
                            var p = this.battle._scene.getMapPoint(target.pos - 1, target.isBottom);
                            this.battle._scene.moveRun(unit, p.y, p.x, 1500, 10, 1510);
                        }
                        else if (!this.center_return && this.Ypos > 0 && this.Xpos > 0) { //逃跑使用
                            this.Ypos += 20;
                            this.Xpos += 20;
                            this.battle._scene.moveRun(unit, this.Ypos, this.Xpos);
                        }
                        else {
                            delay_1 = this.battle._scene.moveForward(unit, target.pos - 1, target.isBottom);
                        }
                        this._delay = delay_1;
                    }
                    if (this.is_stage_end) {
                        return;
                    }
                    this._delay -= delay;
                    this.is_stage_end = this._delay <= 0;
                };
                return Move;
            }(stage.BaseStageAction));
            stage.Move = Move;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=Move.js.map