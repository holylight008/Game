let monsterJason=[
    {id:"monster_png",health:5}
];

class Monster extends egret.DisplayObjectContainer{
    private id:string;
    private health:number;
    private healthMax:number;
    private bitmap:egret.Bitmap;
    constructor(id:string,health:number){
        super();
        this.id=id;
        this.health=health;
        this.healthMax=health;

        this.bitmap=new egret.Bitmap();
        this.bitmap.texture=RES.getRes(id);
        this.addChild(this.bitmap);

        this.width=this.bitmap.width;
        this.height=this.bitmap.height;

        this.touchEnabled=true;
    }
    public healthChange(change:number){
        this.health+=change;
        if(this.health==0){
            GameScene.getCurrentScene().killMonster(this);
            GameScene.getCurrentScene().getCommandList().pass();
        }
    }
    public getId():string{
        return this.id;
    }
    public getHealth():number{
        return this.health;
    }
}
class MonsterFactory{
    public static createOneMonster(id:string):Monster{
        for(var i=0;i<monsterJason.length;i++){
            if(monsterJason[i].id.match(id)){
                return new Monster(monsterJason[i].id,monsterJason[i].health);
            }
        }
    }
}