$(document).ready(function() {
  $pkmGeneratedImage = $('#pkmGeneratedImage');
  $pkmGeneratedCanvas = $('#pkmGeneratedCanvas');
  $pkmGeneratedButton = $('#pkmGeneratedButton');

  $settingsWidth = $('#settingsWidth');
  $settingsHeight = $('#settingsHeight');
  $settingsIterations = $('#settingsIterations');
  $settingsSpriteSizeMultiplier = $('#settingsSpriteSizeMultiplier');
  $settingsIterations = $('#settingsIterations');

  var screenWidth = screen.width;
  var screenHeight = screen.height;

  var spriteWidth = 40;
  var spriteHeight = 30;

  var tileWidth = 16;
  var tileHeight = 16;

  var pkmImgFolder = 'projects/pokemon-grid/img/pkm/menu/';
  var tileImgFolder = 'projects/pokemon-grid/img/tilesets/';

  $pkmGeneratedButton.on('click', function() {
    generateImage()
  });

  function generateImage() {
    $pkmGeneratedCanvas.clearCanvas();
    validate();
    var canvasWidth = parseInt($settingsWidth.val());
    var canvasHeight = parseInt($settingsHeight.val());
    var iterations = parseInt($settingsIterations.val());
    var spriteSizeMultiplier = parseInt($settingsSpriteSizeMultiplier.val());

    $settingsBackgroundTile = $('.settingsBackgroundTile:checked');
    $pkmSelection = $('.pkmSelection:checked');
    var backgroundTile = $settingsBackgroundTile.val();

    $pkmGeneratedCanvas.attr('width', canvasWidth)
    $pkmGeneratedCanvas.attr('height', canvasHeight)

    // Adjust for Sprite Size Multiplier
    spriteAdjustedWidth = spriteWidth * spriteSizeMultiplier
    spriteAdjustedHeight = spriteHeight * spriteSizeMultiplier

    // Draw Tiles
    if(backgroundTile != "transparent") {
      var tileCols = Math.ceil(canvasWidth / tileWidth)
      var tileRows = Math.ceil(canvasHeight / tileHeight)
      var tileUrl = tileImgFolder + backgroundTile + ".png";
    }

    for(var i = 0; i < tileCols; i++) {
      for(var j = 0; j < tileRows; j++) {
        $pkmGeneratedCanvas.drawImage({
          source: tileUrl,
          fromCenter: false,
          x: i * tileWidth, y: j * tileHeight
        });
      }
    }

    // Calculate Grid
    var gridVerticalPadding = (canvasWidth % spriteAdjustedWidth) / 2
    var gridCols = Math.floor(canvasWidth / spriteAdjustedWidth)
    var gridHorizontalPadding = (canvasHeight % spriteAdjustedHeight) / 2
    var gridRows = Math.floor(canvasHeight / spriteAdjustedHeight)

    var gridCells = gridCols * gridRows;
    // Create Simulated Grid --> Row to Column
    var simulatedGrid = [];
    for(var row = 0; row < gridRows; row++) {
      simulatedGrid[row] = [];
      for(var col = 0; col < gridCols; col++) {
        simulatedGrid[row][col] = 0;
      }
    }

    // Start placing images
    for(var i = 0; i < iterations; i++) {

      // Get Pokemon Selection
      $pkmSelection.each(function() {
        if(gridCells != 0) {
          $this = $(this);
          var pkmImgUrl = pkmImgFolder + $this.val() + ".png"
          drawSpriteInRandomGridCell(pkmImgUrl)
        }
      })
    }

    $pkmGeneratedImage.attr('src', $pkmGeneratedCanvas.getCanvasImage('png'))

    function drawSpriteInRandomGridCell(spriteName) {
      function getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * max) + min
      }

      var randomRow = getRandomNumberBetween(0, gridRows);
      var randomCol = getRandomNumberBetween(0, gridCols);

      while(simulatedGrid[randomRow][randomCol] == 1) {
        randomRow = getRandomNumberBetween(0, gridRows);
        randomCol = getRandomNumberBetween(0, gridCols);
      }

      simulatedGrid[randomRow][randomCol] = 1;
      gridCells--;

      var x = gridVerticalPadding + (randomCol * spriteAdjustedWidth)
      var y = gridHorizontalPadding + (randomRow * spriteAdjustedHeight)

      $pkmGeneratedCanvas.drawImage({
        source: spriteName,
        width: spriteAdjustedWidth,
        height: spriteAdjustedHeight,
        fromCenter: false,
        x: x, y: y
      });
    }
  }

  function validate() {
    // Might do later.
    console.log("Validated")
  }

  function init() {
    $settingsWidth.val(screenWidth)
    $settingsHeight.val(screenHeight)

    $settingsWidth.attr('placeholder', screenWidth)
    $settingsHeight.attr('placeholder', screenHeight)

    $settingsIterations.val(2)
    $settingsIterations.attr('placeholder', 2)

    $settingsSpriteSizeMultiplier.val(1)
    $settingsSpriteSizeMultiplier.attr('placeholder', 1)
  }

  init()
  generateImage()
  $pkmGeneratedImage.css('display', 'block')

  // Listeners
  $('.pkmSelectionButton').on('click', function() {
    $this = $(this);
    var query = $this.val();

    console.log(query)

    if(query == 'reset') {
      for(var i = 1; i <= 721; i++) {
        togglePokemonSelection(i, true)
      }
    } else if(query == 'all') {
      for(var i = 1; i <= 721; i++) {
        togglePokemonSelection(i)
      }
    } else if(query == 'kanto') {
      for(var i = 1; i <= 151; i++) {
        togglePokemonSelection(i)
      }
    } else if(query == 'johto') {
      for(var i = 152; i <= 251; i++) {
        togglePokemonSelection(i)
      }
    } else if(query == 'hoenn') {
      for(var i = 252; i <= 386; i++) {
        togglePokemonSelection(i)
      }
    } else if(query == 'sinnoh') {
      for(var i = 387; i <= 493; i++) {
        togglePokemonSelection(i)
      }
    } else if(query == 'unova') {
      for(var i = 494; i <= 649; i++) {
        togglePokemonSelection(i)
      }
    } else if(query == 'kalos') {
      for(var i = 650; i <= 721; i++) {
        togglePokemonSelection(i)
      }
    } else if(query == 'starters') {
      togglePokemonSelection(1);
      togglePokemonSelection(4);
      togglePokemonSelection(7);

      togglePokemonSelection(25);

      togglePokemonSelection(152);
      togglePokemonSelection(155);
      togglePokemonSelection(158);

      togglePokemonSelection(252);
      togglePokemonSelection(255);
      togglePokemonSelection(258);

      togglePokemonSelection(387);
      togglePokemonSelection(390);
      togglePokemonSelection(393);

      togglePokemonSelection(495);
      togglePokemonSelection(498);
      togglePokemonSelection(501);

    } else if(query == 'pikachu') {
      togglePokemonSelection(25)
    } else if(query == 'eevee') {
      togglePokemonSelection(133);

      togglePokemonSelection(134);
      togglePokemonSelection(135);
      togglePokemonSelection(136);

      togglePokemonSelection(196);
      togglePokemonSelection(197);

      togglePokemonSelection(470);
      togglePokemonSelection(471);
    } else if(query == 'unown') {
      togglePokemonSelection(201)
    }
  })

  function togglePokemonSelection(pkmId, toFalse = false) {
    var $pkmSelection = $('.pkmSelection[data-pkmId=' + pkmId + ']');
    if(toFalse == false) {
      $pkmSelection.prop('checked', true);
    } else {
      $pkmSelection.prop('checked', false);
    }
  }
});
