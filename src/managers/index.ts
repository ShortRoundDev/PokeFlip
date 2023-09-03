import { GraphicsManager } from "./GraphicsManager";
import { GameManager } from "./GameManager";
import { WindowManager } from "./WindowManager";

export let GFX: GraphicsManager = new GraphicsManager();
export let GAME: GameManager = new GameManager();
export let WND: WindowManager = new WindowManager();

export function initManagers(): void {
    GFX.init();
    GAME.init();
    WND.init();
}