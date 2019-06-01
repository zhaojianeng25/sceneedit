module mars3D {
    import Scene_data = Pan3d.Scene_data
    import ByteStream = marmoset.ByteStream
    import Scene = marmoset.Scene
    import Matrix = marmoset.Matrix
    import Vect = marmoset.Vect
    
    export class FileVo {
        public name: string
        public type: string
        public data: Uint8Array
    }

    export class Mars3Dmesh extends marmoset.Mesh {
      
        public initdata(a: any, b: any, c: any) {
            this.gl = a;
            var elementArrayBuffer = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var arrayBuffer = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
 
            this.gl = a;
            this.desc = b;
            var d = b.isDynamicMesh;
            this.numSubMeshes = this.dynamicVertexData = 0;
            this.displayMatrix = Matrix.identity();
            this.name = b.name;
            this.modelMatrix = Matrix.identity();
            this.origin = b.transform ? Vect.create(b.transform[12], b.transform[13], b.transform[14], 1) : Vect.create(0, 5, 0, 1);
            this.stride = 32;
            if (this.vertexColor = b.vertexColor)
                this.stride += 4;
            if (this.secondaryTexCoord = b.secondaryTexCoord)
                this.stride += 8;
            c = new ByteStream(c.data);
            this.indexCount = b.indexCount;
            this.indexTypeSize = b.indexTypeSize;
            this.indexType = 4 == this.indexTypeSize ? a.UNSIGNED_INT : a.UNSIGNED_SHORT;
            this.indexBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            var e = c.readBytes(this.indexCount * this.indexTypeSize);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            this.wireCount = b.wireCount;
            this.wireBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.wireBuffer);
            e = c.readBytes(this.wireCount * this.indexTypeSize);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
            this.vertexCount = b.vertexCount;
            this.vertexBuffer = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
            c = c.readBytes(this.vertexCount * this.stride);
            d ? (this.dynamicVertexData = new Uint8Array(c),
                a.bufferData(a.ARRAY_BUFFER, c, a.DYNAMIC_DRAW)) : a.bufferData(a.ARRAY_BUFFER, c, a.STATIC_DRAW);
            a.bindBuffer(a.ARRAY_BUFFER, null);
            this.bounds = void 0 === b.minBound || void 0 === b.maxBound ? {
                min: Vect.create(-10, -10, -10, 1),
                max: Vect.create(10, 10, -0, 1)
            } : {
                    min: Vect.create(b.minBound[0], b.minBound[1], b.minBound[2], 1),
                    max: Vect.create(b.maxBound[0], b.maxBound[1], b.maxBound[2], 1)
                };
            this.bounds.maxExtent = Math.max(Math.max(b.maxBound[0] - b.minBound[0], b.maxBound[1] - b.minBound[1]), b.maxBound[2] - b.minBound[2]);
            this.bounds.averageExtent = (b.maxBound[0] - b.minBound[0] + (b.maxBound[1] - b.minBound[1]) + (b.maxBound[2] - b.minBound[2])) / 3

            if (elementArrayBuffer) {
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
            }
            if (arrayBuffer) {
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, arrayBuffer);
            }
 
        }

    }

    export class MarmosetModel {
        private static _instance: MarmosetModel;
        public static getInstance(): MarmosetModel {
            if (!this._instance) {
                this._instance = new MarmosetModel();
            }
            return this._instance;
        }
        public static meshItem: Array<Mars3Dmesh>
        private static preaMeshFile(modeInfo: any, fileDic: any): void {
            if (!this.meshItem) {
                this.meshItem=[]
            }
            Pan3d.TimeUtil.addTimeOut(10, () => {
                var mesh = new Mars3Dmesh(Scene_data.context3D.renderContext, modeInfo, fileDic[modeInfo.file]);
                // console.log(mesh)
                this.meshItem.push(mesh)
            })
        }

        private overrideFun(): void {
            let marmosetFun = function (fun: Function, ...args): any {
                let v = fun.apply(this, args);
                return v;
            }
            let Scene_load = Scene.prototype.load;
            Scene.prototype.load = function (a: any): any {
        

                var fileDic: any = {};
                var sceneInfo: any
                for (var fileKey in a.files) {
                    var fileVo: FileVo = new FileVo();
                    fileVo.name = a.files[fileKey].name;
                    fileVo.type = a.files[fileKey].type;
                    fileVo.data = a.files[fileKey].data;

                    fileDic[fileVo.name] = fileVo
                    if (fileVo.name.indexOf("scene.json") != -1) {
                         sceneInfo  = JSON.parse((new ByteStream(fileVo.data)).asString());
                    }
                }
                let tempBg = marmosetFun.call(this, Scene_load, a)

                for (var g: number = 0; g < sceneInfo.meshes.length; ++g) {
   
                    MarmosetModel.preaMeshFile(sceneInfo.meshes[g], fileDic)
         
                }
 

                console.log(sceneInfo);
   
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
 
        }
       
    }
}