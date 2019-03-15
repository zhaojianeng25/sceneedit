module filelist {
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
    import Vector2D = Pan3d.Vector2D
    import Vector3D = Pan3d.Vector3D
    import Scene_data = Pan3d.Scene_data
    import LoadManager = Pan3d.LoadManager
    import TextureManager = Pan3d.TextureManager

    import DragSource = drag.DragSource;
    import DragManager = drag.DragManager;

    import FileVo = filemodel.FileVo;
    import FileModel = filemodel.FileModel;
 
    import MenuListData = menutwo.MenuListData

 
    export class SampleFileVo {
        public id: number

        public perent: number;
        public data: FileVo






    }
    export class FileListMeshVo extends Pan3d.baseMeshVo {
        private _name: string;
        public fileXmlVo: SampleFileVo
        public ty: number
        public cellHeightNum: number;
        public childItem: Array<FileListMeshVo>
        public needDraw: boolean;
        public constructor() {
            super();
            this.cellHeightNum = 1;
        }
        public set name(value: string) {
            this._name = value;
            this.needDraw = true;
        }
        public get name(): string {
            return this._name;
        }
        public destory(): void {
            this.pos = null;
            this._name = null;
            this.needDraw = null;
            this.clear = true
        }


    }
    export class FileListName extends Disp2DBaseText {
        public fileListMeshVo: FileListMeshVo
        public makeData(): void {
            this.fileListMeshVo = this.data;
            if (this.fileListMeshVo) {
             
                var $color: string = "[9c9c9c]"
                if (this.fileListMeshVo.fileXmlVo.data.select) {
                    $color = "[ffffff]";
                }
                var fileVo: FileVo = this.fileListMeshVo.fileXmlVo.data;
                this.parent.uiAtlas.clearCtxTextureBySkilname(this.textureStr)
                switch (fileVo.suffix) {
                    case FileVo.JPG:
                    case FileVo.PNG:
                        LoadManager.getInstance().load(Scene_data.ossRoot + fileVo.path, LoadManager.IMG_TYPE,
                            ($img: any) => {
                                this.drawFileIconName($img, fileVo.name, $color)
                            });
                        break
                    case FileVo.PREFAB:
                        this.drawFileIconName(FileListPanel.imgBaseDic["profeb_64x"], fileVo.name, $color)
                        break
                    case FileVo.MATERIAL:
                        this.drawFileIconName(FileListPanel.imgBaseDic["marterial_64x"], fileVo.name, $color)
                        break
                    case FileVo.TXT:
                        this.drawFileIconName(FileListPanel.imgBaseDic["txt_64x"], fileVo.name, $color)
                        break
                    case FileVo.OBJS:
                        this.drawFileIconName(FileListPanel.imgBaseDic["objs_64x"], fileVo.name, $color)
                        break
                    default:
                        this.drawFileIconName(FileListPanel.imgBaseDic["icon_Folder_64x"], fileVo.name, $color)
                        break


                }


            }
        }
        private drawFileIconName($img: any, name: string, $color: string): void {
            var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
            this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);


            console.log($img.width)
            var tw: number = 45;
            var th: number = 45;
            if ($img.width) {
                tw = Math.max($img.width, 10);
                th = Math.max($img.height, 10);

                tw = Math.min($img.width, 45);
                th = Math.min($img.height, 45);
            }
         
 
      
            this.parent.uiAtlas.ctx.drawImage($img, 12.5 + (45 - tw) / 2, 5 + (45 - th) / 2, tw, th)


            var outStr: string = name.split(".")[0];

            var $textMetrics: TextMetrics = Pan3d.TextRegExp.getTextMetrics(this.parent.uiAtlas.ctx, outStr);
 

            if ($textMetrics.width > 70) {
                var inset: number = Math.floor(outStr.length * (1 / 3))
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr.substr(0, inset), 12, 0 - 6, 50, TextAlign.CENTER)
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr.substring(inset, outStr.length), 12, 0 - 6, 65, TextAlign.CENTER)
            } else {
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr, 12, 0 - 6, 55, TextAlign.CENTER);


            }



            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
        }



        public update(): void {
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
        }
    }

    export class FileListPanel extends base.Dis2dBaseWindow {

        public static imgBaseDic: any
        public constructor() {
            super(FileListName, new Rectangle(0, 0, 80, 80), 50);
      
    
 
        }
        protected loadConfigCom(): void {
            super.loadConfigCom();
            this._baseRender.mask = this._uiMask
            var item: Array<UICompenent> = [
                this.a_scroll_bar_bg,
                this.a_tittle_bg,
                this.a_bg,
                 this.b_bottom_left,
              //  this.b_bottom_mid,
                //this.b_bottom_right,
               //  this.b_bottom_line_left,
                //this.b_bottom_line_right,
     
              
            ]
            this.setUiListVisibleByItem(item, false)
         

            this.resize()
            this.a_tittle_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);


            this.loadAssetImg(() => {
                this.makeItemUiList()
                Pan3d.TimeUtil.addFrameTick((t: number) => { this.update(t) });
            })
        }

        private loadAssetImg(bfun: Function): void {
            FileListPanel.imgBaseDic = {};
            var item: Array<string> = [];
            item.push("icon_Folder_64x");
            item.push("profeb_64x");
            item.push("marterial_64x");
            item.push("txt_64x");
            item.push("objs_64x");
            


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
            FileListPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = () => {
                bfun();
            }
            tempImg.url = Scene_data.fileuiRoot + "ui/icon/" + name + ".png"
            tempImg.src = Scene_data.fileuiRoot + "ui/icon/" + name + ".png"

        }
        public resize(): void {
            super.resize()
            if (this.uiLoadComplete) {
                this.b_bottom_line_left.x =0 ;
                this.b_bottom_line_left.width = this.b_bottom_mid.x;
            }
       
     
        }

       
        public update(t: number): void {
            super.update(t);

        }
        private lastfileDonwInfo: any;
 
        protected fileMouseDown(evt: InteractiveEvent): void {
            this.filemouseIsDown = true;
       
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);

         

                if (this.lastfileDonwInfo && this.lastfileDonwInfo.target == evt.target) {
                    console.log("是同一个对象", this.lastfileDonwInfo.tm > Pan3d.TimeUtil.getTimer())
                    if (this.lastfileDonwInfo.tm >( Pan3d.TimeUtil.getTimer()-1000)) {
                        this.fileDuboclik(evt)
                        return
                    } else {
                        this.lastfileDonwInfo.tm = Pan3d.TimeUtil.getTimer() 
                    }
                } else {
                    this.lastfileDonwInfo = { target: evt.target, tm: Pan3d.TimeUtil.getTimer() };
                }
         

            this.makeDragData(evt);
        }
        private makeDragData(evt: InteractiveEvent): void {
            var event: MouseEvent = new MouseEvent(InteractiveEvent.Down, { clientX: evt.x, clientY: evt.y })
            var vo: FileListName = this.getItemVoByUi(evt.target)
            if (vo) {
                var fileUrl: string = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                var dsragSource: DragSource = new DragSource();
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
                    dsragSource.icon = "icon/icon_Folder_64x.png"
                } else {
              
                    switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                        case FileVo.MATERIAL:
                            dsragSource.icon = "icon/marterial_64x.png"
                            break
                        case "jpg":
                        case "png":
                            dsragSource.icon = "icon/profeb_64x.png"
                            break
                        case "objs":
                            dsragSource.icon = "icon/objs_64x.png"
                            break
                        default:
                            break;
                    }


                }
                dsragSource.url = fileUrl;
                dsragSource.type = "file"
                DragManager.doDragdoDrag(this, dsragSource);
            }
       


        }
        private filemouseIsDown: boolean
        protected stageMouseMove(evt: InteractiveEvent): void {
            this.filemouseIsDown = false
            this.lastfileDonwInfo = null

        }
        private fileDuboclik(evt: InteractiveEvent): void {
  
            var vo: FileListName = this.getItemVoByUi(evt.target)
            if (vo) {
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
                    this.refrishPath(vo.fileListMeshVo.fileXmlVo.data.path)
                } else {
                    var fileUrl: string = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                    fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                    switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                        case FileVo.MATERIAL:
                  
                            Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
                            break
                   

                        default:
                 
                            break;
                    }

                }
            }
        }
        private selectFileClik(evt: InteractiveEvent): void {

            var vo: FileListName = this.getItemVoByUi(evt.target)
            if (vo) {
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
 
                } else {
                    var fileUrl: string = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                    fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                    switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                        case FileVo.PREFAB:
  
                            filemodel.PrefabManager.getInstance().getPrefabByUrl(fileUrl, (value: pack.PrefabStaticMesh) => {
                                var tempview: PrefabMeshView = new PrefabMeshView
                                tempview.data = value;
                                prop.PropModel.getInstance().showPefabMesh(tempview);
                            })
                            break;

                        default:
                            console.log("还没有的类型", vo.fileListMeshVo.fileXmlVo.data.path)
                            break;
                    }

                }
            }


        }

 
        protected fileMouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
      
        
            this.selectFileIcon(evt)

        }
        private selectFileIcon(evt: InteractiveEvent): void {

            for (var i: number = 0; i < this._uiItem.length; i++) {
                var $vo: FileListName = <FileListName>this._uiItem[i]
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.ui == evt.target) {
                        $vo.fileListMeshVo.fileXmlVo.data.select = true
                    } else {
                        $vo.fileListMeshVo.fileXmlVo.data.select = false
                    }
                    $vo.fileListMeshVo.needDraw = true;
                }
               
            }
          
            this.selectFileClik(evt)
           
        }
       
        //移除不显示的对象
        private clearListAll(): void {
            while (this.fileItem.length) {
                var vo: FileListMeshVo = this.fileItem.pop()
                vo.destory()
            }
        }
        private rootFilePath: string;
        public refrishPath(pathstr: string): void {
            this.rootFilePath = pathstr
            //this.a_path_tittle_txt.x = 10
            //LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_path_tittle_txt.skinName, ColorType.White9A683F + pathstr, 12, Pan3d.TextAlign.LEFT)
            this.clearListAll()
            filemodel.FolderModel.getFolderArr(pathstr, (value: Array<FileVo>) => {
                for (var i: number = 0; i < value.length; i++) {
                    var sampleFile: SampleFileVo = new SampleFileVo;
                    sampleFile.id = i;
                    sampleFile.data = value[i]
                    var $vo: FileListMeshVo = this.getCharNameMeshVo(sampleFile);
                    $vo.pos = new Vector3D(i * 64, 40, 0);
                    this.fileItem.push($vo);
                }
                this.resetSampleFilePos()
            })

        }
        private getItemVoByUi(ui: UICompenent): FileListName {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var $vo: FileListName = <FileListName>this._uiItem[i]
                if ($vo.ui == ui) {

                    return $vo
                }



            }
            return null
        }
        private makeItemUiList(): void {
 
            this.fileItem = [];
            for (var i: number = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.fileMouseDown, this);
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.fileMouseUp, this);
            }
          

            var rootDic: string = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            this.refrishPath(rootDic);

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
                if ($slectUi.parent instanceof FileListPanel) {
                    var vo: FileListName = this.getItemVoByUi($slectUi);
                    if (vo) {
                        this.makeFileFloadMenu($evt)
                    }  
                }
            } else {
                if (this.pageRect.isHitByPoint($evt.x, $evt.y)) {
                    this.makeFileListMenu($evt)
                }
            }
   

      
          
        }
        private makeFileFloadMenu($evt: MouseEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp: any = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY)

            var menuA: Array<MenuListData> = new Array();
            menuA.push(new MenuListData("删除文件", "21"));
            menuA.push(new MenuListData("重命名", "22"));

            temp.menuXmlItem = menuA;
            temp.info = {};
            temp.info.bfun = (value: any, evt: InteractiveEvent) => { this.menuBfun(value, evt) }
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        }
        private makeFileListMenu($evt: MouseEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp: any = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY)

            var menuB: Array<MenuListData> = new Array();
            menuB.push(new MenuListData("上传文件", "1"));
            menuB.push(new MenuListData("创建文件夹", "2"));
            menuB.push(new MenuListData("创建Texture", "3"));
            menuB.push(new MenuListData("创建prefab", "4"));
            menuB.push(new MenuListData("刷新", "5"));


            temp.menuXmlItem = menuB

            temp.info = {};
            temp.info.bfun = (value: any, evt: InteractiveEvent) => { this.menuBfun(value, evt) }
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        }
        private menuBfun(value: any, evt: InteractiveEvent): void {

        
            switch (value.key) {
                case "1":
                    this.upTempFileToOss()
                    break
                case "4":
                    this.creatPefab()
                    break
                case "21":
                    this.deleFile()
                    break
                default:
                    console.log("没处理对象",value.key)
                    break
            }
        }
        private creatPefab(): void {

            console.log("ccav")

            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();

            var tempObj: any = {}
            tempObj.name = "temp.prefab";
            tempObj.textureurl = "texture/5.material"
            tempObj.objsurl = "ccsss.objs"


            $byte.writeUTF(JSON.stringify(tempObj))
            var $file: File = new File([$byte.buffer], "其他.prefab");


            var pathurl: string = this.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
            console.log(pathurl + $file.name);

            filemodel.FileModel.getInstance().upOssFile($file, pathurl + $file.name, () => {
                console.log("文件上传成功");

                this.refrishPath(this.rootFilePath)
            })


            
        }
        public deleFile(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var $vo: FileListName = <FileListName>this._uiItem[i]
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.fileListMeshVo.fileXmlVo.data.select) {

                        filemodel.FileModel.getInstance().deleFile($vo.fileListMeshVo.fileXmlVo.data.path, () => {
                            console.log("删除成功")

                            this.refrishPath(this.rootFilePath)
                        })
                    }
                }

            }
        }
     
        private _inputHtmlSprite: HTMLInputElement
        protected upTempFileToOss(): void {
            this._inputHtmlSprite = <HTMLInputElement>document.createElement('input');
            this._inputHtmlSprite.setAttribute('id', '_ef');
            this._inputHtmlSprite.setAttribute('type', 'file');
            this._inputHtmlSprite.setAttribute("style", 'visibility:hidden');
            this._inputHtmlSprite.click();
            this._inputHtmlSprite.value;
            this._inputHtmlSprite.addEventListener("change", (cevt: any) => { this.changeFile(cevt) });


        }
        private changeFile(evt: any): void {
            for (var i: number = 0; i < this._inputHtmlSprite.files.length && i < 1; i++) {
                var simpleFile: File = <File>this._inputHtmlSprite.files[i];
                console.log(simpleFile)
                console.log(this.rootFilePath)
                var pathurl: string = this.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
                console.log(pathurl + simpleFile.name);

                filemodel.FileModel.getInstance().upOssFile(simpleFile, pathurl + simpleFile.name, () => {
                    console.log("文件上传成功");

                    this.refrishPath(this.rootFilePath)
                })
            }
            this._inputHtmlSprite = null;
        }
        
    
        public panelEventChanger(value: Pan3d.Rectangle): void {
            this.left = value.x
            this.top = value.y;

            this.pageRect.x = value.x;
            this.pageRect.y = value.y;
            this.pageRect.width = value.width;
            this.pageRect.height = value.height;

            this.resetSampleFilePos()
            this.resize();
        }
 
    
        private resetSampleFilePos(): void {
            var w: number = Math.round((this.pageRect.width-50)  / 100);
            var moveTy: number = 20
            for (var i: number = 0; this.fileItem&& i < this.fileItem.length; i++) {
                var vo: FileListMeshVo = this.fileItem[i];
                vo.pos.x = i % w * 100;
                vo.pos.y = Math.floor(i / w) * 70 + moveTy
            }

            if (this.uiLoadComplete && this.fileItem) {
          

               // console.log(this.pageRect.height, (Math.round(this.fileItem.length / w) * 70 + moveTy))

                var isVisible: boolean = this.pageRect.height < (Math.round(this.fileItem.length / w) * 70 + moveTy)
             //   console.log(isVisible)

                this.setUiListVisibleByItem([this.a_scroll_bar_bg], isVisible)


            }
        }

        private fileItem: Array<FileListMeshVo>
        public getCharNameMeshVo(value: SampleFileVo): FileListMeshVo {
            var $vo: FileListMeshVo = new FileListMeshVo;
            $vo.fileXmlVo = value;
            this.showTemp($vo);
            return $vo;
        }

















    }
}