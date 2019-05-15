module layapan.me {
    export class LayaOverride2dEngine extends scene3d.me.OverrideEngine {


        constructor() {
            super()
        }


        public static initConfig(): void {
   
            Pan3d.me.UIData.resize = () => { this.uiScaleresize() }  //更换update
            Pan3d.me.Engine.update = () => { this.update() }  //更换update
            Pan3d.me.Engine.init = ($caves: HTMLCanvasElement) => { scene2d.me.Override2dEngine.init($caves) } //更换引擎初始化
            Pan3d.me.Engine.resetSize = (width?: number, height?: number) => { scene2d.me.Override2dEngine.resetSize(width, height) } //更尺寸变化

            Pan3d.me.Engine.resetViewMatrx3D = () => { scene2d.me.Override2dEngine.resetViewMatrx3D() }
        }
        public static uiScaleresize(): void {
            console.log("重置什么也不做")
            Pan3d.me.UIData.Scale = 1
        }
       

       

    }
}