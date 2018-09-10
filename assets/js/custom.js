  $(document).ready(function() {

    //Keep the menu selection after refresh
    if(window.location.pathname == "/"){
      window.sessionStorage.removeItem("category");
    }
    var cat = window.sessionStorage.getItem("category");
    if(cat){
      var cat = "#" + cat;
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


    $("a").click(function (event) {
      event.preventDefault();
      var url = $(this).attr("href");

      if(url){
        if(url.split(".").pop() == "html")
          url = url.slice(0, -5);

        var identifier = url.split("/").pop();

        if(identifier && identifier != "search"){
          identifier = createIdentifier(url);
          setSelectedCategory(identifier, url);
        }
      window.location.href = url;
      }
      
    })
  });

  function setSelectedCategory(identifier, url) {
    if(url){
      window.sessionStorage.setItem("category", identifier);
    }
  }

  function createIdentifier(url) {
    if(url.slice(0,1) == "/")
      url = url.substring(1);
    return url.split("/").join("_").split("-").join("_");
  }
  

