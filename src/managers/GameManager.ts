import { GFX } from ".";
import { Board } from "../game/Board";
import { Player } from "../game/Player";

export class GameManager {
    board: Board;
    public player: Player;

    public readonly tileSize: number = 64;

    init(): void {
        this.board = new Board(3,3);
    }

    load(size: number) {
        if(size > 5){
            size = 3;
        }
        this.board = new Board(size, size);
    }

    update() {
        this.player.update();
    }

    draw() {
        let xOff = GFX.width / 2 - this.board.width * this.tileSize / 2;
        let yOff = GFX.height / 2 - this.board.height * this.tileSize / 2;

        this.board.draw(xOff, yOff);
        this.player.draw(xOff, yOff);
    }

}