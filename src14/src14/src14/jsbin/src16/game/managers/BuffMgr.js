var game;
(function (game) {
    var managers;
    (function (managers) {
        /**
         * buff管理器
         * name 王谦
         */
        //this.buff_id = buff_id;
        //this.buff_lv = buff_lv;
        //this.buff_round = buff_round;
        //this.buff_data[] = buff_data[];
        var BuffMgr = /** @class */ (function () {
            function BuffMgr() {
                this._buff_limit = [1];
                this._buff_wudi = [];
                this._buff_mianyi = [];
                this._buff_gain = [];
                this._buff_debuff = [];
                var temps = Template.data["tb_buffs"];
                for (var i = 0; i < temps.length; i++) {
                    if (!temps[i])
                        continue;
                    if (temps[i].type == 1)
                        this._buff_gain.push(temps[i].id);
                    else if (temps[i].type == 2)
                        this._buff_debuff.push(temps[i].id);
                }
                this._handler_trigger = [];
                // this._handler_trigger[1] = "bleeding"; //灼烧
                // this._handler_trigger[2] = "bleeding"; //中毒
                // this._handler_trigger[4] = "bleeding"; //回血
            }
            //给角色添加buff
            BuffMgr.prototype.addRoleBuff = function (target, buff_id) {
                if (!target || !buff_id)
                    return;
                var temp = Template.getBuffsTempById(buff_id);
                if (!temp)
                    return;
                target.buffs = this.addBuff(target.buffs, temp.id, temp.round, 1, temp.values);
            };
            //新增buff
            BuffMgr.prototype.addBuff = function (buffs, buff_id, buff_round, buff_lv, buff_data) {
                var temp = Template.getBuffsTempById(buff_id);
                if (!temp || (temp.type == 2 && this.isMianyi(buffs)))
                    return buffs;
                if (!buffs)
                    buffs = [];
                var count = 0; //数量
                var buff; //回合最少buff(替换)
                for (var i = 0; i < buffs.length; i++) {
                    if (buffs[i].buff_id != buff_id)
                        continue;
                    if (!buff || buffs[i].buff_round < buff.buff_round)
                        buff = buffs[i];
                    count++;
                }
                if (!buff || count < temp.max_count) {
                    buff = { buff_id: buff_id };
                    buffs.push(buff);
                }
                buff.buff_round = buff_round;
                buff.buff_lv = buff_lv;
                buff.buff_data = buff_data;
                return buffs;
            };
            BuffMgr.prototype.removeBuff = function (buffs, data) {
                if (!buffs || !buffs.length)
                    return;
                var ids;
                if (typeof (data) == "number") {
                    ids = [data];
                }
                else if (typeof (data) == "boolean") {
                    ids = data ? this._buff_gain : this._buff_debuff;
                }
                else {
                    ids = data;
                }
                var index;
                for (var i = 0; i < buffs.length; i++) {
                    index = ids.indexOf(buffs[i].buff_id);
                    if (index == -1)
                        continue;
                    buffs.splice(i, 1);
                    i--;
                }
            };
            /**是否限制出手*/
            BuffMgr.prototype.isLimit = function (buffs) {
                if (!buffs || !buffs.length)
                    return false;
                for (var i = 0; i < buffs.length; i++) {
                    if (this._buff_limit.indexOf(buffs[i].buff_id) != -1)
                        return true;
                }
                return false;
            };
            /**是否普攻*/
            BuffMgr.prototype.hasChaofeng = function (buffs) {
                if (!buffs || !buffs.length)
                    return false;
                for (var i = 0; i < buffs.length; i++) {
                    if (buffs[i].buff_id == 4)
                        return true;
                }
                return false;
            };
            /**是否无敌*/
            BuffMgr.prototype.isWudi = function (buffs) {
                if (!buffs || !buffs.length)
                    return false;
                for (var i = 0; i < buffs.length; i++) {
                    if (this._buff_wudi.indexOf(buffs[i].buff_id) != -1)
                        return true;
                }
                return false;
            };
            /**是否免疫debuff*/
            BuffMgr.prototype.isMianyi = function (buffs) {
                if (!buffs || !buffs.length)
                    return false;
                for (var i = 0; i < buffs.length; i++) {
                    if (this._buff_mianyi.indexOf(buffs[i].buff_id) != -1)
                        return true;
                }
                return false;
            };
            /**清理所有嘲讽buff*/
            BuffMgr.prototype.clearChaofeng = function (buffs) {
                if (!buffs || !buffs.length)
                    return;
                for (var i = 0; i < buffs.length; i++) {
                    if (buffs[i].buff_id != 4)
                        continue;
                    buffs.splice(i, 1);
                    i--;
                }
            };
            /**获取德川家康回血数值*/
            BuffMgr.prototype.getDHuixue = function (buffs) {
                if (!buffs || !buffs.length)
                    return 0;
                for (var i = 0; i < buffs.length; i++) {
                    if (buffs[i].buff_id == 5)
                        return buffs[i].buff_data[1];
                }
                return 0;
            };
            /**处理buff回合*/
            BuffMgr.prototype.updateBuff = function (buffs) {
                if (!buffs || !buffs.length)
                    return;
                for (var i = 0; i < buffs.length; i++) {
                    if (buffs[i].buff_round > 0)
                        buffs[i].buff_round--;
                    if (buffs[i].buff_round <= 0) {
                        buffs.splice(i, 1);
                        i--;
                    }
                }
            };
            /*===============处理buff相关函数===================*/
            /**处理指定buff*/
            BuffMgr.prototype.buffTrigger = function (buff, role) {
                if (!buff || !role)
                    return null;
                var funName = this._handler_trigger[buff.buff_id];
                if (!funName || !this[funName])
                    return null;
                return this[funName](buff, role);
            };
            //持续去血或者回血
            BuffMgr.prototype.bleeding = function (buff, role) {
                var nuqi = 0;
                var info = {};
                info.buff_id = buff.buff_id;
                info.value = this.getBuffValueByType(buff.buff_data, 1);
                return info;
            };
            //通过类型获取buff效果数值
            BuffMgr.prototype.getBuffValueByType = function (buff_data, type) {
                if (type <= 0)
                    return;
                var len = Math.floor(buff_data.length / 2);
                var value = 0;
                var base;
                for (var i = 0; i < len; i++) {
                    base = 2 * i;
                    if (buff_data[base] != type)
                        continue;
                    value += buff_data[base + 1];
                }
                return value;
            };
            /*===============获取指定buff数值===================*/
            /**获取指定效果buff数值*/
            BuffMgr.prototype.getSomeBonus = function (buffs, buffIds, indexs) {
                if (indexs === void 0) { indexs = [0]; }
                if (!buffs || !buffs.length || !buffIds || !buffIds.length)
                    return 0;
                var num = 0;
                var index;
                for (var i = 0; i < buffs.length; i++) {
                    index = buffIds.indexOf(buffs[i].buff_id);
                    if (index == -1)
                        continue;
                    index = 2 * indexs[index] + 1;
                    if (this._buff_gain.indexOf(buffs[i].buff_id) != -1) { //增益
                        num += buffs[i].buff_data[index];
                    }
                    else {
                        num -= buffs[i].buff_data[index];
                    }
                }
                return num;
            };
            /**获取速度的数值*/
            BuffMgr.prototype.getBonusSpeed = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            /**获取伤害的数值*/
            BuffMgr.prototype.getBonusDamge = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            /**获取防御的数值*/
            BuffMgr.prototype.getBonusDef = function (buffs) {
                return this.getSomeBonus(buffs, [2, 3, 6], [0, 0, 0]);
            };
            /**获取命中数值*/
            BuffMgr.prototype.getBonusHit = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            /**闪避加成*/
            BuffMgr.prototype.getBonusEva = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            /**获取暴击的数值*/
            BuffMgr.prototype.getBonusCrit = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            /**获取暴击伤害的数值*/
            BuffMgr.prototype.getBonusCritHurt = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            /**获取敏捷的数值*/
            BuffMgr.prototype.getBonusAgile = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            /**获取抵抗的数值*/
            BuffMgr.prototype.getBonusResist = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            /**获取效果命中的数值*/
            BuffMgr.prototype.getBonusHitBuff = function (buffs) {
                return this.getSomeBonus(buffs, []);
            };
            return BuffMgr;
        }());
        managers.BuffMgr = BuffMgr;
    })(managers = game.managers || (game.managers = {}));
})(game || (game = {}));
//# sourceMappingURL=BuffMgr.js.map