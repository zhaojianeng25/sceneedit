var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var shader;
    (function (shader) {
        var RenderSprite = laya.renders.RenderSprite;
        var IndexBuffer2D = laya.webgl.utils.IndexBuffer2D;
        var VertexBuffer2D = laya.webgl.utils.VertexBuffer2D;
        /**
         * 此类需继承自显示对象类。
         * 在此类中使用了自定义的着色器程序。
         * 注意：使用自定义着色器时，需要设置此显示对象类的渲染模式： this._renderType |= RenderSprite.CUSTOM;	并且需要重写此类的渲染处理函数。
         *
         */
        var WaterSprite = /** @class */ (function (_super) {
            __extends(WaterSprite, _super);
            function WaterSprite(mapWater, textureUrl, waterSampleUrl) {
                var _this = _super.call(this) || this;
                _this.iNum = 0;
                _this.mapWater = mapWater;
                _this.width = mapWater.width;
                _this.height = mapWater.height;
                _this._assetsLoader = new AssetsLoader();
                var assets = [textureUrl, waterSampleUrl];
                _this._assetsLoader.load(assets, Handler.create(_this, _this.init, assets));
                return _this;
            }
            /**
             * 初始化此类。
             * @param	texture 纹理对象。
             * @param	vb 顶点数组。
             * @param	ib 顶点索引数组。
             */
            WaterSprite.prototype.init = function (textureUrl, waterSampleUrl) {
                this._texture = Laya.loader.getRes(textureUrl);
                if (!this._texture)
                    return;
                this._waterSample = Laya.loader.getRes(waterSampleUrl);
                this.vBuffer = VertexBuffer2D.create();
                this.iBuffer = IndexBuffer2D.create();
                this.ibData = new Uint16Array(0);
                var texWidth = this._texture.width;
                var texHeight = this._texture.height;
                var vbArray = [];
                //在顶点数组中放入4个顶点
                //每个顶点的数据：(坐标X,坐标Y,		 u,v,  u1,v1)				
                vbArray.push(0, 0, 0, 0, 0, 0);
                vbArray.push(texWidth, 0, 1, 0, texWidth / this._waterSample.width, 0);
                vbArray.push(texWidth, texHeight, 1, 1, texWidth / this._waterSample.width, texHeight / this._waterSample.height);
                vbArray.push(0, texHeight, 0, 1, 0, texHeight / this._waterSample.height);
                var ibArray = [];
                //在顶点索引数组中放入组成三角形的顶点索引。
                //三角形的顶点索引对应顶点数组vbArray 里的点索引，索引从0开始。
                ibArray.push(0, 1, 3); //第一个三角形的顶点索引。
                ibArray.push(3, 1, 2); //第二个三角形的顶点索引。
                this.iNum = ibArray.length;
                this.vbData = new Float32Array(vbArray);
                this.ibData = new Uint16Array(ibArray);
                this.vBuffer.append(this.vbData);
                this.iBuffer.append(this.ibData);
                this.shaderValue = new game.shader.WaterShaderValue();
                this.shaderValue.textureHost = this._texture;
                this.shaderValue.water_sample = this._waterSample.source;
                //矩阵
                this.shaderValue.water_mat4 = [this.mapWater.waveBreadth / texWidth, 0, 0, 0,
                    this.mapWater.waveBreadth / texHeight, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0];
                //设置当前显示对象的渲染模式为自定义渲染模式。
                this._renderType |= RenderSprite.CUSTOM;
            };
            //重写渲染函数。
            WaterSprite.prototype.customRender = function (context, x, y) {
                if (!this._texture)
                    return;
                this.shaderValue.water_movexy[1] += 0.0005 * this.mapWater.streamSpeed;
                if (this.shaderValue.water_movexy[1] > 1) {
                    this.shaderValue.water_movexy[1] = 0;
                }
                // if(context.ctx instanceof WebGLContext2D){
                // 	context.ctx.setIBVB(x, y, 
                // 	this.iBuffer, this.vBuffer, this.iNum, null, WaterShader.shader, this.shaderValue, 0, 0);
                // }
            };
            WaterSprite.prototype.clear = function (checkNow) {
                //素材卸载
                this._assetsLoader.clear(checkNow);
            };
            WaterSprite.prototype.destroy = function (destroyChild) {
                this.clear(true);
                _super.prototype.destroy.call(this, destroyChild);
            };
            return WaterSprite;
        }(Laya.Sprite));
        shader.WaterSprite = WaterSprite;
    })(shader = game.shader || (game.shader = {}));
})(game || (game = {}));
//# sourceMappingURL=WaterSprite.js.map