
declare module layapan {
    import CharNameMeshVo = Pan3d.CharNameMeshVo;
    import BloodLineMeshVo = Pan3d.BloodLineMeshVo;
    import EdItorSceneManager = maineditor.EdItorSceneManager
    import LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar
    class LayaSceneChar extends LayaScene2dSceneChar {

    }
    class BloodManager  {
        public getCharNameMeshVo(value: string): CharNameMeshVo;
        public getBloodLineMeshVo(): BloodLineMeshVo;
        public getCharTitleMeshVo(value: any): any

    }
    class LayaOverride2dSceneManager extends EdItorSceneManager {
        public bloodManager: BloodManager

    }


    
}