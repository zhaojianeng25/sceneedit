module materialui {
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import Scene_data = Pan3d.Scene_data;
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
            LayerManager.getInstance().addPanel(MaterialCtrl.getInstance().nodeUiPanel)//创建面板层


            this.linePanel = new Panel(false);
            LayerManager.getInstance().addPanel(this.linePanel);

            this.lineContainer = new MaterialLineContainer() //创建线层
            this.linePanel.addUIContainer(this.lineContainer);

        }
        private linePanel: Panel
        public lineContainer: MaterialLineContainer
        private fileid: number
        public selectFileById(value: number): void {

            this.fileid = value
            var $texturl: string = "texturelist/" + this.fileid + ".txt"
            Pan3d.LoadManager.getInstance().load(Scene_data.fileRoot + $texturl, Pan3d.LoadManager.BYTE_TYPE,
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

        }
    }

}