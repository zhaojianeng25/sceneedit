module core {
    import TextureRes = Pan3d.TextureRes
    import UIManager = Pan3d.UIManager
    import Scene_data = Pan3d.Scene_data
    import TextureManager = Pan3d.TextureManager
    export class TextureUint {

        
        private static _instance: TextureUint;
        public static getInstance(): TextureUint {
            if (!this._instance) {
                this._instance = new TextureUint();
            }
            return this._instance;
        }
        public makeColorTexture(): TextureRes {
            var tempRect: TextureRes = new TextureRes()
            tempRect.width = 1024
            tempRect.height = 1024
            tempRect.texture = Scene_data.context3D.creatTexture(tempRect.width, tempRect.height)
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(tempRect.width, tempRect.height, false);
            ctx.fillStyle = "#ff0000"; // text color
            ctx.fillRect(0, 0, tempRect.width, tempRect.height);
            TextureManager.getInstance().updateTexture(tempRect.texture, 0, 0, ctx);

            return tempRect
        }


    }
}