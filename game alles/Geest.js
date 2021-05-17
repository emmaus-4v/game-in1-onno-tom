import { DIRECTIONS, OBJECT_TYPE } from './setup';
import { randomMovement } from './geestbewegen';

class Geest {
    constructor(speed = 5, startPos, movement, name) {
        this.name = name;
        this.movement = movement;
        this.startPos = startPos;
        this.pos = startPos;
        this.dir = DIRECTIONS.ArrowRight;
        this.speed = speed;
        this.timer = 0;
        this.isScared = false;
        this.rotation = false;
    }

    shouldMove() {
        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }

    volgendeBeweging(objectExist) {
        const { nextMovePos, direction } = this.movement(
            this.pos,
            this.dir,
            objectExist
        );
        return { nextMovePos, direction };
    }
    maakBeweging() {
        const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.BANG, this.name];
        let classesToAdd = [OBJECT_TYPE.GHOST, this.name];

        if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.BANG];
        return { classesToRemove, classesToAdd }
    }

    volgendePlek(nextMovePos, direction) {
        this.pos = nextMovePos;
        this.dir = direction;
    }
}

export default Geest;