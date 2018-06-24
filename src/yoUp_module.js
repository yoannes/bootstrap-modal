/**
 * @author Yoannes
 * @version 1.4.4
 * @licence MIT
 */


export class YoUp {
    constructor(locale) {
        this.settings = {
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
            footerBorder: true,
            borderRadius: 0,
            locale: {
                lang: (locale ? locale : "en_us"),
                list: {
                    confirm: { en_us: "Confirm", pt_br: "Confirmar", ja: "OK" },
                    close: { en_us: "Close", pt_br: "Fechar", ja: "キャンセル" },
                    ok: { en_us: "OK", pt_br: "OK", ja: "OK" }
                }
            }
        };

        this.defaultSettings = {
            borderRadius: 0,
            width: "",
            content: "",
            contentBg: "#ffffff",
            footer: "confirm",
            footerConfirmBtn: "",
            footerCancelBtn: "",
            footerOkBtn: "",
            footerBtnPosition: "right",
            footerBorder: true,
            onLoad: null,
            onLoaded: null,
            callback: null,
            title: "",
            headerBg: "#ffffff",
            headerFontColor: "#000000"
        };

        if (locale && (locale === "en_us" || locale === "pt_br" || locale === "ja")) {
            this.settings.locale.lang = locale;
        }

    }

    /**
     * Open modal
     * @memberOf YoUp
     * @function open
     * @param {Object}     params
     * @param {string|int} [params.width]             - Width of the modal in px / % / vw. Default 50%
     * @param {string}     params.title               - Title of the modal
     * @param {content}    params.content             - Content/body of the modal
     * @param {string}     [params.footer]            - Type of footer: alert/confirm/none. Default confirm
     * @param {string}     [params.footerBtnPosition] - Position of buttons left/center/right. Default right
     * @param {string}     [params.footerOkBtnClass]      - Add custom classes to OK button
     * @param {string}     [params.footerConfirmBtnClass] - Add custom classes to CONFIRM button
     * @param {string}     [params.footerCancelBtnClass]  - Add custom classes to CANCEL button
     * @param {boolean}    [params.footerBorder]      - Use footer border
     * @param {string}     [params.headerBg]          - Header background color in hex
     * @param {string}     [params.headerFontColor]   - Header font color in hex
     * @param {string}     [params.contentBg]         - Content/body background color in hex
     * @param {number}     [params.borderRadius]      - Border radius of the modal
     * @param {function}   [params.shownCallback]     - Callback function on shown
     * @param {function}   [params.hiddenCallback]    - Callback function on hidden
     */
    open(params) {
        if (!params)
            params = {};

        if (params.width) {
            this.settings.width = this.params.width;
        } else {
            this.settings.width = this.defaultSettings.width;
        }

        if (params.title) {
            this.settings.title = params.title;
        } else {
            this.settings.title = defaultSettings.title;
        }

        if (params.content) {
            this.settings.content = params.content;
        }

        if (params.footer) {
            this.settings.footer = params.footer;
        } else {
            this.settings.footer = this.defaultSettings.footer;
        }

        if (params.footerBtnPosition) {
            this.settings.footerBtnPosition = params.footerBtnPosition;
        } else {
            this.settings.footerBtnPosition = this.defaultSettings.footerBtnPosition;
        }

        if (params.footerOkBtnClass) {
            this.settings.footerOkBtn = params.footerOkBtnClass;
        } else {
            this.settings.footerOkBtn = this.defaultSettings.footerOkBtn;
        }

        if (params.footerConfirmBtnClass) {
            this.settings.footerConfirmBtn = params.footerConfirmBtnClass;
        } else {
            this.settings.footerConfirmBtn = this.defaultSettings.footerConfirmBtn;
        }

        if (params.footerCancelBtnClass) {
            this.settings.footerCancelBtn = params.footerCancelBtnClass;
        } else {
            this.settings.footerCancelBtn = this.defaultSettings.footerCancelBtn;
        }

        if (params.footerBorder) {
            this.settings.footerBorder = params.footerBorder;
        } else {
            this.settings.footerBorder = this.defaultSettings.footerBorder;
        }

        if (params.headerBg) {
            this.settings.headerBg = params.headerBg;
        } else {
            this.settings.headerBg = this.defaultSettings.headerBg;
        }

        if (params.headerFontColor) {
            this.settings.headerFontColor = params.headerFontColor;
        } else {
            this.settings.headerFontColor = this.defaultSettings.headerFontColor;
        }

        if (params.contentBg) {
            this.settings.contentBg = params.contentBg;
        } else {
            this.settings.contentBg = this.defaultSettings.contentBg;
        }

        if (params.borderRadius) {
            this.settings.borderRadius = params.borderRadius;
        } else {
            this.settings.borderRadius = this.defaultSettings.borderRadius;
        }

        // CREATE MODAL
        this._createModal();

        $('#yoUpModal').modal('show');


        this.setListener('yoUpModal', 'shown.bs.modal', function () {
            if (params.shownCallback) {
                params.shownCallback();
            }

            if (params.onLoaded) {
                params.onLoaded();
            }
        });



        this.setListener('yoUpModal', 'hidden.bs.modal', function () {
            $("#yoUpModal").remove();

            if (params.hiddenCallback) {
                params.hiddenCallback();
            }
        });

        if (params.onLoad) {
            this.setListener('yoUpModal', 'show.bs.modal', function () {
                params.onLoad();
            });
        }

        if (params.callback) {
            this.setListener('#yoUpConfirmBtn', 'click', function () {
                params.callback();
            });
        }

    }

