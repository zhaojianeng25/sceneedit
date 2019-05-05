declare module layapan.me {
    import Display3dMovie = Pan3d.me.Display3dMovie;
    class LayaOverride2dSceneManager extends scene3d.me.OverrideSceneManager {
        private static sceneNum;
        constructor();
        shadowManager: LayaOverrideShadowManager;
        groupDataManager: LayaOverrideGroupDataManager;
        skillManager: LayaOverride2dSkillManager;
        particleManager: LayaOverride2dParticleManager;
        static initConfig(): void;
        update(): void;
        changeBloodManager($bloodManager: Pan3d.me.BloodManager): void;
        addMovieDisplay($display: Display3dMovie): void;
        loadSceneConfigCom(obj: any): void;
        playLyf($url: string, $pos: Pan3d.me.Vector3D, $r?: number): void;
        charPlaySkill($char: layapan.me.LayaSceneChar, $skillfile: string): void;
        protected onPlayCom(value: Pan3d.me.BaseEvent): void;
        cameraMatrix: Pan3d.me.Matrix3D;
        viewMatrx3D: Pan3d.me.Matrix3D;
        upFrame(): void;
    }
}
