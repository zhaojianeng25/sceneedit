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
var game;
(function (game) {
    var story;
    (function (story) {
        /**
         * 战斗场景
         * name 王谦
         */
        var SceneBattle = /** @class */ (function (_super) {
            __extends(SceneBattle, _super);
            function SceneBattle() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SceneBattle;
        }(story.Base));
        story.SceneBattle = SceneBattle;
    })(story = game.story || (game.story = {}));
})(game || (game = {}));
//# sourceMappingURL=SceneBattle.js.map