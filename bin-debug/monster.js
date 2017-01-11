var monsterJason = [
    { id: "monster_png", health: 5 }
];
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(id, health) {
        _super.call(this);
        this.id = id;
        this.health = health;
        this.healthMax = health;
        this.bitmap = new egret.Bitmap();
        this.bitmap.texture = RES.getRes(id);
        this.addChild(this.bitmap);
        this.width = this.bitmap.width;
        this.height = this.bitmap.height;
        this.touchEnabled = true;
    }
    var d = __define,c=Monster,p=c.prototype;
    p.healthChange = function (change) {
        this.health += change;
        if (this.health == 0) {
            GameScene.getCurrentScene().killMonster(this);
            GameScene.getCurrentScene().getCommandList().pass();
        }
    };
    p.getId = function () {
        return this.id;
    };
    p.getHealth = function () {
        return this.health;
    };
    return Monster;
}(egret.DisplayObjectContainer));
egret.registerClass(Monster,'Monster');
var MonsterFactory = (function () {
    function MonsterFactory() {
    }
    var d = __define,c=MonsterFactory,p=c.prototype;
    MonsterFactory.createOneMonster = function (id) {
        for (var i = 0; i < monsterJason.length; i++) {
            if (monsterJason[i].id.match(id)) {
                return new Monster(monsterJason[i].id, monsterJason[i].health);
            }
        }
    };
    return MonsterFactory;
}());
egret.registerClass(MonsterFactory,'MonsterFactory');
//# sourceMappingURL=monster.js.map