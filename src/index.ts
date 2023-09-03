import { GAME, GFX, initManagers } from './managers';


function main() {
    initManagers();
    setInterval(function run() {
        GAME.update();
        GFX.clear();
        GAME.draw();
    }, 16);
}

window.onload = main;