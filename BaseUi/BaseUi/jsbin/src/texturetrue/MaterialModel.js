var materialui;
(function (materialui) {
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var Panel = layout.Panel;
    var LayerManager = layout.LayerManager;
    var MaterialModel = /** @class */ (function () {
        function MaterialModel() {
        }
        MaterialModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MaterialModel();
            }
            return this._instance;
        };
        MaterialModel.prototype.makePanle = function () {
            materialui.MaterialCtrl.getInstance().nodeUiPanel = new Panel(false);
            LayerManager.getInstance().addPanel(materialui.MaterialCtrl.getInstance().nodeUiPanel, 0); //创建面板层
            this.linePanel = new Panel(false);
            LayerManager.getInstance().addPanel(this.linePanel, 10);
            materialui.MaterialCtrl.getInstance().lineContainer = new materialui.MaterialLineContainer(); //创建线层
            this.linePanel.addUIContainer(materialui.MaterialCtrl.getInstance().lineContainer);
        };
        MaterialModel.prototype.selectFileById = function (value) {
            var _this = this;
            this.fileid = value;
            var $texturl = "texturelist/" + this.fileid + ".txt";
            LoadManager.getInstance().load(Scene_data.fileRoot + $texturl, LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                $byte.position = 0;
                var $temp = JSON.parse($byte.readUTF());
                var $tempMaterial = new materialui.MaterialTree;
                $tempMaterial = new materialui.MaterialTree;
                $tempMaterial.url = $texturl;
                $tempMaterial.setData({ data: $temp.data });
                var $materialEvent = new materialui.MaterialEvent(materialui.MaterialEvent.INUPT_NEW_MATERIAL_FILE);
                $materialEvent.materailTree = $tempMaterial;
                ModuleEventManager.dispatchEvent($materialEvent);
                LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/config/" + _this.fileid + ".txt", LoadManager.XML_TYPE, function ($configStr) {
                    var $config = JSON.parse($configStr);
                    if ($config.showType == 0) {
                        LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/model_" + value + "_objs.txt", LoadManager.XML_TYPE, function ($modelxml) {
                            left.ModelShowModel.getInstance().readTxtToModelBy($modelxml);
                            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
                        });
                    }
                    if ($config.showType == 1) {
                        filemodel.RoleChangeModel.getInstance().changeRoleModel(_this.fileid);
                        Scene_data.cam3D.distance = 100;
                        left.SceneRenderToTextrue.getInstance().viweLHnumber = 300;
                    }
                });
            });
        };
        return MaterialModel;
    }());
    materialui.MaterialModel = MaterialModel;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialModel.js.map