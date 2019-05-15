declare module colorview {
    import BaseEvent = Pan3d.me.BaseEvent;
    import Vector3D = Pan3d.me.Vector3D;
    import Module = Pan3d.me.Module;
    import Processor = Pan3d.me.Processor;
    import BaseProcessor = Pan3d.me.BaseProcessor;
    class ColorEvent extends BaseEvent {
        static SHOW_COLOR_PANEL: string;
        static HIDE_COLOR_PANEL: string;
        bfun: Function;
        v3dColor: Vector3D;
    }
    class ColorModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class ColorProcessor extends BaseProcessor {
        getName(): string;
        protected receivedModuleEvent($event: BaseEvent): void;
        private hideColorPanel;
        private showColorPanel;
        private colorWinPanel;
        private colorPanel;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}
