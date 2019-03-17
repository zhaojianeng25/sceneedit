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
            }
        }
        public removeUIContainer($container: UIConatiner): void {
            super.removeUIContainer($container)
        }
    }
    export class EditScenePanel extends Panel {
        public constructor() {
            super(false);
            this.addCenten();
            this.addRight()
            this.addLeft();
     
  
            this.addSceneLaoutLinePane()

            this.addTop()
           
            this.resize()
        
        }
        public showofHide(panel: Panel): void {
       
        
        }
 
        private _sceneLaoutLinePane: EditSceneLine
        private  addSceneLaoutLinePane(): void {
            this._sceneLaoutLinePane = new EditSceneLine
            this._sceneLaoutLinePane.x = 0
            this._sceneLaoutLinePane.y = 0
            this.addChild(this._sceneLaoutLinePane)
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
        private menuHeight: number=22
      
   

    }
}

