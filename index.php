<form>
  <div class="row">
    <div class="col-md-12">
      <img id="pkmGeneratedImage" width="100%" src="">
      <canvas id="pkmGeneratedCanvas"></canvas>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <button id="pkmGeneratedButton" class="btn btn-primary" type="button">Generate</button>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h2>Settings</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-6">
      <div class="form-group">
        <label for="settingsWidth">Width</label>
        <div class="input-group">
          <input type="number" class="form-control" id="settingsWidth" placeholder="">
          <div class="input-group-addon">px</div>
        </div>
      </div>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-6">
      <div class="form-group">
        <label for="settingsHeight">Height</label>
        <div class="input-group">
          <input type="number" class="form-control" id="settingsHeight" placeholder="">
          <div class="input-group-addon">px</div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>Background</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2">
      <div class="radio">
        <label>
          <input type="radio" name="settingsBackgroundTile" class="settingsBackgroundTile" value="transparent" checked> None
        </label>
      </div>
    </div>
    <?php
    for($tileNo = 1; $tileNo <= 21; $tileNo++) {
      if($tileNo % 6 == 0) {
        ?>
      </div>
      <div class="row">
        <?php
      }
      ?>
      <div class="col-xs-2 col-sm-2 col-md-2">
        <div class="radio">
          <label>
            <input type="radio" name="settingsBackgroundTile" class="settingsBackgroundTile" value="<?php echo $tileNo; ?>"> <img src="<?php echo $projectFolder; ?>img/tilesets/<?php echo $tileNo; ?>.png" alt="Tile <?php echo $tileNo; ?>">
          </label>
        </div>
      </div>
      <?php
    }
    ?>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>Appearance</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-6">
      <div class="form-group">
        <label for="settingsIterations">Iterations</label>
        <input type="number" class="form-control" id="settingsIterations" placeholder="2">
      </div>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-6">
      <div class="form-group">
        <label for="settingsSizeMultiplier">Sprite Size Multiplier</label>
        <input type="number" class="form-control" id="settingsSpriteSizeMultiplier" placeholder="1">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>Pokemon</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <button type="button" class="btn btn-default pkmSelectionButton" value="reset">Reset</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="all">All</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="kanto">Kanto</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="johto">Johto</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="hoenn">Hoenn</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="sinnoh">Sinnoh</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="unova">Unova</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="kalos">Kalos</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group">
        <button type="button" class="btn btn-default pkmSelectionButton" value="starters">Starers</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="pikachu">Pikachu</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="eevee">Eevee</button>
        <button type="button" class="btn btn-default pkmSelectionButton" value="unown">Unown</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="pkm-table">
        <table class="table table-bordered">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Menu Sprite</th>
            <th>Include</th>
          </tr>
          <?php
          $PokemonList = json_decode(file_get_contents($projectFolder . "pkm/pokemon_list.json"), true);
          foreach($PokemonList as $pkmId => $Pokemon) {
            foreach($Pokemon['f'] as $formInfo) {
              foreach($formInfo as $form => $formHR) {
                if($form == "default") {
                  $formHR = "";
                  $pkmImg = $projectFolder . "img/pkm/menu/$pkmId.png";
                  $filename = $pkmId;
                } else {
                  $formHR = "(" . $formHR . ")";
                  $pkmImg = $projectFolder . "img/pkm/menu/$pkmId-$form.png";
                  $filename = $pkmId . "-" . $form;
                }
              }
              ?>
              <tr>
                <td><?php echo $pkmId; ?></td>
                <td><?php echo $Pokemon['n']; ?> <?php echo $formHR; ?></td>
                <td><img src="<?php echo $pkmImg; ?>" alt=""></td>
                <td>
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" class="pkmSelection" value="<?php echo $filename?>" data-pkmid="<?php echo $pkmId; ?>" checked>
                    </label>
                  </div>
                </td>
              </tr>
              <?php
            }
          }
          ?>
        </table>
      </div>
    </div>
  </div>
</form>
