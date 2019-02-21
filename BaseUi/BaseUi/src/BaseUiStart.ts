

class BaseUiStart extends Pan3d.GameStart {
    public static stagePos: Pan3d.Vector2D;
    public static altKey: boolean;
    public static leftPanel: layout.Panel
    public static rightPanel: layout.Panel
    public static centenPanel: layout.Panel




    public init(): void {
        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
      //  Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "upfile/shadertree/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
      
        ModuleList.startup();//启动所有模块

        Pan3d.UIData.Scale = 1


        layout.LayerManager.getInstance().initData();
        Pan3d.GameMouseManager.getInstance().addMouseEvent();

 
        Pan3d.ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.SHOW_EDITSCENE_PANEL));//布局 
        Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.INIT_MATERIA_PANEL));  //材质init

        Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INIT_MAIN_EDITOR_PANEL)); //场景编辑init
        Pan3d.ModuleEventManager.dispatchEvent(new rightmenu.RightMenuEvent(rightmenu.RightMenuEvent.INIT_RIGHT_MENU));



      //  Pan3d.ModuleEventManager.dispatchEvent(new popmodel.PopModelShowEvent(popmodel.PopModelShowEvent.SHOW_POP_MODEL_PANEL)); //显示小模型窗口
         Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.SHOW_FOLDER_PANEL));  //显示文件夹
        Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL)); //显示场景编辑

    

        Pan3d.UIData.resize = () => { this.resize() } //更尺寸变化
        /*
        Pan3d.LoadManager.getInstance().load("https://webpan.oss-cn-shanghai.aliyuncs.com/baseedit/obj.pefab", Pan3d.LoadManager.XML_TYPE, ($byte: string) => {
            console.log($byte)
        });
        */

    }
    private resize(): void {
        Pan3d.UIData.Scale = 1;
    }


}