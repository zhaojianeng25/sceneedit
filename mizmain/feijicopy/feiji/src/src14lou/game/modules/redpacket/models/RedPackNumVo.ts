/**
* name 
*/
module game.modules.redPacket.models {
    export class RedPackNumVo {
        /** 红包类型*/
        public modeltype: number;
        /** 发红包数量*/
        public redpacksendnum: number;
        /** 收红包数量*/
        public redpackreceivenum: number;
        /** 发符石数量*/
        public redpackreceivefushinum: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.modeltype = bytes.readInt32();
            this.redpacksendnum = bytes.readInt32();
            this.redpackreceivenum = bytes.readInt32();
            this.redpackreceivefushinum = bytes.readInt32();
        }
    }
}