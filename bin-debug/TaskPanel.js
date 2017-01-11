var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        var _this = this;
        _super.call(this);
        this.myPanel = new egret.Bitmap();
        this.myPanel.texture = RES.getRes("dialog_jpg");
        this.addChild(this.myPanel);
        var taskService = TaskService.getInstance();
        taskService.addObserver(this);
        taskService.getTaskByCustomRole(function (taskList) {
            _this.taskList = taskList;
        });
        this.textField = new egret.TextField();
        this.textField.size = 20;
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].getStatus() != Task.UNACCEPTALBE) {
                this.textField.appendText(this.taskList[i].getID() + "\n" + this.taskList[i].toString() + "\n");
            }
        }
        this.textField.x = 0;
        this.textField.y = 0;
        this.addChild(this.textField);
        this.closeButton = new Button("close_png");
        this.closeButton.x = 300;
        this.closeButton.y = 0;
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.addChild(this.closeButton);
        this.touchEnabled = true;
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        this.textField.text = "";
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].getStatus() != Task.UNACCEPTALBE) {
                this.textField.appendText(this.taskList[i].getID() + "\n" + this.taskList[i].toString() + "\n");
            }
        }
    };
    p.onButtonClick = function () {
        UiManager.getCurrentUiManager().removePanel();
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map