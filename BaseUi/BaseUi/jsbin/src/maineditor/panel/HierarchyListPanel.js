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
var maineditor;
(function (maineditor) {
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var Rectangle = Pan3d.Rectangle;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var MouseType = Pan3d.MouseType;
    var Vector2D = Pan3d.Vector2D;
    var Vector3D = Pan3d.Vector3D;
    var Scene_data = Pan3d.Scene_data;
    var TextureManager = Pan3d.TextureManager;
    var LoadManager = Pan3d.LoadManager;
    var MaterialBaseParam = Pan3d.MaterialBaseParam;
    var DynamicBaseTexItem = Pan3d.DynamicBaseTexItem;
    var DynamicBaseConstItem = Pan3d.DynamicBaseConstItem;
    var BaseEvent = Pan3d.BaseEvent;
    var CombineReflectionView = prop.CombineReflectionView;
    var TooXyzPosData = xyz.TooXyzPosData;
    var MenuListData = menutwo.MenuListData;
    var ModelSprite = /** @class */ (function (_super) {
        __extends(ModelSprite, _super);
        function ModelSprite() {
            return _super.call(this) || this;
        }
        ModelSprite.prototype.setMaterialVc = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            _super.prototype.setMaterialVc.call(this, $material, $mp);
        };
        Object.defineProperty(ModelSprite.prototype, "prefab", {
            get: function () {
                return this._prefab;
            },
            set: function (value) {
                var _this = this;
                this._prefab = value;
                LoadManager.getInstance().load(Scene_data.fileRoot + this._prefab.objsurl, LoadManager.XML_TYPE, function ($modelxml) {
                    _this.readTxtToModel($modelxml);
                });
                filemodel.MaterialManager.getInstance().getMaterialByUrl(this._prefab.textureurl, function ($materialTree) {
                    _this.material = $materialTree;
                    _this.meshParamInfo();
                });
                this._prefab.addEventListener(BaseEvent.COMPLETE, this.prefabComplete, this);
            },
            enumerable: true,
            configurable: true
        });
        ModelSprite.prototype.prefabComplete = function () {
            this.meshParamInfo();
        };
        ModelSprite.prototype.meshParamInfo = function () {
            if (this.material) {
                if (this._prefab.paramInfo) {
                    this.materialParam = new MaterialBaseParam;
                    this.materialParam.material = this.material;
                    this.materialParam.dynamicTexList = [];
                    this.materialParam.dynamicConstList = [];
                    for (var i = 0; i < this._prefab.paramInfo.length; i++) {
                        var tempInfo = this._prefab.paramInfo[i];
                        if (tempInfo.type == "tex") {
                            this.mekeParamTexture(tempInfo);
                        }
                        else {
                            // console.log(tempInfo.type)
                            this.makeParamValue(tempInfo);
                        }
                    }
                }
            }
        };
        ModelSprite.prototype.makeParamValue = function (obj) {
            var constList = this.material.constList;
            var targetName = obj.paramName;
            var target = null;
            for (var j = 0; j < constList.length; j++) {
                if (targetName == constList[j].paramName0
                    || targetName == constList[j].paramName1
                    || targetName == constList[j].paramName2
                    || targetName == constList[j].paramName3) {
                    target = constList[j];
                    break;
                }
            }
            var constItem = new DynamicBaseConstItem();
            constItem.setTargetInfo(target, targetName, obj.type);
            if (obj.type == "vec3") {
                constItem.setCurrentVal(obj.data.x, obj.data.y, obj.data.z);
            }
            this.materialParam.dynamicConstList.push(constItem);
        };
        ModelSprite.prototype.mekeParamTexture = function (obj) {
            var texList = this.material.texList;
            var texItem = new DynamicBaseTexItem();
            texItem.paramName = obj.paramName;
            for (var i = 0; i < texList.length; i++) {
                if (texItem.paramName == texList[i].paramName) {
                    texItem.target = texList[i];
                    break;
                }
            }
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + obj.data, function ($textres) {
                texItem.textureRes = $textres;
            });
            this.materialParam.dynamicTexList.push(texItem);
        };
        ModelSprite.prototype.setPreFabUrl = function (url) {
            var _this = this;
            filemodel.PrefabManager.getInstance().getPrefabByUrl(url, function (value) {
                _this.prefab = value;
            });
        };
        return ModelSprite;
    }(left.MaterialModelSprite));
    maineditor.ModelSprite = ModelSprite;
    var OssListFile = /** @class */ (function (_super) {
        __extends(OssListFile, _super);
        function OssListFile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OssListFile;
    }(maineditor.HierarchyFileNode));
    maineditor.OssListFile = OssListFile;
    var FolderMeshVo = /** @class */ (function (_super) {
        __extends(FolderMeshVo, _super);
        function FolderMeshVo() {
            return _super.call(this) || this;
        }
        Object.defineProperty(FolderMeshVo.prototype, "name", {
            set: function (value) {
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        FolderMeshVo.prototype.destory = function () {
            this.needDraw = null;
            this.clear = true;
        };
        return FolderMeshVo;
    }(Pan3d.baseMeshVo));
    maineditor.FolderMeshVo = FolderMeshVo;
    var FolderName = /** @class */ (function (_super) {
        __extends(FolderName, _super);
        function FolderName() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FolderName.prototype.makeData = function () {
            this.folderMeshVo = this.data;
            if (this.folderMeshVo) {
                var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                // this.parent.uiAtlas.ctx.fillStyle = "#3c3c3c"; // text color
                // this.parent.uiAtlas.ctx.fillRect(1, 1, $uiRec.pixelWitdh-2, $uiRec.pixelHeight-2);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, "[9c9c9c]" + this.folderMeshVo.ossListFile.name, 12, 35, 5, TextAlign.LEFT);
                if (this.folderMeshVo.ossListFile.children || this.folderMeshVo.ossListFile.type == maineditor.HierarchyNodeType.Folder) {
                    if (this.folderMeshVo.ossListFile.isOpen) {
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_PanRight"], 2, 5, 10, 10);
                    }
                    else {
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_PanUp"], 3, 5, 10, 10);
                    }
                }
                switch (this.folderMeshVo.ossListFile.type) {
                    case maineditor.HierarchyNodeType.Prefab:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["profeb_16"], 15, 2, 13, 16);
                        break;
                    case maineditor.HierarchyNodeType.Light:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_point16"], 15, 2, 13, 16);
                        break;
                    case maineditor.HierarchyNodeType.Folder:
                        if (this.folderMeshVo.ossListFile.isOpen) {
                            this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_FolderOpen_dark"], 15, 2, 18, 16);
                        }
                        else {
                            this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_FolderClosed_dark"], 15, 2, 18, 16);
                        }
                        break;
                    default:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["water_plane16"], 15, 2, 18, 16);
                        break;
                }
                //icon_point16
                //profeb_16
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
            }
        };
        FolderName.prototype.update = function () {
            this.folderMeshVo = this.data;
            if (this.folderMeshVo) {
                if (this.folderMeshVo.needDraw) {
                    this.makeData();
                    this.folderMeshVo.needDraw = false;
                }
                if (this.folderMeshVo.cellPos) {
                    this.ui.x = this.folderMeshVo.cellPos.x;
                    this.ui.y = this.folderMeshVo.cellPos.y;
                }
                if (this.folderMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return FolderName;
    }(Disp2DBaseText));
    maineditor.FolderName = FolderName;
    var HierarchyListPanel = /** @class */ (function (_super) {
        __extends(HierarchyListPanel, _super);
        function HierarchyListPanel() {
            var _this = _super.call(this, FolderName, new Rectangle(0, 0, 128, 20), 50) || this;
            // private fileItem: Array<FolderMeshVo>;
            _this.moveListTy = 0;
            _this.cellBgItem = [];
            _this.left = 0;
            _this.pageRect = new Rectangle(0, 0, 200, 200);
            maineditor.EditorModel.getInstance().hierarchyListPanel = _this;
            return _this;
        }
        HierarchyListPanel.prototype.loadConfigCom = function () {
            var _this = this;
            _super.prototype.loadConfigCom.call(this);
            var item = [
                this.b_bottom_left,
                this.b_bottom_mid,
                this.b_bottom_right,
                this.b_bottom_line_left,
                this.b_bottom_line_right,
                this.a_bottom_line,
            ];
            this.setUiListVisibleByItem(item, false);
            this.resize();
            this.loadAssetImg(function () {
                _this.makeItemUiList();
                Pan3d.TimeUtil.addFrameTick(function (t) { _this.update(t); });
            });
        };
        HierarchyListPanel.prototype.loadAssetImg = function (bfun) {
            HierarchyListPanel.imgBaseDic = {};
            var item = [];
            item.push("icon_FolderClosed_dark");
            item.push("icon_FolderOpen_dark");
            item.push("icon_PanRight");
            item.push("icon_PanUp");
            item.push("profeb_16");
            item.push("icon_point16");
            item.push("water_plane16");
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
        HierarchyListPanel.prototype.loadTempOne = function (name, bfun) {
            var tempImg = makeImage();
            HierarchyListPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = function () {
                bfun();
            };
            tempImg.url = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png";
            tempImg.src = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png";
        };
        HierarchyListPanel.prototype.update = function (t) {
            _super.prototype.update.call(this, t);
        };
        HierarchyListPanel.prototype.makeFileFloadMenu = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY);
            var menuA = new Array();
            menuA.push(new MenuListData("删除文件", "1"));
            menuA.push(new MenuListData("重命名", "2"));
            temp.menuXmlItem = menuA;
            temp.info = {};
            temp.info.bfun = function (value, evt) { _this.menuBfun(value, evt); };
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        };
        HierarchyListPanel.prototype.menuBfun = function (value, evt) {
            switch (value.key) {
                case "1":
                    if (this.selectFolderMeshVo) {
                        this.deleFile(maineditor.EditorModel.getInstance().fileItem, this.selectFolderMeshVo.folderMeshVo);
                        Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA));
                        this.refrishFolder();
                    }
                    break;
                default:
                    break;
            }
        };
        HierarchyListPanel.prototype.deleFile = function (item, vo) {
            var idx = item.indexOf(vo);
            if (idx == -1) {
                console.log("没找到需要到子目录找");
            }
            else {
                item.splice(idx, 1);
                maineditor.MainEditorProcessor.edItorSceneManager.removeDisplay(vo.dis);
                this.clearTemp(vo);
            }
            this.refrishFolder();
        };
        HierarchyListPanel.prototype.itemMouseUp = function (evt) {
            var $clikVo;
            for (var i = 0; i < this._uiItem.length; i++) {
                var $vo = this._uiItem[i];
                if ($vo.ui == evt.target) {
                    $clikVo = $vo;
                    if ((evt.x - this.left) - $vo.ui.x < 20) {
                        $vo.folderMeshVo.ossListFile.isOpen = !$vo.folderMeshVo.ossListFile.isOpen;
                        if ($vo.folderMeshVo.ossListFile.isOpen) {
                        }
                        else {
                            this.clearChildern($vo.folderMeshVo); //将要关闭
                        }
                    }
                    $vo.folderMeshVo.needDraw = true;
                }
            }
            if ($clikVo) {
                this.hidefileItemBg(maineditor.EditorModel.getInstance().fileItem);
                $clikVo.folderMeshVo.ossListFile.treeSelect = true;
                Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
                maineditor.EditorModel.getInstance().selectItem = [$clikVo.folderMeshVo];
                this.showXyzMove();
            }
            this.refrishFolder();
            this.resize();
        };
        HierarchyListPanel.prototype.showMeshView = function (value, selctprefab) {
            var _combineReflectionView = new CombineReflectionView();
            var A = new maineditor.PropertyMeshView;
            A.data = value;
            _combineReflectionView.addView(A);
            if (selctprefab) {
                var B = new filelist.PrefabMeshView;
                B.data = selctprefab;
                _combineReflectionView.addView(B);
            }
            prop.PropModel.getInstance().showPefabMesh(_combineReflectionView);
        };
        HierarchyListPanel.prototype.showXyzMove = function () {
            var disItem = [];
            var selctprefab;
            for (var i = 0; i < maineditor.EditorModel.getInstance().selectItem.length; i++) {
                var vo = maineditor.EditorModel.getInstance().selectItem[i];
                vo.ossListFile.treeSelect = true;
                disItem.push(vo.dis);
                selctprefab = vo.dis.prefab;
            }
            var data = TooXyzPosData.getBase(disItem);
            this.showMeshView(data, selctprefab);
            Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE), data);
        };
        HierarchyListPanel.prototype.hidefileItemBg = function (arr) {
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].ossListFile.treeSelect = false;
                this.hidefileItemBg(arr[i].childItem);
            }
        };
        HierarchyListPanel.prototype.clearChildern = function ($folderMeshVo) {
            if ($folderMeshVo.childItem) {
                for (var i = 0; i < $folderMeshVo.childItem.length; i++) {
                    var $vo = $folderMeshVo.childItem[i];
                    $vo.cellPos.x = -1000;
                    this.clearChildern($vo);
                }
            }
        };
        HierarchyListPanel.prototype.onPanellMouseWheel = function ($evt) {
            var $slectUi = UIManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
            if ($slectUi && $slectUi.parent == this) {
            }
        };
        HierarchyListPanel.prototype.makeItemUiList = function () {
            var _this = this;
            this._baseRender.mask = this._uiMask;
            maineditor.EditorModel.getInstance().fileItem = [];
            for (var i = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.itemMouseUp, this);
            }
            document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onPanellMouseWheel($evt); });
            this.readMapFile();
            if (!this.onRightMenuFun) {
                this.onRightMenuFun = function ($evt) { _this.onRightMenu($evt); };
            }
            document.addEventListener("contextmenu", this.onRightMenuFun);
        };
        HierarchyListPanel.prototype.onRightMenu = function ($evt) {
            $evt.preventDefault();
            var $slectUi = layout.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
            if ($slectUi) {
                if ($slectUi.parent instanceof HierarchyListPanel) {
                    var vo = this.getItemVoByUi($slectUi);
                    if (vo) {
                        this.selectFolderMeshVo = vo;
                        this.makeFileFloadMenu($evt);
                    }
                }
            }
        };
        HierarchyListPanel.prototype.getItemVoByUi = function (ui) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].ui == ui) {
                    return this._uiItem[i];
                }
            }
            return null;
        };
        HierarchyListPanel.prototype.wirteItem = function (childItem) {
            var $item = new Array;
            for (var i = 0; childItem && i < childItem.length; i++) {
                var $vo = new FolderMeshVo;
                $vo.ossListFile = new OssListFile;
                $vo.ossListFile.name = childItem[i].name;
                $vo.ossListFile.type = childItem[i].type;
                $vo.ossListFile.treeSelect = childItem[i].treeSelect;
                ;
                $vo.cellPos = new Vector2D();
                this.showTemp($vo);
                $vo.dis = new ModelSprite();
                $vo.dis.setPreFabUrl(childItem[i].data);
                $vo.dis.x = childItem[i].x;
                $vo.dis.y = childItem[i].y;
                $vo.dis.z = childItem[i].z;
                maineditor.MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
                $vo.childItem = this.wirteItem(childItem[i].children);
                $item.push($vo);
            }
            return $item;
        };
        HierarchyListPanel.prototype.inputPrefabToScene = function (temp) {
            var $url = temp.url;
            var $groundPos = this.getGroundPos(temp.mouse);
            var $vo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.dis = new ModelSprite();
            $vo.dis.setPreFabUrl($url);
            $vo.dis.x = $groundPos.x;
            $vo.dis.y = $groundPos.y;
            $vo.dis.z = $groundPos.z;
            maineditor.MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
            $vo.ossListFile.name = temp.url;
            $vo.ossListFile.type = maineditor.HierarchyNodeType.Prefab;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();
            this.showTemp($vo);
            maineditor.EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize();
        };
        HierarchyListPanel.prototype.makeModelSprite = function (dis, prefab) {
            LoadManager.getInstance().load(Scene_data.fileRoot + prefab.objsurl, LoadManager.XML_TYPE, function ($modelxml) {
                dis.readTxtToModel($modelxml);
            });
            filemodel.MaterialManager.getInstance().getMaterialByUrl(prefab.textureurl, function ($materialTree) {
                dis.material = $materialTree;
            });
        };
        HierarchyListPanel.prototype.getGroundPos = function ($mouse) {
            var $scene = maineditor.MainEditorProcessor.edItorSceneManager;
            var $hipPos = xyz.TooMathHitModel.mathDisplay2Dto3DWorldPos(new Vector2D($mouse.x - $scene.cam3D.cavanRect.x, $mouse.y - $scene.cam3D.cavanRect.y), $scene);
            var triItem = new Array;
            triItem.push(new Vector3D(0, 0, 0));
            triItem.push(new Vector3D(-100, 0, 100));
            triItem.push(new Vector3D(+100, 0, 100));
            return Pan3d.MathUtil.getLinePlaneInterectPointByTri(new Vector3D($scene.cam3D.x, $scene.cam3D.y, $scene.cam3D.z), $hipPos, triItem);
        };
        HierarchyListPanel.prototype.readMapFile = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "scene.map", LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                var $fileObj = JSON.parse($byte.readUTF());
                var $item = _this.wirteItem($fileObj.list);
                for (var i = 0; i < $item.length; i++) {
                    maineditor.EditorModel.getInstance().fileItem.push($item[i]);
                }
                _this.isCompelet = true;
                _this.refrishFolder();
                _this.resize();
            });
        };
        HierarchyListPanel.prototype.selectModelEvet = function (tempItem, isshift) {
            if (isshift === void 0) { isshift = false; }
            if (tempItem.length) {
                this.hidefileItemBg(maineditor.EditorModel.getInstance().fileItem);
                maineditor.EditorModel.getInstance().addSelctItem(tempItem, isshift);
                this.showXyzMove();
                this.refrishFolder();
                this.resize();
            }
        };
        HierarchyListPanel.prototype.saveMap = function () {
            // EditorModel.getInstance().fileItem=[]
            var tempObj = { list: this.getWillSaveItem(maineditor.EditorModel.getInstance().fileItem) };
            var $byte = new Pan3d.Pan3dByteArray();
            var $fileUrl = Pan3d.Scene_data.fileRoot + "scene.map";
            $byte.writeUTF(JSON.stringify(tempObj));
            var $file = new File([$byte.buffer], "scene.map");
            var pathurl = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
            filemodel.FileOssModel.upOssFile($file, pathurl, function () {
                console.log("上传完成");
            });
        };
        HierarchyListPanel.prototype.getWillSaveItem = function (item) {
            var $arr = [];
            for (var i = 0; i < item.length; i++) {
                var $obj = {};
                $obj.type = item[i].ossListFile.type;
                $obj.name = item[i].ossListFile.name;
                $obj.x = item[i].dis.x;
                $obj.y = item[i].dis.y;
                $obj.z = item[i].dis.z;
                $obj.data = item[i].ossListFile.name;
                if (item[i].childItem) {
                    $obj.childItem = this.getWillSaveItem(item[i].childItem);
                }
                $arr.push($obj);
            }
            if ($arr.length) {
                return $arr;
            }
            else {
                return null;
            }
        };
        HierarchyListPanel.prototype.changeScrollBar = function () {
            var th = this._uiMask.height - this.a_scroll_bar.height;
            var ty = this.a_scroll_bar.y - this._uiMask.y;
            this.moveListTy = -(this.contentHeight - this._uiMask.height) * (ty / th);
            this.refrishFolder();
        };
        HierarchyListPanel.prototype.resize = function () {
            if (this.isCompelet) {
                this.contentHeight = this.getItemDisNum(maineditor.EditorModel.getInstance().fileItem) * 20;
            }
            _super.prototype.resize.call(this);
            for (var i = 0; i < this.cellBgItem.length; i++) {
                this.cellBgItem[i].width = this.pageRect.width;
            }
        };
        HierarchyListPanel.prototype.refrishFolder = function () {
            if (this.isCompelet) {
                HierarchyListPanel.listTy = this.moveListTy + this._uiMask.y;
                this.disChiendren(maineditor.EditorModel.getInstance().fileItem, 10);
                var moveTy = 0;
                this.moveAllTy(maineditor.EditorModel.getInstance().fileItem, moveTy);
                while (this.cellBgItem.length) {
                    this.removeChild(this.cellBgItem.pop());
                }
                this.showSelectBg(maineditor.EditorModel.getInstance().fileItem);
            }
        };
        HierarchyListPanel.prototype.showSelectBg = function (arr) {
            for (var i = 0; arr && i < arr.length; i++) {
                if (arr[i].ossListFile.isOpen) {
                    this.showSelectBg(arr[i].childItem);
                }
                if (arr[i].ossListFile.treeSelect) {
                    var ui = this.addChild(this._baseMidRender.getComponent("a_round_line"));
                    ui.y = arr[i].cellPos.y;
                    ui.x = 0;
                    ui.width = this.pageRect.width;
                    ui.height = 20;
                    this.cellBgItem.push(ui);
                }
            }
        };
        HierarchyListPanel.prototype.moveAllTy = function (arr, ty) {
            if (ty === void 0) { ty = 0; }
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].cellPos.y += ty;
                if (arr[i].ossListFile.isOpen) {
                    this.moveAllTy(arr[i].childItem, ty);
                }
            }
        };
        //获取显示数量
        HierarchyListPanel.prototype.getItemDisNum = function (arr) {
            var num = 0;
            for (var i = 0; arr && i < arr.length; i++) {
                num++;
                if (arr[i].ossListFile.isOpen) {
                    num += this.getItemDisNum(arr[i].childItem);
                }
            }
            return num;
        };
        HierarchyListPanel.prototype.disChiendren = function (arr, tx) {
            if (tx === void 0) { tx = 0; }
            for (var i = 0; arr && i < arr.length; i++) {
                arr[i].cellPos.x = tx;
                arr[i].cellPos.y = HierarchyListPanel.listTy;
                HierarchyListPanel.listTy += 20;
                if (arr[i].ossListFile.isOpen) {
                    this.disChiendren(arr[i].childItem, tx + 20);
                }
            }
        };
        return HierarchyListPanel;
    }(base.Dis2dBaseWindow));
    maineditor.HierarchyListPanel = HierarchyListPanel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=HierarchyListPanel.js.map