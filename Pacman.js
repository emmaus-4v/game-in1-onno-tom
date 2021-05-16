import { OBJECT_TYPE, DIRECTIONS } from './setup';

class Pacman {
    constructor(speed,startPos) {
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.powerPILL = false;
        this.rotation = true;
    }
    moetBewegen() {
        if(!this.dir) return;

        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }

    volgendeBeweging(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;
        if (
            objectExist(nextMovePos,OBJECT_TYPE.WALL) ||
            objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
        ) {
            nextMovePos = this.pos;
        }
        return { nextMovePos, direction: this.dir };
    }

    maakBeweging() {
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return { classesToRemove, classesToAdd };
    }
    nieuweBeweging(nextMovePos) {
        this.pos = nextMovePos;
    }
    knopVerwerking = (e, objectExist) => {
        let dir;

        if(e.KeyCode >= 37 && e.KeyCode <= 40) {
            dir = DIRECTIONS[e.key];
        } else {
            return;
        }
        const nextMovePos = this.pos + dir.movement;
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;;
        this.dir = dir;
    };
}

export default Pacman;