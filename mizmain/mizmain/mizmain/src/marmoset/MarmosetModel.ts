module mars3D {
    import ByteStream = marmoset.ByteStream
    export class FileVo {
        public name: string
        public type: string
        public data: Uint8Array
    }


    export class MarmosetModel {
        private static _instance: MarmosetModel;
        public static getInstance(): MarmosetModel {
            if (!this._instance) {
                this._instance = new MarmosetModel();
            }
            return this._instance;
        }
        private overrideFun(): void {
            let marmosetFun = function (fun: Function, ...args): any {
                let v = fun.apply(this, args);
                return v;
            }
            let Scene_load = marmoset.Scene.prototype.load;
            marmoset.Scene.prototype.load = function (a: any): any {
        
   
                var fileItem: Array<FileVo> = []
                for (var fileKey in a.files) {
                    var fileVo: FileVo = new FileVo();
                    fileVo.name = a.files[fileKey].name;
                    fileVo.type = a.files[fileKey].type;
                    fileVo.data = a.files[fileKey].data;
                    fileItem.push(fileVo)
                }
                let tempBg = marmosetFun.call(this, Scene_load, a)


     
          
             //var b = this.gl, c, d = value.extract("scene.json");
               
           
          


                return tempBg;
            }

 
            let TextureCache_parseFile = marmoset.TextureCache.parseFile;
            marmoset.TextureCache.parseFile = function (a: any, b: any, c: any): void {
                var tempImg = new Image();
                var tempBlob = new Blob([a.data], {
                    type: a.type
                });
                var tempURL = URL.createObjectURL(tempBlob);
                tempImg.onload = function () {
                    URL.revokeObjectURL(tempURL);
                    var webGLTexture: WebGLTexture = Pan3d.TextureManager.getInstance().getImageDataTexture(tempImg);
                    MarmosetModel.getInstance().textureItem.push(webGLTexture);
                }
                tempImg.src = tempURL;
                TextureCache_parseFile(a, b, c);
 
            }
       

 

        }
        public textureItem: Array<WebGLTexture>;
        public constructor() {
            this.textureItem=[]
        
        }
        public initData(): void {
            this.overrideFun()

            console.log(marmoset)
        }
       
    }
}