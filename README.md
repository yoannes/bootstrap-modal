# bootstrap-modal
Script for who needs to use modal on multple places and want to save some code lines.<br>
For this script to work you need to use `jQuery` and `Bootstrap V4`.<br>
Use it with your own risk.

### How to use
On document load, script will add to body a div with the modal.<br>

#### Set language
`yoUp.setLocale("en_us/pt_br")`

#### Show modal
```
yoUp.open({
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
});
```

#### Hide modal
`yoUp.close();`
