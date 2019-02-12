module layout {
    import Rectangle = Pan3d.Rectangle
    import UICompenent = Pan3d.UICompenent
    import Vector2D = Pan3d.Vector2D

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
        public getObjectsUnderPoint(evt: Vector2D): UICompenent {
            for (var i: number = this.uiList.length - 1; i >= 0; i--) {
                if (this.uiList[i]) {
                    if (this.uiList[i] && this.uiList[i].insetUi(evt)) {
                        return this.uiList[i].insetUi(evt);
                    }
                }
            }
            return null
        }

    }
}

