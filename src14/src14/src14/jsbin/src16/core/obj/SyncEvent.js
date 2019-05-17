var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var core;
(function (core) {
    var obj;
    (function (obj) {
        obj.OBJ_OPT_NEW = 0x01; //新对象
        obj.OBJ_OPT_DELETE = 0x02; //删除对象
        obj.OBJ_OPT_UPDATE = 0x04; //对象更新
        obj.OBJ_OPT_BINLOG = 0x08; //BINLOG方式
        obj.OBJ_OPT_U_GUID = 0x10; //打包方式ID为整形
        obj.OPT_SET = 0x01;
        obj.OPT_UNSET = 0x02;
        obj.OPT_ADD = 0x04;
        obj.OPT_SUB = 0x08;
        obj.TYPE_UINT32 = 0;
        obj.TYPE_UINT16 = 1;
        obj.TYPE_UINT8 = 2;
        obj.TYPE_BIT = 3;
        obj.TYPE_UINT64 = 4;
        obj.TYPE_INT32 = 5;
        obj.TYPE_STRING = 6;
        obj.TYPE_INT16 = 7;
        obj.TYPE_INT8 = 8;
        obj.TYPE_FLOAT = 9;
        obj.TYPE_DOUBLE = 10;
        obj.ATOMIC_OPT_RESULT_NO = 0; //不是原子操作
        obj.ATOMIC_OPT_RESULT_TRY = 1; //尝试原子操作
        obj.ATOMIC_OPT_RESULT_OK = 2; //原子操作成功
        obj.ATOMIC_OPT_RESULT_FAILED = -1; //原子操作失败
        var SyncEvent = /** @class */ (function (_super) {
            __extends(SyncEvent, _super);
            function SyncEvent() {
                return _super.call(this) || this;
            }
            SyncEvent.init = function () {
                SyncEvent.tmpValueBytes = new ByteArray;
                SyncEvent.tmpValueBytes.endian = Endian.LITTLE_ENDIAN;
            };
            //为了防止对象更新标识与下标更新标识冲突,所以让对象更新标识占用第2位		
            SyncEvent.OBJ_OPT_NEW = 0x01; //新对象
            SyncEvent.OBJ_OPT_DELETE = 0x02; //删除对象
            SyncEvent.OBJ_OPT_UPDATE = 0x04; //对象更新
            SyncEvent.OBJ_OPT_BINLOG = 0x08; //BINLOG方式
            SyncEvent.OBJ_OPT_U_GUID = 0x10; //打包方式ID为整形
            SyncEvent.OPT_SET = 0x01;
            SyncEvent.OPT_UNSET = 0x02;
            SyncEvent.OPT_ADD = 0x04;
            SyncEvent.OPT_SUB = 0x08;
            SyncEvent.TYPE_UINT32 = 0;
            SyncEvent.TYPE_UINT16 = 1;
            SyncEvent.TYPE_UINT8 = 2;
            SyncEvent.TYPE_BIT = 3;
            SyncEvent.TYPE_UINT64 = 4;
            SyncEvent.TYPE_INT32 = 5;
            SyncEvent.TYPE_STRING = 6;
            SyncEvent.TYPE_INT16 = 7;
            SyncEvent.TYPE_INT8 = 8;
            SyncEvent.TYPE_FLOAT = 9;
            SyncEvent.TYPE_DOUBLE = 10;
            SyncEvent.ATOMIC_OPT_RESULT_NO = 0; //不是原子操作
            SyncEvent.ATOMIC_OPT_RESULT_TRY = 1; //尝试原子操作
            SyncEvent.ATOMIC_OPT_RESULT_OK = 2; //原子操作成功
            SyncEvent.ATOMIC_OPT_RESULT_FAILED = -1; //原子操作失败
            return SyncEvent;
        }(Laya.EventDispatcher));
        obj.SyncEvent = SyncEvent;
    })(obj = core.obj || (core.obj = {}));
})(core || (core = {}));
//# sourceMappingURL=SyncEvent.js.map