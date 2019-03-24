module pack {
    import LoadManager = Pan3d.LoadManager
    import Scene_data = Pan3d.Scene_data
    import Pan3dByteArray = Pan3d.Pan3dByteArray
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import ConstItem = Pan3d.ConstItem
    import TexItem = Pan3d.TexItem
    import TextureManager = Pan3d.TextureManager;
    import TextureRes = Pan3d.TextureRes


    export class MaterialManager {

        private static _instance: MaterialManager;
        public static getInstance(): MaterialManager {
            if (!this._instance) {
                this._instance = new MaterialManager();
            }
            return this._instance;
        }
        public constructor() {

        }
        private dic: any = {}
        private loadDic: any = {}
        public getMaterialByUrl($url: string, bfun: Function): void {

            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url])
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun]

                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE,
                    ($dtstr: ArrayBuffer) => {
                        var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray($dtstr);
                        $byte.position = 0
                        var $temp: any = JSON.parse($byte.readUTF());
                        var $buildShader: left.BuildMaterialShader = new left.BuildMaterialShader();
                        if ($temp.info.paramAry) {
                            $buildShader.paramAry = []
                            for (var i: number = 0; i < $temp.info.paramAry.length; i++) {
                                $buildShader.paramAry.push($temp.info.paramAry[i])
                            }
                        } else {
                            $buildShader.paramAry = [false, false, false, false, false, false, false, false, false, false]
                        }
                        $buildShader.vertex = $buildShader.getVertexShaderString();
                        $buildShader.fragment = $temp.info.shaderStr;


                        $buildShader.encode();


                        var $materialTree: materialui.MaterialTree = new materialui.MaterialTree();

                        $materialTree.setData({ data: $temp.data });
                        $materialTree.useNormal = $temp.info.useNormal;
                        $materialTree.hasTime = $temp.info.hasTime;
                        if ($temp.info.timeValue) {
                            $materialTree.timeValue = new Vector2D($temp.info.timeValue.x, $temp.info.timeValue.y)
                        } else {
                            $materialTree.timeValue = new Vector2D(1,1)
                        }
                        $materialTree.useLightUv = $buildShader.paramAry[2]
                        $materialTree.texList = this.makeTextList($temp.info.texList);
                        $materialTree.constList = this.makeConstList($temp.info.constList);

                        $materialTree.fcData = this.makeFc($materialTree.constList, (<string>($temp.info.fcData)).split(","));
                        $materialTree.fcNum = Math.round($materialTree.fcData.length / 4)



                        $materialTree.shader = $buildShader;
                        $materialTree.program = $buildShader.program;
                        /*
                        console.log("----------vertex------------");
                        console.log($buildShader.vertex);
                        console.log("----------fragment------------");
                        console.log($buildShader.fragment);
                        console.log("----------buildShader------------");
                        */
                        console.log("材质加载完成", $url)
                        $materialTree.url = $url

                        if (!this.dic[$url]) {
                            this.dic[$url] = $materialTree;
                        }
                        while (this.loadDic[$url].length) {
                            this.loadDic[$url].pop()($materialTree);
                        }

                    });
            } else {
                this.loadDic[$url].push(bfun)
            }




        }
        private makeConstList(item: Array<any>): Array<ConstItem> {
            var constList: Array<ConstItem> = []
            for (var i: number = 0; i < item.length; i++) {
                var temp: ConstItem = new ConstItem()

                for (var key in item[i]) {
                    temp[key] = item[i][key]
                }
                temp.name = "fc" + i;
                temp.offset = i;
                temp.id = i;
                constList.push(temp)
            }
            return constList
        }

        private makeFc(constVec: Array<ConstItem>, infofcData: Array<string>): Float32Array {
            var fcData: Float32Array = new Float32Array(infofcData.length);
            for (var i: number = 0; i < infofcData.length; i++) {
                fcData[i] = Number(infofcData[i])
            }
            for (var k: number = 0; k < constVec.length; k++) {
                constVec[k].creat(fcData);
            }
            return fcData

        }
        private loadTextureRes(texItem: TexItem): void {
            if (texItem.type == TexItem.CUBEMAP) {
                LoadManager.getInstance().load(Scene_data.fileRoot + texItem.url, LoadManager.IMG_TYPE, ($img: any, $info: any) => {
                    texItem.textureRes = new TextureRes
                    texItem.textureRes.texture = Pan3d.CubemapLoad.makeTempCubeTextture($img)
                })
            } else {
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + texItem.url, ($texture: TextureRes) => {
                    texItem.textureRes = $texture;
                });
            }
        }
        private makeTextList(item: Array<any>): Array<TexItem> {
            var texList: Array<TexItem> = new Array;
            for (var i: number = 0; i < item.length; i++) {
                var texItem: TexItem = new TexItem;
                texItem.id = item[i]._id;
                texItem.url = item[i].url;
                texItem.name = item[i].name;
                texItem.isDynamic = item[i].isDynamic;
                texItem.paramName = item[i].paramName;
                texItem.isMain = item[i].isMain;
                texItem.type = item[i].type;
                this.loadTextureRes(texItem)
                texList.push(texItem);

            }
            return texList
        }


    }
}