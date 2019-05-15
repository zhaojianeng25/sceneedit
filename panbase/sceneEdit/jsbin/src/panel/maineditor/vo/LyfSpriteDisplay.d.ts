declare module maineditor {
    import Matrix3D = Pan3d.me.Matrix3D;
    import Display3DSprite = Pan3d.me.Display3DSprite;
    class LyfSpriteDisplay extends Display3DSprite {
        constructor();
        private waitLoadUrl;
        getSocket(socketName: string, resultMatrix: Matrix3D): void;
        addLyfByUrl($url: string): void;
        removeStage(): void;
        addStage(): void;
        private particleItem;
        private loadTempByUrl;
    }
}
