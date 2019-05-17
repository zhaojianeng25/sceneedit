/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var models;
        (function (models) {
            var NewDemoResultVo = /** @class */ (function () {
                function NewDemoResultVo() {
                    this.hp_change = 0; // 受击者血量变化，为正是加血，为负是扣血
                    this.mp_change = 0; // 受击者魔法变化，为正是加蓝漂数字，为负是扣蓝漂退魔
                    this.sp_change = 0; // 受击者怒气变化，为正是加怒气，为负是扣怒气
                    this.ul_hp_change = 0; // 受击者当前血上限变化，为正是加，为负是减
                    this.target_result = 0; // 受击者结果类型，ResultType型枚举值叠加
                    this.return_hurt = 0; // 受击方造成的反伤值，如果为0则代表没有反伤
                    this.attack_back = 0; // 受击方造成的反击值，如果为0则代表没有反击
                    this.steal_hp = 0; // 攻击方产生的吸血值，如果为0则代表没有吸血
                    this.attacker_result = 0; // 攻击者结果类型，ResultType型枚举值叠加
                    this.protecter_id = 0; // 保护者ID
                    this.protecter_hp_change = 0; // 保护者血量变化，为正是加血，为负是扣血（显然是为负的）
                    this.protecter_result = 0; // 保护者结果类型，ResultType型枚举值叠加
                    this.assister_id = 0; // 合击者ID
                    this.steal_mp = 0; // 攻击方产生的吸蓝值，如果为0则代表没有吸蓝
                    this.return_hurt_death = 0; // 攻击者因为被反伤或反击致死而产生的伤的变化
                    this.protecter_maxhp_change = 0; // 保护者因为保护致死而产生的伤的变化
                    this.message_id = 0; // 行动时弹的提示ID
                    this.hp_godbless = 0; // 神佑血量变化
                    this.ep_change = 0; // 受击者效果点变化，为正是加效果点，为负是扣效果点
                    this.shape_change = 0; // 受击者模型改变
                    this.bgeneresult = false; // 是否计算完成
                    // <variable name="resultType" type="int"/>						结果类型 0普通 1反击 2连击 3追击 4溅射 5战斗结束 6破隐形
                    // <variable name="targetID" type="int"/>						目标id，必须有
                    // <variable name="flagtype" type="int"/>						服务器提供客户端标示
                    // <variable name="demobuffs" type="list" value="DemoBuff" />	每一个demo的buff变化
                    // <variable name="demoattrs" type="list" value="DemoAttr" />	每一个demo的属性最终值
                    // <variable name="datas" type="map" key="int" value="int" />	存储数据，key参考以下值，如datas中某key值没有则value默认为0
                    // <enum name="HP_CHANGE" value ="1" />							受击者血量变化，为正是加血，为负是扣血
                    // <enum name="MP_CHANGE" value ="2" />							受击者魔法变化，为正是加蓝，为负是扣蓝
                    // <enum name="SP_CHANGE" value ="3" />							受击者怒气变化，为正是加怒气，为负是扣怒气
                    // <enum name="UL_HP_CHANGE" value ="4" />				受击者当前血上限变化，为正是加，为负是减
                    // <enum name="TARGET_RESULT" value ="5" />				受击者结果类型，ResultType型枚举值叠加
                    // <enum name="RETURN_HURT" value ="6"/>				受击方造成的反伤值，如果为0则代表没有反伤
                    // <enum name="ATTACK_BACK" value ="7"/>				受击方造成的反击值，如果为0则代表没有反击
                    // <enum name="STEAL_HP" value ="8"/>					攻击方产生的吸血值，如果为0则代表没有吸血
                    // <enum name="ATTACKER_RESULT" value ="9"/>			攻击者结果类型，ResultType型枚举值叠加
                    // <enum name="PROTECTER_ID" value ="10"/>				保护者ID
                    // <enum name="PROTECTER_HP_CHANGE" value ="11"/>		保护者血量变化，为正是加血，为负是扣血（显然是为负的）
                    // <enum name="PROTECTER_RESULT" value ="12"/>			保护者结果类型，ResultType型枚举值叠加
                    // <enum name="ASSISTER_ID" value ="13"/>				合击者ID
                    // <enum name="STEAL_MP" value ="14"/>					攻击方产生的吸蓝值，如果为0则代表没有吸蓝
                    // <enum name="RETURN_HURT_DEATH" value ="15"/>			攻击者因为被反伤或反击致死而产生的伤的变化
                    // <enum name="PROTECTER_MAXHP_CHANGE" value ="16"/>	保护者因为保护致死而产生的伤的变化
                    // <enum name="MESSAGE_ID" value ="17"/>				行动时弹的提示ID
                    // <enum name="HP_GODBLESS" value ="18"/>				神佑血量变化
                    // <enum name="EP_CHANGE" value ="19" />				受击者效果点变化，为正是加效果点，为负是扣效果点
                    // <enum name="SHAPE_CHANGE" value ="20" />				模型改变
                    /*<enum name="RESULT_HPCHANGE"			value="1"/>		1:目标HP变化
                    <enum name="RESULT_MPCHANGE"			value="2"/>		2:目标MP变化
                    <enum name="RESULT_SPCHANGE"			value="4"/>		3:目标SP变化
                    <enum name="RESULT_ULHPCHANGE"			value="8"/>		4:当前血上限（伤）变化
                    <enum name="RESULT_REST"				value="16"/>	5:休息
                    <enum name="RESULT_HURT"				value="32"/>	6:目标受伤
                    <enum name="RESULT_CRITIC"				value="64"/>	7:目标被暴击
                    <enum name="RESULT_DEFENCE"				value="128"/>	8:目标防御
                    <enum name="RESULT_PARRY"				value="256"/>	9:目标招架（类似躲闪，只有普通攻击会触发招架）
                    <enum name="RESULT_DODGE"				value="512"/>	10:目标闪避
                    <enum name="RESULT_RUNAWAY"				value="1024"/>	11:目标逃跑
                    <enum name="RESULT_SEIZE"				value="2048"/>	12:目标被捕捉
                    <enum name="RESULT_SUMMONBACK"			value="4096"/>	13:目标被召回
                    <enum name="RESULT_DEATH"				value="8192"/>	14:目标死亡，倒在原地
                    <enum name="RESULT_KICKOUT"				value="16384"/> 15:目标被击飞（没有鬼魂技能的怪和宠物死亡时）
                    <enum name="RESULT_GHOST"				value="32768"/> 16:目标进入鬼魂状态（有鬼魂技能的怪和宠物死亡时）
                    <enum name="RESULT_RELIVE"				value="65536"/>	17:复活
                    <enum name="RESULT_SUMMONPET"			value="131072"/>	18:目标招唤宠物
                    <enum name="RESULT_IGNORE_PHYDIC_EFEN"	value="262144"/>	19:忽略防御
                    <enum name="RESULT_ABORBE"				value="524288"/>	20:吸收
                    <enum name="RESULT_FIRE_MANA"			value="1048576"/>	21:烧蓝
                    <enum name="RESULT_GODBLESS"			value="2097152"/>	22:神佑
                    <enum name="RESULT_EPCHANGE"			value="4194304"/>	23:目标EP变化
                    <enum name="RESULT_DEAD_FULL_RELIVE"	value="8388608"/>	24:满血复活
                    <enum name="RESULT_SHAPECHAGE"			value="16777216"/>	25:模型改变*/
                }
                NewDemoResultVo.prototype.fromByteArray = function (bytes) {
                    this.resultType = bytes.readInt32();
                    this.targetID = bytes.readInt32();
                    this.flagtype = bytes.readInt32();
                    this.demobuffs = [];
                    var demobuffsSize = bytes.readUint8();
                    var demoBuff;
                    for (var index = 0; index < demobuffsSize; index++) {
                        demoBuff = new models.DemoBuffVo();
                        demoBuff.fromByteArray(bytes);
                        this.demobuffs.push(demoBuff);
                    } //DemoBuff
                    this.demoattrs = [];
                    var demoattrsSize = bytes.readUint8();
                    var demoAttr;
                    for (var index = 0; index < demoattrsSize; index++) {
                        demoAttr = new models.DemoAttrVo();
                        demoAttr.fromByteArray(bytes);
                        this.demoattrs.push(demoAttr);
                    } //DemoAttr
                    var mapSize = bytes.readUint8();
                    this.datas = new Laya.Dictionary();
                    for (var index = 0; index < mapSize; index++) {
                        var key = bytes.readInt32();
                        var value = bytes.readInt32();
                        this.datas.set(key, value);
                        switch (key) {
                            case 1 /* HP_CHANGE */: // 受击者血量变化，为正是加血，为负是扣血
                                this.hp_change = value;
                                break;
                            case 2 /* MP_CHANGE */: // 受击者魔法变化，为正是加蓝漂数字，为负是扣蓝漂退魔
                                this.mp_change = value;
                                break;
                            case 3 /* SP_CHANGE */: // 受击者怒气变化，为正是加怒气，为负是扣怒气
                                this.sp_change = value;
                                break;
                            case 4 /* UL_HP_CHANGE */: // 受击者当前血上限变化，为正是加，为负是减
                                this.ul_hp_change = value;
                                break;
                            case 5 /* TARGET_RESULT */: // 受击者结果类型，ResultType型枚举值叠加
                                this.target_result = value;
                                break;
                            case 6 /* RETURN_HURT */: // 受击方造成的反伤值，如果为0则代表没有反伤
                                this.return_hurt = value;
                                break;
                            case 7 /* ATTACK_BACK */: // 受击方造成的反击值，如果为0则代表没有反击
                                this.attack_back = value;
                                break;
                            case 8 /* STEAL_HP */: // 攻击方产生的吸血值，如果为0则代表没有吸血
                                this.steal_hp = value;
                                break;
                            case 9 /* ATTACKER_RESULT */: // 攻击者结果类型，ResultType型枚举值叠加
                                this.attacker_result = value;
                                break;
                            case 10 /* PROTECTER_ID */: // 保护者ID
                                this.protecter_id = value;
                                break;
                            case 11 /* PROTECTER_HP_CHANGE */: // 保护者血量变化，为正是加血，为负是扣血（显然是为负的）
                                this.protecter_hp_change = value;
                                break;
                            case 12 /* PROTECTER_RESULT */: // 保护者结果类型，ResultType型枚举值叠加
                                this.protecter_result = value;
                                break;
                            case 13 /* ASSISTER_ID */: // 合击者ID
                                this.assister_id = value;
                                break;
                            case 14 /* STEAL_MP */: // 攻击方产生的吸蓝值，如果为0则代表没有吸蓝
                                this.steal_mp = value;
                                break;
                            case 15 /* RETURN_HURT_DEATH */: // 攻击者因为被反伤或反击致死而产生的伤的变化
                                this.return_hurt_death = value;
                                break;
                            case 16 /* PROTECTER_MAXHP_CHANGE */: // 保护者因为保护致死而产生的伤的变化
                                this.protecter_maxhp_change = value;
                                break;
                            case 17 /* MESSAGE_ID */: // 行动时弹的提示ID
                                this.message_id = value;
                                break;
                            case 18 /* HP_GODBLESS */: // 神佑血量变化
                                this.hp_godbless = value;
                                break;
                            case 19 /* EP_CHANGE */: // 受击者效果点变化，为正是加效果点，为负是扣效果点
                                this.ep_change = value;
                                break;
                            case 20 /* SHAPE_CHANGE */: // 受击者模型改变
                                this.shape_change = value;
                                break;
                        }
                    }
                };
                return NewDemoResultVo;
            }());
            models.NewDemoResultVo = NewDemoResultVo;
        })(models = scene.models || (scene.models = {}));
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=NewDemoResultVo.js.map