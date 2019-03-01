module ossfolder {
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
    import SampleFileVo = filelist.SampleFileVo
    import TextureManager = Pan3d.TextureManager
    

    export class OssListFile {
        public isOpen: boolean;
        public baseFile: FileVo;

    }
    export class FolderMeshVo extends Pan3d.baseMeshVo {
        public ossListFile: OssListFile
        public childItem: Array<FolderMeshVo>
        public needDraw: boolean;
        public constructor() {
            super();
        }
        public set name(value: string) {
    
            this.needDraw = true;
        }
     
        public destory(): void {
            this.pos = null;
 
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


                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, "[9c9c9c]" + this.folderMeshVo.ossListFile.baseFile.name, 12, 35, 5, TextAlign.LEFT)



                if (this.folderMeshVo.ossListFile.isOpen) {
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_PanRight"], 2, 5, 10, 10)

                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_FolderOpen_dark"], 15, 2, 18, 16)
                } else {
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_PanUp"], 3, 5, 10, 10)

                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_FolderClosed_dark"], 15, 2, 18, 16)
                }

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
                if (this.folderMeshVo.pos) {
                    this.ui.x = this.folderMeshVo.pos.x;
                    this.ui.y = this.folderMeshVo.pos.y;
                }
                if (this.folderMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }

    export class OssFolderPanel extends base.Dis2dBaseWindow {

        public static imgBaseDic: any
        public constructor() {
            super(FolderName, new Rectangle(0, 0, 128, 20), 50);
            this.left = 0;
            this.pageRect = new Rectangle(0, 0, 200, 200)
        }
        protected loadConfigCom(): void {
            super.loadConfigCom();

            this._baseRender.mask = this._uiMask
     
            var item: Array<UICompenent> = [
                this.a_bg,
                this.a_tittle_bg,
 
         
                this.b_bottom_right,
               
 
     
            ]
            this.setUiListVisibleByItem(item, false)

            this.a_tittle_bg.height=2
            this.a_tittle_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.resize();

            this.loadAssetImg(() => {
                this.makeItemUiList()
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.update(t) });
            })
        }

        private loadAssetImg(bfun: Function): void {
            OssFolderPanel.imgBaseDic = {};
            var item: Array<string> = [];
            item.push("icon_FolderClosed_dark");
            item.push("icon_FolderOpen_dark");
            item.push("icon_PanRight");
            item.push("icon_PanUp");


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
            OssFolderPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = () => {
                bfun();
            }
            tempImg.url = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"
            tempImg.src = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"

        }

     
        public update(t: number): void {
            super.update(t);

        }

        private percentNum: number = 0.2;
        private perentRect: Rectangle
        public panelEventChanger(value: Rectangle): void {

            this.perentRect = value
            this.left = value.x;
            this.top = value.y;

            this.pageRect.x = value.x;
            this.pageRect.y = value.y;
            this.pageRect.width = value.width * this.percentNum;
            this.pageRect.height = value.height;

            this.resize();
        }
        public getPageRect(): Rectangle {
            return this.pageRect;
        }
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            super.mouseOnTittleMove(evt);
 
 
            this.percentNum = Math.min(0.8, Math.max(0.2, this.pageRect.width / this.perentRect.width))
 
       
            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.FILE_LIST_PANEL_CHANG), this.perentRect);
        }
        protected itemMouseUp(evt: InteractiveEvent): void {
  
                for (var i: number = 0; i < this._uiItem.length; i++) {
                    var $vo: FolderName = <FolderName>this._uiItem[i]
                    if ($vo.ui == evt.target) {
                        if ((evt.x - this.left) - $vo.ui.x < 20) {
                            $vo.folderMeshVo.ossListFile.isOpen = !$vo.folderMeshVo.ossListFile.isOpen;
                            if ($vo.folderMeshVo.ossListFile.isOpen) {
                                this.pushChidrenDic($vo)
                            } else {
                                this.clearChildern($vo.folderMeshVo)   //将要关闭
                            }
                          
                        } else {
                            if (!$vo.folderMeshVo.ossListFile.isOpen) {
                                this.pushChidrenDic($vo)
                            } 
                            $vo.folderMeshVo.ossListFile.isOpen = true

                            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), $vo.folderMeshVo.ossListFile.baseFile.path)
                        }

                        $vo.folderMeshVo.needDraw = true;

                      
                    }
                }
                this.refrishFolder();

            

        }
        private resetHideDic(arr: Array<FolderMeshVo>): void {

            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].clear = false
                arr[i].pos = new Vector3D();
                this.showTemp(arr[i]);
                this.resetHideDic( arr[i].childItem)
            }

        }
        private pushChidrenDic($folderName: FolderName): void {
            if ($folderName.folderMeshVo.childItem) {

                console.log("已经有了，直接显示就行")
                this.resetHideDic($folderName.folderMeshVo.childItem)
            

            } else {
                var pathurl: string = $folderName.folderMeshVo.ossListFile.baseFile.path
                filemodel.FolderModel.getFolderArr(pathurl, (value: Array<FileVo>) => {
                    if (!$folderName.folderMeshVo.childItem) {
                        $folderName.folderMeshVo.childItem = []
                        for (var i: number = 0; value && i < value.length; i++) {
                            if (value[i].isFolder) {
                                var $vo: FolderMeshVo = this.getCharNameMeshVo(value[i])
                                $vo.pos = new Vector3D(0, i * 15, 0)
                                $folderName.folderMeshVo.childItem.push($vo)
                            }
                        }
                        this.refrishFolder();
                    } else {
                        console.log("已获取过，注意可能是网络问题")
                    }

                })
            }
           
      
 
        }
        private clearChildern($folderMeshVo: FolderMeshVo): void {
            if ($folderMeshVo.childItem) {
                for (var i: number = 0; i < $folderMeshVo.childItem.length; i++) {
                    var $vo: FolderMeshVo = $folderMeshVo.childItem[i];
                    $vo.destory();
                    console.log("移除", $vo)

                    this.clearChildern($vo)
                }
            }
        }
        private makeItemUiList(): void {
            this.fileItem = [];
            for (var i: number = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.itemMouseUp, this);
            }
  
            //"upfile/shadertree/"
            //
            //Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            var rootDic: string = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            filemodel.FolderModel.getFolderArr(rootDic, (value: Array<FileVo>) => {
                for (var i: number = 0; i < value.length; i++) {
                    if (value[i].isFolder) {
                        var $vo: FolderMeshVo = this.getCharNameMeshVo(value[i])
                        $vo.pos = new Vector3D(0, i * 15, 0)

                        this.fileItem.push($vo)
                    }
                }
                this.refrishFolder();
            })

        }
        private fileItem: Array<FolderMeshVo>;
        public getCharNameMeshVo(value: FileVo): FolderMeshVo {
            var $vo: FolderMeshVo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.ossListFile.baseFile = value
            this.showTemp($vo);
            return $vo;
        }
        private folderCellHeight: number = 20
        private refrishFolder(): void {
            OssFolderPanel.listTy = this.a_tittle_bg.height;
            this.disChiendren(this.fileItem,10);
            var moveTy: number = 0
            this.moveAllTy(this.fileItem, moveTy)
 
        }
        private moveAllTy(arr: Array<FolderMeshVo>, ty: number = 0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].pos.y += ty;  
                if (arr[i].ossListFile.isOpen) {
                    this.moveAllTy(arr[i].childItem, ty)
                }
            }

        }
        private static listTy: number
        private disChiendren(arr: Array<FolderMeshVo>, tx: number=0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].pos.x = tx;
                arr[i].pos.y = OssFolderPanel.listTy
                OssFolderPanel.listTy += 20;
                if (arr[i].ossListFile.isOpen) {
                    this.disChiendren(arr[i].childItem, tx+20)
                }
            }
   
        }
    }
}