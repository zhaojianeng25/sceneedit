var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var BaseEvent = /** @class */ (function () {
            function BaseEvent($type) {
                this.type = $type;
            }
            BaseEvent.COMPLETE = "complete";
            return BaseEvent;
        }());
        me.BaseEvent = BaseEvent;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Event.js.map