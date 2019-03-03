module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
    export class MaterialParamUi extends BaseReflComponent {

 
        private _label: string

        private uiItem: Array<BaseReflComponent>

        protected initView(): void {
            this.height = 100
            this.uiItem = [ ]
        }


        public setData($materialTree: materialui.MaterialTree, $prefabStaticMesh: Object): void {
            this.destory();
 
            for (var i: number = 0; i < $materialTree.data.length; i++) {
                if ($materialTree.data[i].data.isDynamic ) {
                    if ($materialTree.data[i].type == "tex") {
                        var temp = new Texturue2DUI();
                        temp.target = $materialTree.data[i].data;
                        temp.label = $materialTree.data[i].data.name
                        temp.FunKey = "url";
                        this.uiItem.push(temp);
                    }
                }
            }
            this.refreshViewValue()
      
        }
        public get paramInfo() {
            return "c.png"
        }
        public set paramInfo(value: any) {
       
        }

        public refreshViewValue(): void {
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].refreshViewValue()
            }
        }
  
        public destory(): void {
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].destory()
            }
            this.uiItem=[]
 

        }
        public set data(value: any) {
            this._data = value;

        }
        public get data(): any {
            return this._data
        }

     
        public set x(value: number) {
            this._x = value;
   


        }
        public get x(): number {
            return this._x
        }

        public set y(value: number) {
            this._y = value;

            var ty: number = 10
            this.height = 60;
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].y = this.y + ty
  
                if (this.uiItem[i] instanceof Texturue2DUI) {
                    ty += 30
                    this.uiItem[i].x = 10
                }
                if (this.uiItem[i] instanceof Texturue2DUI) {
                    ty += 70
                    this.uiItem[i].x = 50
                    this.height += 70
                }
            }


        }
        public get y(): number {
            return this._y
        }
        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value
 
        }
    

    }



}