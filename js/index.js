var logo     = $("[data-action=output]"),
    imgUrl   = $("[data-url=imgurl]"),
    JSimgUrl = document.querySelector("[data-url=imgurl]");

if (typeof window.FileReader == "undefined") {
  alert("The File & FileReader API's are unavailable. \n\nThis application will not function properly on your computer.")
}

// Save Site Title Value for LocalStorage
if ( localStorage.getItem("dataURL")) {
  imgUrl.val(localStorage.getItem("dataURL"));
  logo.attr("src", localStorage.getItem("dataURL"))
  $(".check").removeClass("hide")
}

function displayPreview(file) {
  var reader = new FileReader()

  reader.onload = function(e) {
    var img = new Image()
    img.src = e.target.result
    img.onload = function() {
      var dataUrl = e.target.result
      logo.attr("src", dataUrl)
      imgUrl.val( logo.attr("src") )
      localStorage.setItem("dataURL", imgUrl.val())
    }
  }
  reader.readAsDataURL(file)
}

// Image Size .66 of document width
$(window).on("load resize", function() {
  imgUrl.width( $(window).width() / 1.22 )
  logo.width( $(window).width() / 1.5 )
})

// Select all dataurl when textbox clicked
JSimgUrl.onfocus = function() {
  this.select()
  return false
}

$("[data-action=call]").click(function() {
  $("[data-action=input]").trigger("click")
})

$("[data-action=input]").change(function(e) {
  var file = e.target.files[0]
  displayPreview(file)
  $(".check").removeClass("hide")
})
