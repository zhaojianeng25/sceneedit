module editscene {
    import Panel = layout.Panel;
    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data=Pan3d.Scene_data
    export class EditScenePanel extends Panel {
        public constructor() {
            super(false);
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

        private leftPanel: Panel
        private rightPanel: Panel

        private addRight(): void {
            var temp: Panel = new Panel();
            temp.x = 600
            temp.y = 0
            temp.width = 450
            temp.height = 500
            this.addChild(temp)
            this.rightPanel = temp

        }
        private addLeft(): void {
            var temp: Panel = new Panel();
            temp.x = 0
            temp.y = 0
            temp.width = 450
            temp.height = 500
            this.addChild(temp)
            this.leftPanel = temp

      
        }
        public resize(): void {

            this.leftPanel.height = this.bottomMoveLine.y
            this.leftPanel.width = this.leftMoveLine.x;
            this.rightPanel.height = Scene_data.stageHeight

            this.leftMoveLine.x = this.leftPanel.width;
            this.leftMoveLine.height = this.leftPanel.height;

            this.rightMoveLine.height = Scene_data.stageHeight

            this.rightPanel.width = Scene_data.stageWidth - this.rightMoveLine.x - 10
            this.rightPanel.x = Scene_data.stageWidth - this.rightPanel.width

            this.bottomMoveLine.width = this.rightPanel.x-10
            this.bottomMoveLine.x = 0


            super.resize()

            var rect: Rectangle = new Rectangle(0, this.bottomMoveLine.y+10, this.bottomMoveLine.width, Scene_data.stageHeight - this.bottomMoveLine.y-15)
 
            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect);
        }
        

    }
}

