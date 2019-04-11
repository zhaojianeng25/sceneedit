module prop {
    import Vector2D = Pan3d.Vector2D
    import ModuleEventManager = Pan3d.ModuleEventManager;
    export class Vec2PropMeshPanel extends MetaDataView {
        private constVec2NodeUI: materialui.ConstVec2NodeUI;
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.NumberInput, Label: "x:", FunKey: "constXValue", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.NumberInput, Label: "y:", FunKey: "constYValue", target: this, Step: 0.1, Category: "属性" },


                ];
            return ary;
        }
   
        public set data(value: any) {
            this._data = value;
            this.constVec2NodeUI = this._data;
            this.refreshViewValue();
        }
        public get data(): any {
            return this._data;
        }
        public get constXValue(): number {
            return this.constVec2NodeUI.constValue.x;
        }
        public set constXValue(value: number) {
            this.constVec2NodeUI.constValue.x = value;
            this.changeData();
        }

        public get constYValue(): number {
            return this.constVec2NodeUI.constValue.y;
        }
        public set constYValue(value: number) {
            this.constVec2NodeUI.constValue.y = value;
            this.changeData()
        }
        private changeData(): void {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        }
    }
}