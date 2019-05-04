module prop {
    import BaseEvent = Pan3d.me.BaseEvent;
    export class ReflectionEvet extends BaseEvent {
        public static CHANGE_DATA: string = "CHANGE_DATA";
        public data: any
    }
}