declare module Pan3d.me {
    class ShadowManager {
        private static _instance;
        static getInstance(): ShadowManager;
        private _displayList;
        constructor();
        addShadow(): Shadow;
        removeShadow(sd: Shadow): void;
        update(): void;
        private getIdleShadow;
    }
}
