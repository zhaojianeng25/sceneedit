declare module Pan3d.me {
    class ModuleEventManager {
        private static _instance;
        static addEvents(ary: Array<BaseEvent>, $fun: Function, $thisObj: any): void;
        static dispatchEvent($event: BaseEvent, $data?: any): void;
    }
}
