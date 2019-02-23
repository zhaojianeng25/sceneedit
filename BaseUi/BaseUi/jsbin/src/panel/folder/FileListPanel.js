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
var filelist;
(function (filelist) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var ColorType = Pan3d.ColorType;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var Rectangle = Pan3d.Rectangle;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var UIMask = Pan3d.UIMask;
    var UIAtlas = Pan3d.UIAtlas;
    var Vector2D = Pan3d.Vector2D;
    var Vector3D = Pan3d.Vector3D;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var TextureManager = Pan3d.TextureManager;
    var MenuListData = menutwo.MenuListData;
    var SampleFileVo = /** @class */ (function () {
        function SampleFileVo() {
        }
        return SampleFileVo;
    }());
    filelist.SampleFileVo = SampleFileVo;
    var FileListMeshVo = /** @class */ (function (_super) {
        __extends(FileListMeshVo, _super);
        function FileListMeshVo() {
            var _this = _super.call(this) || this;
            _this.cellHeightNum = 1;
            return _this;
        }
        Object.defineProperty(FileListMeshVo.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        FileListMeshVo.prototype.destory = function () {
            this.pos = null;
            this._name = null;
            this.needDraw = null;
            this.clear = true;
        };
        return FileListMeshVo;
    }(Pan3d.baseMeshVo));
    filelist.FileListMeshVo = FileListMeshVo;
    var FileListName = /** @class */ (function (_super) {
        __extends(FileListName, _super);
        function FileListName() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FileListName.prototype.makeData = function () {
            var _this = this;
            this.fileListMeshVo = this.data;
            if (this.fileListMeshVo) {
                console.log("绘制一下");
                var $color = "[9c9c9c]";
                if (this.fileListMeshVo.fileXmlVo.data.select) {
                    $color = "[ffffff]";
                }
                var fileVo = this.fileListMeshVo.fileXmlVo.data;
                switch (fileVo.suffix) {
                    case "jpg":
                    case "png":
                        LoadManager.getInstance().load(Scene_data.ossRoot + fileVo.path, LoadManager.IMG_TYPE, function ($img) {
                            _this.drawFileIconName($img, fileVo.name, $color);
                        });
                        break;
                    case "prefab":
                        this.drawFileIconName(FileListPanel.imgBaseDic["profeb_64x"], fileVo.name, $color);
                        break;
                    case "material":
                        this.drawFileIconName(FileListPanel.imgBaseDic["marterial_64x"], fileVo.name, $color);
                        break;
                    default:
                        this.drawFileIconName(FileListPanel.imgBaseDic["icon_Folder_64x"], fileVo.name, $color);
                        break;
                }
            }
        };
        FileListName.prototype.drawFileIconName = function ($img, name, $color) {
            var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
            this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
            this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);
            this.parent.uiAtlas.ctx.drawImage($img, 12.5, 5, 45, 45);
            var outStr = name.split(".")[0];
            var $textMetrics = Pan3d.TextRegExp.getTextMetrics(this.parent.uiAtlas.ctx, outStr);
            console.log("$textMetrics.width", $textMetrics.width);
            if ($textMetrics.width > 70) {
                var inset = Math.floor(outStr.length * (1 / 3));
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr.substr(0, inset), 12, 0 - 6, 50, TextAlign.CENTER);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr.substring(inset, outStr.length), 12, 0 - 6, 65, TextAlign.CENTER);
            }
            else {
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr, 12, 0 - 6, 55, TextAlign.CENTER);
            }
            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
        };
        FileListName.prototype.update = function () {
            this.fileListMeshVo = this.data;
            if (this.fileListMeshVo) {
                if (this.fileListMeshVo.needDraw) {
                    this.makeData();
                    this.fileListMeshVo.needDraw = false;
                }
                if (this.fileListMeshVo.pos) {
                    this.ui.x = this.fileListMeshVo.pos.x;
                    this.ui.y = this.fileListMeshVo.pos.y;
                }
                if (this.fileListMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return FileListName;
    }(Disp2DBaseText));
    filelist.FileListName = FileListName;
    var FileListPanel = /** @class */ (function (_super) {
        __extends(FileListPanel, _super);
        function FileListPanel() {
            var _this = _super.call(this, FileListName, new Rectangle(0, 0, 80, 80), 50) || this;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this.removeRender(_this._baseRender);
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this.pageRect = new Rectangle(0, 0, 500, 350);
            _this.loadAssetImg(function () {
                _this._bottomRender.uiAtlas = new UIAtlas();
                _this._bottomRender.uiAtlas.setInfo("ui/folder/folder.txt", "ui/folder/folder.png", function () { _this.loadConfigCom(); });
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.update(t); });
            });
            return _this;
        }
        FileListPanel.prototype.loadAssetImg = function (bfun) {
            FileListPanel.imgBaseDic = {};
            var item = [];
            item.push("icon_Folder_64x");
            item.push("profeb_64x");
            item.push("marterial_64x");
            var finishNum = 0;
            for (var i = 0; i < item.length; i++) {
                this.loadTempOne(item[i], function () {
                    finishNum++;
                    if (finishNum >= item.length) {
                        bfun();
                    }
                });
            }
        };
        FileListPanel.prototype.loadTempOne = function (name, bfun) {
            var tempImg = makeImage();
            FileListPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = function () {
                bfun();
            };
            tempImg.url = Scene_data.fileuiRoot + "ui/icon/" + name + ".png";
            tempImg.src = Scene_data.fileuiRoot + "ui/icon/" + name + ".png";
        };
        FileListPanel.prototype.update = function (t) {
            _super.prototype.update.call(this, t);
        };
        FileListPanel.prototype.mouseDown = function (evt) {
            this.mouseIsDown = true;
            this.mouseDownTm = Pan3d.TimeUtil.getTimer();
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        FileListPanel.prototype.stageMouseMove = function (evt) {
            this.mouseIsDown = false;
        };
        FileListPanel.prototype.duboclik = function (evt) {
            console.log("双击");
            var vo = this.getItemVoByUi(evt.target);
            if (vo) {
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
                    this.refrishPath(vo.fileListMeshVo.fileXmlVo.data.path);
                }
                else {
                    var fileUrl = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                    fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                    switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                        case "material":
                            Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
                            break;
                        default:
                            console.log("还没有的类型", vo.fileListMeshVo.fileXmlVo.data.path);
                            break;
                    }
                }
            }
        };
        FileListPanel.prototype.mouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
            if (this.mouseIsDown) {
                if (this.lastDonwInfo && this.lastDonwInfo.target == evt.target) {
                    if (this.lastDonwInfo.tm + 500 > Pan3d.TimeUtil.getTimer()) {
                        if (Pan3d.TimeUtil.getTimer() > this.mouseDownTm + 100) {
                            this.lastDonwInfo.tm = Pan3d.TimeUtil.getTimer();
                        }
                        else {
                            this.duboclik(evt);
                        }
                        return;
                    }
                    else {
                        this.lastDonwInfo.tm = Pan3d.TimeUtil.getTimer();
                    }
                }
                else {
                    this.lastDonwInfo = { target: evt.target, tm: Pan3d.TimeUtil.getTimer() };
                }
            }
            this.selectFileIcon(evt);
        };
        FileListPanel.prototype.selectFileIcon = function (evt) {
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.ui == evt.target) {
                        $vo.fileListMeshVo.fileXmlVo.data.select = true;
                    }
                    else {
                        $vo.fileListMeshVo.fileXmlVo.data.select = false;
                    }
                    $vo.fileListMeshVo.needDraw = true;
                }
            }
        };
        //移除不显示的对象
        FileListPanel.prototype.clearListAll = function () {
            while (this.fileItem.length) {
                var vo = this.fileItem.pop();
                vo.destory();
            }
        };
        FileListPanel.prototype.refrishPath = function (pathstr) {
            var _this = this;
            this.a_path_tittle_txt.x = 10;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_path_tittle_txt.skinName, ColorType.White9A683F + pathstr, 12, Pan3d.TextAlign.LEFT);
            this.clearListAll();
            filemodel.FolderModel.getFolderArr(pathstr, function (value) {
                for (var i = 0; i < value.length; i++) {
                    var sampleFile = new SampleFileVo;
                    sampleFile.id = i;
                    sampleFile.data = value[i];
                    var $vo = _this.getCharNameMeshVo(sampleFile);
                    $vo.pos = new Vector3D(i * 64, 40, 0);
                    _this.fileItem.push($vo);
                }
                _this.resetSampleFilePos();
            });
        };
        FileListPanel.prototype.getItemVoByUi = function (ui) {
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.ui == ui) {
                    return $vo;
                }
            }
            return null;
        };
        FileListPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.folderMask = new UIMask();
            this.folderMask.level = 1;
            this.addMask(this.folderMask);
            this._baseRender.mask = this.folderMask;
            this.fileItem = [];
            for (var i = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.mouseDown, this);
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.mouseUp, this);
            }
            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
            this.a_win_tittle = this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.a_win_tittle.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_rigth_line = this.addChild(this._topRender.getComponent("a_rigth_line"));
            this.a_rigth_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_bottom_line = this.addChild(this._topRender.getComponent("a_bottom_line"));
            this.a_bottom_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_right_bottom = this.addChild(this._topRender.getComponent("a_right_bottom"));
            this.a_right_bottom.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_scroll_bar = this.addChild(this._topRender.getComponent("a_scroll_bar"));
            this.a_scroll_bar.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_path_tittle_txt = this.addChild(this._topRender.getComponent("a_path_tittle_txt"));
            this.refrishSize();
            this.a_scroll_bar.y = this.folderMask.y;
            var rootDic = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            this.refrishPath(rootDic);
            if (!this.onRightMenuFun) {
                this.onRightMenuFun = function ($evt) { _this.onRightMenu($evt); };
            }
            document.addEventListener("contextmenu", this.onRightMenuFun);
        };
        FileListPanel.prototype.onRightMenu = function ($evt) {
            var _this = this;
            $evt.preventDefault();
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY);
            temp.menuXmlItem = this.getMenuXml();
            temp.info = {};
            temp.info.bfun = function (value) { _this.menuBfun(value); };
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        };
        FileListPanel.prototype.menuBfun = function (value) {
            console.log("菜单的返回", value);
        };
        FileListPanel.prototype.getMenuXml = function () {
            var menuTextItem = new Array();
            menuTextItem.push(this.getMathListData());
            menuTextItem.push(this.getV2CListData());
            menuTextItem.push(this.getTextureListData());
            menuTextItem.push(this.getOtherListData());
            return menuTextItem;
        };
        FileListPanel.prototype.getMathListData = function () {
            var $vo = new MenuListData("Math", "1");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("ADD", "11"));
            $vo.subMenu.push(new MenuListData("SUB", "12"));
            $vo.subMenu.push(new MenuListData("MUL", "13"));
            $vo.subMenu.push(new MenuListData("DIV", "14"));
            $vo.subMenu.push(new MenuListData("SIN", "15"));
            $vo.subMenu.push(new MenuListData("COS", "16"));
            return $vo;
        };
        FileListPanel.prototype.getV2CListData = function () {
            var $vo = new MenuListData("常数", "2");
            $vo.subMenu = new Array;
            //     $vo.subMenu.push(new MenuListData("vec4", "21"));
            $vo.subMenu.push(new MenuListData("vec3", "22"));
            $vo.subMenu.push(new MenuListData("vec2", "23"));
            $vo.subMenu.push(new MenuListData("float", "24"));
            $vo.subMenu.push(new MenuListData("Time", "25"));
            $vo.subMenu.push(new MenuListData("Normal", "26"));
            return $vo;
        };
        FileListPanel.prototype.getTextureListData = function () {
            var $vo = new MenuListData("纹理", "3");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("纹理贴图", "31"));
            $vo.subMenu.push(new MenuListData("纹理坐标", "32"));
            $vo.subMenu.push(new MenuListData("纹理滚动", "33"));
            $vo.subMenu.push(new MenuListData("Cube纹理", "34"));
            $vo.subMenu.push(new MenuListData("3D贴图", "35"));
            return $vo;
        };
        FileListPanel.prototype.getOtherListData = function () {
            var $vo = new MenuListData("其它", "4");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("菲捏尔", "41"));
            $vo.subMenu.push(new MenuListData("導入材質", "42"));
            $vo.subMenu.push(new MenuListData("函数", "43"));
            $vo.subMenu.push(new MenuListData("文件列表", "44"));
            return $vo;
        };
        FileListPanel.prototype.panelEventChanger = function (value) {
            if (this.pageRect) {
                this.pageRect.height = value.height;
                this.pageRect.width = value.width;
                this.left = value.x;
                this.top = value.y;
                this.refrishSize();
            }
        };
        FileListPanel.prototype.refrishSize = function () {
            if (!this._topRender.uiAtlas) {
                return;
            }
            this.pageRect.width = Math.max(200, this.pageRect.width);
            this.pageRect.height = Math.max(100, this.pageRect.height);
            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_tittle.width = this.pageRect.width;
            this.folderMask.y = this.a_win_tittle.height;
            this.folderMask.x = 0;
            this.folderMask.width = this.pageRect.width - this.a_rigth_line.width;
            this.folderMask.height = this.pageRect.height - this.a_win_tittle.height - this.a_bottom_line.height;
            this.a_bg.x = 0;
            this.a_bg.y = 0;
            this.a_bg.width = this.pageRect.width;
            this.a_bg.height = this.pageRect.height;
            this.a_rigth_line.x = this.pageRect.width - this.a_rigth_line.width;
            this.a_rigth_line.y = this.a_win_tittle.height;
            this.a_rigth_line.height = this.pageRect.height - this.a_win_tittle.height - this.a_right_bottom.height;
            this.a_bottom_line.x = 0;
            this.a_bottom_line.y = this.pageRect.height - this.a_bottom_line.height;
            this.a_bottom_line.width = this.pageRect.width - this.a_right_bottom.width;
            this.a_right_bottom.x = this.pageRect.width - this.a_right_bottom.width;
            this.a_right_bottom.y = this.pageRect.height - this.a_right_bottom.height;
            this.a_scroll_bar.x = this.folderMask.x + this.folderMask.width - this.a_scroll_bar.width;
            this.resetSampleFilePos();
            this.resize();
            this.setUiListVisibleByItem([this.a_right_bottom, this.a_bottom_line, this.a_bg, this.a_rigth_line, this.a_win_tittle], this.canMoveTittle);
        };
        FileListPanel.prototype.resetSampleFilePos = function () {
            var w = Math.round(this.pageRect.width / 100);
            var contentH = Math.round(this.fileItem.length / w) * 70;
            var moveTy = 0;
            if (contentH > this.folderMask.height) {
                this.setUiListVisibleByItem([this.a_scroll_bar], true);
                this.a_scroll_bar.height = (this.folderMask.height / contentH) * this.folderMask.height;
                this.a_scroll_bar.y = Math.min(this.a_scroll_bar.y, this.folderMask.height + this.folderMask.y - this.a_scroll_bar.height);
                var nnn = (this.a_scroll_bar.y - this.folderMask.y) / (this.folderMask.height - this.a_scroll_bar.height);
                moveTy = (this.folderMask.height - contentH) * nnn;
            }
            else {
                this.setUiListVisibleByItem([this.a_scroll_bar], false);
                moveTy = 0;
            }
            for (var i = 0; i < this.fileItem.length; i++) {
                var vo = this.fileItem[i];
                vo.pos.x = i % w * 100;
                vo.pos.y = Math.floor(i / w) * 70 + this.folderMask.y + moveTy;
            }
        };
        FileListPanel.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.a_win_tittle:
                    this.lastPagePos = new Vector2D(this.left, this.top);
                    break;
                case this.a_rigth_line:
                case this.a_bottom_line:
                case this.a_right_bottom:
                    this.lastPagePos = new Vector2D(this.pageRect.width, this.pageRect.height);
                    break;
                case this.a_scroll_bar:
                    this.lastPagePos = new Vector2D(0, this.a_scroll_bar.y);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        FileListPanel.prototype.tittleMouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        FileListPanel.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.a_win_tittle:
                    this.left = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    this.top = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    break;
                case this.a_rigth_line:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    break;
                case this.a_bottom_line:
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    break;
                case this.a_right_bottom:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    break;
                case this.a_scroll_bar:
                    this.a_scroll_bar.y = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    this.a_scroll_bar.y = Math.max(this.a_scroll_bar.y, this.folderMask.y);
                    this.a_scroll_bar.y = Math.min(this.a_scroll_bar.y, this.folderMask.y + this.folderMask.height - this.a_scroll_bar.height);
                    //  console.log(this.a_scroll_bar.y)
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            this.refrishSize();
        };
        FileListPanel.prototype.refrishFile = function () {
        };
        FileListPanel.prototype.getCharNameMeshVo = function (value) {
            var $vo = new FileListMeshVo;
            $vo.fileXmlVo = value;
            this.showTemp($vo);
            return $vo;
        };
        return FileListPanel;
    }(Dis2DUIContianerPanel));
    filelist.FileListPanel = FileListPanel;
})(filelist || (filelist = {}));
//# sourceMappingURL=FileListPanel.js.map