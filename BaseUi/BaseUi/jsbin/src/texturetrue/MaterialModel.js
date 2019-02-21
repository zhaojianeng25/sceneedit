var materialui;
(function (materialui) {
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var Panel = layout.Panel;
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
            materialui.MaterialCtrl.getInstance().linePanel = new Panel(false);
            materialui.MaterialCtrl.getInstance().lineContainer = new materialui.MaterialLineContainer(); //创建线层
            materialui.MaterialCtrl.getInstance().linePanel.addUIContainer(materialui.MaterialCtrl.getInstance().lineContainer);
        };
        MaterialModel.prototype.selectMaterialUrl = function (url) {
            LoadManager.getInstance().load(Scene_data.fileRoot + url, LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                $byte.position = 0;
                var $temp = JSON.parse($byte.readUTF());
                var $tempMaterial = new materialui.MaterialTree;
                $tempMaterial = new materialui.MaterialTree;
                $tempMaterial.url = url;
                $tempMaterial.setData({ data: $temp.data });
                var $materialEvent = new materialui.MaterialEvent(materialui.MaterialEvent.INUPT_NEW_MATERIAL_FILE);
                $materialEvent.materailTree = $tempMaterial;
                ModuleEventManager.dispatchEvent($materialEvent);
            });
        };
        MaterialModel.prototype.selectFileById = function (value) {
            var $texturl = "texturelist/" + value + ".txt";
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
                /*
                    LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/config/" + this.fileid + ".txt", LoadManager.XML_TYPE,
                        ($configStr: string) => {
                            var $config: any = JSON.parse($configStr);
                            if ($config.showType == 0) {
                                LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/model_" + value + "_objs.txt", LoadManager.XML_TYPE,
                                    ($modelxml: string) => {
                                        left.ModelShowModel.getInstance().readTxtToModelBy($modelxml)
                                        ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
                                    });
                            }
                            if ($config.showType == 1) {
                                filemodel.RoleChangeModel.getInstance().changeRoleModel(this.fileid)
                                Scene_data.cam3D.distance = 100
                                left.SceneRenderToTextrue.getInstance().viweLHnumber = 300
                            }
                        });
                 
                    */
            });
        };
        return MaterialModel;
    }());
    materialui.MaterialModel = MaterialModel;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialModel.js.map