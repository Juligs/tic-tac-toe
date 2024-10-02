import {Movement} from '../types';

interface TileProps {
    row: number;
    col: number;
    children?: React.ReactNode;
    movements: Movement[];
}

export function Tile ({ row: rowIndex, col: colIndex, children,  movements}: TileProps) {

    function handleButtonClick() {
       if (movements.length >= 0){
          console.log('Tile clicked', movements);
       }
       movements.forEach((item) => {
        if (
            item.col !== colIndex &&
            item.row !== rowIndex
        ){
            movements.push({row: rowIndex, col: colIndex, turn: 0, player: 'player1'});
        }
       })

       
    }

    return(
        <button
        className= {`h-40 w-40 border border-black ${rowIndex === 2 ? 'bg-red-500' : 'bg-blue-500'}`}
        key={rowIndex}
        onClick={handleButtonClick}
        >
            {children}
        </button>
    )
}