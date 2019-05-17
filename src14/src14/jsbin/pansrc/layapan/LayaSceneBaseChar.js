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
    var CombineParticle = Pan3d.CombineParticle;
    var Scene_data = Pan3d.Scene_data;
    var ParticleManager = Pan3d.ParticleManager;
    var Vector3D = Pan3d.Vector3D;
    var BaseRes = Pan3d.BaseRes;
    var MaterialAnimShader = Pan3d.MaterialAnimShader;
    var Display3DSprite = Pan3d.Display3DSprite;
    var ShadowManager = Pan3d.ShadowManager;
    var LayaSceneBaseChar = /** @class */ (function (_super) {
        __extends(LayaSceneBaseChar, _super);
        function LayaSceneBaseChar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._avatar = -1;
            _this._visible = true;
            _this.isBuff = false;
            return _this;
        }
        Object.defineProperty(LayaSceneBaseChar.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                this._alpha = value;
                this.changeColor[0] = 1;
                this.changeColor[1] = 1;
                this.changeColor[2] = 1;
                this.changeColor[3] = value;
                //this._partDic[$key]
                for (var strKey in this._partDic) {
                    var item = (Array(this._partDic[strKey]));
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] && item[i][0]) {
                            item[i][0].alpha = value;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneBaseChar.prototype.updateMaterialMesh = function ($mesh) {
            // 如果是在战斗中，不要因为位置在透明层而设置模型的透明度
            // 但是在战斗中中了隐身buff 还是得设置透明度
            if (this.alpha < 1 && (this.isBuff || !this._isBattle)) {
                if (!LayaSceneBaseChar.alphaShader) {
                    LayaSceneBaseChar.alphaShader = this.makeAlphaShader();
                }
                var $selfShader = $mesh.material.shader;
                $mesh.material.shader = LayaSceneBaseChar.alphaShader;
                Scene_data.context3D.setProgram(LayaSceneBaseChar.alphaShader.program);
                Scene_data.context3D.cullFaceBack(false);
                Scene_data.context3D.setBlendParticleFactors(-1);
                this.setVcMatrix($mesh);
                Scene_data.context3D.setRenderTexture($mesh.material.shader, "alphatexture", this.getAlphaTexture($mesh.material, $mesh.materialParam), 0);
                this.setVa($mesh);
                Scene_data.context3D.setVc4fv($mesh.material.shader, "alphadata", [1, 1, 1, this.alpha]);
                this.setMeshVc($mesh);
                Scene_data.context3D.drawCall($mesh.indexBuffer, $mesh.treNum);
                $mesh.material.shader = $selfShader;
            }
            else {
                _super.prototype.updateMaterialMesh.call(this, $mesh);
            }
        };
        LayaSceneBaseChar.prototype.makeAlphaShader = function () {
            var shader = new MaterialAnimShader();
            shader.paramAry = [false, false, false, false, false, false, false, 0];
            shader.fragment =
                "precision mediump float;\n" +
                    "uniform sampler2D alphatexture;\n" +
                    "uniform vec4 alphadata;\n" +
                    "varying vec2 v0;\n" +
                    "void main(void){\n" +
                    "vec4 ft0 = texture2D(alphatexture,v0);\n" +
                    "gl_FragColor =ft0*alphadata;\n" +
                    "}";
            var encodetf = shader.encode();
            return shader;
        };
        Object.defineProperty(LayaSceneBaseChar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneBaseChar.prototype.setAvatar = function (num) {
            if (this._avatar == num) {
                return;
            }
            this._avatar = num;
            this.setRoleUrl(this.getSceneCharAvatarUrl(num));
        };
        Object.defineProperty(LayaSceneBaseChar.prototype, "shadow", {
            set: function (value) {
                var $scene = this._scene;
                if (value) {
                    if (!this._shadow) {
                        console.log("无标识");
                        this._shadow = $scene.shadowManager.addShadow();
                    }
                }
                else {
                    if (this._shadow) {
                        $scene.shadowManager.removeShadow(this._shadow);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneBaseChar.prototype.update = function () {
            if (this.visible) {
                _super.prototype.update.call(this);
            }
            if (this._shadow) {
                this._shadow._visible = this.visible;
            }
        };
        LayaSceneBaseChar.prototype.getSceneCharAvatarUrl = function (num) {
            var $url = getRoleUrl(String(num));
            return getRoleUrl(String(num));
        };
        LayaSceneBaseChar.prototype.getSceneCharWeaponUrl = function (num, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            return getModelUrl(String(num + $suffix));
        };
        // 是否播放中
        LayaSceneBaseChar.prototype.isPlaying = function () {
            // if(this._completeState != 1){
            // 	return true;
            // }
            return this._completeState != 1 || !this._curentFrame || (this._curentFrame < (this._animDic[this.curentAction].matrixAry.length - 1));
        };
        LayaSceneBaseChar.prototype.loadPartRes = function ($bindSocket, groupRes, ary) {
            if (this._hasDestory) {
                return;
            }
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                var posV3d;
                var rotationV3d;
                var scaleV3d;
                if (item.isGroup) {
                    posV3d = new Vector3D(item.x, item.y, item.z);
                    rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = $bindSocket;
                    particle.dynamic = true;
                    this._scene.particleManager.addParticle(particle);
                    if (item.isGroup) {
                        particle.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
                else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display = new Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    display.alpha = this.alpha;
                    this._scene.addSpriteDisplay(display);
                    if (item.isGroup) {
                        display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                }
            }
            this.applyVisible();
        };
        LayaSceneBaseChar.prototype.removeStage = function () {
            this._onStage = false;
            if (this._shadow) {
                ShadowManager.getInstance().removeShadow(this._shadow);
            }
            for (var key in this._partDic) {
                var ary = this._partDic[key];
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i] instanceof CombineParticle) {
                        this._scene.particleManager.removeParticle(ary[i]);
                    }
                    else if (ary[i] instanceof Display3DSprite) {
                        this._scene.removeSpriteDisplay(ary[i]);
                    }
                }
            }
        };
        Object.defineProperty(LayaSceneBaseChar.prototype, "px", {
            get: function () {
                return this.x;
            },
            set: function (value) {
                this.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneBaseChar.prototype, "py", {
            get: function () {
                return this.y;
            },
            set: function (value) {
                this.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayaSceneBaseChar.prototype, "pz", {
            get: function () {
                return this.z;
            },
            set: function (value) {
                this.z = value;
            },
            enumerable: true,
            configurable: true
        });
        LayaSceneBaseChar.prototype.addSkinMeshParticle = function () {
            if (!this._skinMesh) {
                return;
            }
            var dicAry = new Array;
            this._partDic["mesh"] = dicAry;
            var meshAry = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i = 0; i < meshAry.length; i++) {
                var particleAry = meshAry[i].particleAry;
                for (var j = 0; j < particleAry.length; j++) {
                    var bindPartcle = particleAry[j];
                    var particle;
                    particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);
                    if (!particle.sourceData) {
                        console.log("particle.sourceData error");
                    }
                    particle.dynamic = true;
                    particle.bindSocket = bindPartcle.socketName;
                    dicAry.push(particle);
                    particle.bindTarget = this;
                    this._scene.particleManager.addParticle(particle);
                }
            }
        };
        return LayaSceneBaseChar;
    }(Pan3d.Display3dMovie));
    layapan.LayaSceneBaseChar = LayaSceneBaseChar;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaSceneBaseChar.js.map