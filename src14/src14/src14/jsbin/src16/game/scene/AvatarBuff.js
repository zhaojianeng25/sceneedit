/**
* Avatar的Buff显示控制类
*/
var game;
(function (game) {
    var scene;
    (function (scene_1) {
        var AvatarBuff = /** @class */ (function () {
            function AvatarBuff(avatarUnit, unit, buff) {
                this._waitAddToScene = false;
                this._avatarUnit = avatarUnit;
                this._unit = unit;
                this._buff = buff;
                this._buff.on(Buff.CHANGE_ID, this, this.onBuffChangeID);
                this.onBuffChangeID();
            }
            // buff发生变化
            AvatarBuff.prototype.onBuffChangeID = function () {
                if (this._buff.id == 0) {
                    this.clearEffect();
                    this.clearBuffShow();
                }
                else {
                    this.createEffect();
                    this.doBuffShow();
                }
            };
            // 清理特效
            AvatarBuff.prototype.clearEffect = function () {
                this._waitAddToScene = false;
                if (this._effect3D) {
                    this._avatarUnit.clearEffect(this._effect3D);
                    this._effect3D = null;
                }
                if (!this._effect) {
                    return;
                }
                this._effect.isPlayEnd = true;
                this._effect = null;
            };
            // 创建特效
            AvatarBuff.prototype.createEffect = function () {
                var temp = Template.getBuffsTempById(this._buff.id);
                if (temp) {
                    var skin = temp.skin;
                    var skin_type = temp.skin_type;
                    if (skin && skin.length) {
                        switch (skin_type) {
                            // 1-序列帧，2-龙骨，3-avatar，4-粒子特效
                            case 1:
                                this._effect = ObjectPools.malloc(scene_1.EffectFrame);
                                this._effect.setData(skin);
                                break;
                            case 2:
                                this._effect = ObjectPools.malloc(scene_1.EffectSkeleton);
                                this._effect.setData(skin);
                                break;
                            case 3:
                                this._effect = ObjectPools.malloc(scene_1.EffectAvatar);
                                this._effect.setData("0000" + skin);
                                this._effect.toward = Direct.BOTTOM;
                                break;
                            case 4:
                                if (this._effect3D)
                                    this._avatarUnit.clearEffect(this._effect3D);
                                this._effect3D = skin;
                                this._avatarUnit.showEffect(this._effect3D);
                                break;
                        }
                        if (this._effect) {
                            this._effect.anchorObject = this._unit;
                            this._effect.atBottom = (temp.skin_bottom == 1);
                            this._effect.setLoop(temp.cycle != 1); //是否循环播放
                            this._waitAddToScene = true;
                        }
                    }
                }
            };
            //处理buff表现
            AvatarBuff.prototype.doBuffShow = function () {
            };
            //清理
            AvatarBuff.prototype.clearBuffShow = function () {
            };
            AvatarBuff.prototype.onDraw = function (diff, scene) {
                if (this._waitAddToScene && this._effect) {
                    this._waitAddToScene = false;
                    scene.addEffect(this._effect);
                }
            };
            // 释放
            AvatarBuff.prototype.dispose = function () {
                if (this._effect) {
                    this._effect.isPlayEnd = true;
                    this._effect = null;
                }
                if (this._effect3D) {
                    this._avatarUnit.clearEffect(this._effect3D);
                    this._effect3D = null;
                }
                this.clearBuffShow();
                this._buff.off(Buff.CHANGE_ID, this, this.onBuffChangeID);
                this._buff = null;
                this._unit = null;
                this._avatarUnit = null;
            };
            return AvatarBuff;
        }());
        scene_1.AvatarBuff = AvatarBuff;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarBuff.js.map