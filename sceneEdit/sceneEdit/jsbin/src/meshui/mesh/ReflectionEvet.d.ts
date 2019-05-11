declare module prop {
    import BaseEvent = Pan3d.me.BaseEvent;
    class ReflectionEvet extends BaseEvent {
        static CHANGE_DATA: string;
        data: any;
    }
}
