const version = 'v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        '/',
        './script.js',
        './node_modules1/@fortawesome/fontawesome-free/css/all.min.css',
        '/node_modules1/chess-console-stockfish/assets/styles/screen.css',
        '/node_modules1/jquery/dist/jquery.min.js',
        '/node_modules1/bootstrap/dist/js/bootstrap.js',
        '/node_modules1/chess-console-stockfish/lib/chess-console/ChessConsole.js',
        './node_modules1/chess-console-stockfish/lib/chess-console/components/Board/Board.js',
        './node_modules1/chess-console-stockfish/lib/chess-console/components/GameStateOutput.js',
        './node_modules1/chess-console-stockfish/lib/chess-console/components/History.js',
        './node_modules1/chess-console-stockfish/lib/chess-console/players/LocalPlayer.js',
        './node_modules1/chess-console-stockfish/lib/chess-console/components/CapturedPieces.js',
        './node_modules1/chess-console-stockfish/lib/chess-console/components/HistoryControl.js',
        './node_modules1/chess-console-stockfish/lib/chess-console/components/Persistence.js',
        './node_modules1/chess-console-stockfish/lib/chess-console/components/Sound.js',
        './node_modules1/chess-console-stockfish/src/chess-console-stockfish/StockfishGameControl.js',
        './node_modules1/chess-console-stockfish/src/chess-console-stockfish/StockfishPlayer.js',
        './node_modules1/chess-console-stockfish/src/chess-console-stockfish/StockfishStateView.js',
        './node_modules1/chess-console-stockfish/lib/cm-web-modules/i18n/I18n.js',
        './node_modules1/chess-console-stockfish/ext/stockfish.js',
        './node_modules1/chess-console-stockfish/assets/openings.bin',
        './node_modules1/chess-console-stockfish/assets/sounds/chess_console_sounds.mp3',
        './node_modules1/chess-console-stockfish/assets/images/chessboard-sprite.svg',
        '/style.css',
		    '/lichess.html',
        '/chess.html',
        '/index.html',
        '/manifest.json',
        '/lichess.js',
        '/icons/icon-192x192.png',
        '/notfound.txt'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open(version).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/notfound.txt');
      });
    }
  }));
});