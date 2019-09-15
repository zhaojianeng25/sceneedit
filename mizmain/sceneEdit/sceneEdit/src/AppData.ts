﻿ 

class AppData extends Pan3d.GameStart {
    public static stagePos: Pan3d.Vector2D;
    public static altKey: boolean;

    public static rightPanel: win.Panel
    public static centenPanel: win.Panel
    public static topPanel: win.Panel

    public static sceneEidtType: number=1

    public static mapOpenUrl: string;
    public static rootFilePath: string;



    public static getPerentPath(value: string): string {
        var idex: number = value.lastIndexOf("/")
        if (idex != -1) {
            value = value.substr(0, idex + 1)
        } else {
            value = ""
        }
        return value
    }
    public static getFileName(value: string): string {
        var idex: number = value.lastIndexOf("/")

      //  console.log(value.substring(idex + 1, value.length))
        return value.substring(idex + 1, value.length)
      
    }

    public init(): void {
        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
      
        ModuleList.startup();//启动所有模块

        Pan3d.UIData.Scale = 1

        var uiAtlas: Pan3d.UIAtlas = new  Pan3d.UIAtlas();
        uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", () => { this.loadConfigCom() });
        Pan3d.TextureManager.getInstance().getImgResByurl(Pan3d.Scene_data.fileRoot + "icon/base.jpg"); //预备加载一下，其实可以不必要


    }
    private _editScenePanel: win.Panel
    private loadConfigCom(): void {
        win.LayerManager.getInstance().initData();
        Pan3d.GameMouseManager.getInstance().addMouseEvent();


        Pan3d.SceneManager.getInstance().addDisplay(new depth.DepthRectSprite())
        Pan3d.SceneManager.getInstance().ready = true
 

        //Pan3d.ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.SHOW_EDITSCENE_PANEL));//布局 
        //Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.INIT_MATERIA_PANEL));  //材质init
        //Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INIT_MAIN_EDITOR_PANEL)); //场景编辑init
        //Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.SHOW_FOLDER_PANEL));  //显示文件夹
        //Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL)); //显示场景编辑

 

        Pan3d.UIData.resize = () => { this.resize() } //更尺寸变化



        mars3D.MarmosetModel.getInstance().initData();

        

        window["webgl"] = Pan3d.Scene_data.context3D.renderContext

        mars3D. MarmosetModel.getInstance().viewFileName = "karen1.mview"

        var rootpath: string = "6_15/";
        Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "outshder.txt", Pan3d. LoadManager.XML_TYPE, (outstr: any) => {
            mars3D.  MarmosetModel.changerOutshader = outstr
            Pan3d. LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "vshader.txt", Pan3d. LoadManager.XML_TYPE, (vstr: any) => {
                mars3D. MarmosetModel.changerVshader = vstr
                Pan3d. LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "fshader.txt", Pan3d.LoadManager.XML_TYPE, (fstr: any) => {
                    mars3D.   MarmosetModel.changerFshader = fstr

                  marmoset.embed("res/6_15/" + mars3D. MarmosetModel.getInstance().viewFileName, { width: 100, height: 100, autoStart: true, fullFrame: false, pagePreset: false });
                });

            });
        });
    }
    private resize(): void {
        Pan3d.UIData.Scale = 1;
    }


}