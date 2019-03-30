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

    import FileVo = pack.FileVo;
    import FileModel = pack.FileOssModel;
 
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


        private lastSelect: boolean = true
        private lastName: string
        public makeData(): void {
            this.fileListMeshVo = this.data;
            if (this.fileListMeshVo) {

                if (this.lastSelect == this.fileListMeshVo.fileXmlVo.data.select && this.lastName == this.fileListMeshVo.fileXmlVo.data.name) {
                    return;
                }  

                this.lastSelect = this.fileListMeshVo.fileXmlVo.data.select;
                this.lastName = this.fileListMeshVo.fileXmlVo.data.name;


               

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
                    case FileVo.MAP:
                        this.drawFileIconName(FileListPanel.imgBaseDic["map_64x"], fileVo.name, $color)
                        break
                    case FileVo.LYF:
                        this.drawFileIconName(FileListPanel.imgBaseDic["lyf_64x"], fileVo.name, $color)
                        break
                    default:
                        this.drawFileIconName(FileListPanel.imgBaseDic["icon_Folder_64x"], fileVo.name, $color)
                        break
                }


            }
        }
        private tempDown($img: any, name: string, $color: string): void {
            var sceneRes: inputres.SceneRes = new inputres.SceneRes();

            sceneRes.bfun = () => {
                var imgUrl: string = "working/scene007/scene007_hide/lightuv/build2.jpg"
                var tbaimg: any = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + imgUrl)
                if (tbaimg) { //新加的图
                    console.log(tbaimg)

                    this.drawFileIconName(tbaimg, name, $color)
                }

            }
           
            Pan3d.LoadManager.getInstance().load(Scene_data.fileRoot + "pan/expmapinfo.txt", LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                sceneRes.loadComplete($byte);

            });


 
        }
        private drawFileIconName($img: any, name: string, $color: string): void {
            var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
            this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);

            var drawPicRect: Rectangle = new Rectangle(18, 1, 64, 64)
            var tw: number = drawPicRect.width;
            var th: number = drawPicRect.height;
            if ($img.width) {
                tw = Math.max($img.width * 1.5, 20);
                th = Math.max($img.heigh * 1.5, 20);

                tw = Math.min($img.width * 1.5, drawPicRect.width);
                th = Math.min($img.height * 1.5, drawPicRect.height);
            }

            this.parent.uiAtlas.ctx.drawImage($img, drawPicRect.x + (drawPicRect.width - tw) / 2, drawPicRect.y + (drawPicRect.height - th) / 2, tw, th)


            var outStr: string = name.split(".")[0];

            var $textMetrics: TextMetrics = Pan3d.TextRegExp.getTextMetrics(this.parent.uiAtlas.ctx, outStr);
 

            if ($textMetrics.width > 70) {
                var inset: number = Math.floor(outStr.length * (2 / 5))
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr.substr(0, inset), 15, 0-2 , 60, TextAlign.CENTER)
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr.substring(inset, outStr.length), 15, 0-2 , 78, TextAlign.CENTER)
            } else {
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, $color + outStr, 18, 0, 65, TextAlign.CENTER);


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
                    this.ui.width = this.ui.baseRec.width * this.fileListMeshVo.uiScale;
                    this.ui.height = this.ui.baseRec.height * this.fileListMeshVo.uiScale;
           
                }
                if (this.fileListMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }

    export class FileListPanel extends win.Dis2dBaseWindow {

        public static imgBaseDic: any
        public constructor() {
            super(FileListName, new Rectangle(0, 0, 100, 100), 48);
      
         
 
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
            item.push("lyf_64x");
            item.push("map_64x");
            


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
 
       
        public update(t: number): void {
            super.update(t);

        }
        private _lastfileDonwInfo: any;
        private set lastfileDonwInfo(value) {
     
            this._lastfileDonwInfo = value
        }
        private get lastfileDonwInfo(): any {
            return this._lastfileDonwInfo
        }
 
        protected fileMouseDown(evt: InteractiveEvent): void {

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
            console.log(this.lastfileDonwInfo)
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
         
            console.log(this.lastfileDonwInfo)

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
  
        protected stageMouseMove(evt: InteractiveEvent): void {
       
            this.lastfileDonwInfo = null
            //console.log("移动了")


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
                   

                        case FileVo.MAP:
                            Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.LOAD_SCENE_MAP), fileUrl); //加载场景

                            break;
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
  
                            pack.PackPrefabManager.getInstance().getPrefabByUrl(fileUrl, (value: pack.PrefabStaticMesh) => {
                                var tempview: PrefabMeshView = new PrefabMeshView(prop.PropModel.getInstance().propPanle)
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
            pack.FileOssModel.getFolderArr(pathstr, (value: Array<FileVo>) => {
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
            var $slectUi: UICompenent = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
            if ($slectUi) {
                if ($slectUi.parent instanceof FileListPanel) {
                    var vo: FileListName = this.getItemVoByUi($slectUi);
                    if (vo) {
                        //在当前文件上
                        this.makeFileFloadMenu($evt)
                        return 
                    }  
                }
            } 
            //范围其它区域
            if (this.pageRect.isHitByPoint($evt.x, $evt.y)) {
                this.makeFileListMenu($evt)
            }
   

      
          
        }
        private makeFileFloadMenu($evt: MouseEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp: any = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY)

            var menuA: Array<MenuListData> = new Array();
            menuA.push(new MenuListData("删除文件", "21"));
            menuA.push(new MenuListData("重命名", "22"));
            menuA.push(new MenuListData("下载文件", "23"));

            temp.menuXmlItem = menuA;
            temp.info = {};
            temp.info.bfun = (value: any, evt: InteractiveEvent) => { this.menuBfun(value, evt) }
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        }
        private makeFileListMenu($evt: MouseEvent): void {
            var $rightMenuEvet: menutwo.MenuTwoEvent = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp: any = {};
           

            var menuB: Array<MenuListData> = new Array();
            menuB.push(new MenuListData("上传文件", "1"));
            menuB.push(new MenuListData("创建文件夹", "2"));
            menuB.push(new MenuListData("创建Texture", "3"));
            menuB.push(new MenuListData("创建prefab", "4"));
            menuB.push(new MenuListData("刷新", "5"));

           

            temp.mouse = new Vector2D($evt.clientX, Math.min($evt.clientY, Scene_data.stageHeight - menuB.length * 20));
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
                case "3":
                    this.creatTexture()
                    break;
                case "4":
                    this.creatPefab()
                    break
                case "5":
                    this.refrishIndexGroup(this.rootFilePath)
                    break
                case "21":
                    this.deleFile()
                    break
                case "22":
                    this.changeFileName()

                    break
                case "23":
                    this.downFile()

                    break
                default:
                    console.log("没处理对象",value.key)
                    break
            }
        }
        public downFile(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var $vo: FileListName = <FileListName>this._uiItem[i]
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.fileListMeshVo.fileXmlVo.data.select) {
                        var basePath: string = $vo.fileListMeshVo.fileXmlVo.data.path

                        window.open(Scene_data.ossRoot + basePath) 
                        
                    }
                }
            }
        }
        public changeFileName(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var $vo: FileListName = <FileListName>this._uiItem[i]
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.fileListMeshVo.fileXmlVo.data.select) {
                        var rect: Rectangle = new Rectangle()
                        rect.x = $vo.ui.x + this.left;
                        rect.y = $vo.ui.y + this.top;
                        rect.x += 5;
                        rect.y += 45;
                        rect.width = 60
                        rect.height = 20
                        var nameStr: string = $vo.fileListMeshVo.fileXmlVo.data.name
                        var receet: TextMetrics = editscene.ChangeNameModel.getInstance().getTextMetrics(nameStr,14)
                        rect.width = receet.width  +20

                        var basePath: string = $vo.fileListMeshVo.fileXmlVo.data.path
                        editscene.ChangeNameModel.getInstance().changeName(rect, nameStr, (value: string) => {
   
                            if (value.length) {
                                console.log("准备修改名字")
                                var toPath: string = basePath.substr(0, basePath.lastIndexOf("/") + 1);
                                toPath = toPath + value
                                console.log(basePath)
                                console.log(toPath)
                       
                                pack.FileOssModel.copyFile(toPath, basePath, () => {
                                    pack.FileOssModel.deleFile(basePath, () => {
                                        this.refrishIndexGroup(this.rootFilePath)

                                    })
                                })
                            }
                        })


                    
                    }
                }

            }
        }
        private creatTexture(): void {
            //复制文件
            var baseTextureUrl: string = "baseedit/assets/base/base.material";
            var pathurl: string = this.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.copyFile(pathurl + "base.material", baseTextureUrl, () => {
                this.refrishIndexGroup(this.rootFilePath)
            });
        }
        private refrishIndexGroup(url: string): void {
            pack.FileOssModel.getDisByOss(url, (value: Array<FileVo>) => {
                this.refrishPath(url)
            })
        }
        private creatPefab(): void {
                 //复制文件
            var basePrefabUrl: string = "baseedit/assets/base/base.prefab";
            var pathurl: string = this.rootFilePath.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.copyFile(pathurl + "base.prefab", basePrefabUrl, () => {
                this.refrishIndexGroup(this.rootFilePath)
            });

            
        }
        public deleFile(): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                var $vo: FileListName = <FileListName>this._uiItem[i]
                if ($vo.fileListMeshVo && $vo.ui) {
                    if ($vo.fileListMeshVo.fileXmlVo.data.select) {

                        var truthBeTold = window.confirm("是否确定要删除选取的对象。");
                        if (truthBeTold) {
                            pack.FileOssModel.deleFile($vo.fileListMeshVo.fileXmlVo.data.path, () => {
                                this.refrishIndexGroup(this.rootFilePath)
                                console.log("删除成功")

                            })
                        } else {

                        }
                     
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

                pack.FileOssModel.upOssFile(simpleFile, pathurl + simpleFile.name, () => {
                    console.log("文件上传成功");
         
                    pack.FileOssModel.getDisByOss(pathurl, () => {
                        this.refrishPath(this.rootFilePath)
                    })

                 
                })
            }
            this._inputHtmlSprite = null;
        }
        
 
    
        private resetSampleFilePos(): void {
            var w: number = Math.round((this.pageRect.width-50)  / 100);
            var moveTy: number = 0
            for (var i: number = 0; this.fileItem&& i < this.fileItem.length; i++) {
                var vo: FileListMeshVo = this.fileItem[i];
                vo.uiScale = 0.7
                vo.pos.x = i % w * 100;
                vo.pos.y = Math.floor(i / w) * 70 + moveTy
            }

            if (this.uiLoadComplete && this.fileItem) {
 
                var isVisible: boolean = this.pageRect.height < (Math.round(this.fileItem.length / w) * 70 + moveTy)
  
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