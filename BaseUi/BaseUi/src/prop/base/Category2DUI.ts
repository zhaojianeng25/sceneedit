module prop {

    
    import UIAtlas = Pan3d.UIAtlas;
    import TextureManager = Pan3d.TextureManager
    import UIManager = Pan3d.UIManager
    import UIRectangle = Pan3d.UIRectangle
    import Scene_data = Pan3d.Scene_data
    import LoadManager = Pan3d.LoadManager
 
    export class Category2DUI extends BaseReflComponent {

        private categoryBgUi: BaseMeshUi;
        private categoryIcon: BaseMeshUi;
        private categoryOpen: BaseMeshUi;
        private textLabelUI: TextLabelUI;
  
 

        protected initView(): void {
            this.categoryBgUi = new BaseMeshUi();
            this.categoryIcon = new BaseMeshUi(20,20);
            this.categoryOpen = new BaseMeshUi(20,20);
            this.textLabelUI = new TextLabelUI();
 
            this.height = 25

            this.categoryBgUi.ui.width = 400;
            this.categoryBgUi.ui.height = this.height-5

 

            this.drawOutColor(this.categoryBgUi.ui, new Vector3D(79, 79, 79))
 

  

            this.drawUrlImgToUi(this.categoryIcon.ui, "icon/profeb_16.png")
            this.drawUrlImgToUi(this.categoryOpen.ui, "icon/icon_PanRight.png")
        }
      
        public resize(): void {
 
            this.categoryBgUi.ui.width = this.width
        }
        public destory(): void {
            this.textLabelUI.destory()
            this.categoryBgUi.destory()
            this.categoryIcon.destory();
            this.categoryOpen.destory();
 
        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }
      
        public refreshViewValue(): void {

          

        }
 
        public set x(value: number) {
            this._x = value;
            this.textLabelUI.x = this._x + 50;
            this.categoryBgUi.x = 0
            this.categoryOpen.x = 5;
            this.categoryIcon.x = 30
  
        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;
            this.textLabelUI.y = this._y+5
            this.categoryBgUi.y = this._y

            this.categoryIcon.y = this._y+5
            this.categoryOpen.y = this._y+5
        }
        public get y(): number {
            return this._y
        }
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value
            this.textLabelUI.label = value;
        }
    }

}