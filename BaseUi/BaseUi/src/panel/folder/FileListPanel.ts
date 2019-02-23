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
    import FileVo = filemodel.FileVo
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
                switch (fileVo.suffix) {
                    case "jpg":
                    case "png":
                        LoadManager.getInstance().load(Scene_data.ossRoot + fileVo.path, LoadManager.IMG_TYPE,
                            ($img: any) => {
                                this.drawFileIconName($img, fileVo.name, $color)
                            });
                        break
                    case "prefab":
                        this.drawFileIconName(FileListPanel.imgBaseDic["profeb_64x"], fileVo.name, $color)
                        break
                    case "material":
                        this.drawFileIconName(FileListPanel.imgBaseDic["marterial_64x"], fileVo.name, $color)
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


            this.parent.uiAtlas.ctx.drawImage($img, 12.5, 5, 45, 45)
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

    export class FileListPanel extends Dis2DUIContianerPanel {

        public static imgBaseDic: any
        public constructor() {
            super(FileListName, new Rectangle(0, 0, 80, 80), 50);


            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);
            this.removeRender(this._baseRender);
            this.addRender(this._baseRender);
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this.pageRect = new Rectangle(0, 0, 500, 350)

            this.loadAssetImg(() => {

                this._bottomRender.uiAtlas = new UIAtlas();
                this._bottomRender.uiAtlas.setInfo("ui/folder/folder.txt", "ui/folder/folder.png", () => { this.loadConfigCom() });

                Pan3d.TimeUtil.addFrameTick((t: number) => { this.update(t) });

            })

        }
        private loadAssetImg(bfun: Function): void {
            FileListPanel.imgBaseDic = {};
            var item: Array<string> = [];
            item.push("icon_Folder_64x");
            item.push("profeb_64x");
            item.push("marterial_64x");



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

        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private folderMask: UIMask
        public update(t: number): void {
            super.update(t);

        }
        private lastDonwInfo: any;
        private mouseDownTm: number
        protected mouseDown(evt: InteractiveEvent): void {
            this.mouseIsDown = true
            this.mouseDownTm = Pan3d.TimeUtil.getTimer()
           

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        }
        private mouseIsDown: boolean
        protected stageMouseMove(evt: InteractiveEvent): void {
            this.mouseIsDown = false

        }
        private duboclik(evt: InteractiveEvent): void {
            console.log("双击")


            var vo: FileListName = this.getItemVoByUi(evt.target)
            if (vo) {
                if (vo.fileListMeshVo.fileXmlVo.data.isFolder) {
                    this.refrishPath(vo.fileListMeshVo.fileXmlVo.data.path)
                } else {
                    var fileUrl: string = Pan3d.Scene_data.ossRoot + vo.fileListMeshVo.fileXmlVo.data.path;
                    fileUrl = fileUrl.replace(Pan3d.Scene_data.fileRoot, "");
                    switch (vo.fileListMeshVo.fileXmlVo.data.suffix) {
                        case "material":

                            Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.SHOW_MATERIA_PANEL), fileUrl);
                            break
                        default:
                            console.log("还没有的类型", vo.fileListMeshVo.fileXmlVo.data.path)
                            break;
                    }

                }
            }
        }
        protected mouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
            if (this.mouseIsDown) {
                if (this.lastDonwInfo && this.lastDonwInfo.target == evt.target) {
                    if (this.lastDonwInfo.tm + 500 > Pan3d.TimeUtil.getTimer()) {
                        if (Pan3d.TimeUtil.getTimer() > this.mouseDownTm + 100) {
                            this.lastDonwInfo.tm = Pan3d.TimeUtil.getTimer()
                        } else {
                            this.duboclik(evt)
                        }
                        return
                    } else {
                        this.lastDonwInfo.tm = Pan3d.TimeUtil.getTimer()
                    }
                } else {
                    this.lastDonwInfo = { target: evt.target, tm: Pan3d.TimeUtil.getTimer() };
                }
            }
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
            this.a_path_tittle_txt.x = 10
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_path_tittle_txt.skinName, ColorType.White9A683F + pathstr, 12, Pan3d.TextAlign.LEFT)
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
        protected loadConfigCom(): void {

            this._topRender.uiAtlas = this._bottomRender.uiAtlas

            this.folderMask = new UIMask();

            this.folderMask.level = 1;
            this.addMask(this.folderMask);
            this._baseRender.mask = this.folderMask


            this.fileItem = [];
            for (var i: number = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Down, this.mouseDown, this);
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.mouseUp, this);


            }

            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);




            this.a_win_tittle = this.addChild(<UICompenent>this._topRender.getComponent("a_win_tittle"));
            this.a_win_tittle.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.a_rigth_line = this.addChild(<UICompenent>this._topRender.getComponent("a_rigth_line"));
            this.a_rigth_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.a_bottom_line = this.addChild(<UICompenent>this._topRender.getComponent("a_bottom_line"));
            this.a_bottom_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.a_right_bottom = this.addChild(<UICompenent>this._topRender.getComponent("a_right_bottom"));
            this.a_right_bottom.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);

            this.a_scroll_bar = this.addChild(<UICompenent>this._topRender.getComponent("a_scroll_bar"));
            this.a_scroll_bar.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);



            this.a_path_tittle_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_path_tittle_txt"));



            this.refrishSize();
            this.a_scroll_bar.y = this.folderMask.y;
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
                if ($slectUi.parent as FileListPanel) {
             

                    var vo: FileListName = this.getItemVoByUi($slectUi);
                    if (vo) {
                        this.makeFileFloadMenu($evt)
                    } else {
                        console.log("是空位置")
                        this.makeFileListMenu($evt)
                    }

                  
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
            menuB.push(new MenuListData("创建Profab", "4"));
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
                case "21":
                    this.deleFile()
                    break
                default:
                    console.log("没处理对象",value.key)
                    break
            }
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
        
        private a_path_tittle_txt: UICompenent
        public panelEventChanger(value: Pan3d.Rectangle): void {
            if (this.pageRect) {
                this.pageRect.height = value.height;
                this.pageRect.width = value.width;
                this.left = value.x
                this.top = value.y;
                this.refrishSize();
            }
        }

        private a_scroll_bar: UICompenent
        private a_bottom_line: UICompenent



        private a_right_bottom: UICompenent;
        private a_rigth_line: UICompenent;
        private refrishSize(): void {

            if (!this._topRender.uiAtlas) {
                return
            }

            this.pageRect.width = Math.max(200, this.pageRect.width)
            this.pageRect.height = Math.max(100, this.pageRect.height)

            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_tittle.width = this.pageRect.width;



            this.folderMask.y = this.a_win_tittle.height;
            this.folderMask.x = 0
            this.folderMask.width = this.pageRect.width - this.a_rigth_line.width
            this.folderMask.height = this.pageRect.height - this.a_win_tittle.height - this.a_bottom_line.height

            this.a_bg.x = 0;
            this.a_bg.y = 0
            this.a_bg.width = this.pageRect.width
            this.a_bg.height = this.pageRect.height

            this.a_rigth_line.x = this.pageRect.width - this.a_rigth_line.width
            this.a_rigth_line.y = this.a_win_tittle.height;
            this.a_rigth_line.height = this.pageRect.height - this.a_win_tittle.height - this.a_right_bottom.height;

            this.a_bottom_line.x = 0
            this.a_bottom_line.y = this.pageRect.height - this.a_bottom_line.height
            this.a_bottom_line.width = this.pageRect.width - this.a_right_bottom.width;


            this.a_right_bottom.x = this.pageRect.width - this.a_right_bottom.width
            this.a_right_bottom.y = this.pageRect.height - this.a_right_bottom.height

            this.a_scroll_bar.x = this.folderMask.x + this.folderMask.width - this.a_scroll_bar.width;


            this.resetSampleFilePos()
            this.resize();

            this.setUiListVisibleByItem([this.a_right_bottom, this.a_bottom_line, this.a_bg, this.a_rigth_line, this.a_win_tittle], this.canMoveTittle)


        }
        private resetSampleFilePos(): void {
            var w: number = Math.round(this.pageRect.width / 100);

            var contentH: number = Math.round(this.fileItem.length / w) * 70;
            var moveTy: number = 0
            if (contentH > this.folderMask.height) {
                this.setUiListVisibleByItem([this.a_scroll_bar], true);
                this.a_scroll_bar.height = (this.folderMask.height / contentH) * this.folderMask.height;


                this.a_scroll_bar.y = Math.min(this.a_scroll_bar.y, this.folderMask.height + this.folderMask.y - this.a_scroll_bar.height);



                var nnn: number = (this.a_scroll_bar.y - this.folderMask.y) / (this.folderMask.height - this.a_scroll_bar.height);


                moveTy = (this.folderMask.height - contentH) * nnn

            } else {
                this.setUiListVisibleByItem([this.a_scroll_bar], false);
                moveTy = 0

            }

            for (var i: number = 0; i < this.fileItem.length; i++) {
                var vo: FileListMeshVo = this.fileItem[i];
                vo.pos.x = i % w * 100;
                vo.pos.y = Math.floor(i / w) * 70 + this.folderMask.y + moveTy

            }
        }

        private lastPagePos: Vector2D;
        private lastMousePos: Vector2D;
        private mouseMoveTaget: UICompenent
        private pageRect: Rectangle
        private canMoveTittle: boolean
        protected tittleMouseDown(evt: InteractiveEvent): void {

            this.mouseMoveTaget = evt.target

            this.lastMousePos = new Vector2D(evt.x, evt.y)

            switch (this.mouseMoveTaget) {
                case this.a_win_tittle:
                    this.lastPagePos = new Vector2D(this.left, this.top)
                    break

                case this.a_rigth_line:
                case this.a_bottom_line:
                case this.a_right_bottom:
                    this.lastPagePos = new Vector2D(this.pageRect.width, this.pageRect.height)
                    break
                case this.a_scroll_bar:
                    this.lastPagePos = new Vector2D(0, this.a_scroll_bar.y)
                    break

                default:
                    console.log("nonono")
                    break

            }




            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected tittleMouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        }
        protected mouseOnTittleMove(evt: InteractiveEvent): void {
            switch (this.mouseMoveTaget) {
                case this.a_win_tittle:
                    this.left = this.lastPagePos.x + (evt.x - this.lastMousePos.x)
                    this.top = this.lastPagePos.y + (evt.y - this.lastMousePos.y)
                    break
                case this.a_rigth_line:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x)

                    break
                case this.a_bottom_line:
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y)

                    break

                case this.a_right_bottom:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x)
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y)
                    break

                case this.a_scroll_bar:

                    this.a_scroll_bar.y = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    this.a_scroll_bar.y = Math.max(this.a_scroll_bar.y, this.folderMask.y)
                    this.a_scroll_bar.y = Math.min(this.a_scroll_bar.y, this.folderMask.y + this.folderMask.height - this.a_scroll_bar.height)

                    //  console.log(this.a_scroll_bar.y)

                    break
                default:
                    console.log("nonono")
                    break

            }
            this.refrishSize()

        }
        private a_bg: UICompenent;
        private a_win_tittle: UICompenent;


        private fileItem: Array<FileListMeshVo>
        private refrishFile(): void {



        }

        public getCharNameMeshVo(value: SampleFileVo): FileListMeshVo {
            var $vo: FileListMeshVo = new FileListMeshVo;
            $vo.fileXmlVo = value;
            this.showTemp($vo);
            return $vo;
        }

















    }
}