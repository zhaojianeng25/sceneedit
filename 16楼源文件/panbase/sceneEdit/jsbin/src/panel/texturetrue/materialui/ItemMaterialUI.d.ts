declare module materialui {
    import EventDispatcher = Pan3d.me.EventDispatcher;
    import FrameCompenent = Pan3d.me.FrameCompenent;
    import Vector2D = Pan3d.me.Vector2D;
    class ItemMaterialUI extends EventDispatcher {
        private _type;
        hasConnet: boolean;
        inOut: boolean;
        nodeTreeItem: NodeTreeItem;
        pointframe: FrameCompenent;
        labelframe: FrameCompenent;
        parent: BaseMaterialNodeUI;
        titleLabeltext: string;
        outLineList: Array<MaterialNodeLineUI>;
        private _inLine;
        constructor(name: string, $type: string, $inOut?: boolean);
        removeOut($line: MaterialNodeLineUI): void;
        removeIn(): void;
        setConnect(): void;
        removeAllLine(): void;
        typets: string;
        private _x;
        private _y;
        x: number;
        y: number;
        getStagePoint(): Vector2D;
        changeType($type: string): void;
        drawSp(): void;
        inLine: MaterialNodeLineUI;
        drawLine(): void;
    }
}
