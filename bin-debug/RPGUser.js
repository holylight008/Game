var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Catche = function (target, propertyName, desc) {
    var method = desc.value;
    desc.value = function () {
        if (this["fightPowerCache"] != null && this["isDirty"] == false) {
            return target["fightPowerCache"];
        }
        else {
            this["isDirty"] = true;
            this["fightPowerCache"] = method.apply(this);
            return this["fightPowerCache"];
        }
    };
};
var User = (function () {
    function User() {
        this.gold = 0;
        this.diomond = 0;
        ;
    }
    var d = __define,c=User,p=c.prototype;
    User.getInstance = function () {
        if (User.user != null) {
            return User.user;
        }
        else {
            User.user = new User();
            User.user.heros = new Array();
            User.user.fightPowerCache = null;
            User.user.isDirty = true;
            return User.user;
        }
    };
    p.getFightPower = function () {
        var result = 0;
        this.heros.forEach(function (hero) {
            result += hero.getFightPower();
        });
        this.fightPowerCache = result;
        return result;
    };
    p.addHero = function (hero) {
        this.heros.push(hero);
        this.isDirty = true;
        hero.user = this;
    };
    __decorate([
        Catche
    ], p, "getFightPower", null);
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(attack, defence) {
        this.level = 1;
        this.currentEXP = 0;
        this.totalEXP = 100;
        this.like = false;
        this.equipments = new Array();
        this.isDirty = true;
        this.properties = new Properties();
        this.properties.all.push(new Property("attack", attack));
        this.properties.all.push(new Property("defence", defence));
    }
    var d = __define,c=Hero,p=c.prototype;
    p.getFightPower = function () {
        var result = 0;
        this.equipments.forEach(function (equipment) {
            result += equipment.getFightPower();
        });
        result += this.properties.getProperty(heroProperty.attack).value * 2 + this.properties.getProperty(heroProperty.denfence).value * 1 + this.level * 3;
        this.fightPowerCache = result;
        return result;
    };
    p.addEquipment = function (e) {
        this.equipments.push(e);
        this.isDirty = true;
        e.hero = this;
        this.user.isDirty = true;
    };
    __decorate([
        Catche
    ], p, "getFightPower", null);
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(attack, bitmap) {
        var _this = this;
        this.jewlls = new Array();
        this.isDirty = true;
        this.properties = new Properties();
        this.properties.all.push(new Property("attack", attack));
        this.initDesc();
        this.img = new egret.Bitmap();
        this.img.texture = RES.getRes(bitmap);
        this.img.touchEnabled = true;
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            UiManager.getCurrentUiManager().getHeroDetaiksPanel().setDesc(_this.desc);
        }, this);
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.getFightPower = function () {
        var result = 0;
        this.jewlls.forEach(function (jewll) {
            result += jewll.getFightPower();
        });
        result += this.properties.getProperty(equipmentProperty.attack).value * 2;
        this.fightPowerCache = result;
        return result;
    };
    p.addJewll = function (j) {
        this.jewlls.push(j);
        this.isDirty = true;
        j.equip = this;
        this.hero.isDirty = true;
        this.initDesc();
    };
    p.initDesc = function () {
        this.desc = PropertiesDisplayUtils.getAllProperties(this.properties);
        //console.log("before"+" "+this.desc.text);
        for (var _i = 0, _a = this.jewlls; _i < _a.length; _i++) {
            var j = _a[_i];
            this.desc.appendText(PropertiesDisplayUtils.getAllProperties(j.properties).text);
        }
        //console.log("after"+" "+this.desc.text);
    };
    __decorate([
        Catche
    ], p, "getFightPower", null);
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Jewll = (function () {
    function Jewll(defence) {
        this.fightPowerCache = null;
        this.isDirty = true;
        this.properties = new Properties();
        this.properties.all.push(new Property("defence", defence));
    }
    var d = __define,c=Jewll,p=c.prototype;
    p.getFightPower = function () {
        var result = this.properties.getProperty(jewllProperty.denfence).value;
        this.fightPowerCache = result;
        return result;
    };
    __decorate([
        Catche
    ], p, "getFightPower", null);
    return Jewll;
}());
egret.registerClass(Jewll,'Jewll');
var Properties = (function () {
    function Properties() {
        this.all = new Array();
    }
    var d = __define,c=Properties,p=c.prototype;
    p.getProperty = function (propertyName) {
        return this.all[propertyName];
    };
    return Properties;
}());
egret.registerClass(Properties,'Properties');
var Property = (function () {
    function Property(name, value) {
        this.name = name;
        this.value = value;
    }
    var d = __define,c=Property,p=c.prototype;
    return Property;
}());
egret.registerClass(Property,'Property');
var heroProperty;
(function (heroProperty) {
    heroProperty[heroProperty["attack"] = 0] = "attack";
    heroProperty[heroProperty["denfence"] = 1] = "denfence";
})(heroProperty || (heroProperty = {}));
var equipmentProperty;
(function (equipmentProperty) {
    equipmentProperty[equipmentProperty["attack"] = 0] = "attack";
})(equipmentProperty || (equipmentProperty = {}));
var jewllProperty;
(function (jewllProperty) {
    jewllProperty[jewllProperty["denfence"] = 0] = "denfence";
})(jewllProperty || (jewllProperty = {}));
var PropertiesDisplayUtils = (function () {
    function PropertiesDisplayUtils() {
    }
    var d = __define,c=PropertiesDisplayUtils,p=c.prototype;
    PropertiesDisplayUtils.getDescription = function (property) {
        return property.name + ":" + property.value;
    };
    PropertiesDisplayUtils.getAllProperties = function (properties) {
        var tf = new egret.TextField();
        for (var _i = 0, _a = properties.all; _i < _a.length; _i++) {
            var p = _a[_i];
            tf.appendText(PropertiesDisplayUtils.getDescription(p) + " ");
        }
        return tf;
    };
    return PropertiesDisplayUtils;
}());
egret.registerClass(PropertiesDisplayUtils,'PropertiesDisplayUtils');
//# sourceMappingURL=RPGUser.js.map