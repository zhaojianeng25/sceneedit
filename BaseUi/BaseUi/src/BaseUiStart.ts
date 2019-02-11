
 
class BaseUiStart extends Pan3d.GameStart {
    public static stagePos: Pan3d.Vector2D

    public static altKey: boolean
    public init(): void {

        Pan3d.Scene_data.fileRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/upfile/shadertree/"
        Pan3d.Scene_data.fileuiRoot = "res/"
        ModuleList.startup();//启动所有模块
  
        Pan3d.UIData.Scale = 1
 
        Pan3d.GameMouseManager.getInstance().addMouseEvent();
 
       Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.SHOW_FOLDER_PANEL));


        Pan3d.UIData.resize = () => { this.resize() } //更尺寸变化

    }
    private resize(): void {
        Pan3d.UIData.Scale = 1;
    }


}