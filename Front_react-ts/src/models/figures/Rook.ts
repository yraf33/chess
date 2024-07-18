import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/b-rook.png";
import whiteLogo from "../../assets/w-rook.png";


export class Rook extends Figure {

    constructor(color:Colors, cell:Cell) {
        super(color, cell)
        
        this.logo = color === Colors.BLACK? blackLogo : whiteLogo
        this.name = FigureNames.ROOK

    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) 
            return false
        if(this.cell.isEmptyVertical(target) || 
            this.cell.isEmptyHorizontal(target))
            return true
        return false
    }
}