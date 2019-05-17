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
/**
* name
*/
var game;
(function (game) {
    var object;
    (function (object) {
        var MapInfo = /** @class */ (function (_super) {
            __extends(MapInfo, _super);
            function MapInfo() {
                var _this = _super.call(this) || this;
                _this._id = 0;
                //更新完毕之后
                _this._after_update = _this.onUpdate;
                return _this;
            }
            //当对象更新发生时
            MapInfo.prototype.onUpdate = function (flags, mask, strmask) {
                var isNew = flags & core.obj.OBJ_OPT_NEW;
                if (isNew) {
                    this.firstUpdate();
                }
                // logd("map info:",this.GetMapID(),this.GetMapState());
            };
            MapInfo.prototype.firstUpdate = function () {
                this._id = this.GetMapID();
            };
            Object.defineProperty(MapInfo.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            //是否在pk地图
            MapInfo.prototype.inPkMap = function () {
                return MapInfo.MAP_PKS.indexOf(this._id) >= 0;
            };
            //是否在世界地图
            MapInfo.prototype.inWorldMap = function () {
                return MapInfo.MAP_WORLDS.indexOf(this._id) >= 0;
            };
            //是否在新手村
            MapInfo.prototype.inXinShouCun = function () {
                return this._id == MapInfo.MAP_XINSHOUCUN;
            };
            //是否在天雷狱
            MapInfo.prototype.inTianLeiYu = function () {
                return this._id == MapInfo.MAP_TIANLEIYU;
            };
            //是否在云霄殿
            MapInfo.prototype.inYunXiaoDian = function () {
                return this._id == MapInfo.MAP_YUNXIAODIAN;
            };
            //是否在无量宫
            MapInfo.prototype.inWuLiangGong = function () {
                return this._id == MapInfo.MAP_WULIANGGONG;
            };
            //是否在苍羽宫
            MapInfo.prototype.inCangYuGong = function () {
                return this._id == MapInfo.MAP_CANGYUGONG;
            };
            //是否在火云宗
            MapInfo.prototype.inHuoYunZong = function () {
                return this._id == MapInfo.MAP_HUOYUNZONG;
            };
            //是否在飞雪崖
            MapInfo.prototype.inFeiXueYa = function () {
                return this._id == MapInfo.MAP_FEIXUEYA;
            };
            //是否在七星观
            MapInfo.prototype.inQiXingGuan = function () {
                return this._id == MapInfo.MAP_QIXINGGUAN;
            };
            //是否在幽冥殿
            MapInfo.prototype.inXiangMoZhai = function () {
                return this._id == MapInfo.MAP_YOUMINGDIAN;
            };
            //是否在丹阳观
            MapInfo.prototype.inDanYangGuan = function () {
                return this._id == MapInfo.MAP_DANYANGGUAN;
            };
            Object.defineProperty(MapInfo.prototype, "inBattle", {
                //是否在战斗界面
                get: function () {
                    return battle.BattleProxy.inBattle;
                },
                enumerable: true,
                configurable: true
            });
            //是否在主城 苍玄界
            MapInfo.prototype.inMainCity = function () {
                var mapid = this.GetMapID();
                return mapid == MapInfo.MAP_MAIN_CITY_ID;
            };
            //普通副本地图状态枚举
            MapInfo.MAP_STATE_NOMAL = 0; //
            MapInfo.MAP_STATE_BEGIN = 1; // 开始小怪
            MapInfo.MAP_STATE_BOSS = 2; //刷出BOSS
            MapInfo.MAP_STATE_END = 3; //副本结束
            MapInfo.MAP_STATE_SUCCESS_END = 4; //成功结束
            //新手村
            MapInfo.MAP_XINSHOUCUN = 1;
            MapInfo.MAP_XINSHOUCUN_POSX = 18.75;
            MapInfo.MAP_XINSHOUCUN_POSY = 33.33333;
            //战斗场景
            MapInfo.MAP_BATTLE = 1001;
            MapInfo.MAP_BATTLE_POSX = 22.34375;
            MapInfo.MAP_BATTLE_POSY = 38.625;
            //出生位置
            MapInfo.MAP_XSC_BORN_POSX = 60;
            MapInfo.MAP_XSC_BORN_POSY = 33;
            //济世镇
            MapInfo.MAP_JISHIZHEN = 1651;
            //天雷狱
            MapInfo.MAP_TIANLEIYU = 1601;
            //云霄殿
            MapInfo.MAP_YUNXIAODIAN = 1602;
            //无量宫
            MapInfo.MAP_WULIANGGONG = 1603;
            //苍羽宫
            MapInfo.MAP_CANGYUGONG = 1604;
            //火云宗
            MapInfo.MAP_HUOYUNZONG = 1605;
            //飞雪崖
            MapInfo.MAP_FEIXUEYA = 1606;
            //七星观
            MapInfo.MAP_QIXINGGUAN = 1607;
            //幽冥殿
            MapInfo.MAP_YOUMINGDIAN = 1608;
            //丹阳观
            MapInfo.MAP_DANYANGGUAN = 1609;
            //玄明教
            MapInfo.MAP_XUANMINGJIAO = 1310;
            //新婚殿堂
            MapInfo.MAP_XINHUNDIANTANG = 1311;
            //相思谷
            MapInfo.MAP_XIANGSIGU = 1709;
            //白沙小筑
            MapInfo.MAP_BAISHAXIAOZHU = 1705;
            //春秋林
            MapInfo.MAP_CHUNQIULIN = 1707;
            //桃花溪
            MapInfo.MAP_TAOHUAXI = 1704;
            //黄岩陵
            MapInfo.MAP_HUANGYANLING = 1706;
            //城宁道
            MapInfo.MAP_CHENGNINGDAO = 1701;
            //盘龙山
            MapInfo.MAP_PANLONGSHAN = 1711;
            //天州驿站
            MapInfo.MAP_TIANZHOUYIZHAN = 1703;
            //望峰亭
            MapInfo.MAP_WANGFENGTING = 1710;
            //柳林桃海
            MapInfo.MAP_LIULINTAOHAI = 1702;
            //莲花谷
            MapInfo.MAP_LIANHUAGU = 1708;
            //
            MapInfo.MAP_TIANJIANSHANZHUANG = 1719;
            //主城
            MapInfo.MAP_MAIN_CITY_ID = 3;
            MapInfo.MAP_MAIN_CITY_POSX = 119;
            MapInfo.MAP_MAIN_CITY_POSY = 49;
            MapInfo.MAP_YOUMINGGUIJING = 1712;
            MapInfo.MAP_SHIZHIJIADAO = 1713;
            MapInfo.MAP_DUNHUOERDE = 1714;
            MapInfo.MAP_DXJINGJICHANG = 1715;
            MapInfo.MAP_JIUZHOUCITYTEN = 1716;
            MapInfo.MAP_CHANGWUMENGJING = 1717;
            MapInfo.MAP_HUANGSHIYA = 1718;
            MapInfo.MAP_TIANJIANSHANZHUANGMISHI = 1720;
            MapInfo.MAP_PENGLAIZHOU = 1721;
            MapInfo.MAP_QINGLONGTAN = 1722;
            MapInfo.MAP_JIULONGGONGZONGTAN = 1723;
            MapInfo.MAP_LONGDONG = 1724;
            MapInfo.MAP_HEITIESHENYUAN = 1725;
            MapInfo.MAP_ZUZHUOZHICUN = 1726;
            MapInfo.MAP_LIUFENGDAO = 1727;
            MapInfo.MAP_BAICHENG = 1728;
            MapInfo.MAP_QIXIASHAN = 1729;
            MapInfo.MAP_TIANYUANGU = 1730;
            MapInfo.MAP_TIANDAOSHENGDIAN = 1731;
            MapInfo.MAP_MISHI = 1732;
            MapInfo.MAP_JIUGONGSHANZONGTAN = 1733;
            MapInfo.MAP_YOUMOBAO = 1734;
            MapInfo.MAP_QINGLIANGU = 1735;
            MapInfo.MAP_LANHUAMIJING = 1736;
            MapInfo.MAP_JIUZHOUCHENGNOW = 1737;
            MapInfo.MAP_LIUGUANGCITY = 1738;
            MapInfo.MAP_TIANGUANGZHEN = 1739;
            MapInfo.MAP_JINSHIGU = 1740;
            MapInfo.MAP_LANTIANZHEN = 1741;
            MapInfo.MAP_JIUHUASHAN = 1742;
            MapInfo.MAP_TUMOLING = 1743;
            MapInfo.MAP_CHANGSHENGDIAN = 1744;
            MapInfo.MAP_CHENSHUISENLIN = 1745;
            MapInfo.MAP_JINGDIZHILAO = 1746;
            MapInfo.MAP_FEINIAOLIN = 1747;
            MapInfo.MAP_HEIFENGGU = 1748;
            MapInfo.MAP_LIULIDAO = 1749;
            MapInfo.MAP_DIGONGMENKOU = 1750;
            MapInfo.MAP_YUANGUYIJI = 1751;
            MapInfo.MAP_DIXIAGONGDIAN = 1752;
            MapInfo.MAP_WANFADIANYIJI = 1753;
            MapInfo.MAP_HUANMOJING = 1754;
            MapInfo.MAP_QIANFENGSHAN = 1755;
            MapInfo.MAP_HEITIESHENYUANTWO = 1756;
            MapInfo.MAP_MIZONGSHAN = 1757;
            MapInfo.MAP_CHUNQIUSHAN = 1758;
            MapInfo.MAP_WANYAOGU = 1759;
            MapInfo.MAP_QIANLONGGU = 1760;
            MapInfo.MAP_QIANLONGKU = 1761;
            MapInfo.MAP_QIANLONGZAIYUAN = 1781;
            MapInfo.MAP_CHUSHENRUHUA = 1782;
            MapInfo.MAP_QUNXIANZHIDIAN = 1783;
            MapInfo.MAP_QIANLONGZAIYUANTWO = 1784;
            MapInfo.MAP_CHUSHENRUHUATWO = 1785;
            MapInfo.MAP_QUNXIANZHIDIANTWO = 1786;
            MapInfo.MAP_KUNLUNONE = 1787;
            MapInfo.MAP_PEGNLAIONE = 1788;
            MapInfo.MAP_KUNLUNTWO = 1789;
            MapInfo.MAP_PEGNLAITWO = 1790;
            MapInfo.MAP_KUNLUNTHREE = 1791;
            MapInfo.MAP_PEGNLAITHREE = 1792;
            MapInfo.MAP_KUNLUNYOUSHENGONE = 1793;
            MapInfo.MAP_PENGLAIYOUSHENGONE = 1794;
            MapInfo.MAP_KUNLUNYOUSHENGTWO = 1795;
            MapInfo.MAP_PENGLAIYOUSHENGTWO = 1796;
            MapInfo.MAP_KUNLUNYOUSHENGTHREE = 1797;
            MapInfo.MAP_PENGLAIYOUSHENGTHREE = 1798;
            MapInfo.MAP_BANGPAIZHAN = 1799;
            MapInfo.MAP_QINGHEDAOONE = 1801;
            MapInfo.MAP_QINGHEDAOTWO = 1802;
            MapInfo.MAP_QINGHEDAOTHREE = 1803;
            MapInfo.MAP_TAOLIULINONE = 1804;
            MapInfo.MAP_TAOLIULINTWO = 1805;
            MapInfo.MAP_TAOLIULINTHREE = 1806;
            MapInfo.MAP_XUANANYIZHANONE = 1807;
            MapInfo.MAP_XUANANYIZHANTWO = 1808;
            MapInfo.MAP_XUANANYIZHANTHREE = 1809;
            MapInfo.MAP_SHUIXIANGXIONE = 1810;
            MapInfo.MAP_SHUIXIANGXITWO = 1811;
            MapInfo.MAP_SHUIXIANGXITHREE = 1812;
            MapInfo.MAP_LINHAIBAISHAONE = 1813;
            MapInfo.MAP_LINHAIBAISHATWO = 1814;
            MapInfo.MAP_LINHAIBAISHATHREe = 1815;
            MapInfo.MAP_NEILONGLINONE = 1816;
            MapInfo.MAP_NEILONGLINTWO = 1817;
            MapInfo.MAP_NEILONGLINTHREE = 1818;
            MapInfo.MAP_SHENGULINONE = 1819;
            MapInfo.MAP_SHENGULINTWO = 1820;
            MapInfo.MAP_SHENGULINTHREE = 1821;
            MapInfo.MAP_HEHUAGUONE = 1822;
            MapInfo.MAP_HEHUAGUTWO = 1823;
            MapInfo.MAP_HEHUAGUTHREE = 1824;
            MapInfo.MAP_CHUNFENGGUONE = 1825;
            MapInfo.MAP_CHUNFENGGUTWO = 1826;
            MapInfo.MAP_CHUNFENGGUTHREE = 1827;
            MapInfo.MAP_FENGQINGTINGONE = 1828;
            MapInfo.MAP_FENGQINGTINGTHREE = 1829;
            MapInfo.MAP_JUMOZHIDUONE = 1901;
            MapInfo.MAP_JUMOZHIDUTWO = 1902;
            MapInfo.MAP_ZUZHUOZHITAONE = 1903;
            MapInfo.MAP_ZUZHUOZHITATWO = 1904;
            MapInfo.MAP_ZUDUIFUBENYULIUONE = 1905;
            MapInfo.MAP_ZUDUIFUBENYULIUTWO = 1906;
            MapInfo.MAP_ZUDUIFUBENYULIUTHREE = 1907;
            MapInfo.MAP_ZUDUIFUBENYULIUFOUR = 1908;
            MapInfo.MAP_ZUDUIFUBENYULIUFIVE = 1909;
            MapInfo.MAP_ZUDUIFUBENYULIUSIX = 1910;
            MapInfo.MAP_ZUDUIFUBENYULIUSEVEN = 1911;
            MapInfo.MAP_ZUDUIFUBENYULIUEIGHT = 1912;
            MapInfo.MAP_BINGFENGWANGZUOONE = 1913;
            MapInfo.MAP_BINGFENGWANGZUOTWO = 1914;
            MapInfo.MAP_BINGFENGWANGZUOTHREE = 1915;
            MapInfo.MAP_BINGFENGWANGZUOFOUR = 1916;
            MapInfo.MAP_BINGFENGWANGZUOFIVE = 1917;
            MapInfo.MAP_BINGFENGWANGZUOSIX = 1918;
            MapInfo.MAP_BINGFENGWANGZUOSEVEN = 1919;
            MapInfo.MAP_BINGFENGWANGZUOEIGHT = 1920;
            MapInfo.MAP_BINGFENGWANGZUONINE = 1921;
            MapInfo.MAP_BINGFENGWANGZUOTEN = 1922;
            MapInfo.MAP_BINGFENGWANGZUOEL = 1923;
            MapInfo.MAP_BINGFENGWANGZUOTF = 1924;
            MapInfo.MAP_BINGFENGWANGZUOTH = 1925;
            MapInfo.MAP_BINGFENGWANGZUOFORTH = 1926;
            MapInfo.MAP_BINGFENGWANGZUOFIVETH = 1927;
            MapInfo.MAP_BINGFENGWANGZUOSIXTH = 1928;
            MapInfo.MAP_BINGFENGWANGZUOSEVENTH = 1929;
            MapInfo.MAP_BINGFENGWANGZUOEIGHTTH = 1930;
            MapInfo.MAP_BINGFENGWANGZUONINTTH = 1931;
            MapInfo.MAP_QIANLONGKUONE = 1932;
            MapInfo.MAP_QIANLONGKUTWO = 1933;
            MapInfo.MAP_QIANLONGKUTHREE = 1934;
            MapInfo.MAP_QIANLONGKUFOUR = 1935;
            MapInfo.MAP_QIANLONGKUFIVE = 1936;
            MapInfo.MAP_QIANLONGKUSIX = 1937;
            MapInfo.MAP_QIANLONGKUSEVEN = 1938;
            MapInfo.MAP_QIANLONGKUEIGHT = 1939;
            MapInfo.MAP_QIANLONGKUNINE = 1940;
            MapInfo.MAP_QIANLONGKUTEN = 1941;
            MapInfo.MAP_WULONGKUONE = 1942;
            MapInfo.MAP_WULONGKUTWO = 1943;
            MapInfo.MAP_WULONGKUTHREE = 1944;
            MapInfo.MAP_WULONGKUFOUR = 1945;
            MapInfo.MAP_WULONGKUFIVE = 1946;
            MapInfo.MAP_WULONGKUSIX = 1947;
            MapInfo.MAP_WULONGKUSEVEN = 1948;
            MapInfo.MAP_WULONGKUEIGHT = 1949;
            MapInfo.MAP_WULONGKUNINE = 1950;
            MapInfo.MAP_WULONGKUTEN = 1951;
            MapInfo.MAP_WOLONGPOONE = 1952;
            MapInfo.MAP_WOLONGPOTWO = 1953;
            MapInfo.MAP_WOLONGPOTHREE = 1954;
            MapInfo.MAP_WOLONGPOFOUR = 1955;
            MapInfo.MAP_WOLONGPOFIVE = 1956;
            MapInfo.MAP_WOLONGPOSIX = 1957;
            MapInfo.MAP_WOLONGPOSEVEN = 1958;
            MapInfo.MAP_WOLONGPOEIGHT = 1959;
            MapInfo.MAP_WOLONGPONINE = 1960;
            MapInfo.MAP_WOLONGPOTEN = 1961;
            MapInfo.MAP_JUEXIANZHENONE = 1962;
            MapInfo.MAP_JUEXIANZHENTWO = 1963;
            MapInfo.MAP_JUEXIANZHENTHREE = 1964;
            MapInfo.MAP_JUEXIANZHENFOUR = 1965;
            MapInfo.MAP_JUEXIANZHENFIVE = 1966;
            MapInfo.MAP_JUEXIANZHENSIX = 1967;
            MapInfo.MAP_JUEXIANZHENSEVEN = 1968;
            MapInfo.MAP_JUEXIANZHENEIGHT = 1969;
            MapInfo.MAP_JUEXIANZHENNINE = 1970;
            MapInfo.MAP_JUEXIANZHENTEN = 1971;
            MapInfo.MAP_RONGDONG = 1972;
            MapInfo.MAP_JINGSHITAOLIULIN = 1973;
            MapInfo.MAP_YAOHUASHANZHAI = 1974;
            MapInfo.MAP_HUANGANYOULIN = 1975;
            MapInfo.MAP_MODAOJIUDIAN = 1976;
            MapInfo.MAP_WUXINGMIJING = 1977;
            MapInfo.MAP_YINYANGXIANYA = 1978;
            MapInfo.MAP_JITAN = 1979;
            MapInfo.MAP_SHENYUAN = 1980;
            MapInfo.MAP_BAICHENGTWO = 1981;
            MapInfo.MAP_YIDUXUEYUAN = 1982;
            MapInfo.MAP_XIESHOUBAOLEI = 1983;
            MapInfo.MAP_BEIPANZHISHOU = 1984;
            MapInfo.MAP_NAJIAZHIMOU = 1985;
            MapInfo.MAP_BEISHANGMUDI = 1986;
            MapInfo.MAP_NALUHICHENG = 1987;
            MapInfo.MAP_SIWANGZHIGE = 1988;
            MapInfo.MAP_FENSUIYINMOU = 1989;
            MapInfo.MAP_SHIKONGZHILU = 1990;
            MapInfo.MAP_YINGXIONGPINGTAI = 1991;
            MapInfo.MAP_TESTONE = 1992;
            MapInfo.MAP_TESTTWO = 1993;
            MapInfo.MAP_TESTTHREE = 199;
            //世界地图
            MapInfo.MAP_WORLDS = [1, 0];
            MapInfo.MAP_WORLD_LEVELS = [1, 999];
            //pk地图
            MapInfo.MAP_PKS = [];
            //全模式pk地图
            MapInfo.MAP_PK_ALL_MODES = [];
            return MapInfo;
        }(object.MapField));
        object.MapInfo = MapInfo;
    })(object = game.object || (game.object = {}));
})(game || (game = {}));
//# sourceMappingURL=MapInfo.js.map