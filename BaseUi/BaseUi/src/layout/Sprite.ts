module layout {
    import Rectangle = Pan3d.Rectangle
    export class Sprite extends LayUIManager {
        private winBg: LayBaseTab;
        private rect: Rectangle
        public constructor() {
            super();
            this.rect = new Rectangle(0,0, 250, 250)
            this.winBg = new LayBaseTab();
            this.addUIContainer(this.winBg)
            this.changeSize()
        }
        public update(): void {
            for (var i: number = 0; i < this.winBg.renderList.length; i++) {
                   this.winBg.renderList[i].update();
            }
            super.update();
        }
        public resize(): void {
            super.resize()
        }
        public set x(value: number) {
            this.rect.x = value;
        }
        public get x() {
            return this.rect.x;
        }

        public set y(value: number) {
     
            this.rect.y = value;
           
        }
        public get y() {
            return this.rect.y;
        }
        public set width(value: number) {

            this.rect.width = value;
  
        }
        public get width() {
            return this.rect.width
        }
        public set height(value: number) {
            this.rect.height = value;
  
        }
        public get height() {
            return this.rect.height;
        }
        public changeSize(): void {
            this.winBg.pageRect = this.rect
        }

    }
}

