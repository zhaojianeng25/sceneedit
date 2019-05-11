

class AppData extends Pan3d.me.GameStart {
    public static stagePos: Pan3d.me.Vector2D;
    public static altKey: boolean;

    public static rightPanel: win.Panel
    public static centenPanel: win.Panel
    public static topPanel: win.Panel

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
        Pan3d.me.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        Pan3d.me.Scene_data.fileuiRoot = "res/";
        Pan3d.me.Scene_data.fileRoot = Pan3d.me.Scene_data.ossRoot + "baseedit/";
      
        ModuleList.startup();//启动所有模块

        Pan3d.me.UIData.Scale = 1

        var uiAtlas: Pan3d.me.UIAtlas = new  Pan3d.me.UIAtlas();
        uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", () => { this.loadConfigCom() });
        Pan3d.me.TextureManager.getInstance().getImgResByurl(Pan3d.me.Scene_data.fileRoot + "icon/base.jpg"); //预备加载一下，其实可以不必要


    }
    private loadConfigCom(): void {
        win.LayerManager.getInstance().initData();
        Pan3d.me.GameMouseManager.getInstance().addMouseEvent();


        Pan3d.me.ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.SHOW_EDITSCENE_PANEL));//布局 
        Pan3d.me.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.INIT_MATERIA_PANEL));  //材质init
        Pan3d.me.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INIT_MAIN_EDITOR_PANEL)); //场景编辑init
        Pan3d.me.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.SHOW_FOLDER_PANEL));  //显示文件夹
        Pan3d.me.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL)); //显示场景编辑

 

        Pan3d.me.UIData.resize = () => { this.resize() } //更尺寸变化
    }
    private resize(): void {
        Pan3d.me.UIData.Scale = 1;
    }


}