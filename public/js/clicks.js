$("#kpop").on("click", function(event) {
    event.preventDefault();
    console.log("click is firing");
    window.location.replace("https://serene-headland-87883.herokuapp.com/kpop");
});

$("#hiphop").on("click", function(event) {
    event.preventDefault();
    console.log("click is firing");
    window.location.replace("https://serene-headland-87883.herokuapp.com/hiphop");
});

$("#rock").on("click", function(event) {
    event.preventDefault();
    console.log("click is firing");
    window.location.replace("https://serene-headland-87883.herokuapp.com/rock");
});

$("#classical").on("click", function(event) {
    event.preventDefault();
    console.log("click is firing");
    window.location.replace("https://serene-headland-87883.herokuapp.com/classical");
});

$("#jazz").on("click", function(event) {
    event.preventDefault();
    console.log("click is firing");
    window.location.replace("https://serene-headland-87883.herokuapp.com/jazz");
});

$("#edm").on("click", function(event) {
    event.preventDefault();
    console.log("click is firing");
    window.location.replace("/edm");
});
$("#back").on("click", function(event) {
    event.preventDefault();
    console.log("click is firing");
    window.location.replace("http://localhost:8080/");
});
