declare module left {
    import Display3dMovie = Pan3d.me.Display3dMovie;
    import MeshData = Pan3d.me.MeshData;
    import MaterialBaseParam = Pan3d.me.MaterialBaseParam;
    import Material = Pan3d.me.Material;
    import SkinMesh = Pan3d.me.SkinMesh;
    import Skill = Pan3d.me.Skill;
    class MaterialRoleSprite extends Display3dMovie {
        update(): void;
        skinMesh: SkinMesh;
        animDic: any;
        updateFrame(t: number): void;
        setVcMatrix($mesh: MeshData): void;
        updateMaterialMesh($mesh: MeshData): void;
        setMaterialTexture($material: Material, $mp?: MaterialBaseParam): void;
        skillVo: Skill;
        protected _walkPath: Array<Vector3D>;
        playSkill($skill: Skill): void;
        setVaCompress($mesh: MeshData): void;
        changeRoleWeb(dis: md5list.Md5MoveSprite): void;
        private getmeshBoneQPAryDic;
        roleStaticMesh: pack.RoleStaticMesh;
        setRoleZwwUrl(url: string): void;
        private meshParamInfo;
    }
}
