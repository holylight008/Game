var HeroDetailsPanel = (function (_super) {
    __extends(HeroDetailsPanel, _super);
    function HeroDetailsPanel() {
        _super.call(this);
        var bj = new egret.Bitmap();
        bj.x = 0;
        bj.y = 0;
        bj.width = 400;
        bj.height = 640;
        bj.texture = RES.getRes("heroDetails_jpg");
        this.addChild(bj);
        var myPlayer = new egret.Bitmap();
        myPlayer.texture = RES.getRes("d1_png");
        myPlayer.x = 150;
        myPlayer.y = 200;
        myPlayer.scaleX = 2;
        myPlayer.scaleY = 2;
        this.addChild(myPlayer);
        this.hero = User.getInstance().heros;
        this.equipment = this.hero[0].equipments;
        this.desc = new egret.TextField();
        this.desc.x = 108;
        this.desc.y = 400;
        this.desc.width = 300;
        this.desc.height = 300;
        this.desc.textColor = 0xbb1525;
        this.desc.size = 25;
        this.addChild(this.desc);
        this.fightPower = new egret.TextField();
        this.fightPower.x = 108;
        this.fightPower.y = 0;
        this.fightPower.width = 300;
        this.fightPower.height = 300;
        this.fightPower.textColor = 0xbb1525;
        this.fightPower.size = 25;
        this.addChild(this.fightPower);
        this.imgChild = new Array();
        this.iconInit();
        this.closeButton = new Button("close_png");
        this.closeButton.x = 300;
        this.closeButton.y = 0;
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.addChild(this.closeButton);
        this.touchEnabled = true;
    }
    var d = __define,c=HeroDetailsPanel,p=c.prototype;
    p.iconInit = function () {
        for (var _i = 0, _a = this.imgChild; _i < _a.length; _i++) {
            var k = _a[_i];
            this.removeChild(k);
        }
        for (var i = 0; i < this.equipment.length; i++) {
            var img = this.equipment[i].img;
            img.x = 0;
            img.y = 120 * i;
            img.width = 100;
            img.height = 100;
            this.addChild(img);
            this.imgChild.push(img);
        }
        this.fightPower.text = "FightPower: " + User.getInstance().getFightPower().toString();
    };
    p.setDesc = function (tf) {
        this.desc.text = tf.text;
    };
    p.onClose = function () {
        this.desc.text = "";
        UiManager.getCurrentUiManager().removePanel();
    };
    return HeroDetailsPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(HeroDetailsPanel,'HeroDetailsPanel');
//# sourceMappingURL=HeroDetailsPanel.js.map