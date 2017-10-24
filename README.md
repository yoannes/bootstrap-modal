# bootstrap-modal
Script for who needs to use modal on multple places and want to save some code lines.<br>
For this script to work you need to use `jQuery` and `Bootstrap V4`.<br>
Use it with your own risk.

### How to use
On document load, script will add to body a div with the modal.<br>

#### Set language
`yoUp.lang.lang = "pt_br / en_us. Default pt_br";`

#### Show modal
```
yoUp.show({
    type: "confirm/alert. Default confirm",
    title: "html code",
    callback: "callback function when click OK or CONFIRM",
    large: "true/false. Create large or normal modal. Default false",
    autohide: "true/false. Auto close modal when click OK or CONFIRM"
});
```

#### Hide modal
`yoUp.hide();`