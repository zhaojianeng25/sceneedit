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
var topfront;
(function (topfront) {
    var AlphaUICompenent = Pan3d.AlphaUICompenent;
    var AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var Rectangle = Pan3d.Rectangle;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var AlphaUiContianer = Pan3d.AlphaUiContianer;
    var LoadManager = Pan3d.LoadManager;
    var FrontUIRenderComponent = /** @class */ (function (_super) {
        __extends(FrontUIRenderComponent, _super);
        function FrontUIRenderComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FrontUIRenderComponent.prototype.creatBaseComponent = function ($skinName) {
            var ui = new AlphaUICompenent();
            ui.skinName = $skinName;
            var rec = this.uiAtlas.getRec($skinName);
            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;
            ui.baseRec = new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight);
            ui.uiRender = this;
            return ui;
        };
        return FrontUIRenderComponent;
    }(AlphaUIRenderComponent));
    topfront.FrontUIRenderComponent = FrontUIRenderComponent;
    var BaseFrontVo = /** @class */ (function () {
        function BaseFrontVo($uiPanle, $bottom) {
            this._scale = 1;
            this.isBottom = $bottom;
            this.panel = $uiPanle;
            this.uiItem = [];
            this.timeLen = 1000 * 10; //每个对象，默认10秒后会自动清理，
        }
        Object.defineProperty(BaseFrontVo.prototype, "timeLen", {
            set: function (value) {
                this.startTm = Pan3d.TimeUtil.getTimer();
                this.endTm = this.startTm + value;
            },
            enumerable: true,
            configurable: true
        });
        BaseFrontVo.prototype.makeUi = function (value) {
            this.pushUiByKey(value);
            this.setBasePos();
        };
        BaseFrontVo.prototype.setBasePos = function () {
            this.baseRect = this.getBaseTextWidth();
            this._uiRect = new Rectangle(this.baseRect.x, this.baseRect.y, this.baseRect.width, this.baseRect.height);
            this.changeSize();
        };
        BaseFrontVo.prototype.getBaseTextWidth = function () {
            if (!this.baseRect) {
                var rect = new Rectangle();
                for (var i = 0; i < this.uiItem.length; i++) {
                    rect.width += this.uiItem[i].baseRec.width;
                    rect.height = Math.max(rect.height, this.uiItem[i].baseRec.height);
                }
                this.baseRect = rect;
            }
            return this.baseRect;
        };
        BaseFrontVo.prototype.pushUiByKey = function (value) {
            var $rend = this.panel.getCanUseRender(this.isBottom);
            var ui = $rend.creatBaseComponent(value);
            this.panel.addChild(ui);
            this.uiItem.push(ui);
        };
        BaseFrontVo.prototype.resize = function () {
        };
        Object.defineProperty(BaseFrontVo.prototype, "x", {
            get: function () {
                return this._uiRect.x;
            },
            set: function (value) {
                this._uiRect.x = value;
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFrontVo.prototype, "scale", {
            get: function () {
                return this._scale;
            },
            set: function (value) {
                this._scale = value;
                this.width = this.baseRect.width * this._scale;
                this.height = this.baseRect.height * this._scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFrontVo.prototype, "alpha", {
            set: function (value) {
                for (var i = 0; i < this.uiItem.length; i++) {
                    this.uiItem[i].alpha = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFrontVo.prototype, "y", {
            get: function () {
                return this._uiRect.y;
            },
            set: function (value) {
                this._uiRect.y = value;
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFrontVo.prototype, "width", {
            get: function () {
                return this._uiRect.width;
            },
            set: function (value) {
                this._uiRect.width = value;
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseFrontVo.prototype, "height", {
            get: function () {
                return this._uiRect.height;
            },
            set: function (value) {
                this._uiRect.height = value;
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        BaseFrontVo.prototype.changeSize = function () {
            var scaleW = this.width / this.baseRect.width;
            var scaleH = this.height / this.baseRect.height;
            var $tx = 0;
            for (var i = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].x = $tx + this.x;
                this.uiItem[i].y = this.y;
                this.uiItem[i].width = this.uiItem[i].baseRec.width * scaleW;
                this.uiItem[i].height = this.uiItem[i].baseRec.height * scaleH;
                $tx += this.uiItem[i].baseRec.width * scaleW;
            }
        };
        BaseFrontVo.prototype.update = function () {
            if (Pan3d.TimeUtil.getTimer() > this.endTm) {
                this.needClear = true;
            }
            else {
                this.fun && this.fun(this, (Pan3d.TimeUtil.getTimer() - this.startTm) / (this.endTm - this.startTm));
            }
        };
        BaseFrontVo.prototype.destory = function () {
            this.clearVo(this);
            while (this.uiItem.length) {
                this.panel.removeChild(this.uiItem.pop());
            }
        };
        BaseFrontVo.prototype.clearVo = function (vo) {
            var index = this.panel.listFrontItem.indexOf(vo);
            if (index != -1) {
                this.panel.listFrontItem.splice(index, 1);
            }
        };
        return BaseFrontVo;
    }());
    topfront.BaseFrontVo = BaseFrontVo;
    var ColorFrontVo = /** @class */ (function (_super) {
        __extends(ColorFrontVo, _super);
        function ColorFrontVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColorFrontVo.prototype.makeUi = function (value) {
            var num = value.num;
            var str = num.toString();
            for (var i = 0; i < str.length; i++) {
                var temp = str.substr(i, 1);
                this.pushUiByKey(value.color + "_num_" + temp);
            }
            this.setBasePos();
        };
        return ColorFrontVo;
    }(BaseFrontVo));
    topfront.ColorFrontVo = ColorFrontVo;
    var LayaDisp2DBaseText = /** @class */ (function (_super) {
        __extends(LayaDisp2DBaseText, _super);
        function LayaDisp2DBaseText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LayaDisp2DBaseText.prototype.makeData = function () {
            var _this = this;
            if (this._data) {
                var vo = this._data;
                this.dtime = vo.showTime + Pan3d.TimeUtil.getTimer();
                if (vo.bg) {
                    LoadManager.getInstance().load(Scene_data.fileRoot + vo.bg, LoadManager.IMG_TYPE, function ($img) {
                        _this.drawHasBg($img);
                    });
                }
                else {
                    this.drawHasBg();
                }
            }
        };
        LayaDisp2DBaseText.prototype.drawHasBg = function ($img) {
            if ($img === void 0) { $img = null; }
            if (!this._data) {
                return;
            }
            var vo = this._data;
            var rec = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            if ($img) {
                var imgRect = new Pan3d.Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight);
                if (vo.bgRect) { //文字大小;
                    imgRect.x = vo.bgRect.x;
                    imgRect.y = vo.bgRect.y;
                    imgRect.width = vo.bgRect.width;
                    imgRect.height = vo.bgRect.height;
                }
                this.parent.uiAtlas.ctx.drawImage($img, imgRect.x, imgRect.y, imgRect.width, imgRect.height);
            }
            var fontsize = 10;
            var tx = 0;
            var ty = 0;
            if (vo.fontsize) { //文字大小
                fontsize = vo.fontsize;
            }
            if (vo.tx) { //文字大小
                tx = vo.tx;
            }
            if (vo.ty) { //文字大小
                ty = vo.ty;
            }
            Pan3d.LabelTextFont.writeSingleLabelToCtx(ctx, vo.label, fontsize, tx, ty);
            //2Dxie wenzi 
            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        };
        LayaDisp2DBaseText.prototype.update = function () {
            var vo = this._data;
            if (vo) {
                this.time = Pan3d.TimeUtil.getTimer();
                if (this.time >= this.dtime || vo.clear) {
                    console.log("时间 到了清理");
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                }
                else {
                    if (this.ui) {
                        this.ui.x = vo.pos.x;
                        this.ui.y = vo.pos.y;
                        this.ui.alpha = vo.alpha;
                    }
                }
            }
        };
        return LayaDisp2DBaseText;
    }(Disp2DBaseText));
    topfront.LayaDisp2DBaseText = LayaDisp2DBaseText;
    var LayaTextUiContianer = /** @class */ (function (_super) {
        __extends(LayaTextUiContianer, _super);
        function LayaTextUiContianer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LayaTextUiContianer.prototype.upFrameDraw = function () {
            for (var i = 0; i < this.renderList.length; i++) {
                this.renderList[i].update();
            }
            _super.prototype.update.call(this, 0);
        };
        return LayaTextUiContianer;
    }(AlphaUiContianer));
    topfront.LayaTextUiContianer = LayaTextUiContianer;
    var DynamicTextMeshVo = /** @class */ (function (_super) {
        __extends(DynamicTextMeshVo, _super);
        function DynamicTextMeshVo() {
            var _this = _super.call(this) || this;
            _this.alpha = 0;
            _this.fontsize = 10; //(可选)
            _this.tx = 0; //(可选)
            _this.ty = 0; //(可选)
            _this.showTime = 1000;
            _this.pos = new Vector3D();
            return _this;
        }
        DynamicTextMeshVo.prototype.destory = function () {
            this.pos = null;
            this.clear = true;
        };
        return DynamicTextMeshVo;
    }(Pan3d.baseMeshVo));
    topfront.DynamicTextMeshVo = DynamicTextMeshVo;
    var LayaForntPanel = /** @class */ (function (_super) {
        __extends(LayaForntPanel, _super);
        function LayaForntPanel() {
            var _this = _super.call(this) || this;
            _this.left = 0;
            _this.top = 0;
            _this.bottomRendItem = [];
            _this.topRendItem = [];
            _this.listFrontItem = [];
            _this._baseRender = new FrontUIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._baseRender.uiAtlas = new UIAtlas;
            _this.dynamicTextFornt = new LayaTextUiContianer(LayaDisp2DBaseText, new Pan3d.Rectangle(0, 0, 256, 64), 40);
            _this._baseRender.uiAtlas.loadImgUrl("ui/arpgui/textlist.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LayaForntPanel.prototype.drawDynamicTextDemo = function (txt, picUrl) {
            var vo = new DynamicTextMeshVo;
            vo.label = "[ffffff]" + txt; //必须
            vo.fontsize = 21; //文字大小  (可选)
            vo.tx = -65; //位置偏移(可选)
            vo.ty = 2; //位置偏移(可选)
            vo.bg = picUrl; //背景图(可选)
            vo.bgRect = new Pan3d.Rectangle(0, 0, 128, 32); //暂时不能超过256*64(可选)
            vo.showTime = 1000;
            vo.alpha = 0.2;
            this.dynamicTextFornt.showTemp(vo);
            return vo;
        };
        LayaForntPanel.prototype.getCanUseRender = function (value) {
            var $selectItem = value ? this.bottomRendItem : this.topRendItem;
            var temp;
            for (var i = 0; i < $selectItem.length; i++) {
                if ($selectItem[i].getUiListLen() < 40) {
                    temp = $selectItem[i];
                    i = $selectItem.length;
                }
            }
            if (!temp) {
                temp = new FrontUIRenderComponent;
                temp.uiAtlas = this._baseRender.uiAtlas;
                $selectItem.push(temp);
                this.addRender(temp);
            }
            console.log("渲染层----------->", this.renderList.length);
            return temp;
        };
        LayaForntPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas.configData = [];
            this.addNum0_9("red", new Rectangle(0, 0, 20, 24)); //设置数字的位置
            this.addNum0_9("green", new Rectangle(0, 24, 20, 24));
            this.addNum0_9("blue", new Rectangle(0, 48, 20, 24));
            this.addNum0_9("yellow", new Rectangle(0, 74, 20, 24));
            this.makeFrontUiRect("fanji", new Rectangle(9, 158, 73, 40)); //设置单图片
            this.makeFrontUiRect("fantan", new Rectangle(110, 158, 73, 40));
            this.makeFrontUiRect("lianji", new Rectangle(9, 205, 73, 40));
            this.makeFrontUiRect("gedang", new Rectangle(110, 205, 73, 40));
            this.makeFrontUiRect("tuimo", new Rectangle(9, 364, 73, 40));
            this.makeFrontUiRect("xishou", new Rectangle(81, 364, 73, 40));
            this.makeFrontUiRect("shanbi", new Rectangle(7, 404, 73, 40));
            this.makeFrontUiRect("hanzidiban", new Rectangle(102, 415, 124, 27));
            this.makeFrontUiRect("hanzidiban", new Rectangle(0, 109, 76, 28));
            this.makeFrontUiRect("hanzidiban", new Rectangle(77, 109, 76, 28));
            this.makeFrontUiRect("hanzidiban", new Rectangle(147, 109, 76, 28));
            this.makeFrontUiRect("fangyu", new Rectangle(185, 156, 71, 43));
            this.makeFrontUiRect("zhuiji", new Rectangle(156, 361, 73, 44));
            this.makeFrontUiRect("jianshe", new Rectangle(3, 250, 73, 44));
            this.makeFrontUiRect("wulilianji", new Rectangle(84, 250, 73, 44));
            this.makeFrontUiRect("niepan", new Rectangle(166, 250, 73, 44));
            this.isLoadFinish = true;
            // this.drawDemo(new Pan3d.Vector2D(random(200), random(200)))
        };
        LayaForntPanel.prototype.addA = function (v2d) {
            var a = this.drawLabel(1, { color: "red", num: 1234567890 }, false);
            a.x = 300 + v2d.x;
            a.y = 200 + v2d.y;
            a.alpha = 1;
            a.timeLen = 5000; //1秒后会自己动清理  //默认为10秒会清理
        };
        LayaForntPanel.prototype.addB = function (v2d) {
            //默认为10秒会清理    如需要时间，需要每个对象都赋置
            var b = this.drawLabel(2, "wenzibeijing", true);
            b.x = 400 + v2d.x;
            b.y = 400 + v2d.y;
            b.width = 320;
            b.height = 80;
            // var c: BaseFrontVo = this.drawLabel(2, "fanji", false);
            // c.x = b.x + 10
            // c.y = b.y + 30
            var d = this.drawLabel(2, { color: "yellow", num: 8888 }, false);
            d.x = b.x + 100;
            d.y = b.y + 30;
            d.alpha = 1;
        };
        //拥有回调时间 ，可以用于处理移动以及透明，以及缩放
        LayaForntPanel.prototype.addC = function (v2d) {
            var e = this.drawLabel(1, { color: "red", num: 1234567890 }, false);
            e.x = 300 + v2d.x;
            e.y = 600 + v2d.y;
            e.alpha = 1;
            e.timeLen = 5000; //1秒后会自己动清理  //默认为10秒会清理
            e.fun = function (taget, t) {
                //t=>[0->1]
                taget.y--;
                taget.x--;
                taget.alpha = 0.5;
                taget.scale = 1 + t;
            };
        };
        LayaForntPanel.prototype.drawDemo = function (v2d) {
            var _this = this;
            this.addA(v2d);
            this.addB(v2d);
            this.addC(v2d);
            Pan3d.TimeUtil.addTimeOut(1000 * 1, function () {
                _this.drawDemo(new Pan3d.Vector2D(random(200), random(200)));
            });
        };
        LayaForntPanel.prototype.baseStrVo = function (value, isbottom) {
            var vo = new BaseFrontVo(this, isbottom);
            vo.makeUi(value);
            return vo;
        };
        LayaForntPanel.prototype.numStrVo = function (ccolor, nnum, isbottom) {
            var vo = new ColorFrontVo(this, isbottom);
            vo.makeUi({ color: ccolor, num: nnum });
            return vo;
        };
        //第一个参数为类开，1为数字，2为显示单图  //第二个为参数，第二个显上下层位置
        LayaForntPanel.prototype.drawLabel = function (type, data, isbottom) {
            if (isbottom === void 0) { isbottom = false; }
            if (!this.isLoadFinish) {
                return null;
            }
            var vo;
            switch (type) {
                case 1:
                    vo = this.numStrVo(data.color, data.num, isbottom);
                    break;
                case 2:
                    vo = this.baseStrVo(data, isbottom);
                    break;
                default:
                    console.log("需要处理类型", type);
                    break;
            }
            if (vo) {
                this.listFrontItem.push(vo);
            }
            return vo;
        };
        LayaForntPanel.prototype.makeFrontUiRect = function (value, rect) {
            var temp = this._baseRender.uiAtlas.getObject(value, rect.x, rect.y, rect.width, rect.height, 256, 512);
            temp.ow = rect.width;
            temp.oh = rect.height;
            this._baseRender.uiAtlas.configData.push(temp);
        };
        LayaForntPanel.prototype.addNum0_9 = function (str, rect) {
            for (var i = 0; i < 10; i++) {
                this.makeFrontUiRect(str + "_num_" + i, new Rectangle(rect.width * i + rect.x, rect.y, rect.width, rect.height));
            }
        };
        LayaForntPanel.prototype.update = function () {
            for (var j = 0; j < this.listFrontItem.length; j++) {
                this.listFrontItem[j].update();
                if (this.listFrontItem[j].needClear) {
                    this.listFrontItem[j].destory();
                    j--;
                }
            }
            for (var i = 0; i < this.renderList.length; i++) {
                if (this.bottomRendItem.indexOf(this.renderList[i]) != -1) {
                    this.renderList[i].update();
                }
            }
            for (var k = 0; k < this.renderList.length; k++) {
                if (this.bottomRendItem.indexOf(this.renderList[k]) == -1) {
                    this.renderList[k].update();
                    this.renderList[k].applyObjData();
                }
            }
            this.dynamicTextFornt.upFrameDraw();
        };
        return LayaForntPanel;
    }(UIConatiner));
    topfront.LayaForntPanel = LayaForntPanel;
})(topfront || (topfront = {}));
var layapan;
(function (layapan) {
    var LayaOverride2dSceneManager = /** @class */ (function (_super) {
        __extends(LayaOverride2dSceneManager, _super);
        function LayaOverride2dSceneManager() {
            var _this = _super.call(this) || this;
            _this.particleManager = new layapan.LayaOverride2dParticleManager();
            _this.shadowManager = new layapan.LayaOverrideShadowManager();
            _this.skillManager = new layapan.LayaOverride2dSkillManager(_this);
            _this.bloodManager = new Pan3d.BloodManager();
            _this.groupDataManager = new layapan.LayaOverrideGroupDataManager();
            _this.layaForntPanel = new topfront.LayaForntPanel();
            console.log("创建场景=>", LayaOverride2dSceneManager.sceneNum++);
            return _this;
        }
        LayaOverride2dSceneManager.initConfig = function () {
            Pan3d.SceneManager._instance = new LayaOverride2dSceneManager;
        };
        LayaOverride2dSceneManager.prototype.update = function () {
            Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            scene2d.GroundModel.getInstance().update();
            this.upFrame();
        };
        LayaOverride2dSceneManager.prototype.changeBloodManager = function ($bloodManager) {
            this.bloodManager = $bloodManager;
        };
        LayaOverride2dSceneManager.prototype.addMovieDisplay = function ($display) {
            $display._scene = this;
            this._displayRoleList.push($display);
            $display.addStage();
        };
        LayaOverride2dSceneManager.prototype.loadSceneConfigCom = function (obj) {
            //保持原来的角度
            var $rotationY = Pan3d.Scene_data.focus3D.rotationY;
            _super.prototype.loadSceneConfigCom.call(this, obj);
            Pan3d.Scene_data.focus3D.rotationY = $rotationY;
        };
        LayaOverride2dSceneManager.prototype.playLyf = function ($url, $pos, $r) {
            var _this = this;
            if ($r === void 0) { $r = 0; }
            this.groupDataManager.scene = this;
            this.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = _this.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.rotationY = $r;
                        _this.particleManager.addParticle($particle);
                        $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, _this.onPlayCom, _this);
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
            Pan3d.Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = Pan3d.TimeUtil.getTimer();
            }
            this.updateMovieFrame();
            if (this._ready) {
                this.particleManager.updateTime();
                this.skillManager.update();
                if (this.render) {
                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();
                    this.shadowManager.update();
                    Pan3d.Scene_data.context3D.setWriteDepth(false);
                    this.particleManager.update();
                    this.bloodManager.update();
                    this.layaForntPanel.update();
                    Pan3d.Scene_data.context3D.setBlendParticleFactors(0);
                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setWriteDepth(false);
                }
                Pan3d.Scene_data.context3D.setDepthTest(false);
                Pan3d.UIManager.getInstance().update();
                this.cameraMatrix = Pan3d.Scene_data.cam3D.cameraMatrix.clone();
                this.viewMatrx3D = Pan3d.Scene_data.viewMatrx3D.clone();
            }
        };
        LayaOverride2dSceneManager.sceneNum = 0;
        return LayaOverride2dSceneManager;
    }(scene3d.OverrideSceneManager));
    layapan.LayaOverride2dSceneManager = LayaOverride2dSceneManager;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaOverride2dSceneManager.js.map