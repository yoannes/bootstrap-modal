/**
 * @author Yoannes
 * @version 1.4.0
 * @licence MIT
 * @namespace YoUp
 */
var YoUp = function (locale) {
  /**
   * Open modal
   * @memberOf YoUp
   * @function open
   * @param {Object} params
   * @param {string|int} [params.width]             - Width of the modal in px / % / vw. Default 50%
   * @param {string}     params.title               - Title of the modal
   * @param {content}    params.content             - Content/body of the modal
   * @param {string}     [params.footer]            - Type of footer: alert/confirm/none. Default confirm
   * @param {string}     [params.footerBtnPosition] - Position of buttons left/center/right. Default right
   * @param {string}     [params.headerBg]          - Header background color in hex
   * @param {string}     [params.headerFontColor]   - Header font color in hex
   * @param {string}     [params.contentBg]         - Content/body background color in hex
   * @param {number}     [params.borderRadius]      - Border radius of the modal
   */
  this.open = function (params) {
    if (!params)
      params = {};

    if (params.width)
      settings.width = params.width;
    else
      settings.width = defaultSettings.width;

    if (params.title)
      settings.title = params.title;

    if (params.content)
      settings.content = params.content;

    if (params.footer)
      settings.footer = params.footer;
    else
      settings.footer = defaultSettings.footer;

    if (params.footerBtnPosition)
      settings.footerBtnPosition = params.footerBtnPosition;
    else
      settings.footerBtnPosition = defaultSettings.footerBtnPosition;

    if (params.headerBg)
      settings.headerBg = params.headerBg;
    else
      settings.headerBg = defaultSettings.headerBg;

    if (params.headerFontColor)
      settings.headerFontColor = params.headerFontColor;
    else
      settings.headerFontColor = defaultSettings.headerFontColor;

    if (params.contentBg)
      settings.contentBg = params.contentBg;
    else
      settings.contentBg = defaultSettings.contentBg;

    if (params.borderRadius)
      settings.borderRadius = params.borderRadius;
    else
      settings.borderRadius = defaultSettings.borderRadius;

    createModal();

    var $e = $("#yoUpModal");

    $e.modal("show");

    $e.off("hidden.bs.modal").on("hidden.bs.modal", function () {
      $("#yoUpModal").remove();
    });

    if (params.onLoad) {
      $e.off("show.bs.modal").on("show.bs.modal", function () {
        params.onLoad();
      });
    }

    if (params.onLoaded){
      $e.off("shown.bs.modal").on("shown.bs.modal", function () {
        params.onLoaded();
      })
    }

    if (params.callback){
      $("#yoUpConfirmBtn").off("click").on("click", function () {
        params.callback();
      });
    }
  };

  /**
   * Hide modal
   * @memberOf YoUp
   * @function close
   */
  this.close = function () {
    $("#yoUpModal").modal("hide");
  };

  /**
   * Scroll modal to defined px
   * @memberOf YoUp
   * @function scrollTop
   * @param {number} val
   */
  this.scrollTop = function (val) {
    if (!val) val = 0;
    $('#yoUpModal').scrollTop(val);
  };

  /**
   * Change default language.
   * @memberOf setLocale
   * @function locale
   * @param {string} locale
   */
  this.setLocale = function (locale) {
    if (locale === "en_us" || locale === "pt_br" || locale === "ja")
      settings.locale.lang = locale;
  };

  /**
   * Change header background color
   * @memberOf YoUp
   * @function setHeaderBg
   * @param {string} color
   */
  this.setHeaderBg = function (color) {
    defaultSettings.headerBg = color;
  };

  /**
   * Change header's font color
   * @memberOf YoUp
   * @function setHeaderFontColor
   * @param {string} color
   */
  this.setHeaderFontColor = function (color) {
    defaultSettings.headerFontColor = color;
  };

  /**
   * Change content background color
   * @memberOf YoUp
   * @function setContentBg
   * @param {string} color
   */
  this.setContentBg = function (color) {
    defaultSettings.contentBg = color;
  };

  /**
   * Change border radius of the modal
   * @memberOf YoUp
   * @function setBorderRadius
   * @param {number} px
   */
  this.setBorderRadius = function (px) {
    defaultSettings.borderRadius = px;
  };

  /**
   * Add custom classes to footer buttons
   * @memberOf YoUp
   * @function setFooterBtnClass
   * @param {Object} c
   * @param {string} c.ok      - Add classes to OK button
   * @param {string} c.confirm - Add classes to CONFIRM button
   * @param {string} c.cancel  - Add classes to CANCEL button
   */
  this.setFooterBtnClass = function (c) {
    if (c.ok)
      defaultSettings.footerOkBtn = c.ok;

    if (c.confirm)
      defaultSettings.footerConfirmBtn = c.confirm;

    if (c.cancel)
      defaultSettings.footerCancelBtn = c.cancel;
  };

  /**
   * Change border radius of the modal
   * @memberOf YoUp
   * @function setFooterBtnPosition
   * @param {string} pos - left/center/right
   */
  this.setFooterBtnPosition = function (pos) {
    defaultSettings.footerBtnPosition = pos;
  };

  function createModal() {
    var header = '', footer = '';
    var radius =
      '-webkit-border-radius: '+ settings.borderRadius + 'px !important; ' +
      '-moz-border-radius: ' + settings.borderRadius + 'px !important; ' +
      'border-radius: ' + settings.borderRadius + 'px !important;';

    if (settings.title){
      var r = settings.borderRadius - 1;
      if (settings.borderRadius === 0)
        r = settings.borderRadius;

      var css =
        'padding: 10px;'+
        'background-color: '+ settings.headerBg +';' +
        'color: '+ settings.headerFontColor +';' +
        'border-top-right-radius: '+ r +'px !important;' +
        'border-top-left-radius: '+ r +'px !important;' +
        '-moz-border-radius-topleft: '+ r +'px !important;' +
        '-moz-border-radius-topright: '+ r +'px !important;' +
        '-webkit-border-top-left-radius: '+ r +'px !important;' +
        '-webkit-border-top-right-radius: '+ r +'px !important;';

      header =
        '<div class="modal-header" style="'+ css +'">' +
          '<h5 class="modal-title">'+ settings.title + '</h5>' +
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
          '</button>' +
        '</div>';
    }

    if (settings.footer === 'confirm'){
      var btn =
        '<button type="button" class="btn btn-primary '+ settings.footerConfirmBtn +'" style="margin-right: 5px" id="yoUpConfirmBtn">'+ settings.locale.list.confirm[settings.locale.lang] +'</button>' +
        '<button type="button" class="btn btn-secondary '+ settings.footerCancelBtn +'" data-dismiss="modal">'+ settings.locale.list.close[settings.locale.lang] +'</button>';

      if (settings.footerBtnPosition === 'left') {
        btn = '<div style="width: 100%; text-align: left">'+ btn +'</div>';
      }

      else if (settings.footerBtnPosition === 'center') {
        btn = '<div style="width: 100%; text-align: center">'+ btn +'</div>';
      }

      footer = '<div class="modal-footer" style="padding: 10px;">' + btn + '</div>';
    }
    else if (settings.footer === 'alert'){
      footer =
        '<div class="modal-footer" style="padding: 10px;">' +
          '<button type="button" class="btn btn-primary '+ settings.footerOkBtn +'"  data-dismiss="modal">'+ settings.locale.list.ok[settings.locale.lang] +'</button>' +
        '</div>';
    }

    var modal =
      '<div class="modal fade" id="yoUpModal" role="dialog">' +
        '<div class="modal-dialog" role="document" style="'+ (settings.width ? 'max-width: '+settings.width+';' : '') +'">' +
          '<div class="modal-content" style="'+ radius +'">' +
            header +
            '<div class="modal-body" style="background-color: '+ settings.contentBg +'; '+radius+'">'+ settings.content +'</div>' +

            footer +
          '</div>' +
        '</div>' +
      '</div>';

    // REMOVE PREVIOUS MODAL IF EXISTS
    var $e = $('#yoUpModalDiv');
    if ($e.length)
      $e.remove();

    $('body').append('<div id="yoUpModalDiv">'+ modal +'</div>');
  }

  var settings = {
    width: "",
    title: "",
    content: "",
    footer: "confirm",
    callback: null,
    onLoad: null,
    onLoaded: null,
    headerBg: "#ffffff",
    headerFontColor: "#000000",
    contentBg: "#ffffff",
    footerConfirmBtn: "",
    footerCancelBtn: "",
    footerOkBtn: "",
    footerBtnPosition: "right",
    borderRadius: 0,
    locale: {
      lang: (locale ? locale : "en_us"),
      list: {
        confirm: { en_us: "Confirm", pt_br: "Confirmar", ja: "" },
        close: {   en_us: "Close",   pt_br: "Fechar",    ja: "" },
        ok: {      en_us: "OK",      pt_br: "OK",        ja: "" }
      }
    }
  };

  var defaultSettings = {
    borderRadius: 0,
    width: "",
    content: "",
    contentBg: "#ffffff",
    footer: "confirm",
    footerConfirmBtn: "",
    footerCancelBtn: "",
    footerOkBtn: "",
    footerBtnPosition: "right",
    onLoad: null,
    onLoaded: null,
    callback: null,
    title: "",
    headerBg: "#ffffff",
    headerFontColor: "#000000"
  };
};
