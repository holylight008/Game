class UiManager{
    private mask:egret.Bitmap;
    private dialogPanel:DialogPanel;
    private taskPanel:TaskPanel;
    private heroDetailsPanel:HeroDetailsPanel;
    private panelStack:egret.DisplayObjectContainer[];
    private taskButton:Button;
    private heroButton:Button;
    private hasMask:boolean;
    
    private canvas:egret.DisplayObjectContainer;
    private static uiManager:UiManager;
    public static TASKPANEL=0;
    public static DIALOGPANEL=1;
    public static HERODETAILSPANEL=2;
    constructor(canvas:egret.DisplayObjectContainer){
        this.dialogPanel=new DialogPanel();
        this.taskPanel=new TaskPanel();
        this.heroDetailsPanel=new HeroDetailsPanel();
        this.canvas=canvas;
        this.panelStack=new Array();
        this.hasMask=false;

        this.mask=new egret.Bitmap();
        this.mask.x=0;
        this.mask.y=0;
        this.mask.width=640;
        this.mask.height=640;
        this.mask.touchEnabled=true;

        this.taskButton=new Button("taskButton_png");
        this.taskButton.x=640;
        this.taskButton.y=0;
        this.taskButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTaskButtonClick,this);
        this.canvas.addChild(this.taskButton);

        this.heroButton=new Button("heroButton_png");
        this.heroButton.x=640;
        this.heroButton.y=100;
        this.heroButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHeroButtonClick,this);
        this.canvas.addChild(this.heroButton);
    }
    public static replaceCurrentUiManager(x:UiManager){
        UiManager.uiManager=x;
    }
    public static getCurrentUiManager():UiManager{
       return  UiManager.uiManager;
    }
    public addPanel(panelType:number,hasMask:boolean){
        //如需只添加一层面板，则判断是否有遮罩即可
        if (hasMask) {
            this.canvas.addChild(this.mask);
            this.hasMask = true;
        }
        switch(panelType){
            case UiManager.TASKPANEL:
            this.taskPanel.x=0;
            this.taskPanel.y=200;
            this.canvas.addChild(this.taskPanel);
            this.panelStack.push(this.taskPanel);
            break;

            case UiManager.DIALOGPANEL:
            this.dialogPanel.x=200;
            this.dialogPanel.y=200;
            this.canvas.addChild(this.dialogPanel);
            this.panelStack.push(this.dialogPanel);
            break;

            case UiManager.HERODETAILSPANEL:
            this.heroDetailsPanel.x=100;
            this.heroDetailsPanel.y=100;
            this.canvas.addChild(this.heroDetailsPanel);
            this.panelStack.push(this.heroDetailsPanel);
            break;
        }
    }
    public removePanel(){
        if(this.panelStack.length>=1){
            //如需移除制定面板，则传入面板事例，直接移除相应面板即可
            this.canvas.removeChild(this.panelStack.pop());
            if(this.panelStack.length!=0){
                //将下层面板至于遮罩层之上
                this.canvas.addChild(this.panelStack[this.panelStack.length-1]);
            }else if(this.hasMask){
                this.canvas.removeChild(this.mask);
                this.hasMask=false;
            }
        }
    }
    public getTaskPanel():TaskPanel{
        return this.taskPanel;
    }
    public getHeroDetaiksPanel():HeroDetailsPanel{
        return this.heroDetailsPanel;
    }
    public getDialogPanel():DialogPanel{
        return this.dialogPanel;
    }
    private onTaskButtonClick():void{
        this.addPanel(UiManager.TASKPANEL,true);
    }
    private onHeroButtonClick():void{
        this.addPanel(UiManager.HERODETAILSPANEL,true);
    }
}