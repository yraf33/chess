import './BoardComponent.css'
import React from 'react';



export default function BoardComponent () {

    const board = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cellClass = (i + j) % 2 === 0 ? 'cell black' : 'cell white';
            board.push(
                <div
                    key={`${i}-${j}`}
                    className={cellClass}
                    style={{ left: `${j * 64}px`, top: `${i * 64}px` }}
                />
            );
        }
    }

    return (
        <div id="board">
            {board}
        </div>
    );
}