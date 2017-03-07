function vuvu(data) {
  return new Vue({
    el: "#app",
    data
  })
};

function vuvuFromAPI(url, key = "requestData") {
  //add v-cloak
  document.getElementById("app").setAttribute("v-cloak", "")

  //add css v-cloak hide
	var style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = "[v-cloak] { display: none; }";
  } else {
    style.appendChild(document.createTextNode("[v-cloak] { display: none; }"));
  }

  document.head.appendChild(style);

  //actually get the data
  data = {}
  requestor.getAPIData(url).then(value => {
    data[key] = value
    vuvu(data)
  })
}
