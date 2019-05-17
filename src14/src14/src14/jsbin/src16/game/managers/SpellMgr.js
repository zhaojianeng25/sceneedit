var game;
(function (game) {
    var managers;
    (function (managers) {
        /**
         * 技能管理器
         * name 王谦
         */
        var SpellMgr = /** @class */ (function () {
            function SpellMgr() {
                this.initTagetsHander();
                this.initSpellHander();
                this._buffMgr = new managers.BuffMgr();
            }
            /**处理技能回合*/
            SpellMgr.prototype.initSpells = function (spells) {
                for (var i = 0; i < spells.length; i++) {
                    spells[i].round = 0;
                }
            };
            /**获得普攻技能id*/
            SpellMgr.prototype.getNormalSpellId = function (role) {
                var spells = role.spells;
                var temp;
                for (var i = 0; i < spells.length; i++) {
                    temp = Template.getSkillsTempById(spells[i].id);
                    if (temp.type == 1)
                        return temp.id;
                }
                return 0;
            };
            /**获得出手技能id*/
            SpellMgr.prototype.getSpellId = function (role, anger) {
                var spells = role.spells;
                var temp;
                var spell_id = 0;
                var max = 0;
                for (var i = 0; i < spells.length; i++) {
                    if (spells[i].round > 0)
                        continue; //回合冷却中
                    temp = Template.getSkillsTempById(spells[i].id);
                    if (!temp || temp.cost > anger || max > temp.cost)
                        continue; //怒气不足或不是最大怒气技能(优先释放靠后技能)
                    spell_id = temp.id;
                    max = temp.cost;
                }
                return spell_id;
            };
            /**获得出手技能信息*/
            SpellMgr.prototype.getSpellInfo = function (spells, spell_id) {
                for (var i = 0; i < spells.length; i++) {
                    if (spells[i].id == spell_id)
                        return spells[i];
                }
                return null;
            };
            /**处理技能回合*/
            SpellMgr.prototype.updateSpells = function (spells) {
                for (var i = 0; i < spells.length; i++) {
                    if (spells[i].round >= 1)
                        spells[i].round--;
                }
            };
            /**技能释放*/
            SpellMgr.prototype.castSpell = function (spell_info, main, target, mains, targets, is_pvp) {
                var id = spell_info.id;
                var funName = this._handler_cast[id];
                if (!funName || !this[funName])
                    return null;
                return this[funName](spell_info, main, target, mains, targets, is_pvp);
            };
            //是否命中
            SpellMgr.prototype.isHit = function (main, target) {
                var eva = target.eva + this._buffMgr.getBonusEva(target.buffs);
                var hit = main.hit + this._buffMgr.getBonusHit(main.buffs);
                return Random.randInt(1, 100) > eva - hit; //目标没闪避成功
            };
            //是否暴击
            SpellMgr.prototype.isCrit = function (main, target) {
                var crit_def = 0; //target.crit_def + this._buffMgr.getBonusCritDef(target.buffs);
                var crit = main.crit + this._buffMgr.getBonusCrit(main.buffs);
                return Random.randInt(1, 100) <= crit - crit_def; //自己没暴击成功
            };
            //计算伤害
            SpellMgr.prototype.calculDamage = function (main, target, times, is_pvp) {
                if (this._buffMgr.isWudi(target.buffs))
                    return 0; //无敌，无处入手
                var atk = main.atk * (1 + this._buffMgr.getBonusDamge(main.buffs) / 100);
                var def = target.def * (1 + this._buffMgr.getBonusDef(target.buffs) / 100);
                var damage = atk - def;
                damage = times * damage;
                if (damage < 0)
                    damage = 1;
                return damage;
            };
            //计算暴击伤害
            SpellMgr.prototype.calculCritHurt = function (main, target) {
                return this._buffMgr.getBonusCritHurt(main.buffs);
            };
            /*==============================目标选择相关================================*/
            //取目标
            SpellMgr.prototype.getTargets = function (type, main, mains, target, targets) {
                if (!main || !mains || !targets)
                    return null;
                var funName = this._handler_targets[type];
                if (!funName || !this[funName])
                    return null;
                return this[funName](main, mains, target, targets);
            };
            //获取相邻信息
            SpellMgr.prototype.getOneAdjInfo = function (index, row) {
                if (!row || !row.length || index < 0 || index >= row.length)
                    return null;
                var list = [];
                var idx;
                for (var i = 1; i < row.length; i++) { //左右向外扩展
                    idx = index - i;
                    if (idx >= 0)
                        list.push(row[idx]);
                    idx = index + i;
                    if (idx < row.length)
                        list.push(row[idx]);
                }
                return list;
            };
            //目标函数路由
            SpellMgr.prototype.initTagetsHander = function () {
                var rows1 = [[1, 3, 5], [7, 9, 11]];
                var rows2 = [[2, 4, 6], [8, 10, 12]];
                this._oneFront = []; //前排一个:[2,4,6,8,10,12]、[1,3,5,7,9,11]、[4,2,6,10,8,12]、[3,1,5,9,7,11]、[6,2,4,12,8,10]、[5,1,3,11,7,9]
                this._oneBack = []; //后排一个:[8,10,12,2,4,6]、[7,9,11,1,3,5]、[10,8,12,4,2,6]、[9,7,11,3,1,5]、[12,8,10,6,2,4]、[11,7,9,5,1,3]
                this._oneAdj = []; //相邻一个:[3,5]、[4,6]、[1,5]、[2,6]、[3,1]、[4,2]、[9,11]、[10,12]、[7,11]、[8,12]、[9,7]、[10,8]
                var row00, row01, row10, row11;
                var pos1, pos2, index, pos;
                var isFront, isRows1;
                for (var i = 0; i < managers.FightMgr.MAX_POS; i++) {
                    pos1 = i + 1;
                    pos2 = pos1 + managers.FightMgr.MAX_POS;
                    //数值计算
                    index = rows1[0].indexOf(pos1);
                    if (index == -1)
                        rows1[1].indexOf(pos1);
                    if (index == -1) {
                        isRows1 = false;
                        index = rows2[0].indexOf(pos1);
                        if (index == -1)
                            rows2[1].indexOf(pos1);
                    }
                    else
                        isRows1 = true;
                    if (index == -1)
                        continue;
                    if (isRows1) { //阵位列表
                        row00 = rows1[0].concat();
                        row01 = rows1[1].concat();
                        row10 = rows2[0].concat();
                        row11 = rows2[1].concat();
                    }
                    else {
                        row00 = rows2[0].concat();
                        row01 = rows2[1].concat();
                        row10 = rows1[0].concat();
                        row11 = rows1[1].concat();
                    }
                    pos = row10.splice(index, 1)[0];
                    row10.unshift(pos);
                    pos = row11.splice(index, 1)[0];
                    row11.unshift(pos);
                    this._oneFront[pos2] = this._oneFront[pos1] = row10.concat(row11);
                    this._oneBack[pos2] = this._oneBack[pos1] = row11.concat(row10);
                    this._oneAdj[pos1] = this.getOneAdjInfo(index, row00);
                    this._oneAdj[pos2] = this.getOneAdjInfo(index, row01);
                }
                this._handler_targets = [];
                this._handler_targets[1] = "getFrontOne"; //前排一个
                this._handler_targets[2] = "getFrontAll"; //前排全部
                this._handler_targets[3] = "getColumn"; //列目标
                this._handler_targets[4] = "getTargetAll"; //敌方全体
                this._handler_targets[5] = "getMain"; //自身
                this._handler_targets[6] = "getTargetOne"; //敌方单体
                this._handler_targets[7] = "getMainAll"; //己方全体
            };
            //通过阵位列表选择未死战将
            SpellMgr.prototype.getRolesByPoss = function (roles, targets, poss) {
                if (!roles || !targets || !targets.length || !poss || !poss.length)
                    return managers.FightMgr.MAX_ROLE; //找不到或没处放
                var min = managers.FightMgr.MAX_ROLE;
                var index;
                for (var i = 0; i < targets.length; i++) {
                    if (targets[i].hp <= 0)
                        continue;
                    index = poss.indexOf(targets[i].pos);
                    if (index == -1)
                        continue;
                    roles[index] = targets[i];
                    if (index < min)
                        min = index;
                }
                return min;
            };
            //整理列表:全部前移
            SpellMgr.prototype.reSortList = function (roles) {
                var index = 0;
                for (var i = 0; i < roles.length; i++) {
                    if (!roles[i])
                        continue;
                    roles[index] = roles[i];
                    index++;
                }
                roles.length = index;
            };
            //前排一个
            SpellMgr.prototype.getFrontOne = function (main, mains, target, targets) {
                if (target && target.hp > 0)
                    return [target];
                var roles = [];
                var min = this.getRolesByPoss(roles, targets, this._oneFront[main.pos]);
                return min < managers.FightMgr.MAX_ROLE ? [roles[min]] : null;
            };
            //前排全部
            SpellMgr.prototype.getFrontAll = function (main, mains, target, targets) {
                var roles = [];
                var min = this.getRolesByPoss(roles, targets, this._oneFront[main.pos]);
                if (min == managers.FightMgr.MAX_ROLE)
                    return null; //没找到
                if (min < 3 && roles.length > 3)
                    roles.length = 3; //前排有
                this.reSortList(roles);
                if (target && target.hp > 0) {
                    var index = roles.indexOf(target);
                    if (index != -1)
                        roles.splice(index, 1);
                    roles.unshift(target);
                }
                return roles;
            };
            //列目标
            SpellMgr.prototype.getColumn = function (main, mains, target, targets) {
                var roles = [];
                var pos = main.pos;
                if (target && target.hp > 0)
                    pos = target.pos % 2 == 1 ? target.pos + 1 : target.pos - 1;
                var min = this.getRolesByPoss(roles, targets, this._oneFront[pos]);
                if (min == managers.FightMgr.MAX_ROLE)
                    return null; //没找到
                var index = 0; //筛选列目标
                for (var i = min; i < roles.length; i += 3) {
                    if (!roles[i])
                        continue;
                    roles[index] = roles[i];
                    index++;
                }
                roles.length = index;
                return roles;
            };
            //敌方全体
            SpellMgr.prototype.getTargetAll = function (main, mains, target, targets) {
                var roles = [];
                var pos = main.pos % 2 == 1 ? main.pos + 1 : main.pos - 1;
                for (var i = 0; i < targets.length; i++) {
                    if (targets[i].hp <= 0)
                        continue;
                    if (targets[i].pos != pos)
                        roles.push(targets[i]);
                    else
                        roles.unshift(targets[i]);
                }
                if (target && target.hp > 0) {
                    var index = roles.indexOf(target);
                    if (index != -1)
                        roles.splice(index, 1);
                    roles.unshift(target);
                }
                return roles;
            };
            //自身
            SpellMgr.prototype.getMain = function (main, mains, target, targets) {
                return [main];
            };
            //敌方单体:后排优先
            SpellMgr.prototype.getTargetOne = function (main, mains, target, targets) {
                if (target && target.hp > 0)
                    return [target];
                var roles = [];
                var min = this.getRolesByPoss(roles, targets, this._oneBack[main.pos]);
                return min < managers.FightMgr.MAX_ROLE ? [roles[min]] : null;
            };
            //己方全体
            SpellMgr.prototype.getMainAll = function (main, mains, target, targets) {
                var roles = [];
                for (var i = 0; i < mains.length; i++) {
                    if (mains[i].hp <= 0)
                        continue;
                    if (mains[i] != main)
                        roles.push(mains[i]);
                    else
                        roles.unshift(mains[i]);
                }
                return roles;
            };
            /*==============================技能释放相关================================*/
            //技能函数路由
            SpellMgr.prototype.initSpellHander = function () {
                var temps = Template.data["tb_skills"];
                this._handler_cast = [];
                for (var i = 0; i < temps.length; i++) {
                    if (!temps[i])
                        continue;
                    var castSpellName = "castSpell" + temps[i].id;
                    if (this[castSpellName])
                        this._handler_cast[temps[i].id] = castSpellName;
                    else
                        this._handler_cast[temps[i].id] = "castNormal"; //默认普通攻击
                }
            };
            //纯伤害技能
            SpellMgr.prototype.castNormal = function (spell_info, main, target, mains, targets, is_pvp) {
                var cast_info = [];
                var temp = Template.getSkillsTempById(spell_info.id);
                var roles = this.getTargets(temp.target, main, mains, target, targets);
                if (!roles || !roles.length)
                    return null;
                var hurts = temp.hurts;
                if (!hurts.length)
                    hurts[0] = 100;
                var buff_info = temp.buff_target && temp.buff_target.length ? temp.buff_target : null;
                var info;
                var j, damage;
                for (var i = 0; i < roles.length; i++) {
                    info = { pos: roles[i].pos, hit_info: [], value: [], buffs: null };
                    for (j = 0; j < hurts.length; j++) {
                        if (this.isHit(main, roles[i])) { //命中
                            damage = hurts[j] * this.calculDamage(main, roles[i], 1, is_pvp) / 100;
                            if (!this.isCrit(main, roles[i])) { //暴击
                                info.hit_info[j] = UnitField.HIT_NOMAL;
                                info.value[j] = damage;
                            }
                            else {
                                info.hit_info[j] = UnitField.HIT_CRIT;
                                info.value[j] = (1.5 + this.calculCritHurt(main, roles[i])) * damage;
                            }
                        }
                        else {
                            info.hit_info[j] = UnitField.HIT_MISS;
                            info.value[j] = 0;
                        }
                    }
                    if (buff_info && Math.random() * 100 < buff_info[1])
                        this._buffMgr.addRoleBuff(roles[i], buff_info[0]); //目标触发buff
                    cast_info.push(info);
                }
                buff_info = temp.buff_self && temp.buff_self.length ? temp.buff_self : null;
                if (buff_info && Math.random() * 100 < buff_info[1])
                    this._buffMgr.addRoleBuff(main, buff_info[0]); //自身触发buff
                return cast_info;
            };
            /*==============================被动技能相关================================*/
            /**检测受伤被动技能*/
            SpellMgr.prototype.checkPassiveHurt = function (main, cast) {
                if (main.entry == 4) { //德川家康
                    var passiveId = 14;
                    var temp = void 0;
                    var buff_info = void 0;
                    for (var i = 0; i < main.passives.length; i++) {
                        if (main.passives[i].id != passiveId)
                            continue;
                        if (Math.random() > main.passives[i].rate)
                            return; //未触发
                        temp = Template.getSkillsTempById(passiveId);
                        buff_info = temp.buff_target && temp.buff_target.length ? temp.buff_target : null;
                        if (buff_info && Math.random() * 100 < buff_info[1])
                            this._buffMgr.addRoleBuff(cast, buff_info[0]); //目标触发buff
                        buff_info = temp.buff_self && temp.buff_self.length ? temp.buff_self : null;
                        if (buff_info && Math.random() * 100 < buff_info[1])
                            this._buffMgr.addRoleBuff(main, buff_info[0]); //自身触发buff
                    }
                }
            };
            return SpellMgr;
        }());
        managers.SpellMgr = SpellMgr;
    })(managers = game.managers || (game.managers = {}));
})(game || (game = {}));
//# sourceMappingURL=SpellMgr.js.map