    _createModal() {
        let header = '', footer = '';
        let radius =
            `-webkit-border-radius: ${this.settings.borderRadius}px !important; ` +
            `-moz-border-radius: ${this.settings.borderRadius}px !important; ` +
            `border-radius: ${this.settings.borderRadius}px !important; `;

        if (this.settings.title) {
            let r = this.settings.borderRadius - 1;
            if (this.settings.borderRadius === 0) {
                r = this.settings.borderRadius;
            }

            let css = [
                'padding: 10px',
                `background-color: ${this.settings.headerBg}`,
                `color: ${this.settings.headerFontColor}'`,
                `border-top-right-radius: ${r}px !important`,
                `border-top-left-radius: ${r}px !important`,
                `-moz-border-radius-topleft: ${r}px !important`,
                `-moz-border-radius-topright: ${r}px !important`,
                `-webkit-border-top-left-radius: ${r}px !important`,
                `-webkit-border-top-right-radius: ${r}px !important`,
            ];

            header =
                `<div class="modal-header" style="${css.join(";")}">` +
                `<h5 class="model-title">${this.settings.title}</h5` +
                `<button type="button" class="close" data-dismiss="modal" aria-label="Close">` +
                `<span aria-hidden="true">&times;</span>` +
                `</button>` +
                `</div>`;

        }

        if (this.settings.footer === 'confirm') {
            let btn = '';
            if (this.settings.footerBtnPosition === 'left') {
                btn =
                    `<div style="width: 100%; text-align: left">` +
                    `<button type="button" class="btn btn-primary ${this.settings.footerConfirmBtn}" style="margin-right: 5px" id="yoUpConfirmBtn">${this.settings.locale.list.confirm[this.settings.locale.lang]}</button>` +
                    `<button type="button" class="btn btn-secondary ${this.settings.footerCancelBtn}" data-dismiss="modal">${this.settings.locale.list.close[this.settings.locale.lang]}</button>` +
                    `</div>`;
            }

            else if (this.settings.footerBtnPosition === 'center') {
                btn =
                    `<div style="width: 100%;">` +
                    `<div class="row mx-auto" style="max-width: 500px">` +
                    `<div class="col-6" style="padding: 2px;">` +
                    `<button type="button" class="btn btn-primary btn-block ${this.settings.footerConfirmBtn}" id="yoUpConfirmBtn">${this.settings.locale.list.confirm[this.settings.locale.lang]}</button>` +
                    `</div>` +
                    `<div class="col-6" style="padding: 2px;">` +
                    `<button type="button" class="btn btn-secondary btn-block ${this.settings.footerCancelBtn}" data-dismiss="modal">${this.settings.locale.list.close[this.settings.locale.lang]}</button>` +
                    `</div>` +
                    `</div>` +
                    `</div>`;
            }
            else {
                btn =
                    `<button type="button" class="btn btn-primary ${this.settings.footerConfirmBtn}" id="yoUpConfirmBtn">${this.settings.locale.list.confirm[this.settings.locale.lang]}</button>` +
                    `<button type="button" class="btn btn-secondary ${this.settings.footerCancelBtn}" data-dismiss="modal">${this.settings.locale.list.close[this.settings.locale.lang]}</button>`;
            }

            footer = `<div class="modal-footer" style="padding: 10px; ${!this.settings.footerBorder ? 'border-top: none' : ''}">${btn}</div>`;
        }
        else if (this.settings.footer === 'alert') {
            footer =
                `<div class="modal-footer" style="padding: 10px; ${!this.settings.footerBorder ? 'border-top: none' : ''}">` +
                `<button type="button" class="btn btn-primary ${this.settings.footerOkBtn}"  data-dismiss="modal">${settings.locale.list.ok[this.settings.locale.lang]}</button>` +
                `</div>`;
        }

        let modal =
            `<div class="modal fade" id="yoUpModal" role="dialog">` +
            `<div class="modal-dialog" role="document" style="${this.settings.width ? 'max-width: ' + this.settings.width + ';' : ''}">` +
            `<div class="modal-content" style="${radius}">` +
            header +
            `<div class="modal-body" style="background-color: ${this.settings.contentBg}; ${radius}">${this.settings.content}</div>` +
            footer +
            `</div>` +
            `</div>` +
            `</div>`;

        // REMOVE PREVIOUS MODAL IF EXISTS
        let $e = $('#yoUpModalDiv');
        if ($e.length) {
            $e.remove();
        }

        $('body').append(`<div id="yoUpModalDiv">${modal}</div>`);

    }

