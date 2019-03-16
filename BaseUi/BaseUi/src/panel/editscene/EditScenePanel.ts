module editscene {
    import Panel = layout.Panel;
    import Rectangle = Pan3d.Rectangle
    import Vector2D = Pan3d.Vector2D
    import Scene_data = Pan3d.Scene_data
    import UIConatiner = Pan3d.UIConatiner
    import LoadManager = Pan3d.LoadManager
 

    import LayoutbaseBg = layout.LayoutbaseBg

 

    export class CentenPanel extends Panel {
        public constructor(has: boolean = true) {
            super(has);
 
        }
        public changeSize(): void {
            if (this.winBg) {
                this.winBg.setRect(new Rectangle(this.rect.x, this.rect.y, this.rect.width, 300))
            }
        }
  
        public addUIContainer($container: UIConatiner): void {
            //特殊处理，删除非底层背景
            for (var i: number = this._containerList.length - 1; i > 0; i--) {
                if (!(this._containerList[i] instanceof LayoutbaseBg)) {
                    this.removeUIContainer(this._containerList[i]);
                }
            }
            if ($container) {
                super.addUIContainer($container)
             //   console.log("添加", this._containerList.length)
            } else {
          //      console.log("清理主UI")
            }
          
        }
        public removeUIContainer($container: UIConatiner): void {
            super.removeUIContainer($container)
          //  console.log("删除", this._containerList.length)
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

            this.addTop()
           
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
            var temp: CentenPanel = new CentenPanel(true);
          //  temp.setShowUi(["c_win_bg"]);
            temp.x = 600
            temp.y = 0
            temp.width = 450
            temp.height = 10
            this.addChild(temp)
            BaseUiStart.centenPanel = temp
        }

        private addRight(): void {
            var temp: Panel = new Panel(true);
            temp.setShowUi(["c_left_line","c_win_bg"]);

            temp.x = 600
            temp.y = 0
            temp.width = 450
            temp.height = 500
            this.addChild(temp)
            BaseUiStart.rightPanel = temp

        }
        private addTop(): void {
            var tempPanel: Panel = new Panel(false);
            tempPanel.x = 0
            tempPanel.y = 0
            tempPanel.width = 450
            tempPanel.height = 30
            this.addChild(tempPanel)
            BaseUiStart.topPanel = tempPanel

      

        }
     
        private addLeft(): void {
            var temp: Panel = new Panel(true);
            temp.setShowUi(["c_right_line", "c_win_bg"]);
            temp.x = 0;
            temp.y = 50;
            temp.width = 450;
            temp.height = 500;
            this.addChild(temp);
            BaseUiStart.leftPanel = temp;
        }
        private menuHeight: number=20
        public resize(): void {

            BaseUiStart.leftPanel.y = this.menuHeight
            BaseUiStart.centenPanel.y = this.menuHeight
            BaseUiStart.rightPanel.y = this.menuHeight
            this.leftMoveLine.y = this.menuHeight
            this.rightMoveLine.y = this.menuHeight

            BaseUiStart.leftPanel.height = this.bottomMoveLine.y - BaseUiStart.leftPanel.y;
            BaseUiStart.leftPanel.width = this.leftMoveLine.x+3;

 
            this.leftMoveLine.height = this.bottomMoveLine.y  - this.leftMoveLine.y
            this.rightMoveLine.height = Scene_data.stageHeight - this.rightMoveLine.y

    
            BaseUiStart.rightPanel.width = Scene_data.stageWidth - this.rightMoveLine.x - 0
            BaseUiStart.rightPanel.x = Scene_data.stageWidth - BaseUiStart.rightPanel.width
            BaseUiStart.rightPanel.height = Scene_data.stageHeight - BaseUiStart.rightPanel.y;

            this.bottomMoveLine.width = BaseUiStart.rightPanel.x-0
            this.bottomMoveLine.x = 0

            BaseUiStart.centenPanel.x = BaseUiStart.leftPanel.width;
            BaseUiStart.centenPanel.height = BaseUiStart.leftPanel.height;
            BaseUiStart.centenPanel.width = BaseUiStart.rightPanel.x - BaseUiStart.centenPanel.x;

            BaseUiStart.centenPanel.resize();
            BaseUiStart.rightPanel.resize();

            super.resize();

            var rect: Rectangle = new Rectangle(0, this.bottomMoveLine.y + 0, this.bottomMoveLine.width, Scene_data.stageHeight - this.bottomMoveLine.y -15)

            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect); Pan3d.ModuleEventManager.dispatchEvent(new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE), rect);
        }
        

    }
}

