declare module folder {
    import BaseEvent = Pan3d.me.BaseEvent;
    import Module = Pan3d.me.Module;
    import Processor = Pan3d.me.Processor;
    import BaseProcessor = Pan3d.me.BaseProcessor;
    import Vector2D = Pan3d.me.Vector2D;
    class FolderEvent extends BaseEvent {
        static SHOW_FOLDER_PANEL: string;
        static EDITSCENE_RESET_SIZE: string;
        static RESET_FOLDE_WIN_SIZE: string;
        static LIST_DIS_ALL_FILE: string;
        data: any;
        posv2d: Vector2D;
        comboxData: Array<any>;
        comboxFun: Function;
    }
    class FolderModule extends Module {
        getModuleName(): string;
        protected listProcessors(): Array<Processor>;
    }
    class FolderProcessor extends BaseProcessor {
        getName(): string;
        private _folderPanel;
        protected receivedModuleEvent($event: BaseEvent): void;
        private resetFolderWinSize;
        private fristRect;
        private folderPanel;
        private addOtherPanel;
        private addUIContainer;
        private _fileListPanel;
        private _baseFolderWindow;
        protected listenModuleEvents(): Array<BaseEvent>;
    }
}
