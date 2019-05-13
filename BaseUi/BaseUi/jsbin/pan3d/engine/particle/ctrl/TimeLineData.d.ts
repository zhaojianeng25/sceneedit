declare module Pan3d.me {
    class TimeLineData {
        dataAry: Array<any>;
        maxFrameNum: number;
        beginTime: number;
        destory(): void;
        setByteData($byte: Pan3dByteArray): void;
        addKeyFrame(num: number): KeyFrame;
        private getByteDataTemp;
    }
}
