module filemodel {
    import LoadManager = Pan3d.LoadManager
    import Scene_data = Pan3d.Scene_data
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import PrefabStaticMesh = pack.PrefabStaticMesh

  

    export class PrefabManager {

        private static _instance: PrefabManager;
        public static getInstance(): PrefabManager {
            if (!this._instance) {
                this._instance = new PrefabManager();
            }
            return this._instance;
        }
        public getPrefabByUrl($url: String, bfun: Function): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, ($byte: any) => {
                var $obj: any = JSON.parse(new Pan3dByteArray($byte).readUTF())
                var $prefab: PrefabStaticMesh = new PrefabStaticMesh();
                for (var key in $obj) {
                    $prefab[key] = $obj[key];
                }

                this.loadTextTureByUrl($prefab.textureurl, (materialTree: materialui.MaterialTree) => {
                    $prefab.material = materialTree
                    bfun($prefab)
                })
               


          
            });

 
        }
        private loadTextTureByUrl(value: string, bfun: Function): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + value, LoadManager.BYTE_TYPE,
                ($dtstr: ArrayBuffer) => {
                    var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray($dtstr);
                    $byte.position = 0
                    var $temp: any = JSON.parse($byte.readUTF());
                    var $tempMaterial: materialui.MaterialTree = new materialui.MaterialTree
                    $tempMaterial = new materialui.MaterialTree;
                    $tempMaterial.url = value
                    $tempMaterial.setData({ data: $temp.data });
           
                    bfun($tempMaterial)
                });
        }
    }
}