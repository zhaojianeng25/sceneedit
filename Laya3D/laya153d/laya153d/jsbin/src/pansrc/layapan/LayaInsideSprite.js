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
/*
自定义着色器
*/
var layapan;
(function (layapan) {
    var WebGLContext = laya.webgl.WebGLContext;
    var Pan3dInSideLaya = /** @class */ (function () {
        function Pan3dInSideLaya() {
        }
        Pan3dInSideLaya.overrideMethods = function () {
            if (this.inited) {
                return;
            }
            this.inited = true;
            var compatibleLayaRender = function (pan3dFunc) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var gl = Pan3d.Scene_data.context3D.renderContext;
                var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
                var elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
                var v = pan3dFunc.apply(this, args);
                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
                return v;
            };
            var ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
            Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte) {
                return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
            };
            var ParticleFacetData_setAllByteInfo = Pan3d.ParticleFacetData.prototype.setAllByteInfo;
            Pan3d.ParticleFacetData.prototype.setAllByteInfo = function (byte) {
                return compatibleLayaRender.call(this, ParticleFacetData_setAllByteInfo, byte);
            };
            var ParticleFollowData_setAllByteInfo = Pan3d.ParticleFollowData.prototype.setAllByteInfo;
            Pan3d.ParticleFollowData.prototype.setAllByteInfo = function (byte) {
                return compatibleLayaRender.call(this, ParticleFollowData_setAllByteInfo, byte);
            };
            var ParticleFollowLocusData_setAllByteInfo = Pan3d.ParticleFollowLocusData.prototype.setAllByteInfo;
            Pan3d.ParticleFollowLocusData.prototype.setAllByteInfo = function (byte) {
                return compatibleLayaRender.call(this, ParticleFollowLocusData_setAllByteInfo, byte);
            };
            var ParticleLocusData_setAllByteInfo = Pan3d.ParticleLocusData.prototype.setAllByteInfo;
            Pan3d.ParticleLocusData.prototype.setAllByteInfo = function (byte) {
                return compatibleLayaRender.call(this, ParticleLocusData_setAllByteInfo, byte);
            };
            var ParticleLocusballData_setAllByteInfo = Pan3d.ParticleLocusballData.prototype.setAllByteInfo;
            Pan3d.ParticleLocusballData.prototype.setAllByteInfo = function (byte) {
                return compatibleLayaRender.call(this, ParticleLocusballData_setAllByteInfo, byte);
            };
            var ParticleModelData_setAllByteInfo = Pan3d.ParticleModelData.prototype.setAllByteInfo;
            Pan3d.ParticleModelData.prototype.setAllByteInfo = function (byte) {
                return compatibleLayaRender.call(this, ParticleModelData_setAllByteInfo, byte);
            };
            var ParticleBallData_setAllByteInfo = Pan3d.ParticleBallData.prototype.regShader;
            Pan3d.ParticleBallData.prototype.regShader = function () {
                return compatibleLayaRender.call(this, ParticleBallData_setAllByteInfo);
            };
            // 重写下以下方法 要不会影响到渲染队列之前的laya绘制
            var MeshDataManager_readData = Pan3d.MeshDataManager.prototype.readData;
            Pan3d.MeshDataManager.prototype.readData = function (byte, batchNum, url, version) {
                return compatibleLayaRender.call(this, MeshDataManager_readData, byte, batchNum, url, version);
            };
            var ObjDataManager_loadObjCom = Pan3d.ObjDataManager.prototype.loadObjCom;
            Pan3d.ObjDataManager.prototype.loadObjCom = function (byte, url) {
                return compatibleLayaRender.call(this, ObjDataManager_loadObjCom, byte, url);
            };
            var ArtFont_getAirFontWidth = Pan3d.ArtFont.prototype.getAirFontWidth;
            Pan3d.ArtFont.prototype.getAirFontWidth = function ($ctx, $str, $color, $txtInterval) {
                if ($color === void 0) { $color = Pan3d.ArtFont.White; }
                if ($txtInterval === void 0) { $txtInterval = 0; }
                return compatibleLayaRender.call(this, ArtFont_getAirFontWidth, $ctx, $str, $color, $txtInterval) + $txtInterval;
            };
            var ArtFont_writeFontToCtxLeft = Pan3d.ArtFont.prototype.writeFontToCtxLeft;
            Pan3d.ArtFont.prototype.writeFontToCtxLeft = function ($ctx, $str, $color, $tx, $ty, $txtInterval) {
                if ($color === void 0) { $color = Pan3d.ArtFont.num1; }
                if ($tx === void 0) { $tx = 0; }
                if ($ty === void 0) { $ty = 0; }
                if ($txtInterval === void 0) { $txtInterval = 0; }
                return compatibleLayaRender.call(this, ArtFont_writeFontToCtxLeft, $ctx, $str, $color, $tx, $ty, $txtInterval) + $txtInterval;
            };
            var SkillRes_loadComplete = Pan3d.SkillRes.prototype.loadComplete;
            Pan3d.SkillRes.prototype.loadComplete = function (byte) {
                compatibleLayaRender.call(this, SkillRes_loadComplete, byte);
            };
            var RoleRes_loadComplete = Pan3d.RoleRes.prototype.loadComplete;
            Pan3d.RoleRes.prototype.loadComplete = function (byte) {
                compatibleLayaRender.call(this, RoleRes_loadComplete, byte);
            };
            var RoleResLow_loadComplete = Pan3d.RoleResLow.prototype.loadComplete;
            Pan3d.RoleResLow.prototype.loadComplete = function (byte) {
                compatibleLayaRender.call(this, RoleResLow_loadComplete, byte);
            };
            var ModelRes_loadComplete = Pan3d.ModelRes.prototype.loadComplete;
            Pan3d.ModelRes.prototype.loadComplete = function (byte) {
                compatibleLayaRender.call(this, ModelRes_loadComplete, byte);
            };
            var GroupRes_loadComplete = Pan3d.GroupRes.prototype.loadComplete;
            Pan3d.GroupRes.prototype.loadComplete = function (byte) {
                compatibleLayaRender.call(this, GroupRes_loadComplete, byte);
            };
            var UIRenderComponent_applyObjData = Pan3d.UIRenderComponent.prototype.applyObjData;
            Pan3d.UIRenderComponent.prototype.applyObjData = function () {
                compatibleLayaRender.call(this, UIRenderComponent_applyObjData);
            };
            var Display3dShadow_applyObjData = Pan3d.Display3dShadow.prototype.applyObjData;
            Pan3d.Display3dShadow.prototype.applyObjData = function () {
                compatibleLayaRender.call(this, Display3dShadow_applyObjData);
            };
        };
        Pan3dInSideLaya.inited = false;
        return Pan3dInSideLaya;
    }());
    layapan.Pan3dInSideLaya = Pan3dInSideLaya;
    /*
    自定义着色器
    */
    var OtherShader = /** @class */ (function (_super) {
        __extends(OtherShader, _super);
        function OtherShader() {
            var _this = this;
            var vs = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1.0);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}";
            var ps = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = vec4(1.0,0.0,1.0,1.0);}";
            _this = _super.call(this, vs, ps, "myShader") || this;
            return _this;
        }
        OtherShader.shader = new OtherShader();
        return OtherShader;
    }(Laya.Shader));
    layapan.OtherShader = OtherShader;
    var OtherShaderValue = /** @class */ (function (_super) {
        __extends(OtherShaderValue, _super);
        function OtherShaderValue() {
            var _this = _super.call(this, 0, 0) || this;
            var _vlen = 8 * Laya.CONST3D2D.BYTES_PE;
            _this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
            _this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
            _this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
            return _this;
        }
        return OtherShaderValue;
    }(Laya.Value2D));
    layapan.OtherShaderValue = OtherShaderValue;
    var OtherLayaRectSprite = /** @class */ (function (_super) {
        __extends(OtherLayaRectSprite, _super);
        function OtherLayaRectSprite() {
            var _this = _super.call(this) || this;
            _this.iNum = 0;
            _this.init(null);
            return _this;
        }
        OtherLayaRectSprite.prototype.init = function (texture, vb, ib) {
            if (vb === void 0) { vb = null; }
            if (ib === void 0) { ib = null; }
            this.vBuffer = Laya.VertexBuffer2D.create();
            this.iBuffer = Laya.IndexBuffer2D.create();
            this.ibData = new Uint16Array([]);
            var vbArray;
            var ibArray;
            if (vb) {
                vbArray = vb;
            }
            else {
                vbArray = [];
                var texWidth = 10 + random(20);
                var texHeight = 10 + random(20);
                var red = 1;
                var greed = 1;
                var blue = 1;
                var alpha = 1;
                vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
                vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
            }
            if (ib) {
                ibArray = ib;
            }
            else {
                ibArray = [];
                ibArray.push(0, 1, 3); //从第一个三角形的顶点索引
            }
            this.iNum = ibArray.length;
            this.vbData = new Float32Array(vbArray);
            this.ibData = new Uint16Array(ibArray);
            this.vBuffer.append(this.vbData);
            this.iBuffer.append(this.ibData);
            this.shaderValue = new OtherShaderValue();
            this.shaderValue.textureHost = null;
            this._renderType |= Laya.RenderSprite.CUSTOM; //设置当前显示对象的渲染模式为自定义渲染模式
        };
        OtherLayaRectSprite.prototype.customRender = function (context, x, y) {
            context.ctx.setIBVB(x, y, (this.iBuffer), (this.vBuffer), this.iNum, null, OtherShader.shader, this.shaderValue, 0, 0);
        };
        return OtherLayaRectSprite;
    }(Laya.Sprite));
    layapan.OtherLayaRectSprite = OtherLayaRectSprite;
    var LayaInsideSprite = /** @class */ (function (_super) {
        __extends(LayaInsideSprite, _super);
        function LayaInsideSprite() {
            var _this = _super.call(this) || this;
            _this._layaRenderIndex = -1;
            _this.initData();
            LayaInsideSprite.add(_this);
            return _this;
        }
        LayaInsideSprite.add = function (v) {
            LayaInsideSprite._list.push(v);
            if (this.inited) {
                return;
            }
            this.inited = true;
            var context = Laya.Render.context.ctx;
            context.submitElement = function (start, end) {
                if (end > 0) {
                    while (start < end) {
                        var temp = context._submits[start];
                        if (temp instanceof Laya.SubmitOtherIBVB) {
                            start += temp.renderSubmit();
                        }
                        else {
                            start += temp.renderSubmit();
                        }
                        for (var i = 0; i < LayaInsideSprite._list.length; i++) {
                            if (start == LayaInsideSprite._list[i]._layaRenderIndex) {
                                LayaInsideSprite._list[i].testRenderPan3d(start);
                            }
                        }
                    }
                }
            };
        };
        LayaInsideSprite.prototype.initData = function () {
            if (!layapan.LayaScene2dInit.isConfig) {
                layapan.LayaScene2dInit.initData();
            }
            Pan3dInSideLaya.overrideMethods();
            this.customRenderEnable = true;
            this.scene = new layapan.LayaOverride2dSceneManager();
            this.scene.ready = true;
        };
        LayaInsideSprite.prototype.customRender = function (context, x, y) {
            _super.prototype.customRender.call(this, context, x, y);
            this._layaRenderIndex = context.ctx._submits._length; //记录在laya队例中的编号
        };
        LayaInsideSprite.prototype.testRenderPan3d = function (index) {
            if (index == this._layaRenderIndex) {
                this._layaRenderIndex = -1;
                var gl = Pan3d.Scene_data.context3D.renderContext;
                var _sFactor = gl.getParameter(WebGLContext.BLEND_SRC_RGB);
                var _dFactor = gl.getParameter(WebGLContext.BLEND_DST_RGB);
                this.upFrame();
                gl.blendFunc(_sFactor, _dFactor);
                Pan3d.Scene_data.context3D.setWriteDepth(false);
                Pan3d.Scene_data.context3D.setDepthTest(false);
            }
        };
        LayaInsideSprite.prototype.upFrame = function () {
        };
        LayaInsideSprite._list = [];
        return LayaInsideSprite;
    }(layapan.OtherLayaRectSprite));
    layapan.LayaInsideSprite = LayaInsideSprite;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaInsideSprite.js.map