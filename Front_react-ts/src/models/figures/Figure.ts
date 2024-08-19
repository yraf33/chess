import { Colors } from "../../models/Colors";
import logo from '../../assets/b-queen.png'
import { Cell } from "../Cell";

export enum FigureNames {
    FIGURE = 'Figure',
    PAWN = 'P',
    KING = 'K',
    QUEEN = 'Q',
    BISHOP = 'B',
    KNIGHT = 'N',
    ROOK = 'R',
}

export class Figure {
    color: Colors;
    logo: typeof logo | null; 
    cell: Cell;
    name: FigureNames
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE
        this.id = Math.random(); 
    }

    canMove(target:Cell):boolean {
        
        if (target.figure?.color === this.color) {
            
            return false;
        }
        if(target.figure?.name === FigureNames.KING) {
            return false
        }
        return true
    
    }
    moveFigure(target:Cell) {
        
    }
    changeFigure(target:Cell) {
        
    }
}