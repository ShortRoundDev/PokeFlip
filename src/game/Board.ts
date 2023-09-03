import { GAME, GFX, WND } from "../managers";
import { Player } from "./Player";

export class Board {

    matrix: number[][];

    spriteSheet: HTMLImageElement;
    topLeft: HTMLImageElement;
    topRight: HTMLImageElement;
    bottomLeft: HTMLImageElement;
    bottomRight: HTMLImageElement;
    left: HTMLImageElement;
    right: HTMLImageElement;
    top: HTMLImageElement;
    bottom: HTMLImageElement;
    middle: HTMLImageElement;

    handler: any;

    constructor(private _w: number, private _h: number) {
        this.matrix = []
        this.spriteSheet = new Image();
        this.spriteSheet.src = "pokeballs.png";
        this.handler = this.handlePlayerMoved.bind(this);

        let walkX = Math.floor(Math.random() * 3);
        let walkY = Math.floor(Math.random() * 3);

        for(let i = 0; i < _w; i++){
            this.matrix[i] = [];
            for(let j = 0; j < _h; j++){
                this.matrix[i][j] = 0;
            }
        }

        let nextX = true;
        for(let i = 0; i < _w * 2 * 2; i++){
            nextX = !nextX;

            if(nextX){
                if(walkX == 0){
                    walkX++;
                } else if(walkX == this._w - 1){
                    walkX--;
                } else {
                    let dir = (Math.round(Math.random()) * 2) - 1;
                    walkX += dir;
                }
                
            } else {
                if(walkY == 0){
                    walkY++;
                }
                else if(walkY == this._h - 1){
                    walkY--;
                } else {
                    let dir = (Math.round(Math.random()) * 2) - 1; // 1 or -1
                    walkY += dir;
                }
            }

            this.flip(walkX, walkY);
        }

        GAME.player = new Player(walkX, walkY);

        this.topLeft = new Image();
        this.topLeft.src = "topLeft.png";

        this.left = new Image();
        this.left.src = "left.png";

        this.bottomLeft = new Image();
        this.bottomLeft.src = "bottomLeft.png";
        
        this.top = new Image();
        this.top.src = "top.png";
        
        this.bottom = new Image();
        this.bottom.src = "bottom.png";
        
        this.topRight = new Image();
        this.topRight.src = "topRight.png";
        
        this.right = new Image();
        this.right.src = "right.png";

        this.middle = new Image();
        this.middle.src = "middle.png";

        this.bottomRight = new Image();
        this.bottomRight.src = "bottomRight.png";

        window.addEventListener("playerMoved", this.handler);
        
    }

    get width(): number {
        return this._w;
    }

    get height(): number {
        return this._h;
    }

    private drawBoard(x: number, y: number): void {
        GFX.ctx.drawImage(this.topLeft, x - GAME.tileSize, y - GAME.tileSize, GAME.tileSize, GAME.tileSize);
        GFX.ctx.drawImage(this.topRight, x + this._w * GAME.tileSize, y - GAME.tileSize, GAME.tileSize, GAME.tileSize);
        GFX.ctx.drawImage(this.bottomLeft, x - GAME.tileSize, y + this._h * GAME.tileSize, GAME.tileSize, GAME.tileSize);
        GFX.ctx.drawImage(this.bottomRight, x + this._w * GAME.tileSize, y + this._h * GAME.tileSize, GAME.tileSize, GAME.tileSize);
        for(let i = 0; i < this._w; i++){
            GFX.ctx.drawImage(this.top, x + i * GAME.tileSize, y - GAME.tileSize, GAME.tileSize, GAME.tileSize);
            GFX.ctx.drawImage(this.bottom, x + i * GAME.tileSize, y + this._h * GAME.tileSize, GAME.tileSize, GAME.tileSize);
        }
        for(let i = 0; i < this._h; i++){
            GFX.ctx.drawImage(this.left, x - GAME.tileSize, y + i * GAME.tileSize, GAME.tileSize, GAME.tileSize);
            GFX.ctx.drawImage(this.right, x + this._w * GAME.tileSize, y + i * GAME.tileSize, GAME.tileSize, GAME.tileSize);
        }
        for(let i = 0; i < this._w; i++){
            for(let j = 0; j < this._h; j++){
                GFX.ctx.drawImage(this.middle, x + i * GAME.tileSize, y + j * GAME.tileSize, GAME.tileSize, GAME.tileSize);
            }
        }
    }

    draw(x: number, y: number): void {
        this.drawBoard(x, y);
        for(let i = 0; i < this._w; i++){
            for(let j = 0; j < this._h; j++){
                let tileNum: number = this.matrix[i][j];
                GFX.ctx.drawImage(this.spriteSheet,
                    tileNum * 19, 0,
                    18, 18,
                    x + 5 + i * GAME.tileSize, y + 5 + j * GAME.tileSize,
                    54, 54
                )
            }
        }
    }

    handlePlayerMoved(event: CustomEvent): void {
        let x = event.detail.x;
        let y = event.detail.y;
        
        this.flip(x, y);
        let full = true;
        WND.flipSound.play();
        for(let i = 0; i < this._w; i++){
            for(let j = 0; j < this._h; j++){
                if(this.matrix[i][j] != 2){
                    full = false;
                    return;
                }
            }
        }
        if(full){
            window.removeEventListener("playerMoved", this.handler);
            GAME.load(this._w + 1);
            WND.winSound.play();
        }
    }

    flip(x: number, y: number) {
        try {
            this.matrix[x][y]++;
            if(this.matrix[x][y] > 2){
                this.matrix[x][y] = 0;
            }
        }catch(e){
            console.error(e);
        }
    }
}