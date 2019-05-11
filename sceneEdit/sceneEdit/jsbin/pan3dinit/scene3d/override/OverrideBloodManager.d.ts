declare module scene3d.me {
    class ExpTextJumpUiDrawAndRefreash256 extends Pan3d.me.ExpTextJumpUiDrawAndRefreash {
        protected drawTxtBydigitalAndtext($vo: Pan3d.me.TextJumpUiVo): number;
    }
}
declare module scene3d.me {
    class OverrideBloodManager extends Pan3d.me.BloodManager {
        static getInstance(): OverrideBloodManager;
        private _jumpText256_256;
        constructor();
        setExpJump256_256Num($textJumpUiVo: Pan3d.me.TextJumpUiVo): void;
    }
}
