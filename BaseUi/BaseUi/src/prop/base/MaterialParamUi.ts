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


        private prefabStaticMesh: any;
        public setData($materialTree: materialui.MaterialTree, $prefabStaticMesh: any): void {
            this.destory();
            this.prefabStaticMesh =  $prefabStaticMesh  ; 

            var $changFun: Function = (value: any) => {  this.changeDataEvtFun(value) }
 
            for (var i: number = 0; i < $materialTree.data.length; i++) {
                if ($materialTree.data[i].data.isDynamic) {
                    if ($materialTree.data[i].type == materialui.NodeTree.TEX) {
                        var tempTexturue2DUI: Texturue2DUI= new Texturue2DUI();
                        tempTexturue2DUI.target = $materialTree.data[i].data;
                        tempTexturue2DUI.label = $materialTree.data[i].data.paramName;
                        tempTexturue2DUI.FunKey = "url";
                        this.uiItem.push(tempTexturue2DUI);
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.VEC3) {
                        var tempVec3ColorCtrlUI: Vec3ColorCtrlUI = new Vec3ColorCtrlUI();
                        tempVec3ColorCtrlUI.target = $materialTree.data[i].data;
                        tempVec3ColorCtrlUI.label = $materialTree.data[i].data.paramName;
                        tempVec3ColorCtrlUI.FunKey = "constValue";
                        tempVec3ColorCtrlUI.changFun = $changFun
                        this.uiItem.push(tempVec3ColorCtrlUI);
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.FLOAT) {
                        var tempTextCtrlInput: TextCtrlInput = new TextCtrlInput();
                        tempTextCtrlInput.target = $materialTree.data[i].data;
                        tempTextCtrlInput.label = $materialTree.data[i].data.paramName;
                        tempTextCtrlInput.FunKey = "constValue";
                        tempTextCtrlInput.changFun = $changFun
                        this.uiItem.push(tempTextCtrlInput);
                    }
                }
            }
            this.refreshViewValue()
      
        }
        private changeDataEvtFun(temp: BaseReflComponent): void {
 
            var infoArr: Array<any> = [];
            for (var i: number = 0; i < this.uiItem.length; i++) {
                if (this.uiItem[i].target.isDynamic) {
                    infoArr.push(this.uiItem[i].target)
                }
    
            }
            this.prefabStaticMesh.materialInfoArr = infoArr
 
       
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
            this.height = 50;
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].y = this.y + ty
  
                if (this.uiItem[i] instanceof Vec3ColorCtrlUI) {
                    ty += 50
                    this.uiItem[i].x = 50
                    this.height += 50
                }
                if (this.uiItem[i] instanceof TextCtrlInput) {
                    ty += 50
                    this.uiItem[i].x = 50
                    this.height += 50
                }
                if (this.uiItem[i] instanceof Texturue2DUI) {
                    ty += 100
                    this.uiItem[i].x = 50
                    this.height += 100
                }

                
            }
            this.height += 50

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