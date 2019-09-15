declare module Pan3d {
    class BitMapData {
        width: number;
        height: number;
        imgData: ImageData;
        constructor($w: number, $h: number);
        private getIndexByPos;
        setRgb($tx: number, $ty: number, $ve: Vector3D): void;
        getRgb($tx: number, $ty: number): Vector3D;
    }
}
