var core;
(function (core) {
    var obj;
    (function (obj_1) {
        var StringIndexer = /** @class */ (function () {
            function StringIndexer() {
                this._indexerExp = new Array();
                this._objs = new Array();
            }
            /**
             * 根据正则表达式返回加入的索引，并返回索引编号 如: create("^i\d+") 代表所有的物品
             * @param exp
             * @return
             */
            StringIndexer.prototype.createIndex = function (exp) {
                var index = this.getIndex(exp);
                if (index == -1) {
                    index = this._indexerExp.length;
                    this._indexerExp[index] = new RegExp(exp, "g");
                    this._objs[index] = new Array();
                }
                return index;
            };
            /**
             * 根据正则表达式返回索引
             * @param exp 正则表达式
             * @return 返回索引,如果返回-1就是没找到
             */
            StringIndexer.prototype.getIndex = function (exp) {
                var idx = -1;
                for (var key in this._indexerExp) {
                    idx++;
                    var reg = this._indexerExp[key];
                    if (reg.source == exp)
                        return idx;
                }
                return -1;
            };
            /**
             * 释放正则表达式的索引的内容
             * 暂时不支持运行过程中增加和删除索引
             * @param exp
             */
            StringIndexer.prototype.releaseIndex = function (exp) {
                var index = this.getIndex(exp);
                if (index != -1) {
                    this._indexerExp.splice(index, 1);
                    this._objs.splice(index, 1);
                }
            };
            /**
             * 根据传入的字符串，验证符合哪个索引
             * @param obj
             * @return
             */
            StringIndexer.prototype.test = function (k) {
                for (var i = 0; i < this._indexerExp.length; i++) {
                    this._indexerExp[i].lastIndex = 0;
                    if (this._indexerExp[i].test(k))
                        return i;
                }
                return -1;
            };
            /**
             * 插入对象，遍历所有的正则表达式，如果符合则会插入
             * @param obj
             */
            StringIndexer.prototype.insert = function (obj) {
                var i = this.test(obj.guid);
                if (i >= 0 && this._objs[i] && this._objs[i].indexOf(obj) == -1) {
                    //对象符合索引，插入到相应的数组中
                    this._objs[i][this._objs[i].length] = obj;
                }
            };
            /**
             * 根据对象的GUID移除所在的索引
             * @param guid
             */
            StringIndexer.prototype.remove = function (guid) {
                var i = this.test(guid);
                if (i == -1)
                    return;
                for (var j = 0; j < this._objs[i].length; j++) {
                    if (this._objs[i][j].guid == guid) {
                        this._objs[i].splice(j, 1);
                        return;
                    }
                }
            };
            /**
             * 根据正则表达式查询对象集合
             * @param exp
             * @return
             */
            StringIndexer.prototype.query = function (exp) {
                var index = this.getIndex(exp);
                if (index == -1)
                    return null;
                return this._objs[index];
            };
            /**
             * 根据索引编号返回所有的对象集合
             * @param indexTyp
             * @return
             */
            StringIndexer.prototype.get = function (indexTyp) {
                if (indexTyp < 0 || indexTyp >= this._objs.length)
                    return null;
                return this._objs[indexTyp];
            };
            StringIndexer.prototype.Clear = function () {
                if (this._indexerExp) {
                    this._indexerExp.length = 0;
                    this._indexerExp = null;
                }
                if (this._objs) {
                    this._objs.length = 0;
                    this._objs = null;
                }
            };
            return StringIndexer;
        }());
        obj_1.StringIndexer = StringIndexer;
    })(obj = core.obj || (core.obj = {}));
})(core || (core = {}));
//# sourceMappingURL=StringIndexer.js.map