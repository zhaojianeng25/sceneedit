/**
*神兽提升
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var models;
            (function (models) {
                var PetCShenShouIncModel = /** @class */ (function () {
                    function PetCShenShouIncModel() {
                        /**神兽提升表*/
                        this.petCShenShouIncData = {};
                        PetCShenShouIncModel._instance = this;
                    }
                    PetCShenShouIncModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new PetCShenShouIncModel();
                        }
                        return this._instance;
                    };
                    return PetCShenShouIncModel;
                }());
                models.PetCShenShouIncModel = PetCShenShouIncModel;
            })(models = pet.models || (pet.models = {}));
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetCShenShouIncModel.js.map