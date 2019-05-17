/**
* 页面定义
*/
var game;
(function (game) {
    var gui;
    (function (gui) {
        var page;
        (function (page) {
            var PageDef = /** @class */ (function () {
                function PageDef() {
                }
                PageDef.init = function () {
                    PageDef._pageClassMap[PageDef.LOADING] = page.Loading;
                    PageDef._pageClassMap[PageDef.LOAD] = page.Load;
                    // PageDef._pageClassMap[PageDef.TIPS] = Tips;
                    PageDef._pageClassMap[PageDef.HUD_MAIN_PAGE] = page.HudMainPage;
                    PageDef._pageClassMap[PageDef.HUD_FIGHT_PAGE] = battle.BattlePage;
                    // PageDef._pageClassMap[PageDef.BATTLE_WIN_PAGE] = BattleWinPage;
                    // PageDef._pageClassMap[PageDef.BATTLE_FAIL_PAGE] = BattleFailPage;
                    // PageDef._pageClassMap[PageDef.PROMPT_PAGE] = PromptPage;
                    // PageDef._pageClassMap[PageDef.SCENE_BATTLE_PAGE] = SceneBattlePage;
                    PageDef._pageClassMap[PageDef.PET] = page.TongYongAnNiu;
                    //PageDef._pageClassMap[PageDef.PROMPT_PAGE] = game.modules.createrole;
                };
                PageDef.getPageClass = function (key) {
                    return PageDef._pageClassMap[key];
                };
                // 加载界面
                PageDef.LOADING = 0;
                // 等待数据界面
                PageDef.LOAD = 1;
                /** 飘字提示 */
                PageDef.TIPS = 2;
                /**hud主界面*/
                PageDef.HUD_MAIN_PAGE = 3;
                /**HUD战斗界面*/
                PageDef.HUD_FIGHT_PAGE = 4;
                /**战斗胜利 */
                PageDef.BATTLE_WIN_PAGE = 5;
                /**战斗失败 */
                PageDef.BATTLE_FAIL_PAGE = 6;
                /**提示弹框界面 */
                PageDef.PROMPT_PAGE = 7;
                /**战场位置计算界面 */
                PageDef.SCENE_BATTLE_PAGE = 999;
                /**创建角色 */
                PageDef.CREATE_ROLE = "CreaterRole"; //创建角色
                PageDef.PET = 11;
                //页面集合
                PageDef._pageClassMap = {};
                return PageDef;
            }());
            page.PageDef = PageDef;
        })(page = gui.page || (gui.page = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=PageDef.js.map