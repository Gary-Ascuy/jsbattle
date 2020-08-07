'use strict';
import { Sprite } from 'pixi.js';
import {
  Text,
  TextStyle
} from 'pixi.js';
import { Container } from 'pixi.js';
import { Graphics } from 'pixi.js';
import AbstractPixiTankView from "../abstractPixi/AbstractPixiTankView.js";

export default class BrodyTankView extends AbstractPixiTankView  {

  constructor(model) {
    super(model);
    this._lightTimer = 0;
  }

  update(events) {
    super.update(events);
    this._shoot.alpha =  this._shoot.alpha*0.8;
    this._tankGun.x = this._tankGun.x*0.8;
    this.radar.rotation = (- this.model.gunAngle + this._model.radarAngle) * (Math.PI/180);

    this._lightTimer = this.model.enemySpot ? this._lightTimer+1 : 0;

    this._light.alpha = -Math.cos(this._lightTimer * 0.25) * 0.5 + 0.5;
  }

  _onShoot(event) {
    super._onShoot(event);
    this._tankGun.x = -1-3*event.bullet.power;
    this._shoot.alpha = 1;
  }

  _create(container) {
    super._create(container);
    this._tankGun.addChild(this.radar);
  }

  _createBody() {
    let body = Sprite.from('tank_body_' + this.model.skin);
    body.anchor.set(0.3, 0.5);
    return body;
  }

  _createGun() {
    let gunContainer = new Container();

    let tankGun = Sprite.from('tank_gun_' + this.model.skin);
    tankGun.anchor.set(0.3, 0.5);
    gunContainer.addChild(tankGun);
    this._tankGun = tankGun;

    this._shoot = Sprite.from('tank_shoot');
    this._shoot.anchor.set(0.3, 0.5);
    this._shoot.alpha = 0;

    this._light = Sprite.from('tank_light');
    this._light.anchor.set(0.3, 0.5);
    this._light.alpha = 0;

    gunContainer.addChild(this._shoot);
    gunContainer.addChild(this._light);

    return gunContainer;
  }

  _createRadar() {
    let tankRadar = Sprite.from('tank_radar_' + this.model.skin);
    tankRadar.anchor.set(0.2, 0.5);
    tankRadar.x=-5;
    return tankRadar;
  }

  _createShield() {
    let shield = Sprite.from('shield_' + this.model._shieldSkin);
    shield.visible = this.model.hasShield;
    shield.anchor.set(0.5, 0.5);
    shield.alpha = 0.9;
    return shield;
  }

  _createLabel() {
    let labelStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 10,
        stroke: 0x000000,
        strokeThickness: 2,
        fill: 0xffffbb
    });
    let label = new Text("", labelStyle);
    label.anchor.set(0.5, 0.5);
    label.x = 0;
    label.y = -40;
    return label;
  }

  _createHudBackground() {
    let statusBarBg =  new Graphics();
    statusBarBg.beginFill(0x000000, 1);
    statusBarBg.drawRoundedRect(-26, -3, 52, 6, 4);
    statusBarBg.y = -30;
    return statusBarBg;
  }

  _createEnergyBar() {
    let energyBar =  new Graphics();
    energyBar.beginFill(0x578fe2, 1);
    energyBar.drawRoundedRect(0, -2, 50, 4, 4);
    energyBar.x = -25;
    energyBar.y = -30;
    return energyBar;
  }

}
