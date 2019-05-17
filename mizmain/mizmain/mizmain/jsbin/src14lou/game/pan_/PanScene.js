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
var pan;
(function (pan) {
    var Object3D = Pan3d.Object3D;
    var MathClass = Pan3d.MathClass;
    var Vector2D = Pan3d.Vector2D;
    var ShadowManager = Pan3d.ShadowManager;
    var BaseRes = Pan3d.BaseRes;
    var Scene_data = Pan3d.Scene_data;
    var ParticleManager = Pan3d.ParticleManager;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var LineDisplayShader = Pan3d.LineDisplayShader;
    var GridLineSprite = Pan3d.GridLineSprite;
    var UIManager = Pan3d.UIManager;
    var PanScene = /** @class */ (function (_super) {
        __extends(PanScene, _super);
        function PanScene() {
            var _this = _super.call(this) || this;
            _this._showGrid = false;
            _this.layaRenderIndex = -1;
            _this.prependTranslation = 0;
            // 相机模式
            _this._cameraMode = PanScene.MODE_3D;
            _this._sceneCamScale = 1.76;
            _this._speedR = 0.1; //旋转速度
            _this._rangeX = [-45, -15]; //x旋转范围
            _this._speedD = 1.5; //距离速度
            _this._rangeD = [430, 600]; //距离范围
            _this._lastX = 0;
            _this._lastZ = 0;
            _this._lastRotationX = 0;
            _this._lastRotationY = 0;
            _this._lastMousePos = new Vector2D();
            // 技能预加载
            _this.skillManager.preLoadSkill(getSkillUrl('spell_0001'));
            _this.changeBloodManager(new layapan.LayaBloodManager);
            _this._focus3D = new Object3D;
            _this._camDistance = 250;
            _this._buffManager = new pan.PanBuffManager(_this);
            return _this;
        }
        Object.defineProperty(PanScene.prototype, "camera2d", {
            get: function () {
                return this._camera2d;
            },
            set: function (v) {
                this._camera2d = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PanScene.prototype, "camDistance", {
            get: function () {
                return this._camDistance;
            },
            set: function (v) {
                this._camDistance = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PanScene.prototype, "focus3D", {
            get: function () {
                return this._focus3D;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PanScene.prototype, "showGrid", {
            get: function () {
                return this._showGrid;
            },
            set: function (v) {
                this._showGrid = v;
                if (v) {
                    ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
                    !this._gridSprite && (this._gridSprite = new GridLineSprite());
                    this.addDisplay(this._gridSprite);
                }
                else {
                    this._gridSprite && this._gridSprite.removeStage();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PanScene.prototype, "cameraMode", {
            get: function () {
                return this._cameraMode;
            },
            set: function (v) {
                this._cameraMode = v;
                this.is2D && this.removeFocueEvent();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PanScene.prototype, "is2D", {
            get: function () {
                return this._cameraMode == PanScene.MODE_2D;
            },
            enumerable: true,
            configurable: true
        });
        PanScene.prototype.loadSceneConfigCom = function (obj) {
            obj.quadTreeData = null; // 不要quadTreeData管理场景物件
            _super.prototype.loadSceneConfigCom.call(this, obj);
        };
        PanScene.prototype.update = function () {
            // 更新镜头矩阵
            this.resetViewMatrx3D();
            // 更新摄像机焦点
            this.updateFocus();
            Scene_data.context3D.clearTest();
            Scene_data.context3D.setDepthTest(true);
            this.updateMovieFrame();
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            if (this.prependTranslation) {
                Pan3d.Scene_data.vpMatrix.identity();
                Pan3d.Scene_data.vpMatrix.prepend(Pan3d.Scene_data.viewMatrx3D);
                Pan3d.Scene_data.vpMatrix.prepend(Pan3d.Scene_data.cam3D.cameraMatrix);
                Pan3d.Scene_data.vpMatrix.appendTranslation(0, 0, this.prependTranslation);
            }
            ParticleManager.getInstance().updateTime();
            SkillManager.getInstance().update();
            this.updateStaticDiplay();
            Scene_data.context3D.setWriteDepth(true);
            this.updateMovieDisplay();
            ShadowManager.getInstance().update();
            Scene_data.context3D.setWriteDepth(false);
            this.updateSpriteDisplay();
            ParticleManager.getInstance().update();
            Scene_data.context3D.setDepthTest(false);
            UIManager.getInstance().update();
        };
        // 更新镜头矩阵
        PanScene.prototype.resetViewMatrx3D = function () {
            if (this._cameraMode == PanScene.MODE_3D) {
                Scene_data.viewMatrx3D.identity();
                var fovw = Scene_data.stageWidth;
                var fovh = Scene_data.stageHeight;
                Scene_data.sceneViewHW = Scene_data.stageHeight; //Math.max(fovw, fovh)
                // Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this._sceneCamScale, 1, 50, Scene_data.camFar);
                Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this._sceneCamScale, 1, 50, 3000);
                Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
            }
            else {
                Scene_data.viewMatrx3D.identity();
                var fovw = Scene_data.stageWidth;
                var fovh = Scene_data.stageHeight;
                Scene_data.sceneViewHW = Scene_data.stageHeight; //Math.max(fovw, fovh)
                Scene_data.viewMatrx3D.appendScale(1 / Scene_data.sceneViewHW * 2, 1 / Scene_data.sceneViewHW * 2, 1 / 1000);
                Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
                Scene_data.viewMatrx3D.appendScale(2 * pan.PanEngine.htmlScale, 2 * pan.PanEngine.htmlScale, 1);
            }
        };
        PanScene.prototype.updateFocus = function () {
            var x = this._focus3D.x;
            var z = this._focus3D.z;
            if (this._camera2d) {
                x = this._camera2d.x;
                if (this._camera2d.bufferLeft < 0) {
                    x -= this._camera2d.bufferLeft;
                }
                z = this._camera2d.y;
                if (this._camera2d.bufferTop < 0) {
                    z -= this._camera2d.bufferTop;
                }
                z -= this._camera2d.centerPointYOffset;
                z = -z; // 2dY轴对应的3d坐标z轴正好相反
                x = x / 2;
                z = z / 2 / (Math.sin(45 * Math.PI / 180));
            }
            this._focus3D.x = x;
            this._focus3D.z = z;
            Scene_data.focus3D = this._focus3D;
            Scene_data.cam3D.distance = this._camDistance;
        };
        PanScene.prototype.addGridLineSprite = function () {
            return this._gridSprite;
        };
        //播放技能  $fileName技能文件名， $effectName特效名字
        PanScene.prototype.playSkillByChar = function (char, fileName, effectName, completeFun, hitPosLis) {
            if (!char._scene.ready) {
                return;
            }
            var skill = this.skillManager.getSkill(getSkillUrl(fileName), effectName);
            if (!skill.keyAry) {
                return;
            }
            if (skill) {
                skill.reset();
                skill.isDeath = false;
                skill.needSound = true;
            }
            skill.configFixEffect(char, function () {
                completeFun && completeFun.call(null);
            }, hitPosLis);
            this.skillManager.playSkill(skill);
        };
        //播放弹道技能  $fileName技能文件名， $effectName特效名字
        PanScene.prototype.playTrajectoryByChar = function (char, target, fileName, effectName, completeFun) {
            if (!char._scene.ready) {
                return;
            }
            var skill = this.skillManager.getSkill(getSkillUrl(fileName), effectName);
            if (!skill.keyAry) {
                return;
            }
            if (skill) {
                skill.reset();
                skill.isDeath = false;
                skill.needSound = true;
            }
            skill.configTrajectory(char, target, function () {
                completeFun && completeFun.call(null);
            });
            this.skillManager.playSkill(skill);
        };
        // 添加特效
        PanScene.prototype.addParticle = function (v, scale, callback) {
            var _this = this;
            this.groupDataManager.scene = this;
            this.groupDataManager.getGroupData(Scene_data.fileRoot + v, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var particle = _this.particleManager.getParticleByte(Scene_data.fileRoot + item.particleUrl);
                        particle.scaleX = particle.scaleY = particle.scaleZ = scale;
                        _this.particleManager.addParticle(particle);
                        callback.call(null, particle);
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        // 移除特效
        PanScene.prototype.removeParticle = function (v) {
            this.particleManager.removeParticle(v);
            v.destory();
        };
        // 飘字
        PanScene.prototype.flyText = function (type, data, isbottom) {
            if (isbottom === void 0) { isbottom = false; }
            if (type == 1 /* NUM_TAB */) {
                // 数字 
                var e = this.layaForntPanel.drawLabel(1, { color: data.color, num: data.num }, false);
                e.x = data.x - e.width / 2;
                e.y = data.y - 160;
                e.alpha = 1;
                e.timeLen = 1000; //1秒后会自己动清理  //默认为10秒会清理
                e.fun = function (taget, t) {
                    taget.y--;
                };
            }
            else if (type == 2 /* NUM_PIC */) //数字+底图
             {
                var b = this.layaForntPanel.drawLabel(2, "wenzibeijing", true);
                b.x = data.x - b.width / 2;
                b.y = data.y - 160;
                var e = this.layaForntPanel.drawLabel(1, data, false);
                e.x = b.x + 30;
                e.y = b.y;
                e.alpha = 1;
                e.timeLen = 2000; //1秒后会自己动清理  //默认为10秒会清理
                e.fun = function (taget, t) {
                    taget.y--;
                    taget.alpha = 1 - t;
                };
                b.timeLen = 2000; //1秒后会自己动清理  //默认为10秒会清理
                b.fun = function (taget, t) {
                    taget.y--;
                    taget.alpha = 1 - t;
                };
            }
            else if (type == 3 /* PIC */) {
                //文字
                var b = this.layaForntPanel.drawLabel(2, data.name, true);
                b.x = data.x - b.width / 2;
                b.y = data.y - 80;
                b.timeLen = 2000;
                b.scale = 0.6;
                b.fun = function (taget, t) {
                    taget.y--;
                    taget.alpha = 1 - t;
                };
            }
        };
        /**显示buff*/
        PanScene.prototype.showBuff = function (types, pos) {
            if (pos === void 0) { pos = null; }
            var buff = this._buffManager.getCharTitleMeshVo(types);
            if (pos)
                buff.pos = pos;
            return buff;
        };
        /**移除buff*/
        PanScene.prototype.removeBuff = function (buff) {
            buff.clear = true;
            buff = null;
        };
        PanScene.prototype.addFocueEvent = function (v) {
            if (v === void 0) { v = false; }
            if (this.is2D) {
                return;
            }
            this._isStat = v;
            Laya.stage.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(LEvent.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.on(LEvent.MOUSE_WHEEL, this, this.onMouseWheel);
            if (this._isStat) {
                Laya.stage.on(LEvent.RIGHT_MOUSE_DOWN, this, this.onRightMouseDown);
                Laya.stage.on(LEvent.RIGHT_MOUSE_UP, this, this.onRightMouseUp);
            }
        };
        PanScene.prototype.removeFocueEvent = function () {
            Laya.stage.off(LEvent.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.off(LEvent.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.off(LEvent.RIGHT_MOUSE_DOWN, this, this.onRightMouseDown);
            Laya.stage.off(LEvent.RIGHT_MOUSE_UP, this, this.onRightMouseUp);
            Laya.stage.off(LEvent.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.off(LEvent.MOUSE_WHEEL, this, this.onMouseWheel);
        };
        PanScene.prototype.onMouseWheel = function (e) {
            if (this.is2D) {
                return;
            }
            var dist = this._camDistance + e.delta * this._speedD;
            dist = Math.min(Math.max(dist, this._rangeD[0]), this._rangeD[1]);
            this._camDistance = dist;
        };
        PanScene.prototype.onMouseDown = function (e) {
            if (this.is2D) {
                return;
            }
            this._lastMousePos.x = e.stageX;
            this._lastMousePos.y = e.stageY;
            this._lastRotationY = this._focus3D.rotationY;
            this._lastRotationX = this._focus3D.rotationX;
            this._isMouseDown = true;
        };
        PanScene.prototype.onMouseUp = function (e) {
            this._isMouseDown = false;
        };
        PanScene.prototype.onRightMouseDown = function (e) {
            if (this.is2D) {
                return;
            }
            this._lastMousePos.x = e.stageX;
            this._lastMousePos.y = e.stageY;
            this._lastX = this._focus3D.x;
            this._lastZ = this._focus3D.z;
            this._isRightMouseDown = true;
        };
        PanScene.prototype.onRightMouseUp = function (e) {
            this._isRightMouseDown = false;
        };
        PanScene.prototype.onMouseMove = function (e) {
            var addx = e.stageX - this._lastMousePos.x;
            var addy = e.stageY - this._lastMousePos.y;
            if (this._isMouseDown) {
                this._focus3D.rotationY = this._lastRotationY - addx * this._speedR;
                var rotationX = this._lastRotationX - addy * this._speedR;
                rotationX = Math.min(Math.max(rotationX, this._rangeX[0]), this._rangeX[1]);
                this._focus3D.rotationX = rotationX;
            }
            if (this._isRightMouseDown) {
                // todo可以的话跟鼠标对应
                this._focus3D.x = this._lastX - addx;
                this._focus3D.z = this._lastZ - addy;
            }
        };
        PanScene.prototype.resize = function () {
            this.bloodManager.resize();
        };
        PanScene.prototype.reset = function () {
            this['_currentUrl'] = null;
            Scene_data.fogColor = [0, 0, 0];
            Scene_data.gameAngle = 0;
            Scene_data.focus3D.rotationY = 0;
            Scene_data.fogData = [1000, 0.003];
            Scene_data.light = new Pan3d.LightVo();
            Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            Scene_data.focus3D.rotationX = 0;
            Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationZ = 0;
            this.clearStaticScene();
            this.ready = true;
        };
        // 镜头模式
        PanScene.MODE_2D = 1;
        PanScene.MODE_3D = 2;
        return PanScene;
    }(layapan.LayaOverride2dSceneManager));
    pan.PanScene = PanScene;
})(pan || (pan = {}));
//# sourceMappingURL=PanScene.js.map