    /**
       * Hide modal
       * @memberOf YoUp
       * @function close
       */
    close(hiddenCallback) {
        var $modal = $("#yoUpModal");
        $modal.modal("hide");
    };

    /**
     * Scroll modal to defined px
     * @memberOf YoUp
     * @function scrollTop
     * @param {number} val
     */
    scrollTop(val) {
        if (!val) val = 0;
        $('#yoUpModal').scrollTop(val);
    };

    /**
     * Change default language.
     * @memberOf setLocale
     * @function locale
     * @param {string} locale
     */
    setLocale(locale) {
        if (locale === "en_us" || locale === "pt_br" || locale === "ja")
            this.settings.locale.lang = locale;
    };

    /**
     * Change header background color
     * @memberOf YoUp
     * @function setHeaderBg
     * @param {string} color
     */
    setHeaderBg(color) {
        this.defaultSettings.headerBg = color;
    };

    /**
     * Change header's font color
     * @memberOf YoUp
     * @function setHeaderFontColor
     * @param {string} color
     */
    setHeaderFontColor(color) {
        this.defaultSettings.headerFontColor = color;
    };

    /**
     * Change content background color
     * @memberOf YoUp
     * @function setContentBg
     * @param {string} color
     */
    setContentBg(color) {
        this.defaultSettings.contentBg = color;
    };

    /**
     * Change border radius of the modal
     * @memberOf YoUp
     * @function setBorderRadius
     * @param {number} px
     */
    setBorderRadius(px) {
        this.defaultSettings.borderRadius = px;
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
    setFooterBtnClass(c) {
        if (c.ok) {
            this.defaultSettings.footerOkBtn = c.ok;
        }

        if (c.confirm) {
            this.defaultSettings.footerConfirmBtn = c.confirm;
        }

        if (c.cancel) {
            this.defaultSettings.footerCancelBtn = c.cancel;
        }
    };

    /**
     * Footer border
     * @memberOf YoUp
     * @function setFooterBorder
     * @param {boolean} x
     */
    setFooterBorder(x) {
        this.defaultSettings.footerBorder = x;
    };

    /**
     * Change border radius of the modal
     * @memberOf YoUp
     * @function setFooterBtnPosition
     * @param {string} pos - left/center/right
     */
    setFooterBtnPosition(pos) {
        this.defaultSettings.footerBtnPosition = pos;
    };


    setListener(el, type, callback) {
        $(el).off(type).on(type, callback);
    }
}
