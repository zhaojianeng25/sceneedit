module game.modules.aliveordead.models{
    /** 战仙会（生死斗）个人详情 */
    export class LDRoleInfoDesVo{
        /** 角色Id */
        public roleid: number;//long型数据
        /** 角色名 */
        public rolename: string;
        /** 角色造型 */
        public shape: number;
        /** 角色等级 */
        public level: number;
        /** 职业 */
        public school: number;
        /** 队伍当前人数 */
        public teamnum: number;
        /** 队伍上限人数 */
        public teamnummax: number;

        constructor()
		{

		}
        public fromByteArray(bytes:ByteArray): void {
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.shape = bytes.readInt32();
            this.level = bytes.readInt32();
            this.school = bytes.readInt32();
            this.teamnum = bytes.readInt32();
            this.teamnummax = bytes.readInt32();
		}
    }
}