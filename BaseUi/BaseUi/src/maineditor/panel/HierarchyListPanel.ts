module maineditor {
    import UICompenent = Pan3d.UICompenent
    import FrameCompenent = Pan3d.FrameCompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import ColorType = Pan3d.ColorType
    import InteractiveEvent = Pan3d.InteractiveEvent
    import TextAlign = Pan3d.TextAlign
    import Rectangle = Pan3d.Rectangle
    import ModuleEventManager = Pan3d.ModuleEventManager
    import UIManager = Pan3d.UIManager
    import LabelTextFont = Pan3d.LabelTextFont
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import UIRectangle = Pan3d.UIRectangle
    import baseMeshVo = Pan3d.baseMeshVo
    import UIMask = Pan3d.UIMask
    import UiDraw = Pan3d.UiDraw
    import UIData = Pan3d.UIData
    import UIAtlas = Pan3d.UIAtlas
    import MouseType = Pan3d.MouseType
    import FileVo = filemodel.FileVo
    import Vector2D = Pan3d.Vector2D
    import Vector3D = Pan3d.Vector3D
    import Scene_data = Pan3d.Scene_data
    import TextureManager = Pan3d.TextureManager
    import LoadManager = Pan3d.LoadManager

    import Display3DSprite = Pan3d.Display3DSprite

    import Shader3D = Pan3d.Shader3D
    import GroupDataManager = Pan3d.GroupDataManager
    import Material = Pan3d.Material
    import GroupRes = Pan3d.GroupRes
    import GroupItem = Pan3d.GroupItem
    import BaseRes = Pan3d.BaseRes
    import TexItem = Pan3d.TexItem
    import MaterialBaseParam = Pan3d.MaterialBaseParam
    import ObjData = Pan3d.ObjData
    import TextureRes = Pan3d.TextureRes
    import Matrix3D = Pan3d.Matrix3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import BaseDiplay3dShader = Pan3d.BaseDiplay3dShader
    import ConstItem = Pan3d.ConstItem
    import Display3D = Pan3d.Display3D
    import DynamicBaseTexItem = Pan3d.DynamicBaseTexItem
    import DynamicBaseConstItem = Pan3d.DynamicBaseConstItem
    import BaseEvent = Pan3d.BaseEvent

    import PrefabStaticMesh = pack.PrefabStaticMesh
    import CombineReflectionView = prop.CombineReflectionView

    import TooXyzPosData = xyz.TooXyzPosData

    import MenuListData = menutwo.MenuListData
    import SampleFileVo = filelist.SampleFileVo
    




    export class ModelSprite extends left.MaterialModelSprite {


        public constructor() {
            super();

        }
        public setMaterialVc($material: Material, $mp: MaterialBaseParam = null): void {
            super.setMaterialVc($material, $mp)
        }
        private _prefab: PrefabStaticMesh;
        public get prefab(): PrefabStaticMesh {
            return this._prefab
        }
        public set prefab(value: PrefabStaticMesh) {
            this._prefab = value
            LoadManager.getInstance().load(Scene_data.fileRoot + this._prefab.objsurl, LoadManager.XML_TYPE,
                ($modelxml: string) => {
                    this.readTxtToModel($modelxml);
                });
            filemodel.MaterialManager.getInstance().getMaterialByUrl(this._prefab.textureurl, ($materialTree: materialui.MaterialTree) => {
                this.material = $materialTree;
                this.meshParamInfo();
            })

            this._prefab.addEventListener(BaseEvent.COMPLETE, this.prefabComplete, this);
        }
        private prefabComplete(): void {
            this.meshParamInfo();
        }
        private meshParamInfo(): void {
            if (this.material) {
                if (this._prefab.paramInfo) {
                    this.materialParam = new MaterialBaseParam;
                    this.materialParam.material = this.material
                    this.materialParam.dynamicTexList = []
                    this.materialParam.dynamicConstList=[]
                    for (var i: number = 0; i < this._prefab.paramInfo.length; i++) {
                        var tempInfo: any = this._prefab.paramInfo[i];
                        if (tempInfo.type == "tex") {
                            this.mekeParamTexture(tempInfo)
                        } else {
                           // console.log(tempInfo.type)

                            this.makeParamValue(tempInfo)
                        }
                         
                    }
                }
            }

        }
        private makeParamValue(obj: any): void {
            var constList = this.material.constList;
            var targetName: string = obj.paramName;

            var target: ConstItem = null;
            for (var j: number = 0; j < constList.length; j++) {

                if (targetName == constList[j].paramName0
                    || targetName == constList[j].paramName1
                    || targetName == constList[j].paramName2
                    || targetName == constList[j].paramName3) {
                    target = constList[j];
                    break;
                }

            }
            var constItem: DynamicBaseConstItem = new DynamicBaseConstItem();
            constItem.setTargetInfo(target, targetName, obj.type);
            if (obj.type == "vec3") {
                constItem.setCurrentVal(obj.data.x, obj.data.y, obj.data.z);
            }
            this.materialParam.dynamicConstList.push(constItem)
        }
        private mekeParamTexture(obj: any): void {
         
                var texList = this.material.texList;
                var texItem: DynamicBaseTexItem = new DynamicBaseTexItem();
                texItem.paramName = obj.paramName;
                for (var i: number = 0; i < texList.length; i++) {
                    if (texItem.paramName == texList[i].paramName) {
                        texItem.target = texList[i];
                        break;
                    }
                }
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + obj.data, ($textres: TextureRes) => {
                    texItem.textureRes = $textres;
                });
                this.materialParam.dynamicTexList.push(texItem);
 
 
        }
        public setPreFabUrl(url: string): void {
            filemodel.PrefabManager.getInstance().getPrefabByUrl(url, (value: pack.PrefabStaticMesh) => {
                this.prefab = value
            })
        }
        


    }

    export class OssListFile extends HierarchyFileNode {
  
 
    }
    export class FolderMeshVo extends Pan3d.baseMeshVo {
        public ossListFile: OssListFile
        public childItem: Array<FolderMeshVo>
        public needDraw: boolean;
        public dis: ModelSprite;
        public cellPos: Vector2D

        public constructor() {
            super();
        }
        public set name(value: string) {

            this.needDraw = true;
        }

        public destory(): void {
         
            this.needDraw = null;
            this.clear = true
        }


    }
    export class FolderName extends Disp2DBaseText {
        public folderMeshVo: FolderMeshVo
        public makeData(): void {
            this.folderMeshVo = this.data;
            if (this.folderMeshVo) {

                var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);

                // this.parent.uiAtlas.ctx.fillStyle = "#3c3c3c"; // text color
                // this.parent.uiAtlas.ctx.fillRect(1, 1, $uiRec.pixelWitdh-2, $uiRec.pixelHeight-2);


                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, "[9c9c9c]" + this.folderMeshVo.ossListFile.name, 12, 35, 5, TextAlign.LEFT)



                if (this.folderMeshVo.ossListFile.children || this.folderMeshVo.ossListFile.type == HierarchyNodeType.Folder) {
                    if (this.folderMeshVo.ossListFile.isOpen) {
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_PanRight"], 2, 5, 10, 10)
                    } else {
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_PanUp"], 3, 5, 10, 10)
                    }
                }
                switch (this.folderMeshVo.ossListFile.type) {
                    case HierarchyNodeType.Prefab:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["profeb_16"], 15, 2, 13, 16)
                        break
                    case HierarchyNodeType.Light:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_point16"], 15, 2, 13, 16)
                        break
                    case HierarchyNodeType.Folder:
                        if (this.folderMeshVo.ossListFile.isOpen) {
                            this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_FolderOpen_dark"], 15, 2, 18, 16)
                        } else {
                            this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["icon_FolderClosed_dark"], 15, 2, 18, 16)
                        }
                        break
                    default:
                        this.parent.uiAtlas.ctx.drawImage(HierarchyListPanel.imgBaseDic["water_plane16"], 15, 2, 18, 16)
                        break
                }
                //icon_point16
                //profeb_16
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);

            }
        }



        public update(): void {
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
        }
    }

    export class HierarchyListPanel extends base.Dis2dBaseWindow {

        public static imgBaseDic: any;
        public constructor() {
            super(FolderName, new Rectangle(0, 0, 128, 20), 50);
            this.left = 0;
            this.pageRect = new Rectangle(0, 0, 200, 200)
            EditorModel.getInstance().hierarchyListPanel=this
        }
        protected loadConfigCom(): void {
            super.loadConfigCom();



            var item: Array<UICompenent> = [
                this.b_bottom_left,
                this.b_bottom_mid,
                this.b_bottom_right,
                this.b_bottom_line_left,
                this.b_bottom_line_right,
                this.a_bottom_line,
            ]
            this.setUiListVisibleByItem(item, false)

            this.resize();

            this.loadAssetImg(() => {
                this.makeItemUiList()
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.update(t) });
            })
        }
        private _cellBgRender: UIRenderComponent
        private loadAssetImg(bfun: Function): void {
            HierarchyListPanel.imgBaseDic = {};
            var item: Array<string> = [];
            item.push("icon_FolderClosed_dark");
            item.push("icon_FolderOpen_dark");
            item.push("icon_PanRight");
            item.push("icon_PanUp");
            item.push("profeb_16");
            item.push("icon_point16");
            item.push("water_plane16");

            var finishNum: number = 0
            for (var i: number = 0; i < item.length; i++) {
                this.loadTempOne(item[i], () => {
                    finishNum++
                    if (finishNum >= item.length) {
                        bfun();
                    }
                });
            }
        }
        private loadTempOne(name: string, bfun: Function): void {
            var tempImg = makeImage()
            HierarchyListPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = () => {
                bfun();
            }
            tempImg.url = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"
            tempImg.src = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"

        }
        public update(t: number): void {
            super.update(t);

        }
        private perentRect: Rectangle
        public panelEventChanger(value: Rectangle): void {
            this.perentRect = value;
            if (this.pageRect) {
                this.pageRect.height = value.height;
                this.pageRect.width = value.width;
                this.pageRect.y = value.y
                this.left = value.x;
                this.top = value.y;
            
                this.resize();
            }
        }
 

        private makeFileFloadMenu($evt: MouseEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp: any = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY)

            var menuA: Array<MenuListData> = new Array();
            menuA.push(new MenuListData("删除文件", "1"));
            menuA.push(new MenuListData("重命名", "2"));

            temp.menuXmlItem = menuA;
            temp.info = {};
            temp.info.bfun = (value: any, evt: InteractiveEvent) => { this.menuBfun(value, evt) }
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        }
        private menuBfun(value: any, evt: InteractiveEvent): void {
            switch (value.key) {
                case "1":
                    if (this.selectFolderMeshVo) {
                        this.deleFile(EditorModel.getInstance().fileItem, this.selectFolderMeshVo.folderMeshVo)
                        Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA))
                        this.refrishFolder();
                
                    }
                    break
                default:

                    break
            }
        }
        public deleFile(item: Array<FolderMeshVo>, vo: FolderMeshVo): void {
            var idx: number = item.indexOf(vo)
            if (idx == -1) {
                console.log("没找到需要到子目录找")
            } else {
                item.splice(idx,1)
                MainEditorProcessor.edItorSceneManager.removeDisplay(vo.dis);
                this.clearTemp(vo)
            }
            this.refrishFolder();
        }


        protected itemMouseUp(evt: InteractiveEvent): void {

            var $clikVo: FolderName
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var $vo: FolderName = <FolderName>this._uiItem[i];
                if ($vo.ui == evt.target) {
                    $clikVo = $vo
                    if ((evt.x - this.left) - $vo.ui.x < 20) {
                        $vo.folderMeshVo.ossListFile.isOpen = !$vo.folderMeshVo.ossListFile.isOpen;
                        if ($vo.folderMeshVo.ossListFile.isOpen) {
                        } else {
                            this.clearChildern($vo.folderMeshVo)   //将要关闭
                        }
                    }
                    $vo.folderMeshVo.needDraw = true;
                }
            }
            if ($clikVo) {
                this.hidefileItemBg(EditorModel.getInstance().fileItem);
                $clikVo.folderMeshVo.ossListFile.treeSelect = true
                Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));

                EditorModel.getInstance().selectItem = [$clikVo.folderMeshVo];
      
                this.showXyzMove( );
            }
            this.refrishFolder();
            this.resize()

        }
        private showMeshView(value: TooXyzPosData, selctprefab: PrefabStaticMesh): void {
            var _combineReflectionView = new CombineReflectionView();
            var A: PropertyMeshView = new PropertyMeshView
            A.data = value;
            _combineReflectionView.addView(A)

            if (selctprefab) {
                var B: filelist.PrefabMeshView = new filelist.PrefabMeshView
                B.data = selctprefab;
                _combineReflectionView.addView(B)
            }
 
             prop.PropModel.getInstance().showPefabMesh(_combineReflectionView);
          
        }
        private showXyzMove( ): void {
            var disItem: Array<Display3D> = []
            var selctprefab: PrefabStaticMesh
            for (var i: number = 0; i < EditorModel.getInstance().selectItem.length; i++) {
                var vo: FolderMeshVo = EditorModel.getInstance().selectItem[i]
                vo.ossListFile.treeSelect = true
                disItem.push(vo.dis)

                selctprefab=  vo.dis.prefab
            }
            var data: TooXyzPosData = TooXyzPosData.getBase(disItem)
            this.showMeshView(data, selctprefab)

            Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.MAKE_DTAT_ITEM_TO_CHANGE), data)
        }
    
        private hidefileItemBg(arr: Array<FolderMeshVo>): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].ossListFile.treeSelect = false;
                this.hidefileItemBg(arr[i].childItem);
            }
        }
        private clearChildern($folderMeshVo: FolderMeshVo): void {
            if ($folderMeshVo.childItem) {
                for (var i: number = 0; i < $folderMeshVo.childItem.length; i++) {
                    var $vo: FolderMeshVo = $folderMeshVo.childItem[i];
                    $vo.cellPos.x = -1000
                    this.clearChildern($vo)
                }
            }
        }
        public onPanellMouseWheel($evt: MouseWheelEvent): void {
            var $slectUi: UICompenent = UIManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
            if ($slectUi && $slectUi.parent == this) {

            }
        }
        private isCompelet: boolean
        protected makeItemUiList(): void {

            this._baseRender.mask = this._uiMask
            EditorModel.getInstance().fileItem = [];
            for (var i: number = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.itemMouseUp, this);
            }
            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onPanellMouseWheel($evt) });
            this.readMapFile()

            if (!this.onRightMenuFun) {
                this.onRightMenuFun = ($evt: MouseEvent) => { this.onRightMenu($evt) };
            }
            document.addEventListener("contextmenu", this.onRightMenuFun)

        }
        private onRightMenuFun: any
        public onRightMenu($evt: MouseEvent): void {
            $evt.preventDefault();
            var $slectUi: UICompenent = layout.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
            if ($slectUi) {
                if ($slectUi.parent instanceof HierarchyListPanel) {
                    var vo: FolderName = this.getItemVoByUi($slectUi);
                    if (vo) {
                        this.selectFolderMeshVo = vo
                        this.makeFileFloadMenu($evt)
                    }
                }
            }


        }
        private selectFolderMeshVo: FolderName
        private getItemVoByUi(ui: UICompenent): FolderName {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].ui == ui) {
                    return <FolderName>this._uiItem[i];
                }
            }
            return null
        }

        private wirteItem(childItem: Array<any>): Array<FolderMeshVo> {
            var $item: Array<FolderMeshVo> = new Array
            for (var i: number = 0; childItem && i < childItem.length; i++) {

                var $vo: FolderMeshVo = new FolderMeshVo;
                $vo.ossListFile = new OssListFile;

                $vo.ossListFile.name = childItem[i].name;

                $vo.ossListFile.type = childItem[i].type;
                $vo.ossListFile.treeSelect = childItem[i].treeSelect;;
                $vo.cellPos = new Vector2D()



                this.showTemp($vo);
 
                $vo.dis = new ModelSprite();
                $vo.dis.setPreFabUrl(childItem[i].data)


                $vo.dis.x = childItem[i].x;
                $vo.dis.y = childItem[i].y;
                $vo.dis.z = childItem[i].z;
                MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);


                $vo.childItem = this.wirteItem(childItem[i].children);
                $item.push($vo)
            }

            return $item

        }
      
 
        public inputPrefabToScene(temp: any): void {


            var $url: string = temp.url
            var $groundPos = this.getGroundPos(temp.mouse)

            var $vo: FolderMeshVo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.dis = new ModelSprite();
            $vo.dis.setPreFabUrl($url)
            $vo.dis.x = $groundPos.x;
            $vo.dis.y = $groundPos.y;
            $vo.dis.z = $groundPos.z;
            MainEditorProcessor.edItorSceneManager.addDisplay($vo.dis);
 
            $vo.ossListFile.name = temp.url;
            $vo.ossListFile.type = HierarchyNodeType.Prefab;
            $vo.ossListFile.treeSelect = false;
            $vo.cellPos = new Vector2D();

            this.showTemp($vo);

            EditorModel.getInstance().fileItem.push($vo);
            this.isCompelet = true;
            this.refrishFolder();
            this.resize()

        }
        private makeModelSprite(dis: ModelSprite, prefab: pack.PrefabStaticMesh): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + prefab.objsurl, LoadManager.XML_TYPE,
                ($modelxml: string) => {
                    dis.readTxtToModel($modelxml);
                });
            filemodel.MaterialManager.getInstance().getMaterialByUrl(prefab.textureurl, ($materialTree: materialui.MaterialTree) => {
                dis.material = $materialTree;
            })
        }
        private getGroundPos($mouse: Vector2D): Vector3D {
            let $scene = MainEditorProcessor.edItorSceneManager;

            var $hipPos: Vector3D = xyz.TooMathHitModel.mathDisplay2Dto3DWorldPos(new Vector2D($mouse.x - $scene.cam3D.cavanRect.x, $mouse.y - $scene.cam3D.cavanRect.y), $scene)

            var triItem: Array<Vector3D> = new Array;
            triItem.push(new Vector3D(0, 0, 0));
            triItem.push(new Vector3D(-100, 0, 100));
            triItem.push(new Vector3D(+100, 0, 100));

            return Pan3d.MathUtil.getLinePlaneInterectPointByTri(new Vector3D($scene.cam3D.x, $scene.cam3D.y, $scene.cam3D.z), $hipPos, triItem)

        }
 
        private readMapFile(): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + "scene.map", LoadManager.BYTE_TYPE,
                ($dtstr: ArrayBuffer) => {
                    var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray($dtstr);
                    var $fileObj: any = JSON.parse($byte.readUTF())

                    var $item: Array<FolderMeshVo> = this.wirteItem($fileObj.list)
                    for (var i: number = 0; i < $item.length; i++) {
                        EditorModel.getInstance().fileItem.push($item[i]);
                    }
                    this.isCompelet = true;
                    this.refrishFolder();
                    this.resize()

                });

            
        }
        public selectModelEvet(tempItem: Array<FolderMeshVo>, isshift: boolean = false): void {
 
            if (tempItem.length) {
                this.hidefileItemBg(EditorModel.getInstance().fileItem);
                EditorModel.getInstance().addSelctItem(tempItem, isshift);

                this.showXyzMove()
                this.refrishFolder();
                this.resize()
            }
        }
        public saveMap(): void {
           // EditorModel.getInstance().fileItem=[]
 
            var tempObj: any = { list: this.getWillSaveItem(EditorModel.getInstance().fileItem) };
            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
            var $fileUrl: string = Pan3d.Scene_data.fileRoot + "scene.map";
            $byte.writeUTF(JSON.stringify(tempObj))

            var $file: File = new File([$byte.buffer], "scene.map");
            var pathurl: string = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
            
            filemodel.FileOssModel.upOssFile($file, pathurl, () => {

                console.log("上传完成")

            })


        }
        private getWillSaveItem(item: Array<FolderMeshVo>): Array<any> {
            var $arr: Array<any> = []
            for (var i: number = 0; i < item.length; i++) {
                var $obj: any = {};
                $obj.type = item[i].ossListFile.type
                $obj.name = item[i].ossListFile.name
                $obj.x = item[i].dis.x
                $obj.y = item[i].dis.y
                $obj.z = item[i].dis.z
                $obj.data = item[i].ossListFile.name
                if (item[i].childItem) {
                    $obj.childItem = this.getWillSaveItem(item[i].childItem)
                }
                $arr.push($obj)
            }
            if ($arr.length) {
                return $arr
            } else {
                return null
            }



        }
        protected changeScrollBar(): void {
            var th: number = this._uiMask.height - this.a_scroll_bar.height
            var ty: number = this.a_scroll_bar.y - this._uiMask.y;
            this.moveListTy = -  (this.contentHeight - this._uiMask.height) * (ty / th)
            this.refrishFolder()
        }
        public resize(): void {
            if (this.isCompelet) {
                this.contentHeight = this.getItemDisNum(EditorModel.getInstance().fileItem) * 20;
            }
            super.resize()

        }

       // private fileItem: Array<FolderMeshVo>;

        private moveListTy: number = 0;
        private refrishFolder(): void {
            if (this.isCompelet) {
                HierarchyListPanel.listTy = this.moveListTy + this._uiMask.y;
                this.disChiendren(EditorModel.getInstance().fileItem, 10);
                var moveTy: number = 0
                this.moveAllTy(EditorModel.getInstance().fileItem, moveTy)

                while (this.cellBgItem.length) {
                    this.removeChild(this.cellBgItem.pop());
                }
                this.showSelectBg(EditorModel.getInstance().fileItem)
            }


        }
        private cellBgItem: Array<UICompenent> = []
        private showSelectBg(arr: Array<FolderMeshVo>): void {

            for (var i: number = 0; arr && i < arr.length; i++) {
                if (arr[i].ossListFile.isOpen) {
                    this.showSelectBg(arr[i].childItem)
                }
                if (arr[i].ossListFile.treeSelect) {
                    var ui: UICompenent = <UICompenent>this.addChild(this._bRender.getComponent("a_round_line"));
                    ui.y = arr[i].cellPos.y;
                    ui.x = 0
                    ui.width = this.pageRect.width
                    ui.height = 20


                    this.cellBgItem.push(ui);
                }

            }
        }
        private moveAllTy(arr: Array<FolderMeshVo>, ty: number = 0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].cellPos.y += ty;
                if (arr[i].ossListFile.isOpen) {
                    this.moveAllTy(arr[i].childItem, ty)
                }
            }

        }
        //获取显示数量
        private getItemDisNum(arr: Array<FolderMeshVo>): number {
            var num: number = 0
            for (var i: number = 0; arr && i < arr.length; i++) {
                num++
                if (arr[i].ossListFile.isOpen) {
                    num += this.getItemDisNum(arr[i].childItem)
                }
            }
            return num
        }
        private static listTy: number
        private disChiendren(arr: Array<FolderMeshVo>, tx: number = 0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].cellPos.x = tx;
                arr[i].cellPos.y = HierarchyListPanel.listTy
                HierarchyListPanel.listTy += 20;
                if (arr[i].ossListFile.isOpen) {
                    this.disChiendren(arr[i].childItem, tx + 20)
                }
            }

        }



    }
}