module editscene {
    import Panel = win.Panel;
    import Rectangle = Pan3d.me.Rectangle
    import UIConatiner = Pan3d.me.UIConatiner
    import LayoutbaseBg = win.LayoutbaseBg
 
    export class CentenPanel extends Panel {
        public addUIContainer($container: UIConatiner): void {
            //特殊处理，删除非底层背景
            //for (var i: number = this._containerList.length - 1; i >= 0; i--) {
            //    this.removeUIContainer(this._containerList[i]);
            //}
            while (this._containerList.length) {
                this.removeUIContainer(this._containerList[0]);
            }

            if ($container) {
                super.addUIContainer($container)
            }
        }
 
    }

    export class MainRightBaseWin extends win.BaseWindow {

        protected loadConfigCom(): void {
            super.loadConfigCom();
            this.setUiListVisibleByItem([this.e_panel_1], true)
        }
 
    }
    export class MainRightPanel extends Panel {
        protected winBg: MainRightBaseWin;
        public constructor(has: boolean = true) {
            super();
            if (has) {
                this.winBg = new MainRightBaseWin();
                this.addUIContainer(this.winBg)
                this.changeSize()
            }
        }
        public changeSize(): void {
            if (this.winBg) {
                this.winBg.setRect(this.rect)
            }
        }

    }
    export class EditScenePanel extends Panel {
        public constructor() {
            super();
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
            var temp: CentenPanel = new CentenPanel();
            temp.x = 600
            temp.y = 0
            temp.width = 450
            temp.height = 10
            this.addChild(temp)
            AppData.centenPanel = temp
        }

        private addRight(): void {
            var temp: MainRightPanel = new MainRightPanel(true);
            temp.x = 1000
            temp.y = 0
            temp.width = 450
            temp.height = 500
            this.addChild(temp)

            //var eee: MainRightPanel = new MainRightPanel();
            //temp.addUIContainer(eee)
            //eee.left = 500

 
            
            AppData.rightPanel = temp

        }
        private addTop(): void {
            var tempPanel: Panel = new Panel();
            tempPanel.x = 0
            tempPanel.y = 0
            tempPanel.width = 450
            tempPanel.height = 30
            this.addChild(tempPanel)
            AppData.topPanel = tempPanel
  
        }
     
        private addLeft(): void {
            var temp: EditLeftPanel = new EditLeftPanel();
  
            temp.x = 0;
            temp.y = 50;
            temp.width = 450;
            temp.height = 500;
            this.addChild(temp);
            EditLeftPanel.leftPanel = temp;
        }
  
      
   

    }
}

