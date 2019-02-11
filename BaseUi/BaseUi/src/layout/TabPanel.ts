module layout {
    import Rectangle = Pan3d.Rectangle
    export class TabPanel extends LayUIManager {
        private winBg: LayBaseTab;
        public constructor() {
            super();
            this.winBg = new LayBaseTab();
            this.winBg.pageRect = new Rectangle(random(300), random(300), 200, 500)
           
        }
        public update(): void {
            for (var i: number = 0; i < this.winBg.renderList.length; i++) {
              //  this.winBg.renderList[i].update();
            }
            super.update();
        }
        public resize(): void {
            super.resize()
            this.winBg.resize();
        
        }
     
    }
}

