declare module scene3d.me {
    class OverrideEngine extends Pan3d.me.Engine {
        constructor();
        static initConfig(): void;
        static update(): void;
        static resetSize(width?: number, height?: number): void;
        static init($caves: HTMLCanvasElement): void;
    }
}
