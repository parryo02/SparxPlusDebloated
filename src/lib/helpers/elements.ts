import { log } from "..";
import { PopupMenu } from "../classes/menuClasses";
import { getSVG } from "../constants/svgs";
import { getAsset } from "./defaults";

export function createWarningBox(warningTxt : string, isInformational? : boolean | null) {
    var warning = document.createElement("div")
    warning.style.paddingBottom = "10px"
    warning.style.paddingTop = "0px"
    warning.className = isInformational == null ? "WarningContainer" : isInformational ? "InfoContainer" : "WarningContainer"

    var warningInner = document.createElement("div")
    warningInner.className = isInformational == null ? "Warning" : isInformational ? "Info" : "Warning"

    var warningIcon = isInformational == null ? getSVG("triangle-exclamation") : isInformational ? getSVG("empty") : getSVG("triangle-exclamation")
    if (warningIcon != null) {
        warningIcon.style.maxWidth = "20px"
        warningIcon.style.maxHeight = "20px"
        warningIcon.style.minWidth = "20px"
        warningIcon.style.minHeight = "20px"
    }
    
    var warningText = document.createElement("span")
    warningText.innerHTML = warningTxt;
    warningText.className = isInformational == null ? "WarningText" : isInformational ? "InfoText" : "WarningText"
    // warningText = warningTxt;

    if (warningIcon != null) warningInner.append(warningIcon)
    warningInner.append(warningText)
    warning.append(warningInner);

    return warning;
}

export function createBlur() {
    var blur = document.createElement("div")
    blur.classList.add("SparxPlusDialogOverlay")
    blur.style.pointerEvents = "auto";

    blur.setAttribute("data-state", "open")
    blur.setAttribute("data-aria-hidden", "true")
    blur.setAttribute("aria-hidden", "true")

    return blur;
}

export function createBlurredMenu(blur : HTMLDivElement, titleText : string) : PopupMenu {
    var div = document.createElement("div")
    div.setAttribute("role", "dialog")
    div.setAttribute("data-state", "open")
    div.style.pointerEvents = "auto";
    div.tabIndex = -1;
    div.className = "SparxPlusDialogContent FullWidth WithZIndex"

    let popup = new PopupMenu(
        div,
        blur
    )

    const close = () => {
        popup.close()
    }

    var title = document.createElement("h2")
    title.className = "SparxPlusDialogTitle"
    title.textContent = titleText;
    div.append(title)

    // var buttonsDiv = document.createElement("div")

    var closeXButton = document.createElement("button")
    closeXButton.setAttribute("aria-label", "Close")
    closeXButton.className = "SparxPlusIconButton SparxPlusXButton"
    closeXButton.append(getSVG("x"))
    closeXButton.onclick = () => {
        close()
    }
    div.append(closeXButton)

    return popup;
}

export function createNewOptionInDDM(classNameA : string, classNameDiv : string, icon : Node, string : string) {
    var option = document.createElement("a")
    option.className = classNameA;
    
    var menuitem = document.createElement("div");
    menuitem.role = "menuitem"
    menuitem.tabIndex = -1
    menuitem.setAttribute("data-orientation", "vertical")
    menuitem.setAttribute("data-radix-collection-item", "");
    menuitem.className = classNameDiv

    menuitem.append(icon);
    menuitem.append(string)
    option.append(menuitem);

    return option;
}

export function createNewSettingsPanel(classNameContainer : string) {
    var panel = document.createElement("div")
    panel.className = classNameContainer+" SPARXPLUS";
    return panel;
}

export function sendNotification(text : string, time : number) {
    var notif = document.createElement("div")
    notif.className = "notificationDiv";

    var txt = document.createElement("p")
    txt.className = "notificationText";
    txt.innerHTML = text

    notif.animate(
        [
            { top: "80%", opacity: "1" },
        ], {
            duration: 150,
            fill: 'forwards',
        }
    );

    notif.append(txt)
    document.body.append(notif)

    setTimeout(() => {
        notif.animate(
            [
                { top: "82.5%", opacity: "0" },
            ], {
                duration: 150,
                fill: 'forwards',
            }
        );
        setTimeout(() => {
            notif.remove()
        }, 150);
    }, time);
}

export function appendStyleContent(id : string, content : string) {
    if (!document.querySelector("#" + id)) {
        var head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(createStyleElementFromContent(id, content));
    }
}

export function appendStyleSheet(id : string, url : string) {
    if (!document.querySelector("#" + id)) {
        var head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(createStyleElementFromFile(id, url));
    }
}

export function createStyleElementFromFile(id : string, url : string) {
    var style = document.createElement("link");
    style.rel = "stylesheet"
    style.href = url

    return style;
}

export function createStyleElementFromContent(id : string, content : string) {
    var style = document.createElement("style");
    style.id = id;

    if (style.sheet) {
        style.textContent = content;
    } else {
        style.appendChild(document.createTextNode(content));
    }
    return style;
}