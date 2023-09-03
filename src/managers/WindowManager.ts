export enum KEY {
    W = 87,
    A = 65,
    S = 83,
    D = 68,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40
};

export class WindowManager {

    keyMap: boolean[];

    public flipSound: HTMLAudioElement;
    public winSound: HTMLAudioElement;

    init(): void {
        this.keyMap = [];
        for(let i = 0; i < 512; i++){
            this.keyMap[i] = false;
        }

        this.flipSound = new Audio("SFX_PRESS_AB.wav");
        this.winSound = new Audio("SFX_GET_ITEM_1.wav");

        window.onkeydown = this.onKeyDown.bind(this);
        window.onkeyup = this.onKeyUp.bind(this);
    }

    private onKeyDown(e: KeyboardEvent): void {
        this.keyMap[e.keyCode] = true;
    }

    private onKeyUp(e: KeyboardEvent): void {
        this.keyMap[e.keyCode] = false;
    }

    isKeyDown(key: KEY): boolean {
        return this.keyMap[key];
    }

    isKeyUp(key: KEY): boolean {
        return !this.keyMap[key];
    }
}