module editscene {
    import Panel = layout.Panel;
    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data
    import LoadManager = Pan3d.LoadManager

    export class CentenPanel extends Panel {
        public changeSize(): void {
            if (this.winBg) {
                this.winBg.pageRect = new Rectangle(this.rect.x, this.rect.y, this.rect.width, 50);
            }
        }
    }
    export class EditScenePanel extends Panel {
        public constructor() {
            super(false);
            this.addCenten();
            this.addRight()
            this.addLeft();

            this.addLeftMoveLine();
            this.addRightMoveLine();
            this.addBottomMoveLine();
           
            this.resize()
        
        }
      
        private bottomMoveLine: EditSceneLineVertical
        private addBottomMoveLine(): void {
            this.bottomMoveLine = new EditSceneLineVertical
            this.bottomMoveLine.y = Scene_data.stageHeight * 0.7
            this.bottomMoveLine.roundPos = new Vector2D(0.5, 0.80);
            this.addChild(this.bottomMoveLine)
        }
        private leftMoveLine: EditSceneLine
        private addLeftMoveLine(): void {
            this.leftMoveLine = new EditSceneLine
            this.leftMoveLine.x = Math.min(Scene_data.stageWidth * 0.20,250)
            this.leftMoveLine.roundPos = new Vector2D(0.15, 0.45);
            this.addChild(this.leftMoveLine)
        }
        private rightMoveLine: EditSceneLine
        private addRightMoveLine(): void {
            this.rightMoveLine = new EditSceneLine
            this.rightMoveLine.x = Math.max(Scene_data.stageWidth * 0.80, Scene_data.stageWidth - 250)
            this.rightMoveLine.roundPos = new Vector2D(0.55, 0.85);
            this.addChild(this.rightMoveLine)
        }

        private addCenten(): void {
            var temp: CentenPanel = new CentenPanel();
            temp.x = 600
            temp.y = 0
            temp.width = 450
            temp.height = 10
            this.addChild(temp)
            BaseUiStart.centenPanel = temp
        }

        private addRight(): void {
            var temp: Panel = new Panel();
            temp.x = 600
            temp.y = 0
            temp.width = 450
            temp.height = 500
            this.addChild(temp)
            BaseUiStart.rightPanel = temp

        }
        private addLeft(): void {
            var temp: Panel = new Panel();
            temp.x = 0
            temp.y = 0
            temp.width = 450
            temp.height = 500
            this.addChild(temp)
            BaseUiStart.leftPanel = temp

      
        }
        public resize(): void {

            BaseUiStart.leftPanel.height = this.bottomMoveLine.y
            BaseUiStart.leftPanel.width = this.leftMoveLine.x;
            BaseUiStart.rightPanel.height = Scene_data.stageHeight

            this.leftMoveLine.x = BaseUiStart.leftPanel.width;
            this.leftMoveLine.height = BaseUiStart.leftPanel.height;

            this.rightMoveLine.height = Scene_data.stageHeight

            BaseUiStart.rightPanel.width = Scene_data.stageWidth - this.rightMoveLine.x - 10
            BaseUiStart.rightPanel.x = Scene_data.stageWidth - BaseUiStart.rightPanel.width

            this.bottomMoveLine.width = BaseUiStart.rightPanel.x-10
            this.bottomMoveLine.x = 0

            BaseUiStart.centenPanel.x = BaseUiStart.leftPanel.width;
            BaseUiStart.centenPanel.height = BaseUiStart.leftPanel.height;
            BaseUiStart.centenPanel.width = BaseUiStart.rightPanel.x - BaseUiStart.centenPanel.x;


            BaseUiStart.centenPanel.resize();
            BaseUiStart.rightPanel.resize();

            super.resize()



            var rect: Rectangle = new Rectangle(0, this.bottomMoveLine.y+10, this.bottomMoveLine.width, Scene_data.stageHeight - this.bottomMoveLine.y-15)

            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect); Pan3d.ModuleEventManager.dispatchEvent(new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE), rect);
        }
        

    }
}

