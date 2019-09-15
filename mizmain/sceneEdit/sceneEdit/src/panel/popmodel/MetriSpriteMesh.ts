﻿module popmodel {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;
    import UiMeshSprite = prop.UiMeshSprite
 

    export class MetriMeshSprite extends prop.UiMeshSprite {
        public resize(): void {
            super.resize();
        }
 
    }



    export class MetriSpriteMesh extends MetaDataView {
        public constructor(value: UiMeshSprite) {
            super(value);
 
        }
       
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                   
                    { Type: ReflectionData.Vec3Color, Label: "模型列表:", FunKey: "sunDirect", target: this, Step: 0.1 , Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "sun颜色:", FunKey: "sunColor", target: this, Step: 0.,  Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
                ];
            return ary;
        }
        public set data(value: any) {
            this._data = value;
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