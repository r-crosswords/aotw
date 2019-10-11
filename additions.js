// Antagony added file to provide hidden 'Parsing notes' panel 
// without editing the exolve-m.js file

// Inject custom HTML elements using the exolve hooked function customizePuzzle
function customizePuzzle() {
  // Parsing key table
  let toolsTable = document.getElementById('control-keys-list')
  if (!toolsTable) {
    return
  }
  toolsTable.insertAdjacentHTML(
    'afterend', `<div id="parsing-notes-list" style="display:none">
                  <ul>
                    <li>
                      <b>anagram:</b>
                      (FODDER)* {indicator}
                    </li>
                    <li>
                      <b>hidden answer:</b>
                      HA {indicator}
                    </li>
                    <li>
                      <b>homophone:</b>
                      Hom {indicator}
                    </li>
                    <li>
                      <b>double definition:</b>
                      DD
                    </li>
                    <li>
                      <b>cryptic definition:</b>
                      CD
                    </li>
                    <li>
                      <b>envelope (containing or contained):</b>
                      env. {indicator}
                    </li>
                    <li>
                      <b>reversal:</b>
                      rev. {indicator}
                    </li>
                  </ul>
                </div>`
  )

  // Parsing key link in the tools line
  let toolsLink = document.getElementById('show-control-keys')
  if (!toolsLink) {
    return
  }
  toolsLink.insertAdjacentHTML(
    'afterend', `<a id="show-parsing-notes" href=""
                  title="Show/hide parsing notes key"
                  onclick="toggleShowParsingNotes();return false">Parsing</a>`
  )
}

// Toggle the parsing key's visibility
function toggleShowParsingNotes() {
  let e = document.getElementById('parsing-notes-list')
  if (e.style.display == 'none') {
    e.style.display = ''
  } else {
    e.style.display = 'none'
  }
}
