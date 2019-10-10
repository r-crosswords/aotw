/*
Antagony added file to provide hidden 'Parsing notes' panel 
without editing the exolve-m.js file
*/

function toggleShowParsingNotes() {
  let e = document.getElementById('parsing-notes-list')
  if (e.style.display == 'none') {
    e.style.display = ''
  } else {
    e.style.display = 'none'
  }
}
