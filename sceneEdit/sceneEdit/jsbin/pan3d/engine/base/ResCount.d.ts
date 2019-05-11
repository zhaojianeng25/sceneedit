declare module Pan3d.me {
    class ResCount extends GC {
        protected _useNum: number;
        idleTime: number;
        static GCTime: number;
        useNum: number;
        clearUseNum(): void;
    }
}
