import { useEffect, useState } from "react";
import { Movement } from "./types";

const rowTiles = 3;
const colTiles = 3;

const matrix = new Array(colTiles)
  .fill("")
  .map(() => new Array(rowTiles).fill(""));

function App() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  function isPar(num: number): boolean {
    return num % 2 === 0;
  }

  function checkPlayer(movement: Movement): "O" | "X" {
    return isPar(movement.turn) ? "O" : "X";
  }

  function handleButtonClick(row: number, col: number, turn: number) {
    if (winner) return; // Si ya hay un ganador, no permitir más movimientos

    const movementAlredyExist = !!movements.find((move) => {
      return move.row === row && move.col === col;
    });

    if (!movementAlredyExist) {
      setMovements((previous) => [
        ...previous,
        {
          row,
          col,
          turn,
          player: checkPlayer({ row, col, turn, player: "" }),
        },
      ]);
    }
  }

  useEffect(() => {
    const winner = checkWinner(movements);
    if (winner) {
      setWinner(winner);
      console.log("Ganador: ", winner);
    }
  }, [movements]);

  function checkWinner(movements: Movement[]): string | null {
    return checkColumns(movements) || checkRows(movements) || checkDiagonals(movements);
  }

  function checkColumns(movements: Movement[]): string | null {
    for (let col = 0; col < colTiles; col++) {
      const columnMoves = movements.filter((move) => move.col === col);
      if (columnMoves.length === colTiles && columnMoves.every((move) => move.player === columnMoves[0].player)) {
        return columnMoves[0].player; // El jugador de esa columna es el ganador
      }
    }
    return null;
  }

  function checkRows(movements: Movement[]): string | null {
    for (let row = 0; row < rowTiles; row++) {
      const rowMoves = movements.filter((move) => move.row === row);
      if (rowMoves.length === rowTiles && rowMoves.every((move) => move.player === rowMoves[0].player)) {
        return rowMoves[0].player; // El jugador de esa fila es el ganador
      }
    }
    return null;
  }

  function checkDiagonals(movements: Movement[]): string | null {
    const diagonal1 = movements.filter((move) => move.row === move.col); // Diagonal de arriba izquierda a abajo derecha
    const diagonal2 = movements.filter((move) => move.row + move.col === rowTiles - 1); // Diagonal de arriba derecha a abajo izquierda

    // Verificar la primera diagonal
    if (diagonal1.length === rowTiles && diagonal1.every((move) => move.player === diagonal1[0].player)) {
      return diagonal1[0].player;
    }

    // Verificar la segunda diagonal
    if (diagonal2.length === rowTiles && diagonal2.every((move) => move.player === diagonal2[0].player)) {
      return diagonal2[0].player;
    }

    return null;
  }

  function resetGame() {
    setMovements([]);
    setWinner(null);
  }

  return (
    <div className="flex bg-red-950 flex-col">
      <div className="flex flex-col gap-y-1 items-center">
        <p className="text-[100px] font-extrabold text-white mt-20 uppercase">
          Tic Tac Toe Game
        </p>
      </div>

      {winner && (
        <div className="flex items-center justify-center my-4">
          <p className="text-4xl font-bold text-yellow-300">
            ¡Ganador: {winner}!
          </p>
        </div>
      )}

      <div className="flex gap-x-0.5 my-20 w-full flex-row items-start justify-center">
        <p className="text-3xl font-bold text-white uppercase mr-20">Player 1</p>

        <div className="flex gap-x-4">
          {matrix.map((col, colIndex) => (
            <div className="flex flex-col gap-y-0.5" key={colIndex}>
              {col.map((_, rowIndex) => {
                const foundMovement = movements.find(
                  (move) => move.row === rowIndex && move.col === colIndex
                );
                return (
                  <button
                    className={`flex flex-col items-center justify-center h-40 w-40 text-8xl bg-yellow-50 font-bold text-black border-8 shadow-lg ${
                      !foundMovement ? "border-stone-500" : "border-cyan-500"
                    }`}
                    key={rowIndex}
                    onClick={() =>
                      handleButtonClick(rowIndex, colIndex, movements.length)
                    }
                    disabled={!!foundMovement || !!winner} // Deshabilitar botón si ya está marcado o si hay un ganador
                  >
                    {foundMovement && foundMovement.player}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <p className="text-3xl font-bold text-white uppercase ml-20">Player 2</p>
      </div>

      {winner && (
        <div className="flex items-center justify-center">
          <button
            className="bg-yellow-300 text-black px-6 py-3 text-2xl font-bold rounded"
            onClick={resetGame}
          >
            Reiniciar juego
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
