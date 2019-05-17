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
var battle;
(function (battle) {
    var ClipNum = /** @class */ (function (_super) {
        __extends(ClipNum, _super);
        function ClipNum(url, w, h, clipX) {
            if (clipX === void 0) { clipX = 10; }
            var _this = _super.call(this) || this;
            _this.url = url;
            _this.w = w;
            _this.h = h;
            _this.clipX = clipX;
            _this.clip_w = w / clipX;
            _this.clip_h = h;
            _this._clip_stack = [];
            return _this;
        }
        ClipNum.prototype.getClip = function (index) {
            if (index === void 0) { index = 0; }
            var clip;
            if (this._clip_stack && this._clip_stack.length > 0) {
                clip = this._clip_stack.pop();
            }
            else {
                clip = new Laya.Clip(this.url, this.clipX);
                clip.size(this.clip_w, this.clip_h);
            }
            clip.index = Math.min(Math.max(0, index), this.clipX - 1);
            return clip;
        };
        ClipNum.prototype.recoverClip = function (clip) {
            if (!clip) {
                return;
            }
            clip.removeSelf();
            this._clip_stack.push(clip);
        };
        ClipNum.prototype.setNum = function (num) {
            if (this.num === num) {
                return;
            }
            this.num = num;
            if (num < 0) {
                return;
            }
            var str = num.toString();
            var len = this.numChildren;
            var new_len = str.length;
            if (len > new_len) {
                for (var i = len - 1; i >= new_len; i--) {
                    var clip = this.getChildAt(i);
                    if (clip) {
                        this.recoverClip(clip);
                    }
                }
                len = new_len;
            }
            else if (len < new_len) {
                for (var i = len; i < new_len; i++) {
                    var clip = this.getClip(0);
                    this.addChild(clip);
                }
            }
            var w = 0;
            for (var i = 0; i < new_len; i++) {
                var n = Number(str.charAt(i));
                var clip = this.getChildAt(i);
                clip.index = n;
                clip.x = w;
                w += clip.width;
            }
            this.size(w, this.h);
            if (this.parent && this.parent instanceof Laya.Sprite) {
                var root = this.parent;
                this.pos((root.width - this.width) >> 1, (root.height - this.height) >> 1);
            }
        };
        return ClipNum;
    }(Laya.Sprite));
    battle.ClipNum = ClipNum;
})(battle || (battle = {}));
//# sourceMappingURL=ClipNum.js.map