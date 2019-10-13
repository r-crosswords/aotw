// Antagony added file to provide hidden 'Parsing notes' panel 
// without affecting the exolve files

const currentDocNum = 11 // The currently active ongoing grid, which marks the end of the navigation chain

// Insert custom HTML elements using the exolve hooked function customizePuzzle
function customizePuzzle() {
  // Insert parsing key table
  let toolsTable = document.getElementById('control-keys-list');
  if (!toolsTable) {
    return;
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
  );

  // Insert parsing key link in the tools line
  let toolsLink = document.getElementById('show-control-keys');
  if (!toolsLink) {
    return;
  }
  toolsLink.insertAdjacentHTML(
    'afterend', `<a id="show-parsing-notes" href=""
                  title="Show/hide parsing notes key"
                  onclick="toggleShowParsingNotes();return false">Parsing</a>`
  );

  // Build the Navigation bar and position it just below the outer stack,
  // so it's always at the bottom-left of the page
  let docNum = (getDocNum());
  if (docNum > 0) {
    let stackDiv = document.getElementById('outermost-stack');
    if (!stackDiv) {
      return;
    }
    // Home button
    let homeButton = '<a href="../">' +
                       '<button class="nav-button">Home</button>' +
                     '</a>';
    // Previous button -- disabled if it's the first grid in the nav chain
    let prevButton = '<button class="nav-button"' + 
                     (docNum === 1 ? ' disabled' : '') + 
                     '>Previous</button>';
    if (docNum > 1) {
      prevButton = '<a href="grid' + zeroPad(docNum - 1, 3) + '.html">' +
                     prevButton +
                   '</a>';
    }
    // Next button -- disabled if it's the last (ongoing) grid in the nav chain
    let nextButton = '<button class="nav-button"' +
                     (docNum === currentDocNum ? ' disabled' : '') +
                     '>Next</button>';
    if (docNum < currentDocNum) {
      nextButton = '<a href="grid' + zeroPad(docNum + 1, 3) + '.html">' +
                     nextButton +
                   '</a>';
    }
    // Nav bar, height set to lift it above the hover line
    let navBar = '<div id="nav-bar" style="height: 55px;">' +
                    homeButton + ' &nbsp; ' +
                    prevButton + ' &nbsp; ' +
                    nextButton +
                  '</div>';
    stackDiv.insertAdjacentHTML('afterend', navBar);
  }
}

// Get the document number from its file name, which should be formatted 'grid###.html
function getDocNum() {
  var segments = window.location.pathname.split('/');
  var toDelete = [];
  var i = 0;
  for (i = 0; i < segments.length; i += 1) {
      if (segments[i].length < 1) {
          toDelete.push(i);
      }
  }
  for (i = 0; i < toDelete.length; i += 1) {
      segments.splice(i, 1);
  }
  var filename = segments[segments.length - 1]; //Document's name
  // Chars 5-7 should be the number part of the doc's name
  var docNum = parseInt(filename.substring(4,8), 10);
  if (Number.isInteger(docNum)) {
    return docNum;
  } else {
    return 0;
  }
}

// Pad an integer with leading zeroes
function zeroPad(num, places) {
  return String(num).padStart(places, '0');
}

// Toggle the parsing key's visibility
function toggleShowParsingNotes() {
  let e = document.getElementById('parsing-notes-list');
  if (e.style.display === 'none') {
    e.style.display = '';
  } else {
    e.style.display = 'none';
  }
}
