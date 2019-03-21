module materialleft {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;
    import UiMeshSprite = prop.UiMeshSprite





    export class MateriaMeshView extends MetaDataView {
        public constructor(value: UiMeshSprite) {
            super(value);

        }

        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    {
                        Type: ReflectionData.ComboBox, Label: "渲染模式:", FunKey: "rendermodel", target: this, Data: [
                            { name: "普通模式", type: 0 },
                            { name: "透明模式", type: 1 },
                            { name: "叠加模式", type: 2 }],
                        Category: "设置"
                    },

             
                    { Type: ReflectionData.CheckBox, Label: "深度测试:", FunKey: "zbuff", target: this, Category: "设置" },
                    {  Type: ReflectionData.CheckBox, Label: "点灯光:", FunKey: "pointlight", target: this,   Category: "设置"  },

                    { Type: ReflectionData.Vec3Color, Label: "模型列表:", FunKey: "sunDirect", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "sun颜色:", FunKey: "sunColor", target: this, Step: 0., Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },

                ];
            return ary;
        }
        public get rendermodel(): number {
            return this._materialTree.rendermodel
        }
        public set rendermodel(value: number) {
            this._materialTree.rendermodel = value

        }
        public get zbuff(): boolean {
            return this._materialTree.zbuff
        }
        public set zbuff(value: boolean) {
            this._materialTree.zbuff = value

        }
        public get pointlight(): boolean {
            return this._materialTree.pointlight
        }
        public set pointlight(value: boolean) {
            this._materialTree.pointlight = value

        }

        private _materialTree: materialui.MaterialTree
        public set data(value: any) {
            this._data = value;
            this._materialTree = value;
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }
        public get sunDirect(): Vector3D {
            return new Vector3D(Scene_data.light.sunDirect[0], Scene_data.light.sunDirect[1], Scene_data.light.sunDirect[2]);
        }
        public set sunDirect(value: Vector3D) {
            Scene_data.light.sunDirect[0] = value.x;
            Scene_data.light.sunDirect[1] = value.y;
            Scene_data.light.sunDirect[2] = value.z;
        }

        public get sunColor(): Vector3D {
            return new Vector3D(Scene_data.light.sunColor[0], Scene_data.light.sunColor[1], Scene_data.light.sunColor[2]);
        }
        public set sunColor(value: Vector3D) {
            Scene_data.light.sunColor[0] = value.x;
            Scene_data.light.sunColor[1] = value.y;
            Scene_data.light.sunColor[2] = value.z;
        }

        public get ambientColor(): Vector3D {
            return new Vector3D(Scene_data.light.ambientColor[0], Scene_data.light.ambientColor[1], Scene_data.light.ambientColor[2]);
        }
        public set ambientColor(value: Vector3D) {
            Scene_data.light.ambientColor[0] = value.x;
            Scene_data.light.ambientColor[1] = value.y;
            Scene_data.light.ambientColor[2] = value.z;
        }
        public resize(): void {
            super.resize()

        }



    }
}