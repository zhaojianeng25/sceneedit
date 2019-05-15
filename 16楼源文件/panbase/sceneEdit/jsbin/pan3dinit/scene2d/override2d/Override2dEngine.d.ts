declare module scene2d.me {
    class Override2dEngine extends scene3d.me.OverrideEngine {
        constructor();
        static htmlScale: number;
        static initConfig(): void;
        static resetSize(width?: number, height?: number): void;
        static init($caves: HTMLCanvasElement): void;
        static resetViewMatrx3D(): void;
    }
}
