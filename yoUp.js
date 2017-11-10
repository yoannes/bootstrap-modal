// yoUp V1.1
// This script requires jQuery and Bootstrap V4

// params = {
//   type: "confirm/alert",
//   title: "html code",
//   callback: "callback function when click OK or CONFIRM",
//   large: "true/false. Create large or normal modal",
//   autohide: "true/false. Auto close modal when click OK or CONFIRM"
// };

$(document).ready(function () {
  yoUp.create();
});

var yoUp = {
  show: function (params) {
    if (!params) { return; }
    if (!params.type) {     params.type = "confirm"; }
    if (!params.large) {    params.large = false; }
    if (!params.autohide) { params.autohide = false; }

    var confirm = function () {
      var footer = document.getElementById("yoUpFooter");
      footer.innerHTML =
        "<div class='row'>" +
          "<div class='col-1'></div>" +
          "<div class='col-5'>" +
            "<button class='btn btn-secondary btn-block' data-dismiss='modal'>"+ yoUp.lang.cancel[yoUp.locale] +"</button>" +
          "</div>" +
          "<div class='col-5'>" +
            "<button class='btn btn-primary btn-block' id='yoUpConfirmBtn'>"+ yoUp.lang.confirm[yoUp.locale] +"</button>" +
          "</div>" +
          "<div class='col-1'></div>" +
        "</div>";


      if (params.callback) {
        $("#yoUpConfirmBtn")
          .off("click")
          .on("click", function () {
            if (params.autohide !== false) {
              $("#yoUp").modal("hide");
            }
            params.callback();
          });
      }
      if (params.large) {
        $("#yoUp-dialog").addClass("modal-lg");

      }else{
        $("#yoUp-dialog").removeClass("modal-lg");
      }

      $("#yoUp").modal("show");

      var title = document.getElementById("yoUpTitle");
      title.innerHTML = params.title;
    };

    var alert = function () {
      var footer = document.getElementById("yoUpFooter");
      footer.innerHTML +=
        "<div class='row'>" +
          "<div class='col-3'></div>" +
          "<div class='col-6'><button class='btn btn-primary btn-block' data-dismiss='modal' id='yoUpAlertBtn'>"+ yoUp.lang.ok[yoUp.locale] +"</button></div>" +
          "<div class='col-3'></div>" +
        "</div>";

      if (params.callback) {
        var clicked = false;

        $("#yoUpAlertBtn")
          .off("click")
          .on("click", function () {
            if (params.autohide !== false) {
              $("#yoUp").modal("hide");
            }
            clicked = true;
            params.callback();
          });

        $("#yoUp")
          .off("hidden.bs.modal")
          .on("hidden.bs.modal", function (e) {
          if (!clicked) {
            params.callback();
          }
        })
      }

      if (params.large) {
        $("#yoUp-dialog").addClass("modal-lg");

      }else{
        $("#yoUp-dialog").removeClass("modal-lg");
      }

      $("#yoUp").modal("show");

      var title = document.getElementById("yoUpTitle");
      title.innerHTML = params.title;
    };

    if (params.type === "confirm") {
      confirm();
    }
    else if (params.type === "alert") {
      alert();
    }


  },
  hide: function () {
    $("#yoUp").modal("hide");
  },
  create: function () {
    // APPEND MODAL TO BODY
    document.body.innerHTML +=
      "<div class='modal fade' id='yoUp'>" +
        "<div class='modal-dialog' id='yoUp-dialog' role='document'>" +
          "<div class='modal-content'>" +
            "<div class='modal-body'>" +
              "<div id='yoUpTitle'></div>" +
              "<p></p>" +
              "<div id='yoUpFooter'></div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
  },
  locale: "pt_br",
  lang: {
    confirm: { en_us: "Confirm", pt_br: "Confirmar" },
    cancel: { en_us: "Cancel", pt_br: "Cancelar"},
    ok: { en_us: "OK", pt_br: "OK" }
  }
};