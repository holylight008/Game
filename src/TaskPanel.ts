class TaskPanel extends egret.DisplayObjectContainer implements Observer{
    private textField:egret.TextField;
    private myPanel:egret.Bitmap;
    private closeButton:Button;
    private taskList:Task[];
    constructor(){
        super();
        this.myPanel=new egret.Bitmap();
        this.myPanel.texture=RES.getRes("dialog_jpg");
        this.addChild(this.myPanel);

        var taskService:TaskService=TaskService.getInstance();
        taskService.addObserver(this);
        taskService.getTaskByCustomRole((taskList:Task[])=>{
            this.taskList=taskList;
        });

        this.textField=new egret.TextField();
        this.textField.size=20;
        for(var i=0;i<this.taskList.length;i++){
            if(this.taskList[i].getStatus()!=Task.UNACCEPTALBE){
                this.textField.appendText(this.taskList[i].getID()+"\n"+this.taskList[i].toString()+"\n");
            }
        }
        this.textField.x=0;
        this.textField.y=0;
        this.addChild(this.textField);

        this.closeButton=new Button("close_png");
        this.closeButton.x=300;
        this.closeButton.y=0;
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
        this.addChild(this.closeButton);
        this.touchEnabled=true;

    }
    onChange(task:Task):void{
        this.textField.text="";
        for(var i=0;i<this.taskList.length;i++){
            if(this.taskList[i].getStatus()!=Task.UNACCEPTALBE){
                this.textField.appendText(this.taskList[i].getID()+"\n"+this.taskList[i].toString()+"\n");
            }
        }
    }
    onButtonClick():void{
        UiManager.getCurrentUiManager().removePanel();
    }
}