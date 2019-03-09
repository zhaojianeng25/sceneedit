module filelist {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class PrefabMeshView extends MetaDataView {
        private prefabStaticMesh: PrefabStaticMesh
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "material", Category: "属性" },
                    { Type: ReflectionData.Texturue2DUI, Label: "模型:", FunKey: "objsurl", target: this, Suffix: "objs", Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "名字:", FunKey: "sunColor", target: this, Step: 0.1 },
                ];
            return ary;
        }
        private textureChangeInfo(value: Array<any>): void {
            this.prefabStaticMesh.paramInfo = value;
            this.saveToSever()

        }

        public getParamItem(value: string): any {
            for (var i: number = 0; this.prefabStaticMesh.paramInfo && i < this.prefabStaticMesh.paramInfo.length; i++) {
                if (this.prefabStaticMesh.paramInfo[i].paramName == value) {
                    return this.prefabStaticMesh.paramInfo[i].data
                }
            }
            return null
        }
        public set texture(value: Material) {
            this.prefabStaticMesh.material = value
            this.refreshViewValue()
        }
        public get texture(): Material {
            return this.prefabStaticMesh.material
        }
        public set objsurl(value: string) {
            this.prefabStaticMesh.objsurl = value
            this.saveToSever()
        }
        public get objsurl(): string {
            return this.prefabStaticMesh.objsurl
        }

        public set data(value: any) {
            this._data = value;
            this.prefabStaticMesh = this._data
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }

        public get sunColor(): Vector3D {
            return this.prefabStaticMesh.sunColor
        }
        public set sunColor(value: Vector3D) {
            this.prefabStaticMesh.sunColor = value

            console.log("颜色变化")

        }

        private isSaveNow: boolean;
        private lastTm: number
        private saveTm: number
        public saveToSever(): void {
            this.lastTm = Pan3d.TimeUtil.getTimer()
            if (!this.isSaveNow) {
                this.isSaveNow = true
                this.saveTm = this.lastTm;

                var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
                var $fileName: string = "newfiletxt.prefab";
                this.prefabStaticMesh.textureurl = this.prefabStaticMesh.material.url;
                var $obj: any = JSON.stringify(this.prefabStaticMesh);
                $byte.writeUTF($obj)
                var $file: File = new File([$byte.buffer], $fileName);
                var pathurl: string = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");

                filemodel.FileModel.getInstance().upOssFile($file, pathurl + $file.name, () => {
                    this.isSaveNow = false
                    if (this.lastTm != this.saveTm) {
                        console.log("不是最后一次，所以需要再存一次")
                        Pan3d.TimeUtil.addTimeOut(1000, () => {
                            this.saveToSever();
                        })
                    } else {
                        console.log("更新Prafab完成", pathurl + $file.name);
                    }
                })
            } else {
                console.log("正在处理保存")
            }
 
        }


    }
}