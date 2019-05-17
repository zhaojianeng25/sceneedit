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
/**
* name
*/
var layapan;
(function (layapan) {
    var LayaSceneChar = /** @class */ (function (_super) {
        __extends(LayaSceneChar, _super);
        function LayaSceneChar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // 是否显示称谓
            _this._titleEnable = false;
            _this._isBattle = false;
            _this.isBuff = false;
            return _this;
        }
        Object.defineProperty(LayaSceneChar.prototype, "charTitle", {
            get: function () {
                return this._charTitle || "";
            },
            set: function (v) {
                if (this._charTitle == v)
                    return;
                this._charTitle = v;
                this._charTitleVo && (this._charTitleVo.num = this._charTitle);
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneChar.prototype.setWeapon = function (num) {
            if (this._weaponNum == num) {
                return;
            }
            this._weaponNum = num;
            if (num <= 0) { //移除武器
                this.removePart(LayaSceneChar.WEAPON_PART);
            }
            else {
                this.setWeaponByAvatar(this._weaponNum);
            }
        };
        LayaSceneChar.prototype.setWeaponSlotByAvatar = function (avatar, slot, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            this._weaponNum = avatar;
            this.addPart(LayaSceneChar.WEAPON_PART, slot, this.getSceneCharWeaponUrl(avatar, $suffix));
        };
        LayaSceneChar.prototype.playBfun = function ($action, completeState, $bfun) {
            this.curentAction = null;
            this.chuangeActionFun = $bfun;
            this.play($action, completeState);
        };
        LayaSceneChar.prototype.changeAction = function ($action) {
            _super.prototype.changeAction.call(this, $action);
            if (this.chuangeActionFun) {
                this.chuangeActionFun();
                this.chuangeActionFun = null;
            }
        };
        Object.defineProperty(LayaSceneChar.prototype, "titleEnable", {
            set: function (v) {
                this._titleEnable = v;
                if (!this._charTitleVo) {
                    this._charTitleVo = this._scene.bloodManager.getCharTitleMeshVo("潘佳治" + random(99));
                }
                else {
                    this._charTitleVo.num = "潘佳治" + random(99);
                }
                this.visible;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneChar.prototype, "isBattle", {
            get: function () {
                return this._isBattle;
            },
            set: function (value) {
                this._isBattle = value;
                //console.log(" this._isSinging",this._isSinging)
            },
            enumerable: true,
            configurable: true
        });
        return LayaSceneChar;
    }(layapan_me.LayaSceneChar));
    layapan.LayaSceneChar = LayaSceneChar;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaSceneChar.js.map