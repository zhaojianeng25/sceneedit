var battle;
(function (battle) {
    var FightModel = /** @class */ (function () {
        function FightModel(_app, _data) {
            this._app = _app;
            /** 添加的战斗者拥有的在战斗内显示的buff，value为回合数（为0则没有回合限制） */
            this.buffs = new Laya.Dictionary;
            this.level = 0;
            // flag对应的飘字颜色
            this.colorType = { 1: "red", 2: "red", 3: "green", 4: "blue", 5: "yellow" };
            this.fighterType = _data.fighterType;
            this.dataID = _data.dataID;
            this.fighterName = _data.fighterName;
            this.title = _data.title;
            this.titleId = _data.titleId;
            this.awakeState = _data.awakeState;
            this.index = _data.index;
            this.bGM = _data.bGM;
            this.maxhp = _data.maxhp;
            this.uplimithp = _data.uplimithp;
            this.hp = _data.hp;
            this.ep = _data.ep;
            this.shape = _data.shape;
            this.baseShape = _data.shape;
            this.subtype = _data.subtype;
            this.petkeys = _data.petkeys.slice();
            this.components = _data.components;
            this.is_self_role = this.fighterType === 1 /* FIGHTER_ROLE */ && game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid === _data.dataID;
            this.is_pet = this.fighterType === 2 /* FIGHTER_PET */;
            if (this.is_self_role) {
                this.mp = HudModel.getInstance().mpNum;
            }
            else if (this.is_pet) {
                var petinfo = PetModel._instance.pets.get(_LoginModel.getInstance().roleDetail.petIndex);
                if (petinfo)
                    this.mp = petinfo.mp;
            }
            console.log("战斗单位:", this.index, this.fighterType, this.dataID, this.fighterName, this.petkeys);
            console.log("是否玩家自身角色", this.is_self_role, this.fighterType, game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid, _data.dataID);
            console.log("血量", this.hp, this.maxhp, this.uplimithp);
            if (this.index > 14 /* MAX_POS */) {
                this.pos = this.index - 14 /* MAX_POS */;
            }
            else {
                this.pos = this.index;
            }
        }
        Object.defineProperty(FightModel.prototype, "isBottom", {
            get: function () {
                return this.index <= 14 /* MAX_POS */;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加buffer
         * @param buffid buffer id
         * @param round -1为删除该buff，0为没有回合数的buff，>0为回合数
         */
        FightModel.prototype.addBuffer = function (buffid, round) {
            // -1代表移除
            if (buffid == -1)
                this.buffs.remove(buffid);
            else
                this.buffs.set(buffid, round);
        };
        /**
         * 改变血量，飘伤害
         * @param num
         */
        FightModel.prototype.changeHp = function (num, color) {
            if (color === void 0) { color = 1; }
            console.log("-----------changeHp ", num, this.fakeUnit.name, this.hp, "站位:", this.index);
            if (num == 0) {
                return;
            }
            var data = [];
            data.color = this.colorType[color];
            data.num = num;
            this._app.sceneRoot.createdFightxt(this.fakeUnit, 1 /* NUM_TAB */, data, false, this.index);
            this.hp += num;
            //如果大于上限 则为上限
            // if (this.hp > this.uplimithp)
            // 	this.hp = this.uplimithp
            this.fakeUnit.hp = this.hp;
            this.fakeUnit.setLiveFlag(this.hp <= 0);
            console.log("-----------changeHp end ", num, this.fakeUnit.name, this.hp, "站位:", this.index);
            return this.hp <= 0;
        };
        /**改变魔法 */
        FightModel.prototype.changeMp = function (num) {
            if (num == 0) {
                return;
            }
            this.mp += num;
        };
        /** 效果点变化 */
        FightModel.prototype.changEp = function (num) {
            if (num == 0)
                return;
            this.ep += num;
        };
        /** 受击者怒气变化，为正是加怒气，为负是扣怒气 */
        FightModel.prototype.changeSp = function (num) {
            if (num === 0) {
                return;
            }
            // this.pos += num;
        };
        /** 受击者当前血上限变化，为正是加，为负是减 */
        FightModel.prototype.changeUpLimitHp = function (num) {
            if (num === 0) {
                return;
            }
            this.uplimithp += num;
        };
        return FightModel;
    }());
    battle.FightModel = FightModel;
})(battle || (battle = {}));
//# sourceMappingURL=FightModel.js.map