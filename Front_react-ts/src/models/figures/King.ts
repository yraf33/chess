import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/b-king.png";
import whiteLogo from "../../assets/w-king.png";


export class King extends Figure {

    constructor(color:Colors, cell:Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK? blackLogo : whiteLogo
        this.name = FigureNames.KING

    }

    isKingOnCheck (target: Cell): boolean {
        // Проверка на наличие шаха для короля
        console.log(this.cell.figure)
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) 
            return false
        if(Math.abs(this.cell.x - target.x) <= 1 && Math.abs(this.cell.y - target.y) <= 1)
            return true
        else
            return false
    }
}