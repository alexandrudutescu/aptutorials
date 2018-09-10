jQuery(function() {
  // Initialize lunr with the fields to be searched, plus the boost.
  window.idx = lunr(function () {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('url');
  });

  // Get the generated search_data.json file so lunr.js can search it locally.
  window.data = $.getJSON('/search_data.json')
                .done(function() {
                  console.log( "second success" );
                });

  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      console.log(index +' - '+ value.url);
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
  });

  // Event when the form is submitted
  $("#searchForm").submit(function(event){
      console.log('Submit detected!');
      //window.location.href = "/search";
      event.preventDefault();
      var query = $("#search-box").val(); // Get the value for the text field
      var results = window.idx.search(query); // Get lunr to perform a search

      var form = $(this);
      var url = form.attr('action');

      $.ajax({
             type: "GET",
             url: url,
             data: form.serialize(), // serializes the form's elements.
             success: function(data)
             {
                 //console.log(data);
                 // Compose response
                 processAjaxData(data, results, "/search.html");
             }
       });


       event.preventDefault(); // avoid to execute the actual submit of the form.

  });


  function processAjaxData(response, results, urlPath){
      var objHtml = $.parseHTML(response);

      var content = $(objHtml).find("#content");
      console.log(content.prop("outerHTML"));
      document.getElementById("content").innerHTML = content.prop("outerHTML");
      document.getElementById("search-results").innerHTML = display_search_results(objHtml, results).prop("outerHTML");
      document.title = response.pageTitle;
      window.history.pushState({"html":response,"pageTitle":response.pageTitle},"", urlPath);
  }

  function display_search_results(objHtml, results) {
    console.log('Performing search!');
    var $search_results = $(objHtml).find("#search-results");

    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
      if (results.length) {
        $search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function(result) {
          console.log(result.ref);
          console.log(loaded_data);
          console.log(loaded_data[result.ref]);
          var item = loaded_data[result.ref];
          console.log(item);
          // Build a snippet of HTML for this result
          var appendString = '<li><a href="' + item.url + '">' + item.title + '</a></li>';

          // Add the snippet to the collection of results.
          $search_results.append(appendString);
        });
      } else {
        // If there are no results, let the user know.
        $search_results.html('<li>No results found.<br/>Please rephrase.</li>');
      }
    });
    //console.log($search_results);
    return $search_results;
  }
});
