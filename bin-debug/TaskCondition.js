var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.onFinish();
    };
    p.onFinish = function (task) {
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["TaskCondition"]);
var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
        this.onAcceptButton = true;
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        if (!this.onAcceptButton) {
            task.setCurrent();
        }
        this.onAcceptButton = false;
    };
    p.onFinish = function (task) {
        User.getInstance().heros[0].addEquipment(new Equipment(1000, "w4_jpg"));
        UiManager.getCurrentUiManager().getHeroDetaiksPanel().iconInit();
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["TaskCondition"]);
//# sourceMappingURL=TaskCondition.js.map