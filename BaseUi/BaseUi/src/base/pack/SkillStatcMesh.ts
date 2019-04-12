module pack {
 
    import EventDispatcher = Pan3d.EventDispatcher
    export class SkillStatcMesh extends EventDispatcher implements ITile {
        public skillUrl: string;
        public roleUrl: string;
        public url: string
        public timeInfo: Array<any>;
        public constructor() {
            super();
        }
        public getObject(): any {
            var obj: any = {}
            obj.skillUrl = this.skillUrl
            obj.roleUrl = this.roleUrl
            obj.url = this.url
            obj.timeInfo = this.timeInfo
            return obj
        }
        public  getName(): string {
            return "skill"
        }
    }
}