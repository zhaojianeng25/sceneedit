var core;
(function (core) {
    var Encipher = /** @class */ (function () {
        function Encipher() {
            this.PROTO_TEA_C2S = "2f651cbf85539c977da645a90cbd6b62";
            this.PROTO_MD5_KEY = "40f09aa5ff525e8cc3a9d16bf1abc3c1";
            this.encipher_init(this.PROTO_TEA_C2S);
        }
        Encipher.prototype.encipher_init = function (c2s) {
            var tmp = MD5.hash(c2s);
            var bys = new ByteArray();
            bys.writeString(tmp);
            bys.position = 2;
            this.xor_key_c2s = bys.readInt();
            ;
        };
        Encipher.prototype.encipher_reset = function (pkt) {
            var tmp = MD5.hashBinary(pkt);
            tmp = tmp + this.PROTO_MD5_KEY;
            this.encipher_init(tmp);
        };
        //发包前加密一下
        Encipher.prototype.encipher_encode = function (pkt) {
            //没有内容就不加密了
            if (pkt.length == 2) {
                return 0;
            }
            var i;
            var tea_v_size;
            tea_v_size = (pkt.length) >> 2;
            for (i = 0; i < tea_v_size; i++) {
                var o = pkt.getInt32(i);
                pkt.setInt32(i, pkt.getInt32(i) ^ this.xor_key_c2s);
            }
            this.xor_key_c2s = MathU.toInt(this.xor_key_c2s + 286331153);
            return 0;
        };
        return Encipher;
    }());
    core.Encipher = Encipher;
})(core || (core = {}));
//# sourceMappingURL=Encipher.js.map