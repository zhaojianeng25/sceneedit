module inputres {
    import Scene_data = Pan3d.Scene_data
    import FBO = Pan3d.FBO
    import Display3D = Pan3d.Display3D
    import MathClass = Pan3d.MathClass
    import Engine = Pan3d.Engine
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    
    import LoadManager = Pan3d.LoadManager;
    import ObjDataManager = Pan3d.ObjDataManager;
    import TextureManager = Pan3d.TextureManager


    export class SceneRes extends Pan3d.SceneRes {
        public bfun: Function;
        public readScene(): void {
            super.readScene();
            this.bfun();
        }
        private saveImgToSever(imgAryBuffer: ArrayBuffer, httpUrl:string): void {
            var $img: any = new Image()
            $img.url = httpUrl.replace(Scene_data.fileRoot, "");
            $img.src = 'data:image/png;base64,' + Pan3d.Base64.encode(imgAryBuffer);
            var $upfile: File = this.dataURLtoFile($img.src, $img.url);
            this.upOssFile($upfile, httpUrl)
        }
        private dataURLtoFile(dataurl: string, filename: string): File {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }
        private readChangeBuff(data: DataView, $dataWidth: number, $offset: number, $stride: number): Array<number> {

            var $arr: Array<number> = new Array
            var len: number = data.byteLength / (4 * $stride)
            for (var i: number = 0; i < len; i++) {
                var pos: number = $stride * i + $offset;
                for (var j: number = 0; j < $dataWidth; j++) {
                    var id: number = (pos + j) * 4
                    var num = data.getFloat32(id, true);
                    data.setFloat32(id, num, true);
                    $arr.push(num)
                }
            }
            return $arr
        }
        private saveObjDataToSever(objdata: ObjData, httpUrl: string): void {
            httpUrl = httpUrl.replace(".xml", ".objs");
            var obj: any = {};
            var tw: number = objdata.stride / 4
            obj.vertices = this.readChangeBuff(objdata.dataView, 3, 0, tw);
            obj.uvs = this.readChangeBuff(objdata.dataView, 2, 3, tw);
            obj.lightUvs = this.readChangeBuff(objdata.dataView, 2, 5, tw);
            obj.normals = obj.vertices
            obj.indexs = objdata.indexs

            for (var i: number = 0; i < obj.vertices.length; i++) {
                obj.vertices[i] *= 0.1 //输小;
            }
            var $file: File = new File([JSON.stringify(obj)], "temp.objs");
            this.upOssFile($file, httpUrl)
        }
        private refrishDicGroup(pathurl: string): void {
            pack.FileOssModel.getDisByOss(pathurl, () => {
                console.log("刷新了文件夹目录", pathurl);
            })
        }
        public sceneResFileRoot: string = "just/"
        private upOssFile(file: File, httpurl: string): void {
            var url: string = httpurl.replace(Scene_data.fileRoot, "") //得到相对位置；
            url = Scene_data.fileRoot + this.sceneResFileRoot+url   //得到http文件位置
            var ossUrl: string = url.replace(Scene_data.ossRoot, "");
            console.log(ossUrl)
            pack.FileOssModel.upOssFile(file, ossUrl, () => {
                this.refrishDicGroup(ossUrl)
            })
        }
        public readObj($srcByte: Pan3dByteArray): void {
            var objNum: number = $srcByte.readInt();
            for (var i: number = 0; i < objNum; i++) {
                var url: string = Scene_data.fileRoot + $srcByte.readUTF();
                var size: number = $srcByte.readInt();
                var newByte: Pan3dByteArray = new Pan3dByteArray();
                newByte.length = size;
                $srcByte.readBytes(newByte, 0, size);
                var objData: ObjData = ObjDataManager.getInstance().loadObjCom(newByte.buffer, url);

                this.saveObjDataToSever(objData, url)
            }

            if (this._imgFun) {
                this._imgFun();
            }

        }
        public readImg(): void {
            this.imgNum = this._byte.readInt();
            this.imgLoadNum = 0;
            for (var i: number = 0; i < this.imgNum; i++) {
                var url: string = Scene_data.fileRoot + this._byte.readUTF();
                var imgSize: number = this._byte.readInt();
                if (url.search(".jpng") != -1) {
                    this.readJpngImg(url);
                    continue;
                }
                var imgAryBuffer: ArrayBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + imgSize);
                this._byte.position += imgSize;
                this.saveImgToSever(imgAryBuffer, url)
                this.countImg()
            }
        }
    }
    export class ImputGameResModel {
        private static _instance: ImputGameResModel;
        public static getInstance(): ImputGameResModel {
            if (!this._instance) {
                this._instance = new ImputGameResModel();
            }
            return this._instance;
        }
        public loadSceneByUrl(): void {
            var sceneRes: SceneRes = new SceneRes();
            sceneRes.sceneResFileRoot="just/"  //指定到对应文件夹；
            sceneRes.bfun = () => {
             //   console.log("sceneres", sceneRes.sceneData)
                var buildItem: Array<any> = sceneRes.sceneData.buildItem;
                for (var i: number = 0; i < buildItem.length; i++) {
                    if (buildItem[i].type == 1) {
                        var objsurl: string = buildItem[i].objsurl;
                        var lighturl: string = buildItem[i].lighturl;
                        var mainpic: string = this.getMainPic(buildItem[i].materialInfoArr)
              

                        if (objsurl && lighturl && mainpic) {
                            console.log(objsurl)
                            console.log(lighturl)
                            console.log(mainpic)
                            console.log(buildItem[i].name)
                            console.log("------------------")

                           // this.makePerfabToSever()
                        }
                    }
                }
             
                
            }
            LoadManager.getInstance().load(Scene_data.fileRoot +"pan/expmapinfo.txt", LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                sceneRes.loadComplete($byte);
            });
        }
        //从材质中获取一张图;
        private getMainPic(infoArr: Array<any>): string {
            for (var i: number = 0; i < infoArr.length; i++) {
                if (infoArr[i].type == 0) {
                    return infoArr[i].url
                }
            }
            return null;
        }

        private makePerfabToSever(): void {
            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
            var prefabStaticMesh: pack.PrefabStaticMesh = new pack.PrefabStaticMesh()
            var $fileUrl: string = Pan3d.Scene_data.fileRoot + prefabStaticMesh.url

            prefabStaticMesh.objsurl="cccc.objs"
            prefabStaticMesh.textureurl = "ccc.mect";
            prefabStaticMesh.paramInfo = [];
            prefabStaticMesh.url="deeee.prefab"

            $byte.writeUTF(JSON.stringify(prefabStaticMesh.getObject()))
            var $file: File = new File([$byte.buffer], "temp.prefab");
            var pathurl: string = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.upOssFile($file, pathurl, () => {

             
            })
        }

    
   
    }
}
