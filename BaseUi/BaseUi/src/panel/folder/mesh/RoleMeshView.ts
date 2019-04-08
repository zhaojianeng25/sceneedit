module filelist {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
 
    import RoleStaticMesh = pack.RoleStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class RoleMeshView extends MetaDataView {
        private prefabStaticMesh: RoleStaticMesh
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "prebaburl", target: this, Category: "模型" },
                    { Type: ReflectionData.Texturue2DUI, Label: "模型:", FunKey: "objsurl", target: this, Suffix: "objs", Category: "模型" },

                    { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "material", Category: "材质" },
                ];
            return ary;
        }
        private textureChangeInfo(value: Array<any>): void {
            this.prefabStaticMesh.paramInfo = value;
            this.saveToSever()
            this.chuangeData()

        }
        private chuangeData(): void {
            this.prefabStaticMesh.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE))
        }
        public getParamItem(value: string): any {
            for (var i: number = 0; this.prefabStaticMesh.paramInfo && i < this.prefabStaticMesh.paramInfo.length; i++) {
                if (this.prefabStaticMesh.paramInfo[i].paramName == value) {
                    return this.prefabStaticMesh.paramInfo[i].data
                }
            }
            return null
        }
        public set prebaburl(value: string) {

        }
        public get prebaburl(): string {
            return ""
        }

        public set texture(value: Material) {
            this.prefabStaticMesh.material = value
            this.refreshViewValue()
        }
        public get texture(): Material {
            return null
        }
        public set objsurl(value: string) {
            this.prefabStaticMesh.objsurl = value
            this.saveToSever()
            this.chuangeData()
        }
        public get objsurl(): string {
            return "0111"
        }

        public set data(value: any) {
            this._data = value;
            this.prefabStaticMesh = this._data
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }


        private isSaveNow: boolean;
        private lastTm: number
        private saveTm: number
        public saveToSever(): void {
            this.lastTm = Pan3d.TimeUtil.getTimer()
            // this.isSaveNow = true

            if (!this.isSaveNow) {
                this.isSaveNow = true
                this.saveTm = this.lastTm;

                var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray();
                var $fileUrl: string = Pan3d.Scene_data.fileRoot + this.prefabStaticMesh.url
                console.log(this.prefabStaticMesh.material)


                this.prefabStaticMesh.textureurl = this.prefabStaticMesh.material.url;

                $byte.writeUTF(JSON.stringify(this.prefabStaticMesh.getObject()))


                console.log($fileUrl)
                var $file: File = new File([$byte.buffer], "cc.prefab");
                var pathurl: string = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile($file, pathurl, () => {

                    if (this.lastTm != this.saveTm) {
                        console.log("不是最后一次，所以需要再存一次")
                        Pan3d.TimeUtil.addTimeOut(1000, () => {
                            this.isSaveNow = false
                            this.saveToSever();
                        })
                    } else {
                        this.isSaveNow = false
                        console.log("更新Prafab完成", pathurl + $file.name);
                    }
                })
            } else {
                console.log("正在处理保存")
            }

        }


    }
}