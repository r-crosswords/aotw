/*
ACB added 
*/

function toggleShowParsingNotes() {
  let e = document.getElementById('parsing-notes-list')
  if (e.style.display == 'none') {
    e.style.display = ''
  } else {
    e.style.display = 'none'
  }
}
