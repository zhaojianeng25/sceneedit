module mars3D {
    import Scene_data = Pan3d.Scene_data
    import Shader3D = Pan3d.Shader3D
    import ProgrmaManager = Pan3d.ProgrmaManager
    import GlReset = Pan3d.GlReset
    import Matrix3D = Pan3d.Matrix3D


    export class ContentInit  {

        private domRoot: any;
        private canvas: any;
        private pixelRatio: any;
        private mobile: any;
        private mobileFast: any;
        private desktopSlow: any;
        public constructor( ) {

            var a: number = 800
            var b: number = 512


            this.domRoot = document.createElement("div");
            this.domRoot.style.width = a + "px";
            this.domRoot.style.height = b + "px";

            this.initCanvas(a, b)
        }
        private initCanvas (a:number, b:number) {
            this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            this.canvas = document.createElement("canvas");
            this.pixelRatio = window.devicePixelRatio || 1;
            if (this.mobile) {
                var c = this.mobileFast ? 1.5 : 1;
                this.pixelRatio = this.pixelRatio > c ? c : this.pixelRatio
            } else
                this.desktopSlow && (this.pixelRatio = 1);
            this.canvas.width = a * this.pixelRatio;
            this.canvas.height = b * this.pixelRatio;
            this.canvas.style.width = a + "px";
            this.canvas.style.height = b + "px";
            this.canvas.style.position = "absolute";
            this.domRoot.appendChild(this.canvas)

            this.initGL()
        }
        private gl: any
        private initGL() {
            var a: any = {
                alpha: true,
                depth: !1,
                stencil: !1,
                antialias: !1,
                premultipliedAlpha: true,
                preserveDrawingBuffer: !1
            }
                , a = this.gl = this.canvas.getContext("webgl", a) || this.canvas.getContext("experimental-webgl", a);

 
    
            this.canvas.addEventListener("webglcontextlost", function (a) {
                a.preventDefault()
            }
                .bind(this), !1);
            this.canvas.addEventListener("webglcontextrestored", function (a) {
                this.loadScene(this.sceneURL)
            }
                .bind(this), !1);
            a.ext = {
                textureAniso: a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic"),
                textureFloat: a.getExtension("OES_texture_float"),
                textureFloatLinear: a.getExtension("OES_texture_float_linear"),
                textureHalf: a.getExtension("OES_texture_half_float"),
                textureHalfLinear: a.getExtension("OES_texture_half_float_linear"),
                textureDepth: a.getExtension("WEBGL_depth_texture"),
                colorBufferFloat: a.getExtension("WEBGL_color_buffer_float"),
                colorBufferHalf: a.getExtension("EXT_color_buffer_half_float"),
                index32bit: a.getExtension("OES_element_index_uint"),
                loseContext: a.getExtension("WEBGL_lose_context"),
                derivatives: a.getExtension("OES_standard_derivatives"),
                renderInfo: a.getExtension("WEBGL_debug_renderer_info")
            };
  
           
            a.enable(a.DEPTH_TEST);

            this.makeDepthTexture()
         
        }

        private makeDepthTexture(): WebGLTexture {
            //深度贴图
 

           var  gl = this.gl

            var depthTexture: WebGLTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

            //  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.depthFBO.width, this.depthFBO.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            //   gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, 2048, 2048, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            gl.bindTexture(gl.TEXTURE_2D, null);



            return depthTexture

        }
 
    }
}