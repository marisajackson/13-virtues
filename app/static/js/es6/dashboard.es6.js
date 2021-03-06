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
    $('#editVirtues').click(editVirtues);
    $('#content').on('click', '#addVirtue', addVirtue);
    $('#content').on('click', '#addToVirtues', addToVirtues);
  }

  function addToVirtues(){
    var virtue = $('#virtues').val();
    ajax('/users', 'put', {virtue:virtue}, html=>{
      $('#content').empty().append(html);
    });
  }

  function addVirtue(){
    var virtue = $('#newVirtue').val();
    ajax('/virtues', 'post', {virtue:virtue}, html=>{
      $('#content').empty().append(html);
    });
  }

  function newEntry(){
    ajax('/entries/new', 'get', null, html=>{
      $('#content').empty().append(html);
    });
  }

  function showEntries(){
    ajax('/entries/show', 'get', null, html=>{
      $('#content').empty().append(html);
    });
  }

  function editVirtues(){
    ajax('/virtues', 'get', null, html=>{
      $('#content').empty().append(html);
    });
  }


}());
