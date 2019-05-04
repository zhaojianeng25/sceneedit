var scenedis;
(function (scenedis) {
    var me;
    (function (me) {
        var ModelshowMouseManager = /** @class */ (function () {
            function ModelshowMouseManager() {
            }
            ModelshowMouseManager.getInstance = function () {
                if (!this._instance) {
                    this._instance = new ModelshowMouseManager();
                }
                return this._instance;
            };
            ModelshowMouseManager.prototype.addMouseEvent = function () {
                var _this = this;
                if (Pan3d.me.Scene_data.isPc) {
                    document.addEventListener(Pan3d.me.MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
                    document.addEventListener(Pan3d.me.MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
                    document.addEventListener(Pan3d.me.MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
                    document.addEventListener(Pan3d.me.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
                }
                else {
                    document.addEventListener(Pan3d.me.MouseType.TouchMove, function ($evt) { _this.mouseToEvent($evt); });
                    document.addEventListener(Pan3d.me.MouseType.TouchEnd, function ($evt) { _this.mouseToEvent($evt); });
                    document.addEventListener(Pan3d.me.MouseType.TouchStart, function ($evt) { _this.mouseToEvent($evt); });
                }
            };
            ModelshowMouseManager.prototype.onMouseWheel = function ($evt) {
            };
            ModelshowMouseManager.prototype.onMouse = function ($e) {
                var evt;
                var point = new Pan3d.me.Vector2D();
                if ($e instanceof MouseEvent) {
                    if ($e.type == Pan3d.me.MouseType.MouseDown) {
                        evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Down);
                    }
                    else if ($e.type == Pan3d.me.MouseType.MouseUp) {
                        evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Up);
                    }
                    else if ($e.type == Pan3d.me.MouseType.MouseMove) {
                        evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Move);
                    }
                    else if ($e.type == Pan3d.me.MouseType.MouseClick) {
                    }
                    point.x = $e.pageX;
                    point.y = $e.pageY;
                }
                this.makeMouseEvent(evt, point);
            };
            ModelshowMouseManager.prototype.mouseToEvent = function ($touchEvent) {
                var evt;
                var point = new Pan3d.me.Vector2D();
                if ($touchEvent.type == Pan3d.me.MouseType.TouchStart) {
                    evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Down);
                }
                else if ($touchEvent.type == Pan3d.me.MouseType.TouchEnd) {
                    evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Up);
                    point.x = $touchEvent.changedTouches[0].pageX;
                    point.y = $touchEvent.changedTouches[0].pageY;
                }
                else if ($touchEvent.type == Pan3d.me.MouseType.TouchMove) {
                    evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Move);
                }
                if ($touchEvent.touches.length) {
                    point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                    point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
                }
                this.makeMouseEvent(evt, point);
            };
            ModelshowMouseManager.prototype.makeMouseEvent = function (evt, point) {
                var temp = Pan3d.me.UIManager.getInstance().mouseEvetData(evt, point);
                if (!temp) {
                    if (evt.type == Pan3d.me.InteractiveEvent.Up) {
                        this.clikSceneGround(point);
                    }
                }
            };
            ModelshowMouseManager.prototype.clikSceneGround = function ($pos) {
            };
            ModelshowMouseManager.prototype.walkPathComplete = function () {
            };
            return ModelshowMouseManager;
        }());
        me.ModelshowMouseManager = ModelshowMouseManager;
    })(me = scenedis.me || (scenedis.me = {}));
})(scenedis || (scenedis = {}));
//# sourceMappingURL=ModelshowMouseManager.js.map