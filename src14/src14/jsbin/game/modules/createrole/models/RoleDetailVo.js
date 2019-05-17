/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var createrole;
        (function (createrole) {
            var models;
            (function (models) {
                var RoleDetailVo = /** @class */ (function () {
                    function RoleDetailVo() {
                        //RoleBasicFightProperties bfp = 36;//  
                        // public bfp;//  
                        //map<int32,int32> point = 37;//潜能
                        this.point = new Laya.Dictionary(); //潜能
                        /*map<int32,int32> sysconfigmap = 47;//
                        map<int32,int32> lineconfigmap = 48;//
                        map<int32,TitleInfo> titles = 49;//称谓信息
                        map<int32,FormBean> learnedFormsMap = 50;//
                        map<uint32,int32> components = 51;//角色装备信息 0脱下	*/
                        this.sysconfigmap = new Laya.Dictionary(); //
                        this.lineconfigmap = new Laya.Dictionary(); //
                        /**称谓信息字典key:称谓id,value:称谓名 */
                        this.titles = new Laya.Dictionary();
                        this.learnedFormsMap = new Laya.Dictionary(); //
                        this.components = new Laya.Dictionary(); //角色装备信息 0脱下
                        //public map<int32,Bag> bagInfo = 65;//key是bagid,value是背包的详细信息
                        this.bagInfo = {}; //key是bagid,value是背包的详细信息
                        //public map<int32,string> depotNameInfo = 67;//key是depotid,value是depot名(如果是默认的就不存了)
                        this.depotNameInfo = {}; //key是depotid,value是depot名(如果是默认的就不存了)
                        this.bfp = {};
                    }
                    RoleDetailVo.prototype.fromByteArray = function (bytes) {
                        this.roleid = bytes.readLong();
                        //this.rolename = bytes.readUTFBytes(bytes.readUint8());
                        this.rolename = ByteArrayUtils.readUtf16String(bytes);
                        this.level = bytes.readUint32();
                        this.school = bytes.readUint32();
                        this.shape = bytes.readUint32();
                        this.title = bytes.readInt32();
                        this.lastlogin = bytes.readLong();
                        this.hp = bytes.readUint32();
                        this.uplimithp = bytes.readUint32();
                        this.maxhp = bytes.readUint32();
                        this.mp = bytes.readUint32();
                        this.magicattack = bytes.readUint32();
                        this.maxmp = bytes.readUint32();
                        this.magicdef = bytes.readUint32();
                        this.sp = bytes.readUint32();
                        this.seal = bytes.readUint32();
                        this.maxsp = bytes.readUint32();
                        this.hit = bytes.readUint32();
                        this.damage = bytes.readUint32();
                        this.heal_critc_level = bytes.readUint32();
                        this.defend = bytes.readUint32();
                        this.phy_critc_level = bytes.readUint32();
                        this.speed = bytes.readUint32();
                        this.magic_critc_level = bytes.readUint32();
                        this.dodge = bytes.readUint32();
                        this.anti_phy_critc_level = bytes.readUint32();
                        this.medical = bytes.readUint32();
                        this.unseal = bytes.readUint32();
                        this.anti_critc_level = bytes.readUint32();
                        this.phy_critc_pct = bytes.readFloat();
                        this.magic_critc_pct = bytes.readFloat();
                        this.heal_critc_pct = bytes.readFloat();
                        this.anti_magic_critc_level = bytes.readUint32();
                        this.energy = bytes.readUint32();
                        this.enlimit = bytes.readUint32();
                        //this.bfpSize = bytes.readUint16();
                        this.bfp.cons = bytes.readUint16(); //体质
                        this.bfp.iq = bytes.readUint16(); //智力
                        this.bfp.str = bytes.readUint16(); //力量
                        this.bfp.endu = bytes.readUint16(); //耐力
                        this.bfp.agi = bytes.readUint16(); //敏捷
                        var mapSize = bytes.readUint8();
                        this.bfp.cons_save = new Laya.Dictionary(); //已分配体质
                        for (var index = 0; index < mapSize; index++) {
                            this.bfp.cons_save.set(bytes.readUint32(), bytes.readUint32());
                        }
                        mapSize = bytes.readUint8();
                        this.bfp.iq_save = new Laya.Dictionary(); //已分配智力
                        for (var index = 0; index < mapSize; index++) {
                            this.bfp.iq_save.set(bytes.readUint32(), bytes.readUint32());
                        }
                        mapSize = bytes.readUint8();
                        this.bfp.str_save = new Laya.Dictionary(); //已分配力量
                        for (var index = 0; index < mapSize; index++) {
                            this.bfp.str_save.set(bytes.readUint32(), bytes.readUint32());
                        }
                        mapSize = bytes.readUint8();
                        this.bfp.endu_save = new Laya.Dictionary(); //已分配耐力
                        for (var index = 0; index < mapSize; index++) {
                            this.bfp.endu_save.set(bytes.readUint32(), bytes.readUint32());
                        }
                        mapSize = bytes.readUint8();
                        this.bfp.agi_save = new Laya.Dictionary(); //已分配敏捷
                        for (var index = 0; index < mapSize; index++) {
                            this.bfp.agi_save.set(bytes.readUint32(), bytes.readUint32());
                        }
                        //by:lqw
                        mapSize = bytes.readUint8();
                        for (var index = 0; index < mapSize; index++) {
                            this.point.set(bytes.readUint32(), bytes.readUint32());
                        }
                        this.pointscheme = bytes.readUint32();
                        this.schemechanges = bytes.readUint32();
                        this.schoolvalue = bytes.readUint32();
                        this.reputation = bytes.readUint32();
                        this.exp = bytes.readLong();
                        this.nexp = bytes.readLong();
                        this.showpet = bytes.readUint32();
                        this.petmaxnum = bytes.readUint32();
                        this.pets = [];
                        mapSize = bytes.readUint8();
                        var pet;
                        for (var index = 0; index < mapSize; index++) {
                            pet = new game.modules.pet.models.PetInfoVo();
                            pet.fromByteArray(bytes);
                            this.pets.push(pet);
                        }
                        mapSize = bytes.readUint8();
                        for (var index = 0; index < mapSize; index++) {
                            this.sysconfigmap.set(bytes.readUint32(), bytes.readUint32());
                        }
                        mapSize = bytes.readUint8();
                        for (var index = 0; index < mapSize; index++) {
                            this.lineconfigmap.set(bytes.readUint32(), bytes.readUint32());
                        }
                        mapSize = bytes.readUint8();
                        var titleInfo;
                        for (var index = 0; index < mapSize; index++) {
                            titleInfo = new models.TitleInfoVo();
                            this.titles.set(bytes.readInt32(), titleInfo);
                            titleInfo.fromByteArray(bytes);
                        } //titleInfo
                        mapSize = bytes.readUint8();
                        var formbean;
                        for (var index = 0; index < mapSize; index++) {
                            formbean = new models.FormBeanVo();
                            this.learnedFormsMap.set(bytes.readUint32(), formbean);
                            formbean.fromByteArray(bytes);
                        } //FormBean
                        mapSize = bytes.readUint8();
                        for (var index = 0; index < mapSize; index++) {
                            this.components.set(bytes.readUint8(), bytes.readInt32());
                        }
                        this.activenesst = bytes.readUint32();
                        this.factionvalue = bytes.readUint32();
                        this.masterid = bytes.readLong();
                        this.isprotected = bytes.readUint8();
                        this.wrongpwdtimes = bytes.readUint8();
                        this.petIndex = bytes.readInt32();
                        this.kongzhijiacheng = bytes.readInt32();
                        this.kongzhimianyi = bytes.readInt32();
                        this.zhiliaojiashen = bytes.readInt32();
                        this.wulidikang = bytes.readInt32();
                        this.fashudikang = bytes.readInt32();
                        this.fashuchuantou = bytes.readInt32();
                        this.wulichuantou = bytes.readInt32();
                        mapSize = bytes.readUint8();
                        var bag;
                        for (var index = 0; index < mapSize; index++) {
                            bag = new game.modules.bag.models.BagVo();
                            // this.bagInfoSize.set(bytes.readUint32(),bag);
                            this.bagInfo[bytes.readInt32()] = bag;
                            bag.fromByteArray(bytes);
                        } //bag
                        this.rolecreatetime = bytes.readLong();
                        mapSize = bytes.readUint8();
                        for (var index = 0; index < mapSize; index++) {
                            this.depotNameInfo[bytes.readUint32()] = ByteArrayUtils.readUtf16String(bytes);
                        }
                    };
                    return RoleDetailVo;
                }());
                models.RoleDetailVo = RoleDetailVo;
            })(models = createrole.models || (createrole.models = {}));
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleDetailVo.js.map