/***********************************************************************/
/***************��������Э�鹤���Զ����ɣ������ֶ��޸�****************/
/************************ Э��汾��:#�������ƣ�ע�� ******************************/
/***********************************************************************/
//package cow.net.structs
//{	
//import sys.utils.Stream;	
var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var Protocols = /** @class */ (function () {
            function Protocols(f) {
                this._stream = new me.Pan3dByteArray;
                this._FUNCS = new Object();
                this._send_func = f;
                this._stream.endian = me.Endian.LITTLE_ENDIAN;
            }
            Protocols.prototype.getFuncName = function (cmd) {
                if (this._FUNCS[cmd]) {
                    return this._FUNCS[cmd];
                }
                return null;
            };
            return Protocols;
        }());
        me.Protocols = Protocols;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Protocols.js.map