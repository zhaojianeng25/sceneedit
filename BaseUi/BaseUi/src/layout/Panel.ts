module layout {
    import Rectangle = Pan3d.Rectangle
    export class Panel extends Sprite {
        private winBg: LayBaseTab;
        public constructor(has: boolean = true) {
            super();

            if (has) {
                this.winBg = new LayBaseTab();
                this.addUIContainer(this.winBg)
                this.changeSize()
            }
     
        }
        
        public changeSize(): void {
            if (this.winBg) {
                this.winBg.pageRect = this.rect

            }
   
        }
    }
}

