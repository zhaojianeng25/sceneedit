declare module scene2d.me {
    class Scene2dChar extends Pan3d.me.SceneChar {
        setWeaponByAvatar(avatar: number, $suffix?: string): void;
        setWingByID($wingId: string): void;
        setMountById($mountId: string): void;
        set2dPos($x: number, $y: number): void;
        rotationY: number;
    }
}
