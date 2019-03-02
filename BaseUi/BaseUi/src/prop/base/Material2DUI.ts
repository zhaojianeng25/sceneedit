module prop {
    import TextureManager = Pan3d.TextureManager
    import Scene_data = Pan3d.Scene_data
   
    export class Material2DUI extends Texturue2DUI {
        protected initView(): void {
            super.initView();

            this.height = 200
        }
        public set data(value: any) {
            this._data = value;

            console.log("data", value)

        }
        public refreshViewValue(): void {
            super.refreshViewValue();
            console.log("材质对象")

            

        }
    }

}