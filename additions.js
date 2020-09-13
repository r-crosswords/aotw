// Antagony added file to provide hidden 'Parsing notes' panel 
// without affecting the exolve files

const currentDocNum = 13 // Sets which doc is the end of the navigation chain

// Insert custom HTML elements using the exolve hooked function customizePuzzle
function customizeExolve(puz) {
  // Insert parsing key table
  let toolsTable = document.getElementById('xlv1-tools');
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
  let toolsLink = document.getElementById('xlv1-tools-link');
  if (!toolsLink) {
    return;
  }
  toolsLink.insertAdjacentHTML(
    'afterend', ` <a id="show-parsing-notes" href=""
                  title="Show/hide parsing notes key"
                  onclick="toggleShowParsingNotes();return false">Parsing</a>`
  );

  // Build the Navigation bar and position it just below the outer stack,
  // so it's always at the bottom-left of the page
  let docInfo = (getDocInfo());
  let docName = docInfo.docName;
  let docNum = docInfo.docNum;
  let extension = docInfo.extension;
  if (docNum > 0) {
    let stackDiv = puz.frame;
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
      prevButton = '<a href="' + docName + zeroPad(docNum - 1, 3) + extension + '">' +
                     prevButton +
                   '</a>';
    }
    // Next button -- disabled if it's the last (ongoing) grid in the nav chain
    let nextButton = '<button class="nav-button"' +
                     (docNum >= currentDocNum ? ' disabled' : '') +
                     '>Next</button>';
    if (docNum < currentDocNum) {
      nextButton = '<a href="' + docName + zeroPad(docNum + 1, 3) + extension + '">' +
                     nextButton +
                   '</a>';
    }
    // Nav bar, height set to lift it above the hover line
    let navBar = '<div id="nav-bar" style="height: 55px">' +
                    homeButton + ' &nbsp; ' +
                    prevButton + ' &nbsp; ' +
                    nextButton +
                 '</div>';
    stackDiv.insertAdjacentHTML('afterend', navBar);
  }
}

// Get the document's name and number from its file name, 
// which should be formatted <name>###.html
function getDocInfo() {
  // Get the full path
  let fileName = window.location.pathname; 
  // Remove everything from the last slash back, so it's just the file name
  fileName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length);
  // Remove the .html extension
  let extension = '.html'
  if (fileName.substr(fileName.length -5, 5) === extension) {
    fileName = fileName.substring(0, fileName.length - 5);
  } else {
    extension = ''; // No extension used -- as with DropPages  
  }
  // Everything up to the last 3 characters should be the doc's name
  let docName = fileName.substr(0,fileName.length-3);
  // The last 3 characters should be the doc's number
  let docNum = parseInt(fileName.substr(fileName.length - 3, 3), 10);
  // Return both parts as a destructured object
  if (Number.isInteger(docNum)) {
    return {docName, docNum, extension};
  } else {
    return {docName: '', docNum: 0, extension: ''};
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
