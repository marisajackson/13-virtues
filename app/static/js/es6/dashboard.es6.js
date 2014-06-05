/* jshint unused: false */

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  'use strict';
  $.ajax({
    url:url,
    type:type,
    dataType:dataType,
    data:data,
    success:success
  });
}

(function() {
  'use strict';

  $(document).ready(init);

  function init(){
    $('#today').click(newEntry);
    $('#showEntries').click(showEntries);
  }

  function newEntry(){
    ajax('/entries/new', 'get', null, html=>{
      $('#content').empty().append(html);
    });
  }

  function showEntries(){
    ajax('/entries/show', 'get', null, html=>{
      console.log(html);
      $('#content').empty().append(html);
    });
  }


}());
