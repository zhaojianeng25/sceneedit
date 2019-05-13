declare module Pan3d.me {
    class ScaleAnim extends BaseAnim {
        scaleAry: Array<any>;
        beginScale: number;
        scaleNum: number;
        private _currentTarget;
        private flag;
        private numAry;
        constructor();
        update(t: number): void;
        coreCalculate(): void;
        reset(): void;
        depthReset(): void;
        data: Array<any>;
        dataByte(va: Array<any>, arr: Array<any>): void;
        getAllNum(allTime: number): void;
    }
}
