declare module layapan.me {
    class LayaGroupRes extends Pan3d.me.GroupRes {
        constructor();
        scene: LayaOverride2dSceneManager;
        readParticle(): void;
    }
    class LayaOverrideGroupDataManager extends Pan3d.me.GroupDataManager {
        scene: LayaOverride2dSceneManager;
        getGroupData($url: string, $fun: Function): void;
    }
}
