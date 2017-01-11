class DialogPanel extends egret.DisplayObjectContainer{
    private dialog:egret.TextField;
    private currentNPCID:string;
    private taskList:Task[];
    private finishButton:Button;
    private closeButton:Button;
    constructor(){
        super();
        var bj:egret.Bitmap=new egret.Bitmap();
        bj.texture=RES.getRes("dialog_jpg");
        bj.x=0;
        bj.y=0;
        this.addChild(bj);

        this.width=bj.width;
        this.height=bj.height;

        this.dialog=new egret.TextField();
        this.dialog.size=20;
        this.dialog.x=0;
        this.dialog.y=0;
        this.addChild(this.dialog);

        this.finishButton=new Button("buttonFinish_png");
        this.finishButton.x=0;
        this.finishButton.y=200;
        this.finishButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
        this.addChild(this.finishButton);
        this.touchEnabled=true;

        this.closeButton=new Button("close_png");
        this.closeButton.x=300;
        this.closeButton.y=0;
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
        this.addChild(this.closeButton);
    }
    private onButtonClick():void{
        //此处有几个任务完成，接受就需要点击几次按钮，如需优化，请为每一个任务添加一个按钮，同时删去break
        for(var i=0;i<this.taskList.length;i++){
            if(this.taskList[i].getStatus()==Task.CAN_SUBMIT && this.taskList[i].getToID().match(this.currentNPCID)){
                this.taskList[i].onSubmit();
                break;
            }else if(this.taskList[i].getStatus()==Task.ACCEPTABLE && this.taskList[i].getFromID().match(this.currentNPCID)){
                this.taskList[i].onAccept();
                break;
            }
        }
        GameScene.getCurrentScene().getCommandList().pass();
    }
    private onClose():void{
        GameScene.getCurrentScene().getCommandList().pass();
    }
    public addTask(taskList:Task[],id:string):void{
        this.taskList=taskList;
        this.refreash(id);
    }
    private refreash(id:string):void{
        this.dialog.text="";
        for(var i=0;i<this.taskList.length;i++){
            if(this.taskList[i].getStatus()!=Task.UNACCEPTALBE){
                this.dialog.appendText(this.taskList[i].getID()+"\n"+this.taskList[i].toString()+"\n");
            }
        }
        this.currentNPCID=id;
    }

}