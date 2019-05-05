declare module Pan3d.me {
    class GroupDataManager extends ResGC {
        protected _loadDic: Object;
        private static _instance;
        static getInstance(): GroupDataManager;
        getGroupData($url: string, $fun: Function): void;
    }
}
