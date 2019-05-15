declare module scene2d.me {
    class Ground2dBaseShader extends Pan3d.me.Shader3D {
        static Ground2dBaseShader: string;
        constructor();
        binLocation($context: WebGLRenderingContext): void;
        getVertexShaderString(): string;
        getFragmentShaderString(): string;
    }
    class Ground2dBaseSprite extends Pan3d.me.Display3D {
        constructor();
        protected initData(): void;
        private loadTexture;
        setPicUrl($url: string): void;
        _uvTextureRes: Pan3d.me.TextureRes;
        upToGpu(): void;
        update(): void;
        width: number;
        height: number;
        static perentpos: Pan3d.me.Vector2D;
        private getMoveSizeData;
    }
    class GroundModel {
        private static _instance;
        static getInstance(): GroundModel;
        constructor();
        update(): void;
        addGroundPicByeUrl($url?: string, $rect?: Pan3d.me.Rectangle): Ground2dBaseSprite;
        private _groundItem;
    }
}
