declare module prop {
    class MathFunMeshPanel extends MetaDataView {
        private mathFunNodeUI;
        getView(): Array<any>;
        readonly tittleStr: string;
        funContent: materialui.NodeTreeFun;
        data: any;
        private changeFile;
        destory(): void;
        nodeUI: materialui.MathFunNodeUI;
        private changeData;
    }
}
