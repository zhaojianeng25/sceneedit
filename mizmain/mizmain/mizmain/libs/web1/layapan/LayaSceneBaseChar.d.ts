/**
* name
*/
declare module layapan_me {
    import GroupRes = Pan3d.GroupRes;
    class LayaSceneBaseChar extends Pan3d.Display3dMovie {
        private _avatar;
        _visible: boolean;
        isBuff: boolean;
        _isBattle: boolean;
        isBattle: boolean;
        alpha: number;
        visible: boolean;
        setAvatar(num: number): void;
        shadow: boolean;
        update(): void;
        protected getSceneCharAvatarUrl(num: number): string;
        protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
        isPlaying(): boolean;
        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void;
        removeStage(): void;
        px: number;
        py: number;
        pz: number;
        addSkinMeshParticle(): void;
    }
}
