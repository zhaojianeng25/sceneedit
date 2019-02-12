var materialui;
(function (materialui) {
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Scene_data = Pan3d.Scene_data;
    var MaterialModel = /** @class */ (function () {
        function MaterialModel() {
        }
        MaterialModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MaterialModel();
            }
            return this._instance;
        };
        MaterialModel.prototype.selectFileById = function (value) {
            this.fileid = value;
            var $texturl = "texturelist/" + this.fileid + ".txt";
            Pan3d.LoadManager.getInstance().load(Scene_data.fileRoot + $texturl, Pan3d.LoadManager.BYTE_TYPE, function ($dtstr) {
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
                Pan3d.LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/config/" + this.fileid + ".txt", Pan3d.LoadManager.XML_TYPE,
                    ($configStr: string) => {
                        var $config: any = JSON.parse($configStr);
                        if ($config.showType == 0) {
                            Pan3d.LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/model_" + value + "_objs.txt", Pan3d.LoadManager.XML_TYPE,
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