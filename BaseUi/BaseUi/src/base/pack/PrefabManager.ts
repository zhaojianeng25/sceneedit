module pack {
    import LoadManager = Pan3d.LoadManager
    import Scene_data = Pan3d.Scene_data
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import ConstItem = Pan3d.ConstItem
    import TexItem = Pan3d.TexItem
    import TextureManager = Pan3d.TextureManager;
    import TextureRes = Pan3d.TextureRes

    
    export class PrefabManager {

        private static _instance: PrefabManager;
        public static getInstance(): PrefabManager {
            if (!this._instance) {
                this._instance = new PrefabManager();
            }
            return this._instance;
        }
        public constructor() {
 
        }
        private dic: any = {}
        private loadDic: any = {}

        public getPrefabByUrl($url: string, bfun: Function): void {
            if (this.dic[$url]) { //有了就反回
                bfun ( this.dic[$url])
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun]
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, ($byte: any) => {
                    var $obj: any = JSON.parse(new Pan3dByteArray($byte).readUTF())
                    var $prefab: PrefabStaticMesh = new PrefabStaticMesh();
                    for (var key in $obj) {
                        $prefab[key] = $obj[key];
                    }
                    $prefab.url = $url;
                    console.log("prefab加载完成", $prefab.url)
                    pack.MaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, ($materialTree: materialui.MaterialTree) => {
                        $prefab.material = $materialTree;
                        if (!this.dic[$url]) {
                            this.dic[$url] = $prefab;
                        }
                        while (this.loadDic[$url].length) {
                            this.loadDic[$url].pop()($prefab);
                        }
                    })

                });
            }
            this.loadDic[$url].push(bfun)
 
        }
  
       
    }
}