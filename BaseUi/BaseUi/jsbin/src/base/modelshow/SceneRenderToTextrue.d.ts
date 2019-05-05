declare module left {
    import FBO = Pan3d.me.FBO;
    import Display3D = Pan3d.me.Display3D;
    class SceneRenderToTextrue {
        private static _instance;
        static getInstance(): SceneRenderToTextrue;
        private renderContext;
        private fw;
        private fh;
        private getFBO;
        private updateDepthTexture;
        viweLHnumber: number;
        resetViewMatrx3D(): void;
        fbo: FBO;
        renderToTexture($item: Array<Display3D>): void;
    }
}
