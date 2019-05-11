declare module win {
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    import Vector2D = Pan3d.me.Vector2D;
    import UICompenent = Pan3d.me.UICompenent;
    class GameUIInstance {
        constructor();
        static uiContainer: Sprite;
        static layoutBottom: Sprite;
        static layoutTop: Sprite;
    }
    class LayerManager {
        private static _instance;
        static getInstance(): LayerManager;
        children: Array<Panel>;
        initData(): void;
        addPanel($panel: Panel, $level: number, $isOnly?: boolean): void;
        removePanel($panel: Panel): void;
        update(): void;
        resize(): void;
        getObjectsUnderPoint(evt: Vector2D): UICompenent;
        static isHideMouseEvent: boolean;
        mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean;
    }
}
