declare module drag {
    import BaseEvent = Pan3d.me.BaseEvent;
    import Module = Pan3d.me.Module;
    import Processor = Pan3d.me.Processor;
    import BaseProcessor = Pan3d.me.BaseProcessor;
    class PanDragEvent extends BaseEvent {
        static DRAG_SHOW: string;
        static DRAG_ENTER: string;
        static DRAG_DROP: string;
    }
    class DragModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class DragProcessor extends BaseProcessor {
        getName(): string;
        private _dragPanel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private topDrag;
        private addUIContainer;
        private addStageMoveEvets;
        private onMove;
        private getObjectsUnderPoint;
        private onUp;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}
