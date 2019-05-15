declare module Pan3d.me {
    class ViewFrustum {
        private capsuleLineSprite;
        private panleAry;
        private dataAry;
        constructor();
        init(): void;
        setCam(): void;
        private getPanle;
        private getPanelByVec;
        setData(obj: any): void;
        setViewFrustum(): void;
    }
}
