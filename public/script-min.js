var Popwola = (function () {
  var e = "",
    t = {};
  return {
    init: function (n) {
      (this.userCode = n),
        (this.popupData = t),
        (async () => {
          const n = await this.fetchPopup();
          if (n.length !== 0) {
            // n.map((n) => {
            this.setDomElement(n[0]), this.setDomStyle(n[0]);
            // });
          }
        })();
    },
    setDomElement: function (n) {
      const t = document.createElement("div");
      t.setAttribute("id", "popwola"),
        this.buildPopup(t, n),
        document?.body.appendChild(t);
    },
    setDomStyle: function (n) {
      const t = JSON.parse(n.bg),
        o = JSON.parse(n.title_style),
        i = JSON.parse(n.subtitle_style),
        s = JSON.parse(n.button_style),
        a = JSON.parse(n.image_style),
        d = document.createElement("style");
      const r = function (e) {
        let t = "";
        for (const n in e) {
          if (e.hasOwnProperty(n)) {
            t += `${n}:${e[n]};\n`;
          }
        }
        return t;
      };
      (d.innerHTML =
        "#popwola{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);z-index:9999;display:flex;justify-content:center;align-items:center;opacity:0;visibility:hidden;transition:all 0.5s ease;}#popwola.popwola-active{opacity:1;visibility:visible;}.popwola-popup__close{width:24px;height:24px;position:absolute;top:18px;right:18px;cursor:pointer;}.popwola-popup__close-line{width:100%;height:2px;background-color:black;position:absolute;top:50%;left:0;transform-origin:center;}.popwola-popup__close-line:nth-child(1){transform:translateY(-50%) rotate(45deg);}.popwola-popup__close-line:nth-child(2){transform:translateY(-50%) rotate(-45deg);}#popwola-popup{" +
        r(t) +
        ",animation:fadeIn 2s ease;}#popwola-popup-title{" +
        r(o) +
        ";}#popwola-popup-subtitle{" +
        r(i) +
        ";}#popwola-popup-button{" +
        "border: none;" +
        "cursor: pointer;" +
        r(s) +
        ";}#popwola-popup-image{" +
        r(a) +
        ";}#popwola-a{text-decoration: none;color: inherit; cursor: pointer;};@keyframes fadeIn{from{opacity:0;transform:scale(0.8);}to{opacity:1;transform:scale(1);}}"),
        document.head.appendChild(d);
    },
    buildPopup: async function (e, t) {
      const n = document.createElement("div");
      n.setAttribute("id", "popwola-popup"),
        (n.innerHTML = `<div class="popwola-popup__content"><div class="popwola-popup__close" onclick="Popwola.closePopup()"><div class="popwola-popup__close-line"></div><div class="popwola-popup__close-line"></div></div><h1 id="popwola-popup-title">${
          t?.title_value || ""
        }</h1><p id="popwola-popup-subtitle">${t?.subtitle_value || ""}</p>
        <a id="popwola-a" href=${t?.button_url} target="_blank">
        <button id="popwola-popup-button">${
          t?.button_value || ""
        }</button></a><img src="${
          t?.img_url || ""
        }" id="popwola-popup-image" alt="" /></div>`);
      e.classList.add("popwola-active"), e.appendChild(n);
    },
    closePopup: function () {
      console.log("close");
      const e = document.getElementById("popwola");
      (e.style.opacity = 0),
        (e.style.visibility = "hidden"),
        (e.style.transition = "all 0.5s ease");
    },
    fetchPopup: async function () {
      const t = await fetch(
        `https://cloud.appwrite.io/v1/databases/6477edd01cdd300e0b80/collections/647ab9ff72389c6feeb1/documents?queries[0]=equal("user_id", ["${this.userCode}"])&queries[1]=equal("is_active", [true])`,
        {
          method: "GET",
          headers: { "X-Appwrite-Project": "6475ca5453bd7b131cd8" },
        }
      );
      const n = await t.json(),
        o = n.documents.filter((e) => {
          const t = new Date(),
            o = new Date(e.start_date.substring(0, 10)),
            i = new Date(e.end_date.substring(0, 10));
          return t >= o && t <= i;
        }),
        i = await Promise.all(
          o.map(async (e) => {
            const t = await fetch(
              "https://cloud.appwrite.io/v1/databases/6477edd01cdd300e0b80/collections/647e99ee66d5a7b6b739/documents/" +
                e.popup_id,
              {
                method: "GET",
                headers: { "X-Appwrite-Project": "6475ca5453bd7b131cd8" },
              }
            );
            return t.json();
          })
        );
      return i;
    },
  };
})();
