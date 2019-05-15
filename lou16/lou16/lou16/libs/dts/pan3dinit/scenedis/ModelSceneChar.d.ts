declare module scenedis.me {
    class ModelSceneChar extends Pan3d.me.SceneChar {
        setWeaponByAvatar(avatar: number, $suffix?: string): void;
        setWingByID($wingId: string): void;
        setMountById($mountId: string): void;
    }
}
