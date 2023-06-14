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
            this.setDomElement(n[0]), this.setDomStyle(n[0]);
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
        tt = JSON.parse(n.bg_tablet),
        tm = JSON.parse(n.bg_mobile),
        o = JSON.parse(n.title_style),
        ot = JSON.parse(n.title_style_tablet),
        om = JSON.parse(n.title_style_mobile),
        i = JSON.parse(n.subtitle_style),
        it = JSON.parse(n.subtitle_style_tablet),
        im = JSON.parse(n.subtitle_style_mobile),
        s = JSON.parse(n.button_style),
        st = JSON.parse(n.button_style_tablet),
        sm = JSON.parse(n.button_style_mobile),
        a = JSON.parse(n.image_style),
        at = JSON.parse(n.image_style_tablet),
        am = JSON.parse(n.image_style_mobile),
        d = document.createElement("style"),
        createStyleString = (e) => {
          let t = "";
          for (const n in e) e.hasOwnProperty(n) && (t += `${n}:${e[n]};\n`);
          return t;
        },
        bgStyles = createStyleString(t),
        titleStyles = createStyleString(o),
        subtitleStyles = createStyleString(i),
        buttonStyles = createStyleString(s),
        imageStyles = createStyleString(a),
        css =
          "#popwola{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);z-index:9999;display:flex;justify-content:center;align-items:center;opacity:0;visibility:hidden;transition:all 0.5s ease;}#popwola.popwola-active{opacity:1;visibility:visible;}.popwola-popup__close{width:24px;height:24px;position:absolute;top:18px;right:18px;cursor:pointer;}.popwola-popup__close-line{width:100%;height:2px;background-color:black;position:absolute;top:50%;left:0;transform-origin:center;}.popwola-popup__close-line:nth-child(1){transform:translateY(-50%) rotate(45deg);}.popwola-popup__close-line:nth-child(2){transform:translateY(-50%) rotate(-45deg);}#popwola-popup{" +
          bgStyles +
          ",animation:fadeIn 2s ease;}#popwola-popup-title{" +
          "margin:0;" +
          titleStyles +
          ";}#popwola-popup-subtitle{" +
          "margin:0;" +
          subtitleStyles +
          ";}#popwola-popup-button{border:none;cursor:pointer;" +
          buttonStyles +
          ";}#popwola-popup-image{" +
          imageStyles +
          ";}#popwola-a{text-decoration:none;color:inherit;cursor:pointer;}@keyframes fadeIn{from{opacity:0;transform:scale(0.8);}to{opacity:1;transform:scale(1);}}@media (max-width: 768px){#popwola-popup{" +
          createStyleString(tt) +
          ";}#popwola-popup-title{" +
          createStyleString(ot) +
          ";}#popwola-popup-subtitle{" +
          createStyleString(it) +
          ";}#popwola-popup-button{" +
          createStyleString(st) +
          ";}#popwola-popup-image{" +
          createStyleString(at) +
          ";}}@media (max-width: 480px){#popwola-popup{" +
          createStyleString(tm) +
          ";}#popwola-popup-title{" +
          createStyleString(om) +
          ";}#popwola-popup-subtitle{" +
          createStyleString(im) +
          ";}#popwola-popup-button{" +
          createStyleString(sm) +
          ";}#popwola-popup-image{" +
          createStyleString(am) +
          ";}}";
      (d.innerHTML = css), document.head.appendChild(d);
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
          headers: {
            "X-Appwrite-Project": "6475ca5453bd7b131cd8",
            "Content-Type": "application/json",
          },
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
                headers: {
                  "X-Appwrite-Project": "6475ca5453bd7b131cd8",
                },
              }
            );
            return t.json();
          })
        );
      return i;
    },
  };
})();
