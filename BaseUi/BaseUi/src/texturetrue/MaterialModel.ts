module materialui {
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import Scene_data = Pan3d.Scene_data;
    import LoadManager = Pan3d.LoadManager
    import Panel = layout.Panel;
    import LayerManager = layout.LayerManager
    export class MaterialModel {
        private static _instance: MaterialModel;
        public static getInstance(): MaterialModel {
            if (!this._instance) {
                this._instance = new MaterialModel();
            }
            return this._instance;
        }
        public makePanle(): void {
 
            MaterialCtrl.getInstance().nodeUiPanel = new Panel(false)
            MaterialCtrl.getInstance().linePanel = new Panel(false);

            MaterialCtrl.getInstance().lineContainer = new MaterialLineContainer() //创建线层
            MaterialCtrl.getInstance().linePanel.addUIContainer(MaterialCtrl.getInstance().lineContainer);

        
        }

        public selectMaterialUrl(url: string): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + url, LoadManager.BYTE_TYPE,
                ($dtstr: ArrayBuffer) => {
                    var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray($dtstr);
                    $byte.position = 0
                    var $temp: any = JSON.parse($byte.readUTF());
                    var $tempMaterial: MaterialTree = new MaterialTree
                    $tempMaterial = new MaterialTree;
                    $tempMaterial.url = url
                    $tempMaterial.setData({ data: $temp.data });
                    var $materialEvent: MaterialEvent = new MaterialEvent(MaterialEvent.INUPT_NEW_MATERIAL_FILE)
                    $materialEvent.materailTree = $tempMaterial;
                    ModuleEventManager.dispatchEvent($materialEvent);

                });
        }
 
        public selectFileById(value: number): void {

           
            var $texturl: string = "texturelist/" + value + ".txt"
            LoadManager.getInstance().load(Scene_data.fileRoot + $texturl, LoadManager.BYTE_TYPE,
                ($dtstr: ArrayBuffer) => {
                    var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray($dtstr);
                    $byte.position = 0
                    var $temp: any = JSON.parse($byte.readUTF());
                    var $tempMaterial: MaterialTree = new MaterialTree
                    $tempMaterial = new MaterialTree;
                    $tempMaterial.url = $texturl
                    $tempMaterial.setData({ data: $temp.data });
                    var $materialEvent: MaterialEvent = new MaterialEvent(MaterialEvent.INUPT_NEW_MATERIAL_FILE)
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

        }
    }

}