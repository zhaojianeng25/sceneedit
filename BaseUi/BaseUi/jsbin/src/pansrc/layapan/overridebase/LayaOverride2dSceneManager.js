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
var layapan;
(function (layapan) {
    var me;
    (function (me) {
        var LayaOverride2dSceneManager = /** @class */ (function (_super) {
            __extends(LayaOverride2dSceneManager, _super);
            function LayaOverride2dSceneManager() {
                var _this = _super.call(this) || this;
                _this.particleManager = new me.LayaOverride2dParticleManager();
                _this.shadowManager = new me.LayaOverrideShadowManager();
                _this.skillManager = new me.LayaOverride2dSkillManager(_this);
                _this.groupDataManager = new me.LayaOverrideGroupDataManager();
                console.log("创建场景=>", LayaOverride2dSceneManager.sceneNum++);
                return _this;
            }
            LayaOverride2dSceneManager.initConfig = function () {
                Pan3d.me.SceneManager._instance = new LayaOverride2dSceneManager;
            };
            LayaOverride2dSceneManager.prototype.update = function () {
                Pan3d.me.MathClass.getCamView(Pan3d.me.Scene_data.cam3D, Pan3d.me.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                scene2d.me.GroundModel.getInstance().update();
                this.upFrame();
            };
            LayaOverride2dSceneManager.prototype.changeBloodManager = function ($bloodManager) {
            };
            LayaOverride2dSceneManager.prototype.addMovieDisplay = function ($display) {
                $display._scene = this;
                this._displayRoleList.push($display);
                $display.addStage();
            };
            LayaOverride2dSceneManager.prototype.loadSceneConfigCom = function (obj) {
                //保持原来的角度
                var $rotationY = Pan3d.me.Scene_data.focus3D.rotationY;
                _super.prototype.loadSceneConfigCom.call(this, obj);
                Pan3d.me.Scene_data.focus3D.rotationY = $rotationY;
            };
            LayaOverride2dSceneManager.prototype.playLyf = function ($url, $pos, $r) {
                var _this = this;
                if ($r === void 0) { $r = 0; }
                this.groupDataManager.scene = this;
                this.groupDataManager.getGroupData(Pan3d.me.Scene_data.fileRoot + $url, function (groupRes) {
                    for (var i = 0; i < groupRes.dataAry.length; i++) {
                        var item = groupRes.dataAry[i];
                        if (item.types == Pan3d.me.BaseRes.SCENE_PARTICLE_TYPE) {
                            var $particle = _this.particleManager.getParticleByte(Pan3d.me.Scene_data.fileRoot + item.particleUrl);
                            $particle.x = $pos.x;
                            $particle.y = $pos.y;
                            $particle.z = $pos.z;
                            $particle.rotationY = $r;
                            _this.particleManager.addParticle($particle);
                            $particle.addEventListener(Pan3d.me.BaseEvent.COMPLETE, _this.onPlayCom, _this);
                        }
                        else {
                            console.log("播放的不是单纯特效");
                        }
                    }
                });
            };
            LayaOverride2dSceneManager.prototype.charPlaySkill = function ($char, $skillfile) {
                if (!$char._scene.ready) {
                    return;
                }
                var $skill = this.skillManager.getSkill(getSkillUrl($skillfile), "skill_01");
                if (!$skill.keyAry) {
                    return;
                }
                if ($skill) {
                    $skill.reset();
                    $skill.isDeath = false;
                }
                $skill.configFixEffect($char);
                this.skillManager.playSkill($skill);
            };
            LayaOverride2dSceneManager.prototype.onPlayCom = function (value) {
                this.particleManager.removeParticle((value.target));
            };
            LayaOverride2dSceneManager.prototype.upFrame = function () {
                Pan3d.me.Scene_data.context3D._contextSetTest.clear();
                if (isNaN(this._time)) {
                    this._time = Pan3d.me.TimeUtil.getTimer();
                }
                this.updateMovieFrame();
                if (this._ready) {
                    this.particleManager.updateTime();
                    this.skillManager.update();
                    if (this.render) {
                        Pan3d.me.Scene_data.context3D.setWriteDepth(true);
                        Pan3d.me.Scene_data.context3D.setDepthTest(true);
                        this.updateStaticDiplay();
                        this.updateSpriteDisplay();
                        this.updateMovieDisplay();
                        this.shadowManager.update();
                        Pan3d.me.Scene_data.context3D.setWriteDepth(false);
                        this.particleManager.update();
                        Pan3d.me.Scene_data.context3D.setBlendParticleFactors(0);
                        Pan3d.me.Scene_data.context3D.setWriteDepth(true);
                        Pan3d.me.Scene_data.context3D.setWriteDepth(false);
                    }
                    Pan3d.me.Scene_data.context3D.setDepthTest(false);
                    Pan3d.me.UIManager.getInstance().update();
                    this.cameraMatrix = Pan3d.me.Scene_data.cam3D.cameraMatrix.clone();
                    this.viewMatrx3D = Pan3d.me.Scene_data.viewMatrx3D.clone();
                }
            };
            LayaOverride2dSceneManager.sceneNum = 0;
            return LayaOverride2dSceneManager;
        }(scene3d.me.OverrideSceneManager));
        me.LayaOverride2dSceneManager = LayaOverride2dSceneManager;
    })(me = layapan.me || (layapan.me = {}));
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaOverride2dSceneManager.js.map