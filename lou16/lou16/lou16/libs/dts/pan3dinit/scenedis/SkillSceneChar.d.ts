declare module scenedis.me {
    class SkillSceneChar extends Pan3d.me.SceneChar {
        onMeshLoaded(): void;
        loadFinishFun: Function;
        changeActionFun: Function;
        changeAction($action: string): void;
        setWeaponByAvatar(avatar: number, $suffix?: string): void;
    }
}
