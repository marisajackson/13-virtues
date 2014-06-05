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
    ('#today').click(newEntry);
  }

  function newEntry(){
    ajax('/entries/new', 'get', null, html=>{
      ('#main-content').empty().append(html);
    });
  }


}());
