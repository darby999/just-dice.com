
function saveOptions() {
  var ignore = document.getElementById("ignore").value;;

  chrome.tabs.query({url:'https://just-dice.com/*',title:'just-dice'},
  function(tab_array) {
    for(var i=0;i<tab_array.length;i++) 
      chrome.tabs.reload(tab_array[i].id);
  });

  chrome.storage.sync.set({'ignore': ignore}, function() {
    // Notify that we saved.
    alert('Settings saved');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnSave').addEventListener('click', saveOptions);

  chrome.storage.sync.get('ignore',function(val) {
    if (val.ignore !== undefined)
    document.getElementById("ignore").value = val.ignore;
  });
  
});
