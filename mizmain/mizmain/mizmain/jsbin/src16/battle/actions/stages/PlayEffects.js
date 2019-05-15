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
             * 2 特效播放
             */
            var PlayEffects = /** @class */ (function (_super) {
                __extends(PlayEffects, _super);
                function PlayEffects() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PlayEffects.prototype.onSubLogic = function (delay) {
                    if (!this.reinit_end) {
                        var unit_1 = this.getPhantomUnit();
                        if (!unit_1.userData) {
                            return;
                        }
                        this.reinit_end = true;
                    }
                    if (this.is_stage_end) {
                        return;
                    }
                    this.is_stage_end = true;
                    var target = this.battle.findRoleByIndex(this.result.targetID);
                    // console.log("玩家释放特效:" + this.attacker.fakeUnit.name );
                    var data = this.stage_data;
                    var effectname = data.effectname;
                    if (!effectname || effectname.length === 0) {
                        console.log("特效名称为空");
                        return;
                    }
                    var info = [];
                    info.x = this.stage_data.x;
                    info.y = this.stage_data.y;
                    info.frameScale = this.stage_data.scale;
                    // console.log("------------------effname=", effectname, " type = ", this.stage_data.postype, " pu = ", this.stage_data.phantomid);
                    // 判断特效播放时间
                    if (data.movetime > 0 && data.actionlimittime > 0)
                        info.timeLen = data.actionlimittime;
                    var unit = this.getPhantomUnit();
                    var postype = this.stage_data.postype;
                    switch (postype) {
                        case 0 /* eMagicPos_Static */: { //静止于人物
                            if (data.youfangxiang) {
                                // 判断方向，设置播放位置
                                if (this.attacker.index > 14 /* MAX_POS */) {
                                    info.x = this.stage_data.x0;
                                    info.y = this.stage_data.y0;
                                    info.frameScale = this.stage_data.scale0;
                                }
                                effectname += this.attacker.isBottom ? 1 : 0;
                            }
                            this.battle.scene.showFrameEffect(unit, effectname, info);
                            break;
                        }
                        case 1 /* eMagicPos_Friend */: { //友方阵型中间
                            var effectIndex = this.battle.findRoleByIndex(1);
                            this.battle.scene.showFrameEffect(effectIndex.fakeUnit, effectname, info);
                            break;
                        }
                        case 2 /* eMagicPos_Enemy */: { //敌方阵型中间
                            var effectIndex = this.battle.findRoleByIndex(15);
                            this.battle.scene.showFrameEffect(effectIndex.fakeUnit, effectname, info);
                            break;
                        }
                        case 5 /* eMagicPos_ToSelf */: { //从目标到自身
                            if (!target)
                                return;
                            if (data.youfangxiang) {
                                // 判断方向，设置播放位置
                                if (target.index > 14 /* MAX_POS */) {
                                    info.x = this.stage_data.x0;
                                    info.y = this.stage_data.y0;
                                    info.frameScale = this.stage_data.scale0;
                                }
                                effectname += target.isBottom ? 1 : 0;
                            }
                            this.battle.scene.showFrameEffect(target.fakeUnit, effectname, info);
                            break;
                        }
                    }
                };
                return PlayEffects;
            }(stage.BaseStageAction));
            stage.PlayEffects = PlayEffects;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=PlayEffects.js.map