import { GAME, GFX, WND } from "../managers";
import { KEY } from "../managers/WindowManager";

enum DIRECTION {
    UP = 0,
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3
};

export class Player {

    img: HTMLImageElement;

    moving: boolean = false;

    dirX?: number;
    dirY?: number;

    drawX: number;
    drawY: number;

    speed = 0.05;

    direction: DIRECTION;
    frame = 0;

    constructor(private x: number, private y: number){
        this.img = new Image();
        this.img.src = "snorlax.png";
        this.drawX = x;
        this.drawY = y;
        this.direction = DIRECTION.DOWN;
    }

    update(): void{
        if(this.moving){
            this.frame += 0.1;
            if(this.frame >= 2) {
                this.frame -= 2;
            }
            if(this.dirX) {
                //moving right
                if(this.dirX > 0){
                    if(this.drawX < this.x + this.dirX){
                        this.drawX += this.speed;
                    } 
                    if(this.drawX >= this.x + this.dirX) {
                        this.drawX = this.x + this.dirX;
                        this.x += this.dirX;
                        this.moving = false;
                        this.frame = 0;
                        this.dirX = undefined;
                        window.dispatchEvent(new CustomEvent("playerMoved", {detail: { x: this.x, y: this.y }}));
                    }
                } else {
                    if(this.drawX > this.x + this.dirX){
                        this.drawX -= this.speed;
                    }
                    if(this.drawX <= this.x + this.dirX) {
                        this.drawX = this.x + this.dirX;
                        this.x += this.dirX;
                        this.moving = false;
                        this.frame = 0;
                        this.dirX = undefined;
                        window.dispatchEvent(new CustomEvent("playerMoved", {detail: { x: this.x, y: this.y }}));
                    }
                }
            }
            else if(this.dirY) {
                //moving down
                if(this.dirY > 0){
                    if(this.drawY < this.y + this.dirY){
                        this.drawY += this.speed;
                    } 
                    if(this.drawY >= this.y + this.dirY) {
                        this.drawY = this.y + this.dirY;
                        this.y += this.dirY;
                        this.moving = false;
                        this.frame = 0;
                        this.dirY = undefined;
                        window.dispatchEvent(new CustomEvent("playerMoved", {detail: { x: this.x, y: this.y }}));
                    }
                } else {
                    if(this.drawY > this.y + this.dirY){
                        this.drawY -= this.speed;
                    } 
                    if(this.drawY <= this.y + this.dirY){
                        this.drawY = this.y + this.dirY;
                        this.y += this.dirY;
                        this.moving = false;
                        this.frame = 0;
                        this.dirY = undefined;
                        window.dispatchEvent(new CustomEvent("playerMoved", {detail: { x: this.x, y: this.y }}));
                    }
                }
            }
            return;
        }
        
        if(WND.isKeyDown(KEY.A) && this.x > 0){
            this.dirX = -1;
            this.direction = DIRECTION.LEFT;
            this.moving = true;
        }
        else if(WND.isKeyDown(KEY.D) && this.x < GAME.board.width - 1){
            this.dirX = 1;
            this.direction = DIRECTION.RIGHT;
            this.moving = true;
        }
        else if(WND.isKeyDown(KEY.W) && this.y > 0){
            this.dirY = -1;
            this.direction = DIRECTION.UP;
            this.moving = true;
        }
        else if(WND.isKeyDown(KEY.S) && this.y < GAME.board.height - 1){
            this.dirY = 1;
            this.direction = DIRECTION.DOWN;
            this.moving = true;
        }
    }

    draw(x: number, y: number): void{
        GFX.ctx.drawImage(this.img,
            Math.floor(this.direction * 2 + Math.floor(this.frame)) * 32, 0, 32, 32,
            x + this.drawX * GAME.tileSize, y + this.drawY * GAME.tileSize, 64, 64
        );
    }
}