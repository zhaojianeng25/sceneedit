/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var AvatarLinkage = /** @class */ (function () {
            function AvatarLinkage() {
            }
            /**
             * 清理
             *
             */
            AvatarLinkage.prototype.clear = function () {
                this._kind = 0;
                this._occ = 0;
                this._equip = 0;
                this.direct = 0;
                this.shortName = null;
            };
            Object.defineProperty(AvatarLinkage.prototype, "kind", {
                get: function () {
                    return this._kind;
                },
                set: function (value) {
                    if (this._kind == value)
                        return;
                    this._kind = value;
                    //只有玩家才分模型,装备
                    if (this._kind != AvatarLinkage.KIND_PLAYER) {
                        this.occ = AvatarLinkage.OCC_NONE;
                        this.equip = AvatarLinkage.EQUIP_BODY;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarLinkage.prototype, "occ", {
                get: function () {
                    return this._occ;
                },
                set: function (value) {
                    if (this._occ == value)
                        return;
                    this._occ = value;
                    //模型0的，只有身体
                    if (this._occ == AvatarLinkage.OCC_NONE) {
                        this.equip = AvatarLinkage.EQUIP_BODY;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarLinkage.prototype, "equip", {
                get: function () {
                    return this._equip;
                },
                set: function (value) {
                    if (this._equip == value)
                        return;
                    this._equip = value;
                    //只有手和武器才分主副
                    if (this._equip != AvatarLinkage.EQUIP_HAND && this._equip != AvatarLinkage.EQUIP_ARMS) {
                        this.direct = AvatarLinkage.DIRECT_NONE;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 获得avatar全名
             * @return
             *
             */
            AvatarLinkage.prototype.getName = function () {
                if (StringU.isEmpty(this.shortName))
                    return null;
                return this._kind.toString() + this._occ.toString() +
                    this._equip.toString() + this.direct.toString() +
                    this.shortName;
            };
            /**
             * 通过短名获得全名
             * @param __shortName
             * @return
             *
             */
            AvatarLinkage.prototype.getName1 = function (__shortName) {
                this.shortName = __shortName;
                return this.getName();
            };
            /**
             * 通过短名和装备类型获得全名
             * @param __equip
             * @param __shorName
             * @return
             *
             */
            AvatarLinkage.prototype.getName2 = function (__equip, __shorName) {
                this.equip = __equip;
                this.shortName = __shorName;
                return this.getName();
            };
            //////////////////////////////////////////////////////////////
            //////////////////////// 种类枚举 ////////////////////////////
            //////////////////////////////////////////////////////////////		
            AvatarLinkage.KIND_NONE = 0; //未定义种类
            AvatarLinkage.KIND_PLAYER = 1; //玩家种类
            AvatarLinkage.KIND_CREATURE = 2; //怪物种类
            AvatarLinkage.KIND_MOUNT = 4; //坐骑
            /***********************************************************************************/
            //职业
            /***********************************************************************************/
            AvatarLinkage.OCC_NONE = 0; //无
            AvatarLinkage.OCC_STRONG = 1; //壮男
            AvatarLinkage.OCC_HANDSOME = 2; //俊男 
            AvatarLinkage.OCC_LAURIE = 3; //萝莉
            AvatarLinkage.OCC_BEAUTY = 4; //美人
            //////////////////////////////////////////////////////////////
            //////////////////////// 装备分类枚举 ////////////////////////
            //////////////////////////////////////////////////////////////
            AvatarLinkage.EQUIP_BODY = 0; //身体
            //		public static EQUIP_CLOTHES	:number = 1;			//衣服
            AvatarLinkage.EQUIP_CLOAK = 2; //披风
            AvatarLinkage.EQUIP_ARMS = 3; //武器
            AvatarLinkage.EQUIP_MOUNTHAIR = 4; //坐骑头
            AvatarLinkage.EQUIP_HAND = 5; //手掌
            AvatarLinkage.EQUIP_WINGS = 6; //翅膀
            //////////////////////////////////////////////////////////////
            //////////////////////// 方向枚举 ////////////////////////////
            //////////////////////////////////////////////////////////////
            AvatarLinkage.DIRECT_NONE = 0;
            AvatarLinkage.DIRECT_VICE = 1;
            AvatarLinkage.DIRECT_MAIN = 2;
            return AvatarLinkage;
        }());
        scene.AvatarLinkage = AvatarLinkage;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarLinkage.js.map