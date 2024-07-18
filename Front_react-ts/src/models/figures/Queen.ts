import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/b-queen.png";
import whiteLogo from "../../assets/w-queen.png";


export class Queen extends Figure {

    constructor(color:Colors, cell:Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK? blackLogo : whiteLogo
        this.name = FigureNames.QUEEN

    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) 
            return false
        if(this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target) || this.cell.isEmptyDiagonal(target))
            return true
        return false
    }
}