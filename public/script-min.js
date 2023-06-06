var Popwola = (function () {
  var userCode = "";
  var popupData = {};

  return {
    init: function (userCode) {
      this.userCode = userCode;
      this.popupData = popupData;
      this.fetchPopup().then((data) => {
        this.popupData = data;
        this.setDomElement(this.popupData);
        this.setDomStyle(this.popupData);
      });
    },

    setDomElement: function (data) {
      const domElement = document.createElement("div");
      domElement.setAttribute("id", "popwola");

      this.buildPopup(domElement, data);

      document?.body.appendChild(domElement);
    },

    // setDomElement
    // document.head.appendChild(style);
    // buildPopup
    // renderPopup
    // closePopup
    // triggerCta

    setDomStyle: function (popupobject) {
      const bgStyle = JSON.parse(popupobject.bg);
      const titleStyle = JSON.parse(popupobject.title_style);
      const subtitleStyle = JSON.parse(popupobject.subtitle_style);
      const buttonStyle = JSON.parse(popupobject.button_style);
      const imageStyle = JSON.parse(popupobject.image_style);
      const style = document.createElement("style");

      const convertToCss = (obj) => {
        let css = "";
        for (const property in obj) {
          if (obj.hasOwnProperty(property)) {
            css += `${property}: ${obj[property]};\n`;
          }
        }
        return css;
      };
      style.innerHTML = `

      #popwola {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #popwola-popup {
        ${convertToCss(bgStyle)},
      }

      #popwola-popup-title {
        ${convertToCss(titleStyle)};
      }

      #popwola-popup-subtitle {
        ${convertToCss(subtitleStyle)};
      }

      #popwola-popup-button {
        ${convertToCss(buttonStyle)};
      }

      #popwola-popup-image {
        ${convertToCss(imageStyle)};
      }
          `;
      document.head.appendChild(style);
    },

    buildPopup: async function (element, data) {
      const popup = document.createElement("div");
      popup.setAttribute("id", "popwola-popup");
      popup.innerHTML = `<div class="popwola-popup__content">
        <h1 id="popwola-popup-title">${data?.title_value}</h1>
        <p id="popwola-popup-subtitle">${data?.subtitle_value}</p>
        <button id="popwola-popup-button">${data?.button_value}</button>
        <img src=${data?.img_url} id="popwola-popup-image" alt="" />
      </div>`;
      element.appendChild(popup);
    },

    fetchPopup: async function () {
      const popup = fetch(
        "https://cloud.appwrite.io/v1/databases/6477edd01cdd300e0b80/collections/647e99ee66d5a7b6b739/documents/647f353283e5701f7b88",
        {
          method: "GET",
          headers: {
            "X-Appwrite-Project": "6475ca5453bd7b131cd8",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          return response;
        })
        .catch((err) => console.error(err));
      return popup;
    },
  };
})();
