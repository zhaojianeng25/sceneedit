declare module maineditor {
    import FBO = Pan3d.me.FBO;
    import Matrix3D = Pan3d.me.Matrix3D;
    import SceneManager = layapan.me.LayaOverride2dSceneManager;
    class EdItorSceneManager extends SceneManager {
        constructor();
        fbo: FBO;
        private updateDepthTexture;
        renderToTexture($m?: Matrix3D): void;
        textureRes: Pan3d.me.TextureRes;
        update(): void;
        getGroundPos($mouse: Vector2D): Vector3D;
        playLyf($url: string, $pos: Pan3d.me.Vector3D, $r?: number): void;
    }
}
