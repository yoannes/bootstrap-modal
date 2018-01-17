/*

yoUp V1.3
This script requires jQuery and Bootstrap V4

params = {
  width: Width of the modal.,
  title: "Title, if not present, header will be hidden",
  content: "content of the modal",
  footer: "alert/confirm/none",
  callback: "function when pressed confirm button",
  onLoad: "function before modal is loaded",
  onLoaded: "function after modal is loaded",
  headerColor: "hex/rgb",
  contentColor: "hex/rgb",
  footerColor: "hex/rgb"
  borderRadius: "px"
};

*/

var yoUp = {
  open: function (params) {
    yoUpParams.setDefault();

    if (!params)
      params = {};

    if (params.width)
      yoUpParams.width = params.width;

    if (params.title)
      yoUpParams.title = params.title;

    if (params.content)
      yoUpParams.content = params.content;

    if (params.footer)
      yoUpParams.footer = params.footer;
    else
      yoUpParams.footer = "confirm";

    if (params.headerColor)
      yoUpParams.tmpHeaderColor = params.headerColor;

    if (params.contentColor)
      yoUpParams.tmpContentColor = params.contentColor;

    if (params.footerColor)
      yoUpParams.tmpFooterColor = params.footerColor;

    if (params.borderRadius)
      yoUpParams.borderRadius = params.borderRadius;


    // $("body").append();
    yoUpElements.createModal();

    console.log(params);

    if (params.onLoad)
      params.onLoad();

    var e = $("#yoUpModal");

    e.modal("show");

    e.off("hidden.bs.modal").on("hidden.bs.modal", function () {
      console.log("remove");
      $("#yoUpModal").remove();
    });

    if (params.onLoaded){
      e.off("shown.bs.modal").on("shown.bs.modal", function () {
        params.onLoaded();
      })
    }

    if (params.callback){
      $("#yoUpConfirmBtn")
        .off("click")
        .on("click", function () {
          params.callback();
        });
    }

  },
  close: function () {
    $("#yoUpModal").modal("dispose");
  },
  setLocale: function (locale) {
    if (locale !== "en_us" || locale !== "pt_br")
      return;

    yoUpLocale.locale = locale;
  },
  setHeaderColor: function (color) {
    yoUpStyle.headerColor = color;
  },
  setHeaderFontColor: function (color) {
    yoUpStyle.headerFontColor = color;
  },
  setContentColor: function (color) {
    yoUpStyle.headerColor = color;
  },
  setFooterColor: function (color) {
    yoUpStyle.headerColor = color;
  },
  setBorderRadius: function (px) {
    yoUpStyle.borderRadius = px;
  }
};

var yoUpParams = {
  setDefault: function () {
    yoUpParams.width = "";
    yoUpParams.title = "";
    yoUpParams.content = "";
    yoUpParams.footer = "confirm";
    yoUpParams.callback = null;
    yoUpParams.onLoad = null;
    yoUpParams.onLoaded = null;
    yoUpParams.headerColor = null;
    yoUpParams.headerFontColor = null;
    yoUpParams.contentColor = null;
    yoUpParams.footerColor = null;
    yoUpParams.borderRadius = null;
  }
};

var yoUpStyle = {
  headerColor: "#fff",
  headerFontColor: "#000000",
  contentColor: "#fff",
  footerColor: "#fff",
  borderRadius: "0"
};

var yoUpElements = {
  createModal: function () {
    var header = "", footer = "";
    var radius =
      "-webkit-border-radius: "+ (yoUpParams.borderRadius ? yoUpParams.borderRadius : yoUpStyle.borderRadius) +"px !important; " +
      "-moz-border-radius: "+ (yoUpParams.borderRadius ? yoUpParams.borderRadius : yoUpStyle.borderRadius) +"px !important; " +
      "border-radius: "+ (yoUpParams.borderRadius ? yoUpParams.borderRadius : yoUpStyle.borderRadius) +"px !important;";

    if (yoUpParams.title){
      var bg = "background-color: "+ (yoUpParams.tmpHeaderColor ? yoUpParams.tmpHeaderColor : yoUpStyle.headerColor) +";";
      var font = "color: "+ (yoUpParams.headerFontColor ? yoUpParams.headerFontColor : yoUpStyle.headerFontColor) +";";
      header =
        "<div class='modal-header' style='padding: 10px; "+ bg + font + radius +"'>" +
          yoUpParams.title +
          "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true' style='"+ font +"'>&times;</span></button>" +
        "</div>";
    }



    if (yoUpParams.footer === "confirm"){
      footer =
        "<div class='modal-footer' style='padding: 10px; background-color: "+ (yoUpParams.footerColor ? yoUpParams.footerColor : yoUpStyle.footerColor) +";''>" +
          "<button type='button' class='btn btn-primary' id='yoUpConfirmBtn'>"+ yoUpLocale.lang.confirm[yoUpLocale.locale] +"</button>" +
          "<button type='button' class='btn btn-secondary' data-dismiss='modal'>"+ yoUpLocale.lang.close[yoUpLocale.locale] +"</button>" +
        "</div>";
    }
    else if (yoUpParams.footer === "alert"){
      footer =
        "<div class='modal-footer' style='padding: 10px; background-color: "+ (yoUpParams.footerColor ? yoUpParams.footerColor : yoUpStyle.footerColor) +";''>" +
          "<button type='button' class='btn btn-primary' data-dismiss='modal'>"+ yoUpLocale.lang.ok[yoUpLocale.locale] +"</button>" +
        "</div>";
    }

    var modal =
      "<div class='modal fade' id='yoUpModal' tabindex='-1' role='dialog' >" +
        "<div class='modal-dialog' role='document' style='"+ (yoUpParams.width ? "max-width: " + yoUpParams.width : "") +"'>" +
          "<div class='modal-content' style='"+ radius +"'>" +
            header +
            "<div class='modal-body' style='background-color: "+ (yoUpParams.contentColor ? yoUpParams.contentColor : yoUpStyle.contentColor) +";''>" + yoUpParams.content + "</div>" +
            footer +
          "</div>" +
        "</div>" +
      "</div>";

    var el = document.createElement("yoUpModalDiv");
    el.innerHTML = modal;
    document.body.appendChild(el);
  }
};

var yoUpLocale = {
  locale: "en_us",
  lang: {
    confirm: { en_us: "Confirm", pt_br: "Confirmar" },
    close: {   en_us: "Close",   pt_br: "Fechar"},
    ok: {      en_us: "OK",      pt_br: "OK" }
  }
};