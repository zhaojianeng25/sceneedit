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
             * 0 播放动作
             */
            var PlayAction = /** @class */ (function (_super) {
                __extends(PlayAction, _super);
                function PlayAction() {
                    var _a, _b;
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    // 动作配置表，配置actiontype对应的动作
                    _this.actionMap = (_a = {},
                        _a[1 /* STAND */] = AvatarData.STATE_STAND,
                        _a[5 /* RUN */] = AvatarData.STATE_RUNNING,
                        _a[7 /* ATTACKED */] = AvatarData.STATE_BEATEN,
                        _a[8 /* ATTACK */] = AvatarData.STATE_ATTACKGO,
                        _a[9 /* MAGIC */] = AvatarData.STATE_MACGO,
                        _a[11 /* DEFEND */] = AvatarData.STATE_DEFENSE,
                        _a[14 /* DEATH */] = AvatarData.STATE_DIED,
                        _a);
                    /**
                     * 主角根据造型和职业id决定攻击动作是不是atack2
                     */
                    _this.attack2Array = [
                        "1010101,12",
                        "1010101,17",
                        "1010102,11",
                        "1010103,18",
                        "1010104,14",
                        "1010104,18",
                        "1010105,15",
                        "1010105,19",
                        "1010106,15",
                        "1010106,16",
                    ];
                    _this.actionStringMap = (_b = {},
                        _b[1 /* STAND */] = "站立",
                        _b[5 /* RUN */] = "跑动",
                        _b[7 /* ATTACKED */] = "被击",
                        _b[8 /* ATTACK */] = "攻击",
                        _b[9 /* MAGIC */] = "法术攻击",
                        _b[11 /* DEFEND */] = "防御",
                        _b[14 /* DEATH */] = "死亡",
                        _b);
                    return _this;
                }
                PlayAction.prototype.onSubLogic = function (delay) {
                    var _this = this;
                    if (!this.reinit_end) {
                        var unit = this.getPhantomUnit();
                        if (!unit.userData) {
                            return;
                        }
                        this.reinit_end = true;
                        console.log("玩家:" + this.attacker.fakeUnit.name + " 站位:" + this.attacker.index + ", 动作: " + this.actionStringMap[this.stage_data.actiontype]);
                        var action_1 = this.stage_data.actiontype == 14 /* DEATH */ ? 1 : 2;
                        if (this.stage_data.actiontype == 15 /* ROLL */) {
                            // 击飞
                            this.battle._scene._scene.beatBackFly(this.attacker.fakeUnit, this.attacker.index);
                            Laya.timer.once(500, this, function () {
                                _this.attacker.fakeUnit.setVisible(false);
                            });
                            this._delay = 500;
                            return;
                        }
                        // 闪避都要执行移动
                        if (this.stage_data.actiontype == 12 /* DODGE */ || this.stage_data.actiontype == 7 /* ATTACKED */)
                            this.battle.scene._scene.onBeatMove(unit, this.attacker.index);
                        if (action_1 === UnitField.LIVE_STATU_DIE) //死亡判断职业移除特效
                         {
                            var school = this.battle._GetSchoolByModel(this.attacker);
                            if (school == zhiye.qixing) //如果是七星观职业则清除对应连击点特效
                             {
                                this.battle.scene.clearEffect(this.attacker.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_1);
                                this.battle.scene.clearEffect(this.attacker.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_2);
                                this.battle.scene.clearEffect(this.attacker.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_3);
                                this.battle.scene.clearEffect(this.attacker.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_4);
                                this.battle.scene.clearEffect(this.attacker.fakeUnit, battle.SceneBattleRes.EFFECT_COMBO_POINT_5);
                            }
                        }
                        var unitAction = this.actionMap[this.stage_data.actiontype];
                        // 以下门派职业的攻击动作使用attack2
                        if (this.attacker.fighterType == 1 /* FIGHTER_ROLE */ && this.stage_data.actiontype == 8 /* ATTACK */
                            && this.attack2Array.indexOf(this.attacker.shape + "," + this.attacker.school) >= 0) {
                            unitAction = AvatarData.STATE_ATTACKGO2;
                        }
                        this.battle.scene.battleAction(unit, unitAction, null, action_1);
                        this._delay = this.getActionTime(this.stage_data.actiontype);
                        return;
                    }
                    this._delay -= delay;
                    this.is_stage_end = this._delay <= 0;
                };
                PlayAction.prototype.getActionTime = function (action) {
                    switch (action) {
                        case 7 /* ATTACKED */: return 500; //受击
                        case 8 /* ATTACK */: return 800; //攻击
                        case 9 /* MAGIC */: return 800; //魔法
                        case 11 /* DEFEND */: return 330; //防御
                        case 14 /* DEATH */: return 330; //死亡
                        default: return 0;
                    }
                };
                return PlayAction;
            }(stage.BaseStageAction));
            stage.PlayAction = PlayAction;
        })(stage = aciton.stage || (aciton.stage = {}));
    })(aciton = battle.aciton || (battle.aciton = {}));
})(battle || (battle = {}));
//# sourceMappingURL=PlayAction.js.map