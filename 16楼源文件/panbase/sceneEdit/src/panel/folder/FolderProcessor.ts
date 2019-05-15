module folder {
    import BaseEvent = Pan3d.me.BaseEvent;
    import Module = Pan3d.me.Module;
    import Processor = Pan3d.me.Processor;
    import BaseProcessor = Pan3d.me.BaseProcessor;
    import Vector2D = Pan3d.me.Vector2D;
    import Rectangle = Pan3d.me.Rectangle;
    import UIManager = Pan3d.me.UIManager;
    import UIData = Pan3d.me.UIData;
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    import Scene_data = Pan3d.me.Scene_data;
    import ModuleEventManager = Pan3d.me.ModuleEventManager;
    import UIConatiner = Pan3d.me.UIConatiner
    import Panel = win.Panel
    import FileListPanel = filelist.FileListPanel
    import BaseFolderWindow = basefolderwin.BaseFolderWindow
    import OssFolderPanel = ossfolder.OssFolderPanel;



    export class FolderEvent extends BaseEvent {
        public static SHOW_FOLDER_PANEL: string = "SHOW_FOLDER_PANEL";
        public static EDITSCENE_RESET_SIZE: string = "EDITSCENE_RESET_SIZE";
        public static RESET_FOLDE_WIN_SIZE: string = "RESET_FOLDE_WIND_SIZE";
        public static LIST_DIS_ALL_FILE: string = "LIST_DIS_ALL_FILE";

        public data: any

        public posv2d: Vector2D;
        public comboxData: Array<any>;
        public comboxFun: Function


    }
    export class FolderModule extends Module {
        public getModuleName(): string {
            return "FolderModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new FolderProcessor()];
        }
    }

    export class FolderProcessor extends BaseProcessor {
        public getName(): string {
            return "FolderProcessor";
        }
        private _folderPanel: OssFolderPanel

        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof FolderEvent) {
                var _folderEvent: FolderEvent = <FolderEvent>$event;
                if (_folderEvent.type == FolderEvent.SHOW_FOLDER_PANEL) {

                    if (!this._baseFolderWindow) {
                        this._baseFolderWindow = new BaseFolderWindow()
                    }
                    this.addUIContainer(this._baseFolderWindow);

                    if (!this._folderPanel) {
                        this._folderPanel = new OssFolderPanel();
                    }
                    this.addUIContainer(this._folderPanel);



                    if (!this._fileListPanel) {
                        this._fileListPanel = new FileListPanel();
                    }
                    this.addUIContainer(this._fileListPanel);
                    if (this.fristRect) {
                        this._baseFolderWindow.setRect(this.fristRect)
                    }
                }
                if (_folderEvent.type == FolderEvent.EDITSCENE_RESET_SIZE) {
                    if (this._baseFolderWindow) {
                        this._baseFolderWindow.setRect(_folderEvent.data)
                    } else {
                        this.fristRect = _folderEvent.data
                    }
                }
                if (_folderEvent.type == FolderEvent.LIST_DIS_ALL_FILE) {
                    this._fileListPanel.refrishPath(String(_folderEvent.data));
                }
                if (_folderEvent.type == FolderEvent.RESET_FOLDE_WIN_SIZE) {
                    this.resetFolderWinSize();
                }

            }
        }
        private resetFolderWinSize(): void {
            var A: Rectangle = this._baseFolderWindow.getPageRect().clone();
            var num40=20 //位移40.比底小
            A.y += num40;
            A.height -= num40;


            this._folderPanel.setRect(new Rectangle(A.x, A.y, A.width * this._baseFolderWindow.percentNum, A.height - 20));

            var B: Rectangle = new Rectangle(A.width * this._baseFolderWindow.percentNum, A.y+20 , A.width * (1 - this._baseFolderWindow.percentNum), A.height);
            B.x += 10;
            B.height -= 5-20;
            B.width -= 8;
            this._fileListPanel.setRect(B);
        }
        private fristRect: Rectangle
        private folderPanel: win.Panel;
        private addOtherPanel(): void {
            win.LayerManager.getInstance().addPanel(new Panel, 200)
        }
        private addUIContainer(value: UIConatiner): void {
            if (!this.folderPanel) {
                this.folderPanel = new Panel()
                this.folderPanel.x = 0
                this.folderPanel.y = 0
                this.folderPanel.width = 450
                this.folderPanel.height = 250
                win.LayerManager.getInstance().addPanel(this.folderPanel, 200)
                // this.addOtherPanel()
            }
            this.folderPanel.addUIContainer(value)

            //   layout.LayerManager.getInstance().mainTab.addUIContainer(value);
            //  UIManager.getInstance().addUIContainer(value);
        }


        private _fileListPanel: FileListPanel
        private _baseFolderWindow: BaseFolderWindow
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FolderEvent(FolderEvent.SHOW_FOLDER_PANEL),
                new FolderEvent(FolderEvent.RESET_FOLDE_WIN_SIZE),
                new FolderEvent(FolderEvent.EDITSCENE_RESET_SIZE),
                new FolderEvent(FolderEvent.LIST_DIS_ALL_FILE),

            ];
        }
    }

}