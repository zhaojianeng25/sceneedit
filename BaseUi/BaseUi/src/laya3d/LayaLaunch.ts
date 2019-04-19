import Browser = Laya.Browser;
import Loader = Laya.Loader;
import LEvent = Laya.Event;
import Stage = Laya.Stage;

import LoadManager = Pan3d.LoadManager
import Scene_data = Pan3d.Scene_data
import TextureRes = Pan3d.TextureRes


 
    import Pan3dByteArray = Pan3d.Pan3dByteArray;
    import WebGLContext = laya.webgl.WebGLContext;
 
    /*
    自定义着色器
    */
module Temp3D {
    export class OtherShader extends Laya.Shader {
        public static shader: OtherShader = new OtherShader();
        constructor() {
            var vs: string = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1.0);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}"
            var ps: string = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = t_color;}";
            super(vs, ps, "myShader");
        }
    }
    export class OtherShaderValue extends Laya.Value2D {
        public texcoord: any;
        constructor() {
            super(0, 0);
            var _vlen: number = 8 * Laya.CONST3D2D.BYTES_PE;
            this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
            this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
            this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
        }
    }

    export class OtherLayaRectSprite extends Laya.Sprite {
        protected vBuffer: Laya.VertexBuffer2D;
        protected iBuffer: Laya.IndexBuffer2D;
        protected vbData: Float32Array;
        protected ibData: Uint16Array;
        protected iNum: number = 0;
        protected shaderValue: OtherShaderValue;
        constructor() {
            super();
            this.init(null)
        }
        public init(texture: Laya.Texture, vb: Array<any> = null, ib: Array<any> = null): void {
            this.vBuffer = Laya.VertexBuffer2D.create();
            this.iBuffer = Laya.IndexBuffer2D.create();
            this.ibData = new Uint16Array([]);
            var vbArray: Array<any>;
            var ibArray: Array<any>;
            if (vb) {
                vbArray = vb;
            }
            else {
                vbArray = [];
                var texWidth: number = 100 + random(20)
                var texHeight: number = 100 + random(20)
                var red: number = 1;
                var greed: number = 1;
                var blue: number = 1;
                var alpha: number = 1;
                vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
                vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
                vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
            }
            if (ib) {
                ibArray = ib;
            }
            else {
                ibArray = [];
                ibArray.push(0, 1, 3);//从第一个三角形的顶点索引
            }
            this.iNum = ibArray.length;
            this.vbData = new Float32Array(vbArray);
            this.ibData = new Uint16Array(ibArray);
            this.vBuffer.append(this.vbData);
            this.iBuffer.append(this.ibData);
            this.shaderValue = new OtherShaderValue();

            this.shaderValue.textureHost = null;
            Laya.loader.load("res/ui/icon/lyf_64x.png", Laya.Handler.create(this, (aa: Laya.Texture) => {

                this.texture=aa
   
                this.shaderValue.textureHost = this.texture
            }))

            this.scale(2,2)
 
            this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式
        }
        public customRender(context: Laya.RenderContext, x: number, y: number): void {
            (context.ctx as Laya.WebGLContext2D).setIBVB(x, y, (this.iBuffer) as Laya.IndexBuffer2D, (this.vBuffer) as Laya.VertexBuffer2D, this.iNum, null, OtherShader.shader, this.shaderValue, 0, 0);
        }
    }
}
class LayaLaunchTexture extends Laya.Texture {
    public constructor(bitmap: laya.resource.Bitmap) {
        super(bitmap);
        LoadManager.getInstance().load(Scene_data.fileRoot + "ui/icon/map_64x.png", LoadManager.IMG_TYPE, ($img: any, $info: any) => {
            var tempPanTexture: WebGLTexture = Pan3d.Scene_data.context3D.getTexture($img)
            this._baseWebGLTexture = tempPanTexture;
        })

    }
    public get source(): WebGLTexture {
        return this._baseWebGLTexture
    }
    private _baseWebGLTexture: WebGLTexture
}
class LayaLaunch {
    private _canvas: HTMLCanvasElement;
    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    constructor() {

        this.init()
    }

    private init(): void {

   
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
 

        Pan3d.Scene_data.fileRoot = "res/";
        Pan3d.Engine.init(this._canvas);
 
        var pic: Laya.Image = new Laya.Image();
        Laya.stage.addChild(pic)
        pic.x = 600;
        pic.y = 300;
        pic.scale(2, 2);

   
        Laya.loader.load("res/ui/icon/objs_64x.png", Laya.Handler.create(this, (aa: Laya.Texture) => {
            pic.texture = aa;
            console.log(aa.uv)
  
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/icon/skill_64x.png", LoadManager.IMG_TYPE, ($img: any, $info: any) => {

               Pan3d.Scene_data.context3D.updateTexture(pic.texture.source, pic.texture.source, pic.texture.source, $img)

                var tempPanTexture: WebGLTexture = Pan3d.Scene_data.context3D.getTexture($img)

                pic.texture.source = tempPanTexture;



 

              var a: LayaLaunchTexture = new LayaLaunchTexture(new laya.resource.Bitmap())

            //    pic.texture = a
                for (var keyStr in pic.texture) {
                    if ("source" == keyStr || "uv" == keyStr || "sourceHeight" == keyStr) {
                    } else {
                        console.log(keyStr, pic.texture[keyStr], a[keyStr])
                        a[keyStr] = pic.texture[keyStr]
                    }
                }

                for (var keyStr in a) {
                    console.log(keyStr, pic.texture[keyStr], a[keyStr])

                }
                a.width = 128
                a.height = 128
                a.sourceWidth = 128
                a.sourceHeight = 128

                pic.texture = a

            })

 

      

        }))
 
    
 
       


  
 
    }

 
    public static initCanvas($caves: HTMLCanvasElement): void {

        var main = new LayaLaunch();

 
    }
   

}


