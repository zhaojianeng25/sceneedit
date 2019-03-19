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
var BaseUiStart = /** @class */ (function (_super) {
    __extends(BaseUiStart, _super);
    function BaseUiStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseUiStart.prototype.init = function () {
        var _this = this;
        Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
        //  Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "upfile/shadertree/";
        Pan3d.Scene_data.fileuiRoot = "res/";
        Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";
        ModuleList.startup(); //启动所有模块
        Pan3d.UIData.Scale = 1;
        var uiAtlas = new Pan3d.UIAtlas();
        uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", function () { _this.loadConfigCom(); });
    };
    BaseUiStart.prototype.loadConfigCom = function () {
        var _this = this;
        win.LayerManager.getInstance().initData();
        Pan3d.GameMouseManager.getInstance().addMouseEvent();
        Pan3d.ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.SHOW_EDITSCENE_PANEL)); //布局 
        Pan3d.ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.INIT_MATERIA_PANEL)); //材质init
        Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INIT_MAIN_EDITOR_PANEL)); //场景编辑init
        Pan3d.ModuleEventManager.dispatchEvent(new rightmenu.RightMenuEvent(rightmenu.RightMenuEvent.INIT_RIGHT_MENU));
        Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.SHOW_FOLDER_PANEL)); //显示文件夹
        Pan3d.ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SHOW_MAIN_EDITOR_PANEL)); //显示场景编辑
        Pan3d.UIData.resize = function () { _this.resize(); }; //更尺寸变化
    };
    BaseUiStart.prototype.resize = function () {
        Pan3d.UIData.Scale = 1;
    };
    return BaseUiStart;
}(Pan3d.GameStart));
//# sourceMappingURL=BaseUiStart.js.map