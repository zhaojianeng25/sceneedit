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
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var Rectangle = Pan3d.Rectangle;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var Vector2D = Pan3d.Vector2D;
    var Vector3D = Pan3d.Vector3D;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var TextureManager = Pan3d.TextureManager;
    var FileVo = filemodel.FileVo;
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
                var $color = "[9c9c9c]";
                if (this.fileListMeshVo.fileXmlVo.data.select) {
                    $color = "[ffffff]";
                }
                var fileVo = this.fileListMeshVo.fileXmlVo.data;
                switch (fileVo.suffix) {
                    case FileVo.JPG:
                    case FileVo.PNG:
                        LoadManager.getInstance().load(Scene_data.ossRoot + fileVo.path, LoadManager.IMG_TYPE, function ($img) {
                            _this.drawFileIconName($img, fileVo.name, $color);
                        });
                        break;
                    case FileVo.PREFAB:
                        this.drawFileIconName(FileListPanel.imgBaseDic["profeb_64x"], fileVo.name, $color);
                        break;
                    case FileVo.MATERIAL:
                        this.drawFileIconName(FileListPanel.imgBaseDic["marterial_64x"], fileVo.name, $color);
                        break;
                    case FileVo.TXT:
                        this.drawFileIconName(FileListPanel.imgBaseDic["txt_64x"], fileVo.name, $color);
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
            return _super.call(this, FileListName, new Rectangle(0, 0, 80, 80), 50) || this;
        }
        FileListPanel.prototype.loadConfigCom = function () {
            var _this = this;
            _super.prototype.loadConfigCom.call(this);
            this._baseRender.mask = this._uiMask;
            var item = [
                this.a_scroll_bar_bg,
                this.a_tittle_bg,
                this.a_bg,
                this.b_bottom_left,
            ];
            this.setUiListVisibleByItem(item, false);
            this.resize();
            this.a_tittle_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.loadAssetImg(function () {
                _this.makeItemUiList();
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.update(t); });
            });
        };
        FileListPanel.prototype.loadAssetImg = function (bfun) {
            FileListPanel.imgBaseDic = {};
            var item = [];
            item.push("icon_Folder_64x");
            item.push("profeb_64x");
            item.push("marterial_64x");
            item.push("txt_64x");
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
        FileListPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.uiLoadComplete) {
                this.b_bottom_line_left.x = 0;
                this.b_bottom_line_left.width = this.b_bottom_mid.x;
            }
        };
        FileListPanel.prototype.update = function (t) {
            _super.prototype.update.call(this, t);
        };
        FileListPanel.prototype.fileMouseDown = function (evt) {
            this.filemouseIsDown = true;
            this.mouseDownTm = Pan3d.TimeUtil.getTimer();
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        FileListPanel.prototype.stageMouseMove = function (evt) {
            this.filemouseIsDown = false;
        };
        FileListPanel.prototype.fileDuboclik = function (evt) {
            var vo = this.getItemVoByUi(evt.target);
            if (vo) {
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
                    this.refrishPath(vo.fileListMeshVo.fileXmlVo.data.path);
                }
                else {
                    var fileUrl = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                    fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                    switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                        case FileVo.MATERIAL:
                            Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
                            break;
                        case FileVo.PREFAB:
                            var tempview = new filelist.PrefabMeshView;
                            tempview.data = new filelist.PrefabMeshData();
                            prop.PropModel.getInstance().showPefabMesh(tempview);
                            break;
                        default:
                            console.log("还没有的类型", vo.fileListMeshVo.fileXmlVo.data.path);
                            break;
                    }
                }
            }
        };
        FileListPanel.prototype.fileMouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
            if (this.filemouseIsDown) {
                if (this.lastfileDonwInfo && this.lastfileDonwInfo.target == evt.target) {
                    if (this.lastfileDonwInfo.tm + 500 > Pan3d.TimeUtil.getTimer()) {
                        if (Pan3d.TimeUtil.getTimer() > this.mouseDownTm + 100) {
                            this.lastfileDonwInfo.tm = Pan3d.TimeUtil.getTimer();
                        }
                        else {
                            this.fileDuboclik(evt);
                        }
                        return;
                    }
                    else {
                        this.lastfileDonwInfo.tm = Pan3d.TimeUtil.getTimer();
                    }
                }
                else {
                    this.lastfileDonwInfo = { target: evt.target, tm: Pan3d.TimeUtil.getTimer() };
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
            this.rootFilePath = pathstr;
            //this.a_path_tittle_txt.x = 10
            //LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_path_tittle_txt.skinName, ColorType.White9A683F + pathstr, 12, Pan3d.TextAlign.LEFT)
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
        FileListPanel.prototype.makeItemUiList = function () {
            var _this = this;
            this.fileItem = [];
            for (var i = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.fileMouseDown, this);
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.fileMouseUp, this);
            }
            var rootDic = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            this.refrishPath(rootDic);
            if (!this.onRightMenuFun) {
                this.onRightMenuFun = function ($evt) { _this.onRightMenu($evt); };
            }
            document.addEventListener("contextmenu", this.onRightMenuFun);
        };
        FileListPanel.prototype.onRightMenu = function ($evt) {
            $evt.preventDefault();
            var $slectUi = layout.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
            if ($slectUi) {
                if ($slectUi.parent) {
                    var vo = this.getItemVoByUi($slectUi);
                    if (vo) {
                        this.makeFileFloadMenu($evt);
                    }
                    else {
                        console.log("是空位置");
                        this.makeFileListMenu($evt);
                    }
                }
            }
        };
        FileListPanel.prototype.makeFileFloadMenu = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY);
            var menuA = new Array();
            menuA.push(new MenuListData("删除文件", "21"));
            menuA.push(new MenuListData("重命名", "22"));
            temp.menuXmlItem = menuA;
            temp.info = {};
            temp.info.bfun = function (value, evt) { _this.menuBfun(value, evt); };
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        };
        FileListPanel.prototype.makeFileListMenu = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY);
            var menuB = new Array();
            menuB.push(new MenuListData("上传文件", "1"));
            menuB.push(new MenuListData("创建文件夹", "2"));
            menuB.push(new MenuListData("创建Texture", "3"));
            menuB.push(new MenuListData("创建prefab", "4"));
            menuB.push(new MenuListData("刷新", "5"));
            temp.menuXmlItem = menuB;
            temp.info = {};
            temp.info.bfun = function (value, evt) { _this.menuBfun(value, evt); };
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        };
        FileListPanel.prototype.menuBfun = function (value, evt) {
            switch (value.key) {
                case "1":
                    this.upTempFileToOss();
                    break;
                case "4":
                    this.creatPefab();
                    break;
                case "21":
                    this.deleFile();
                    break;
                default:
                    console.log("没处理对象", value.key);
                    break;
            }
        };
        FileListPanel.prototype.creatPefab = function () {
            var _this = this;
            console.log("ccav");
            var $byte = new Pan3d.Pan3dByteArray();
            var tempObj = {};
            tempObj.name = "temp.prefab";
            tempObj.textureurl = "ccsss.txt";
            tempObj.objsurl = "ccsss.objs";
            $byte.writeUTF(JSON.stringify(tempObj));
            var $file = new File([$byte.buffer], "新建.prefab");
            var pathurl = this.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
            console.log(pathurl + $file.name);
            filemodel.FileModel.getInstance().upOssFile($file, pathurl + $file.name, function () {
                console.log("文件上传成功");
                _this.refrishPath(_this.rootFilePath);
            });
        };
        FileListPanel.prototype.deleFile = function () {
            var _this = this;
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.fileListMeshVo.fileXmlVo.data.select) {
                        filemodel.FileModel.getInstance().deleFile($vo.fileListMeshVo.fileXmlVo.data.path, function () {
                            console.log("删除成功");
                            _this.refrishPath(_this.rootFilePath);
                        });
                    }
                }
            }
        };
        FileListPanel.prototype.upTempFileToOss = function () {
            var _this = this;
            this._inputHtmlSprite = document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", function (cevt) { _this.changeFile(cevt); });
        };
        FileListPanel.prototype.changeFile = function (evt) {
            var _this = this;
            for (var i = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile = this._inputHtmlSprite.files[i];
                console.log(simpleFile);
                console.log(this.rootFilePath);
                var pathurl = this.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
                console.log(pathurl + simpleFile.name);
                filemodel.FileModel.getInstance().upOssFile(simpleFile, pathurl + simpleFile.name, function () {
                    console.log("文件上传成功");
                    _this.refrishPath(_this.rootFilePath);
                });
            }
            this._inputHtmlSprite = null;
        };
        FileListPanel.prototype.panelEventChanger = function (value) {
            this.left = value.x;
            this.top = value.y;
            this.pageRect.x = value.x;
            this.pageRect.y = value.y;
            this.pageRect.width = value.width;
            this.pageRect.height = value.height;
            this.resetSampleFilePos();
            this.resize();
        };
        FileListPanel.prototype.resetSampleFilePos = function () {
            var w = Math.round((this.pageRect.width - 50) / 100);
            var moveTy = 20;
            for (var i = 0; this.fileItem && i < this.fileItem.length; i++) {
                var vo = this.fileItem[i];
                vo.pos.x = i % w * 100;
                vo.pos.y = Math.floor(i / w) * 70 + moveTy;
            }
            if (this.uiLoadComplete && this.fileItem) {
                console.log(this.pageRect.height, (Math.round(this.fileItem.length / w) * 70 + moveTy));
                var isVisible = this.pageRect.height < (Math.round(this.fileItem.length / w) * 70 + moveTy);
                console.log(isVisible);
                this.setUiListVisibleByItem([this.a_scroll_bar_bg], isVisible);
            }
        };
        FileListPanel.prototype.getCharNameMeshVo = function (value) {
            var $vo = new FileListMeshVo;
            $vo.fileXmlVo = value;
            this.showTemp($vo);
            return $vo;
        };
        return FileListPanel;
    }(base.Dis2dBaseWindow));
    filelist.FileListPanel = FileListPanel;
})(filelist || (filelist = {}));
//# sourceMappingURL=FileListPanel.js.map