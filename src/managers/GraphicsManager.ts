export class GraphicsManager {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    init(): void {
        this._canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;

        window.onresize = (function resizeHandler(event: UIEvent): void {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
        }).bind(this);
    }

    get width(): number {
        return this._canvas.width;
    }

    get height(): number {
        return this._canvas.height;
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    draw(): void {
        
    }

    update(): void {

    }
}
