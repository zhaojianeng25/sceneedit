module layout {
    import Rectangle = Pan3d.Rectangle
    export class Panel extends Sprite {
        private winBg: LayoutbaseBg;
        public constructor(has: boolean = true) {
            super();
            if (has) {
                this.winBg = new LayoutbaseBg();
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

