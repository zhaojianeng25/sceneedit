declare module Pan3d.me {
    class BaseEvent {
        type: string;
        data: any;
        target: EventDispatcher;
        constructor($type: string);
        static COMPLETE: string;
    }
}
