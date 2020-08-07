# Tank Anatomy

## Tank's Components

Each tank consists of following components: body, gun and radar.

![Tank Parts](../img/tank_parts.png)

### Tank Movement

The tank can rotate, move forward and backward. It takes some short time to achieve the maximum speed. The speed can be controlled by setting throttle parameter. Valid values are between -1 and 1. Positive values result in forward movement. Negatives cause the tank move backward. Setting throttle to 0 allows stopping the tank.

Speed and direction of turning is defined by a number between -1 and 1. Positive values cause clockwise rotation, negative - counter clockwise. Zero means that the tank is not rotating. Position of the tank is specified in degrees and is always in relation to tank's body. For example:

```javascript
tank.angle == 0;   // aiming east
tank.angle == 90;  // aiming south
tank.angle == -90; // aiming north
tank.angle == 180; // aiming west
```

The angle of radar is normalized and is always between -180° and 180°.

### Radar

The radar can be rotated around to detect other tanks, bullets and walls. The speed of the rotation is defined as a number between -1 and 1. Positive values cause clockwise rotation, negative - counter clockwise. Zero means that the radar is not rotating. The radar has limited range (see [Constants and Formulas](./consts.md)). The position of the radar is specified in degrees and is always in relation to tank's body. For example:

```javascript
radar.angle == 0;   // aiming at the same direction where front of the tank
radar.angle == 90;  // aiming at right of the tank
radar.angle == -90; // aiming at left of the tank
radar.angle == 180; // aiming backward
```

The angle of radar is normalized and is always between -180° and 180°.

The beam of the radar has a triangular shape. Its parameters are described by  `Radar Beam Range` and `Radar Beam Focal` (see [Constants and Formulas](./consts.md)).

![Radar Beam](../img/radar_beam.png)

Whenever the radar detects an enemy, its indicator light will start blinking. The radar detects objects even when they are only partially covered by the beam (see picture above). To get precise position of detected enemy refer to `state.radar.enemy.x` and `state.radar.enemy.y` of [State Object](./tank_state_object.md).

### Gun

The gun can be rotated around to aim in other direction that the tank is moving. The speed of the rotation is defined as a number between -1 and 1. Positive values cause clockwise rotation, negative - counter clockwise. Zero means that the gun is not rotating. The position of the gun is specified in degrees and is always in relation to tank's body. For example:

```javascript
gun.angle == 0;   // aiming at the same direction where front of the tank
gun.angle == 90;  // aiming at right of the tank
gun.angle == -90; // aiming at left of the tank
gun.angle == 180; // aiming backward
```

The angle of gun is normalized and is always between -180° and 180°.

The gun may shoot bullets of various power. The power is defined as a number between 0.1 and 1. More powerful bullets deal more damage but reloading after such shoot take longer. Shooting more powerful bullets allow to deal more damage over the same period of time however, it required more precise aiming.

Bullet Power | Damage Per Bullet | Reloading Time | Damage dealt during 100 simulation steps
-------------|-------------------|----------------|------------------------------------------
0.1          | 1.03              | 7              | 14.7
0.5          | 5.75              | 35             | 16.4
1.0          | 13                | 70             | 18.6

### Special Bullet

Each tank has a limited amount of special bullets, special bullet has an extra velocity or damage. 

Bullet Power | Damage Per Bullet | Velocity | Reloading Time
-------------|-------------------|------------------------------------------
Radio Active | 26 (2X)     |  10 (2.5Z)  | VARIABLE (Dependens of Shot Speed)
Black Hole | 39 (3X)        |  2 (0.5Z)  | VARIABLE (Dependens of Shot Speed)

when:
 - X = Max damage of normal bullets.
 - Z = Normal Bullet Speed = 4 units.

### Boost

It is possible to temporarily double speed of the tank by turning on boost. The amount of boost is limited so it has no effect when it runs out.

### Shield

It is possible protect yourself temporarily from enemies by turning on shield. The amount of shield is limited.

## Energy

Each collision or bullet hit reduces the amount of energy that the tank has. When energy drops to zero, the tank will be destroyed.
