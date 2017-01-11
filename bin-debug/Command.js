var WalkCommand = (function () {
    function WalkCommand(tiles) {
        this.tiles = tiles;
        this._hasBeenCancelled = false;
    }
    var d = __define,c=WalkCommand,p=c.prototype;
    p.execute = function (callback) {
        var _this = this;
        GameScene.getCurrentScene().moveTo(this.tiles, function () {
            if (!_this._hasBeenCancelled) {
                callback();
            }
        });
    };
    p.cancel = function (callback) {
        var _this = this;
        GameScene.getCurrentScene().stopMove(function () {
            _this._hasBeenCancelled = true;
            callback();
        });
    };
    return WalkCommand;
}());
egret.registerClass(WalkCommand,'WalkCommand',["Command"]);
var FightCommand = (function () {
    function FightCommand(player, monster) {
        /**
         * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
         */
        this._hasBeenCancelled = false;
        this.player = player;
        this.monster = monster;
    }
    var d = __define,c=FightCommand,p=c.prototype;
    p.execute = function (callback) {
        console.log("开始战斗");
        if (!this._hasBeenCancelled) {
            this.player.Macine.ChangeState(new FightState(this.player, this.monster));
        }
    };
    p.cancel = function (callback) {
        this._hasBeenCancelled = true;
        //每更换一次序列帧图片的时间是0.25s，因此此处每0.2s检查一次
        // if(!this.player.Macine.getCurrentState().isSequenceOver()){
        //     egret.setTimeout(()=>{
        //         this.cancel(callback);
        //     },this,200);
        // }else{
        //     console.log("脱离战斗");
        //     callback();
        // }
        console.log("脱离战斗");
        callback();
    };
    return FightCommand;
}());
egret.registerClass(FightCommand,'FightCommand',["Command"]);
var TalkCommand = (function () {
    function TalkCommand() {
    }
    var d = __define,c=TalkCommand,p=c.prototype;
    p.execute = function (callback) {
        console.log("打开对话框");
        UiManager.getCurrentUiManager().addPanel(UiManager.DIALOGPANEL, true);
    };
    p.cancel = function (callback) {
        console.log("关闭对话框");
        UiManager.getCurrentUiManager().removePanel();
        callback();
    };
    return TalkCommand;
}());
egret.registerClass(TalkCommand,'TalkCommand',["Command"]);
var IdleCommand = (function () {
    function IdleCommand(player) {
        this.player = player;
    }
    var d = __define,c=IdleCommand,p=c.prototype;
    p.execute = function (callback) {
        console.log("开始停留");
        this.player.Macine.ChangeState(new IdleState(this.player));
        callback();
    };
    p.cancel = function (callback) {
        console.log("结束停留");
        callback();
    };
    return IdleCommand;
}());
egret.registerClass(IdleCommand,'IdleCommand',["Command"]);
var CommandList = (function () {
    function CommandList() {
        this._list = [];
        this._frozen = false;
    }
    var d = __define,c=CommandList,p=c.prototype;
    p.addCommand = function (command) {
        this._list.push(command);
    };
    p.cancel = function () {
        var _this = this;
        this._frozen = true;
        var command = this.currentCommand;
        //2s后无论是否取消完毕都解冻
        egret.setTimeout(function () {
            if (_this._frozen) {
                _this._frozen = false;
            }
        }, this, 2000);
        if (command) {
            command.cancel(function () {
                _this._frozen = false;
            });
            this._list = [];
        }
        else {
            this._frozen = false;
            this._list = [];
        }
    };
    p.execute = function () {
        var _this = this;
        if (this._frozen) {
            egret.setTimeout(this.execute, this, 100);
            return;
        }
        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command);
            command.execute(function () {
                _this.execute();
            });
        }
        else {
            console.log("全部命令执行完毕");
        }
    };
    p.pass = function () {
        var _this = this;
        if (this.currentCommand) {
            this.currentCommand.cancel(function () {
                _this._frozen = false;
                _this.execute();
            });
        }
    };
    return CommandList;
}());
egret.registerClass(CommandList,'CommandList');
//# sourceMappingURL=Command.js.map