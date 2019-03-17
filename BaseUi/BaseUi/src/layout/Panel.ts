module layout {
    import Rectangle = Pan3d.Rectangle
    import UICompenent = Pan3d.UICompenent
    import Vector2D = Pan3d.Vector2D
    
    export class Panel extends Sprite {
        protected winBg: LayoutbaseBg;
        public ishide: boolean
        public layer=0
        public constructor(has: boolean = true) {
            super();
            if (has) {
                this.winBg = new LayoutbaseBg();
                this.addUIContainer(this.winBg)
                this.changeSize()
            }
        }
        public setShowUi(value: Array<string>): void {
            this.winBg.setShowUi(value)
        }
        public changeSize(): void {
            if (this.winBg) {
                this.winBg.setRect (this.rect)

            }
   
        }
        

    }
}

