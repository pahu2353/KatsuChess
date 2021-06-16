 import {ChessConsole} from "/node_modules1/chess-console-stockfish/lib/chess-console/ChessConsole.js"
    import {LocalPlayer} from "./node_modules1/chess-console-stockfish/lib/chess-console/players/LocalPlayer.js"
    import {Board} from "./node_modules1/chess-console-stockfish/lib/chess-console/components/Board/Board.js"
    import {GameStateOutput} from "./node_modules1/chess-console-stockfish/lib/chess-console/components/GameStateOutput.js"
    import {History} from "./node_modules1/chess-console-stockfish/lib/chess-console/components/History.js"
    import {CapturedPieces} from "./node_modules1/chess-console-stockfish/lib/chess-console/components/CapturedPieces.js"
    import {HistoryControl} from "./node_modules1/chess-console-stockfish/lib/chess-console/components/HistoryControl.js"
    import {Persistence} from "./node_modules1/chess-console-stockfish/lib/chess-console/components/Persistence.js"
    import {Sound} from "./node_modules1/chess-console-stockfish/lib/chess-console/components/Sound.js"

    import {StockfishGameControl} from "./node_modules1/chess-console-stockfish/src/chess-console-stockfish/StockfishGameControl.js"
    import {StockfishPlayer} from "./node_modules1/chess-console-stockfish/src/chess-console-stockfish/StockfishPlayer.js"
    import {StockfishStateView} from "./node_modules1/chess-console-stockfish/src/chess-console-stockfish/StockfishStateView.js"
    import {I18n} from "./node_modules1/chess-console-stockfish/lib/cm-web-modules/i18n/I18n.js"

    const i18n = new I18n()
    i18n.load({
        en: {
            playerName: "Player"
        }
    })
    const chessConsole = new ChessConsole(
        document.getElementById("console-container"),
        {name: i18n.t("playerName"), type: LocalPlayer},
        {
            name: "Stockfish", type: StockfishPlayer, props: {
                worker: "./node_modules1/chess-console-stockfish/ext/stockfish.js",
                book: "./node_modules1/chess-console-stockfish/assets/openings.bin",
                level: 2,
                debug: true
            }
        },
        {
            soundSpriteFile: "./node_modules1/chess-console-stockfish/assets/sounds/chess_console_sounds.mp3",
            chessboardSpriteFile: "./node_modules1/chess-console-stockfish/assets/images/chessboard-sprite.svg",
            savePrefix: "Stockfish"
        })
    chessConsole.addComponent(Board).then(() => {
        chessConsole.addComponent(Persistence)
            .then((component) => component.load())
    })
    chessConsole.addComponent(History)
    chessConsole.addComponent(HistoryControl)
    chessConsole.addComponent(CapturedPieces)
    chessConsole.addComponent(StockfishGameControl, {
        player: chessConsole.opponent
    })
    chessConsole.addComponent(StockfishStateView, {
        player: chessConsole.opponent
    })
    chessConsole.addComponent(GameStateOutput)
    chessConsole.addComponent(Sound)

    document.getElementById("fenButton").addEventListener("click", () => {
        const fen = document.getElementById("fenInput").value
        const pgn = `[SetUp "1"]
[FEN "${fen}"]`
        chessConsole.initGame({
            pgn: pgn
        })
    })

    document.getElementById("pgnButton").addEventListener("click", () => {
        const fen = document.getElementById("fenInput").value
        const pgn = document.getElementById("pgnInput").value
        chessConsole.initGame({
            pgn: pgn
        })
    })
  
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}