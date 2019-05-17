var game;
(function (game) {
    var object;
    (function (object) {
        /**
         * 战斗单位角色
         * name 王谦
         */
        var FightRole = /** @class */ (function () {
            function FightRole() {
                this.name = ""; //
                this.entry = 0; //模板
                this.level = 0; //等级
                this.faction = 0; //阵营
                this.pos = 0; //阵位 
                this.speed = 0; //速度
                this.rare = 0; //稀有度
                this.gram = 0; //克制属性<=>克制属性
                this.max_hp = 0; //最大血量
                this.hp = 0; //当前血量
                this.atk = 0; //攻击<=>防御
                this.def = 0; //防御<=>攻击
                this.hit = 0; //命中<=>闪避
                this.eva = 0; //闪避<=>命中
                this.crit = 0; //暴击
                this.crit_hurt = 0; //暴击伤害
                this.agile = 0; //敏捷
                this.hit_buff = 0; //效果命中<=>抵抗
                this.resist = 0; //抵抗<=>效果命中
                this.force = 0; //战斗力
                this.test_damage = 0; //测试数据
                this.test_old_hps = []; //测试数据
            }
            Object.defineProperty(FightRole.prototype, "attrs", {
                /**设置属性列表*/
                set: function (attrs) {
                    if (!attrs)
                        return;
                    var len = Math.floor(attrs.length / 2);
                    var base;
                    var typeStr;
                    for (var i = 0; i < len; i++) {
                        base = 2 * i;
                        typeStr = FightRole.ATTR_STRS[attrs[base] - 1];
                        this[typeStr] = attrs[base + 1];
                    }
                    this.max_hp = this.hp;
                },
                enumerable: true,
                configurable: true
            });
            /**战斗单位属性英文名*/
            FightRole.ATTR_STRS = ["hp", "atk", "def", "hit", "eva", "crit", "crit_hurt", "agile", "hit_buff", "resist"];
            return FightRole;
        }());
        object.FightRole = FightRole;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=FightRole.js.map