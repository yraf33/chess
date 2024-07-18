import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/b-pawn.png";
import whiteLogo from "../../assets/w-pawn.png";
import { Queen } from "./Queen";


export class Pawn extends Figure {

    isFirstStep: boolean = true

    constructor(color:Colors, cell:Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK? blackLogo : whiteLogo
        this.name = FigureNames.PAWN
    }
    changeFigure () {
        
        if (this.cell.y === 0 || this.cell.y === 7) {
            
            new Queen(this.color, this.cell)
            
        }

    }
    passantTaking (target: Cell) {
        const direction = this.cell.figure?.color === Colors.BLACK? 1 : -1
        const passantCell = this.cell.board.getCell(target.x, target.y + direction)
        if (passantCell.isEmpty() && passantCell.figure?.name === FigureNames.PAWN) {
            passantCell.figure?.moveFigure(this.cell)
            // this.cell.board.removeFigure(passantCell)
        }

    }
    // Переопределяем этот метод, чтобы он не двигал фигуру вперед на первый ход
    canMove(target: Cell): boolean {
        if(!super.canMove(target)) 
            return false
        const direction = this.cell.figure?.color === Colors.BLACK? 1 : -1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK? 2 : -2

        if ((target.y === this.cell.y + direction || this.isFirstStep // Проверяем первый это ход и выбираем только ячейки с разницей в direction
            && (target.y === this.cell.y + firstStepDirection)) 
            && target.x === this.cell.x // Проверям чтобы x не менялся
            && this.cell.board.getCell(target.x, target.y).isEmpty()) { 
        return true}

        if (target.y === this.cell.y + direction // Проверяем движение по диагонали
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) 
            &&this.cell.isEnemy(target)) {
            return true
        }
        return false
        
    }
    moveFigure(target: Cell): void {
        console.log(this)
        super.moveFigure(target)
        
        this.isFirstStep = false
        // this.changeFigure()
    }
}