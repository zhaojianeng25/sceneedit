declare module Pan3d.me {
    class Display3dShadow extends Display3D {
        static texture: WebGLTexture;
        shadowList: Array<Shadow>;
        needUpdate: boolean;
        private posProLocation;
        constructor();
        addShadow($shdow: Shadow): void;
        removeShadow($shdow: Shadow): void;
        stateChage(): void;
        hasIdle(): boolean;
        applyObjData(): void;
        private locationFloat32;
        update(): void;
    }
}
