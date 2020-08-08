'use strict';
import { Container } from 'pixi.js';
import { Sprite, filters} from 'pixi.js';
import { Text } from 'pixi.js';
import AbstractPixiView from "./AbstractPixiView.js";

export default class AbstractPixiTankView extends AbstractPixiView {

  constructor(model) {
    super(model);
    this._hudView = new Container();
    this._createHud(this._hudView);

    this._shieldAngle = 0;
    this._shieldIncrement = 0.1;

    this._scale = 1;
    this._scaleIncrement = 0.03;
    this._empAngle = 0;
    this._empAngleIncrement = 0.2;
  }

  get body() {
    return this._body;
  }

  get hudView() {
    return this._hudView;
  }

  get gun() {
    return this._gun;
  }

  get radar() {
    return this._radar;
  }

  get shield() {
    return this._shield;
  }

  get electroMagneticPulse() {
    return this._electroMagneticPulse;
  }

  get label() {
    return this._label;
  }

  get energyBar() {
    return this._energyBar;
  }

  get filter() {
    return this._filter;
  }

  update(events) {
    super.update(events);

    this.electroMagneticPulse.visible = this.model.hasEMP;
    this.shield.visible = this.model.hasShield;

    if (this.model.hasShield) {
      this._shieldAngle += this._shieldIncrement;
      if (this._shieldAngle > 20 || this._shieldAngle < 0) this._shieldIncrement *= -1;
      this.shield.rotation = this._shieldAngle;

      this.shield.alpha = (this.model.shield  / this.model.maxShield) * 0.7 + 0.2; 
    }

    if (this.model.hasEMP) {
      if (this._scale < 0.5 || this._scale > 1) this._scaleIncrement *= -1;
      this._scale += this._scaleIncrement;
      this.electroMagneticPulse.scale.set(this._scale, this._scale);

      if (this._empAngle > 2 || this._empAngle < 0) this._empAngleIncrement *= -1;
      this._empAngle += this._empAngleIncrement;
      this.electroMagneticPulse.rotation = this._empAngle;
    }

    this.view.rotation = 0;
    this.body.rotation = this.model.angle * (Math.PI/180);
    this.gun.rotation = (this.model.angle + this.model.gunAngle) * (Math.PI/180);
    this.radar.rotation = (this.model.angle + this.model.radarAngle) * (Math.PI/180);
    this.energyBar.scale.x = this.model.energy / this.model.maxEnergy;
    this.label.text = this.model.fullName;
    this.filter.enabled = this.model.hasEMP;

    this.hudView.x = this.view.x;
    this.hudView.y = this.view.y;

    for(let i=0; i < events.length; i++) {
      this._onEvent(events[i]);
    }
  }

  _onEvent(event) {
    switch (event.type) {
      case 'shoot':
        this._onShoot(event);
        break;
      case 'destroy':
        this._onDestroy(event);
        break;
    }
  }

  _onShoot(event) {

  }

  _onDestroy(event) {
    this.destroy();
  }

  _create(container) {
    super._create(container);
    this._body = this._createBody();
    this._gun = this._createGun();
    this._radar = this._createRadar();
    this._shield = this._createShield();
    this._electroMagneticPulse = this._createElectroMagneticPulse()

    container.addChild(this._shield);
    container.addChild(this._electroMagneticPulse);
    container.addChild(this._body);
    container.addChild(this._gun);
    container.addChild(this._radar);

    const filter = new filters.ColorMatrixFilter();
    filter.browni(true);
    filter.enabled = false;

    this.body.filters = [filter];
    this.gun.filters = [filter];
    this.radar.filters = [filter];
    this._filter = filter;
  }

  _createHud(container) {
    this._label = this._createLabel();
    this._energyBar = this._createEnergyBar();
    container.addChild(this._createHudBackground());
    container.addChild(this._energyBar);
    container.addChild(this._label);
  }

  _createBody() {
    return new Sprite();
  }

  _createGun() {
    return new Sprite();
  }

  _createRadar() {
    return new Sprite();
  }

  _createElectroMagneticPulse() {
    return new Sprite();
  }

  _createShield() {
    return new Sprite();
  }

  _createHudBackground() {
    return new Sprite();
  }

  _createEnergyBar() {
    return new Sprite();
  }

  _createLabel() {
    return new Text();
  }
  destroy() {
    super.destroy();
    if(this.hudView.parent) {
      this.hudView.parent.removeChild(this.hudView);
    }
  }

}
