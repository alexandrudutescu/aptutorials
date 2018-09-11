  $(document).ready(function() {
    //Set the menu state
    var url = window.location.pathname;
    if(url != "/" && url != "/search"){
      if(url.split(".").pop() == "html")
        url = url.slice(0, -5);

      var cat = "#" +createIdentifier(url);
      $(cat).addClass("active");
      
      var parentList = $(cat).parents("ul");
      var collapsed = true, i = 0;
      while(collapsed && i < parentList.length){
        if(parentList[i].classList.contains('sub-menu')){
          $("#" + parentList[i].id).addClass("in");
          $("#" + parentList[i].id.slice(3)).removeClass("collapsed");
          $("#" + parentList[i].id.slice(3)).addClass("selected");
          i++;
        }
        else{
          collapsed = false;
        }
      }
    }


    //Remove last(current) item in breadcrumbs nav
    $(".breadcrumbs .breadcrumb li:last-child").remove();
  });

  function createIdentifier(url) {
    if(url.slice(0,1) == "/")
      url = url.substring(1);
    if(url.slice(-1) == "/" || url.slice(-1) == "#")
      url = url.slice(0, -1);
    return url.split("/").join("_").split("-").join("_");
  }
  

