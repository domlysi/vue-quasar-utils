var qe = Object.defineProperty;
var Ce = (e, n, t) => n in e ? qe(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var D = (e, n, t) => (Ce(e, typeof n != "symbol" ? n + "" : n, t), t);
import { resolveComponent as b, openBlock as a, createBlock as M, mergeProps as j, withCtx as v, renderSlot as k, createElementVNode as m, createVNode as u, createCommentVNode as w, defineComponent as te, resolveDirective as Z, TransitionGroup as Se, createElementBlock as c, withDirectives as Y, resolveDynamicComponent as X, toDisplayString as q, Fragment as C, renderList as S, normalizeClass as V, ref as P, watchEffect as ge, normalizeStyle as N, computed as ne, createSlots as ve, toRef as xe, watch as W, createTextVNode as T, toHandlers as Ie, reactive as Pe, onMounted as le, withModifiers as _e, useCssVars as Me } from "vue";
import { debounce as Fe, QSelect as ye, QCheckbox as pe, QInput as E, QFile as oe, useQuasar as H, date as be, Cookies as O, Notify as ie } from "quasar";
const F = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [l, o] of n)
    t[l] = o;
  return t;
}, Ae = {
  name: "SrcsetImg",
  props: {
    src: { required: !0 },
    srcset: { required: !1 },
    showPlaceholder: {
      default: !1,
      type: Boolean
    }
  },
  computed: {
    srcSetInline() {
      if (this.srcset)
        return this.srcset.flatMap((e) => `${e.src} ${e.size[0]}w`).join(", ");
    },
    sizes() {
      if (this.srcset)
        return this.srcset.sort((e, n) => e.size[0] - n.size[0]), this.srcset.map((e, n) => n < this.srcset.length - 1 ? `(max-width: ${e.size[0]}px) ${e.size[0]}px` : `${e.size[0]}px`).join(", ");
    }
  }
}, Ee = { class: "bg-grey-3 full-width full-height" }, Oe = { class: "absolute-center text-grey-5 text-center" }, je = /* @__PURE__ */ m("div", null, "Kein Bild", -1);
function De(e, n, t, l, o, s) {
  const i = b("q-icon"), f = b("q-img");
  return a(), M(f, j(e.$attrs, {
    srcset: s.srcSetInline,
    sizes: s.sizes,
    src: t.src
  }), {
    default: v(() => [
      !t.srcset && !t.src && t.showPlaceholder ? k(e.$slots, "placeholder", { key: 0 }, () => [
        m("div", Ee, [
          m("div", Oe, [
            u(i, {
              name: "image",
              size: "md"
            }),
            je
          ])
        ])
      ]) : w("", !0),
      k(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["srcset", "sizes", "src"]);
}
const ee = /* @__PURE__ */ F(Ae, [["render", De]]);
let L;
const Ve = te({
  name: "GalleryModal",
  components: { SrcsetImg: ee },
  mounted() {
    document.body.style.overflow = "hidden", this.activeImagePosition = this.position, document.addEventListener("keydown", this.keydownHandler), document.addEventListener("wheel", this.wheelHandler), document.addEventListener("touchmove", this.touchMove), document.addEventListener("touchend", this.touchEnd);
  },
  unmounted() {
    document.removeEventListener("keydown", this.keydownHandler), document.removeEventListener("wheel", this.wheelHandler), document.removeEventListener("touchmove", this.touchMove), document.removeEventListener("touchend", this.touchEnd), this.closeModal();
  },
  props: {
    images: {
      required: !0,
      type: void 0,
      default: []
    },
    position: {
      default: 0
    },
    withSrcSetImage: {
      default: !1
    }
  },
  emits: ["closeModal"],
  watch: {
    activeImagePosition(e) {
      this.scrollToThumb(e), this.resetImageTransformations();
    }
  },
  computed: {
    transformStyle: function() {
      return this.scale <= 1 && this.resetImageTransformations(), {
        transform: `scale(${this.scale}) translateX(${this.translateX / this.scale}px)  translateY(${this.translateY / this.scale}px)`
      };
    },
    activeImage: function() {
      if (!(this.images.length < 1))
        return this.images[this.activeImagePosition];
    },
    getScale: function() {
      return this.scale;
    },
    imgComponent() {
      return this.withSrcSetImage ? "srcset-img" : "q-img";
    }
  },
  methods: {
    getImgComponent(e) {
      return this.withSrcSetImage ? {
        alt: e.default_alt_text,
        image: e,
        src: e.file
      } : {
        src: e.file
      };
    },
    touchEnd: function(e) {
      L = void 0, this.scaling = !1;
    },
    touchMove: function(e) {
      if (this.touches = [], e.touches && e.touches.length && e.touches.length === 2) {
        this.scaling = !0;
        let n = e.touches.item(0), t = e.touches.item(1), l = { x: n.screenX, y: n.screenY }, o = { x: t.screenX, y: t.screenY }, s = Math.abs(Math.sqrt(Math.pow(o.x - l.x, 2) + Math.pow(o.y - l.y, 2)));
        L || (L = s);
        let i = Math.abs(L - s);
        if (console.debug(i), i < 2)
          return;
        i > 100 && console.debug("distance", s, "lastDistance", L), i > 10 && (i = 10);
        let f = i * 10 / (100 / 0.25);
        s > L ? (console.debug("zoom in", i), this.scale = this.scale + f) : (console.debug("zoom out", i), this.scale = this.scale - f), L = s;
      }
    },
    touchPanHandler: function(e) {
      this.scale > 1 && !this.scaling && (this.translateX = this.translateX + e.delta.x, this.translateY = this.translateY + e.delta.y);
    },
    wheelHandler: function(e) {
      e.deltaY > 0 ? this.scale > 1 && (this.scale = this.scale - 0.25) : this.scale < 5 && (this.scale = this.scale + 0.25);
    },
    keydownHandler: function(e) {
      e.key === "Escape" && this.closeModal(), e.key === "ArrowLeft" && (this.activeImagePosition = this.getPrevPosition(this.activeImagePosition)), e.key === "ArrowRight" && (this.activeImagePosition = this.getNextPosition(this.activeImagePosition));
    },
    scrollToThumb: function(e) {
      let n = this.$refs[`gallery-thumb-${e}`], t = n[0].$el.clientWidth, l = n[0].$el.offsetLeft;
      this.$refs.thumbContainer.scrollLeft = l - t / 2;
    },
    closeModal: function() {
      document.body.style.overflow = "auto", this.$emit("closeModal");
    },
    handleSwipe: function({ evt: e, ...n }) {
      n.direction === "right" && (this.activeImagePosition = this.getPrevPosition(this.activeImagePosition)), n.direction === "left" && (this.activeImagePosition = this.getNextPosition(this.activeImagePosition));
    },
    resetImageTransformations: function() {
      this.scale = 1, this.translateX = 0, this.translateY = 0;
    },
    getNextPosition: function(e) {
      let n = e + 1;
      return n > this.images.length - 1 ? 0 : n;
    },
    getPrevPosition: function(e) {
      let n = e - 1;
      return n < 0 ? this.images.length - 1 : n;
    }
  },
  data() {
    return {
      scale: 1,
      activeImagePosition: this.position,
      translateX: 0,
      translateY: 0,
      scaling: !1
    };
  }
}), $e = {
  class: "fixed-bottom fixed-left z-max overflow-hidden",
  key: "galleryModal"
}, Le = { class: "dimmed-background full-height" }, ze = { class: "flex column no-wrap full-height" }, Te = {
  class: "q-pb-md relative-position",
  style: { "flex-grow": "1", "user-select": "none" }
}, Ne = { class: "text-center full-height flex flex-center" }, Be = {
  key: 0,
  class: "q-px-sm gallery-image-description bg-black text-white absolute-bottom-left"
}, Ue = {
  style: { "max-width": "100%", overflow: "auto", "scroll-behavior": "smooth" },
  ref: "thumbContainer"
}, Re = {
  class: "flex row no-wrap relative-position",
  style: { height: "100%" }
}, We = { class: "fixed-top-right z-max" };
function He(e, n, t, l, o, s) {
  const i = b("q-btn"), f = b("q-icon"), d = Z("touch-pan"), h = Z("touch-swipe");
  return a(), M(Se, {
    "enter-active-class": "animated fadeIn",
    "leave-active-class": "animated fadeOut"
  }, {
    default: v(() => [
      e.images.length > 0 ? (a(), c("div", $e, [
        m("div", Le, [
          m("div", ze, [
            Y((a(), c("div", Te, [
              m("div", Ne, [
                (a(), c("div", {
                  class: "relative-position c-active-image",
                  key: e.activeImage.file
                }, [
                  Y((a(), M(X(e.imgComponent), j(e.getImgComponent(e.activeImage), {
                    key: e.activeImagePosition,
                    draggable: !1,
                    class: "vertical-middle",
                    width: "100vw",
                    fit: "contain",
                    style: [{ "max-height": "calc(100vh - 200px)" }, e.transformStyle],
                    ref: "activeImg"
                  }), null, 16, ["style"])), [
                    [
                      d,
                      e.touchPanHandler,
                      void 0,
                      { mouse: !0 }
                    ]
                  ]),
                  e.activeImage.description ? (a(), c("div", Be, q(e.activeImage.description), 1)) : w("", !0)
                ]))
              ])
            ])), [
              [
                h,
                e.getScale === 1 ? e.handleSwipe : void 0,
                void 0,
                { mouse: !0 }
              ]
            ]),
            m("div", Ue, [
              m("div", Re, [
                (a(!0), c(C, null, S(e.images, (g, r) => (a(), c("div", {
                  class: V(["q-ma-xs thumbnails", { active: r === e.activeImagePosition }]),
                  key: g.file
                }, [
                  (a(), M(X(e.imgComponent), j(e.getImgComponent(g), {
                    ref_for: !0,
                    ref: `gallery-thumb-${r}`,
                    ratio: 3 / 2,
                    onClick: (p) => {
                      e.activeImagePosition = r, e.scale = 1;
                    },
                    class: "cursor-pointer full-height",
                    style: { width: "200px" }
                  }), null, 16, ["onClick"]))
                ], 2))), 128))
              ])
            ], 512)
          ]),
          m("div", We, [
            u(i, {
              flat: "",
              round: "",
              "text-color": "white",
              onClick: e.closeModal,
              icon: "close"
            }, null, 8, ["onClick"])
          ]),
          m("div", {
            class: "fixed-right q-mr-xs",
            onClick: n[1] || (n[1] = () => {
            }),
            style: { top: "calc(50% - 100px)" }
          }, [
            u(i, {
              onClick: n[0] || (n[0] = (g) => e.activeImagePosition = e.getNextPosition(e.activeImagePosition)),
              class: "text-white bg-black",
              round: "",
              flat: ""
            }, {
              default: v(() => [
                u(f, { name: "navigate_next" })
              ]),
              _: 1
            })
          ]),
          m("div", {
            onClick: n[2] || (n[2] = (g) => e.activeImagePosition = e.getPrevPosition(e.activeImagePosition)),
            class: "fixed-left q-ml-xs",
            style: { top: "calc(50% - 100px)" }
          }, [
            u(i, {
              class: "text-white bg-black",
              round: "",
              flat: ""
            }, {
              default: v(() => [
                u(f, { name: "navigate_before" })
              ]),
              _: 1
            })
          ])
        ])
      ])) : w("", !0)
    ]),
    _: 1
  });
}
const ae = /* @__PURE__ */ F(Ve, [["render", He], ["__scopeId", "data-v-8e953a81"]]), Ye = {
  name: "ResponsiveItemSlider",
  emits: ["load"],
  props: {
    infiniteScroll: {
      default: !0
    },
    infiniteScrollOffset: {
      default: 1200
    },
    loading: {
      default: !1
    },
    loadingMore: {
      default: !1
    },
    items: {
      required: !0,
      default: () => [],
      type: Array
    },
    itemWidth: {
      default: "80vw"
    },
    itemMaxWidth: { default: "350px" },
    itemMinWidth: { default: "250px" },
    itemClass: { default: "" },
    wrapperClass: { required: !1 },
    wrapperStyle: { required: !1 },
    colClasses: { default: "col-6 col-md-4" },
    onlyVertical: { default: !1 },
    isMarginLeft: { default: !0 },
    withContainer: { default: !0 },
    skeletonAmount: { default: 6 },
    skeletonAmountMobile: { default: 2 },
    id: { required: !1, type: String },
    saveScrollPos: { default: !0 },
    store: { required: !1 }
  },
  setup(e, n) {
    const t = P(), l = P(!1), o = `${e.id}_scroll_pos`, s = function(d, h, g) {
      d && (d[h] = g);
    }, i = function(d, h) {
      if (d != null && d.hasOwnProperty(h) && t.value) {
        const g = Number.parseInt(d[h]);
        t.value.scrollTo(g, 0);
      }
    }, f = Fe((d) => {
      if (e.id && e.saveScrollPos)
        try {
          s(e.store, o, d.target.scrollLeft);
        } catch (r) {
          console.error(r);
        }
      if (!e.infiniteScroll || l.value)
        return;
      const h = (d.target.scrollLeft || 0) + d.target.clientWidth, g = d.target.scrollWidth;
      h + e.infiniteScrollOffset >= g && (l.value = !0, n.emit("load"), l.value = !1);
    });
    return ge(() => {
      var d;
      if ((d = e.items) != null && d.length && e.saveScrollPos)
        try {
          i(e.store, o);
        } catch (h) {
          console.error(h);
        }
    }), {
      mobileWrapperRef: t,
      handleScroll: f
    };
  }
}, Xe = { key: 0 }, Ge = {
  key: 1,
  class: "flex no-wrap q-gutter-x-lg q-pa-lg",
  style: { "overflow-x": "scroll" }
}, Qe = /* @__PURE__ */ m("div", null, null, -1);
function Ke(e, n, t, l, o, s) {
  const i = b("q-spinner-dots"), f = b("q-skeleton");
  return e.$q.screen.xs || t.onlyVertical ? (a(), c(C, { key: 0 }, [
    !t.loading && t.items ? (a(), c("div", {
      key: 0,
      ref: "mobileWrapperRef",
      class: V([t.wrapperClass, "flex no-wrap q-px-sm"]),
      style: N([t.wrapperStyle, { "overflow-x": "auto" }]),
      onScroll: n[0] || (n[0] = (...d) => l.handleScroll && l.handleScroll(...d))
    }, [
      (a(!0), c(C, null, S(t.items, (d, h) => (a(), c("div", {
        key: h,
        class: V(t.itemClass + (!t.isMarginLeft && h === 0 ? " q-ml-none" : ""))
      }, [
        m("div", {
          style: N({ width: t.itemWidth, maxWidth: t.itemMaxWidth, minWidth: t.itemMinWidth, height: "100%" })
        }, [
          k(e.$slots, "default", {
            item: d,
            index: h
          })
        ], 4)
      ], 2))), 128)),
      t.loadingMore ? (a(), c("div", Xe, [
        k(e.$slots, "loadMoreWrapper", {}, () => [
          m("div", {
            style: N({ width: `calc(${t.itemWidth} / 2)` }),
            class: "full-height flex items-center justify-center"
          }, [
            u(i, { size: "5rem" })
          ], 4)
        ])
      ])) : w("", !0)
    ], 38)) : w("", !0),
    t.loading ? (a(), c("div", Ge, [
      (a(!0), c(C, null, S(t.skeletonAmount, (d) => (a(), c("div", { key: d }, [
        m("div", {
          style: N({ width: t.itemWidth })
        }, [
          k(e.$slots, "skeletonMobile", {}, () => [
            u(f, { height: "300px" })
          ])
        ], 4),
        Qe
      ]))), 128))
    ])) : w("", !0)
  ], 64)) : t.items ? (a(), c("div", {
    key: 1,
    class: V(t.withContainer ? "container" : "")
  }, [
    m("div", {
      class: V([t.wrapperClass, "row q-col-gutter-md"]),
      style: N(t.wrapperStyle)
    }, [
      t.loading ? w("", !0) : (a(!0), c(C, { key: 0 }, S(t.items, (d, h) => (a(), c("div", {
        key: h,
        class: V(`${t.colClasses} ${t.itemClass}`)
      }, [
        k(e.$slots, "default", {
          index: h,
          item: d
        })
      ], 2))), 128)),
      t.loading ? (a(!0), c(C, { key: 1 }, S(t.skeletonAmount, (d) => (a(), c("div", {
        key: d,
        class: V(`${t.colClasses} ${t.itemClass}`)
      }, [
        k(e.$slots, "skeleton", {}, () => [
          u(f, { height: "300px" })
        ])
      ], 2))), 128)) : w("", !0)
    ], 6)
  ], 2)) : w("", !0);
}
const se = /* @__PURE__ */ F(Ye, [["render", Ke]]), Je = {
  name: "ApiInput",
  props: {
    errors: { default: void 0 }
  }
};
function Ze(e, n, t, l, o, s) {
  const i = b("q-input");
  return a(), M(i, j({
    error: t.errors ? !0 : void 0,
    "error-message": t.errors ? t.errors.join(" ") : void 0
  }, e.$attrs), {
    default: v(() => [
      k(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["error", "error-message"]);
}
const I = /* @__PURE__ */ F(Je, [["render", Ze]]), et = {
  name: "ApiSelect",
  props: {
    errors: { default: void 0 },
    options: {
      type: Array,
      default: []
    },
    field: {
      type: Object
    },
    behavior: {
      default: "menu"
    }
  },
  setup(e) {
    return {
      fieldOptions: ne(() => e.options.flatMap((t) => ({
        label: t.display_name,
        value: t.value
      })))
    };
  }
};
function tt(e, n, t, l, o, s) {
  const i = b("q-select");
  return a(), M(i, j({
    error: t.errors ? !0 : void 0,
    "error-message": t.errors ? t.errors.join(" ") : void 0
  }, e.$attrs, {
    behavior: t.behavior,
    options: l.fieldOptions,
    "emit-value": "",
    "map-options": ""
  }), ve({ _: 2 }, [
    S(e.$slots, (f, d) => ({
      name: f,
      fn: v(() => [
        k(e.$slots, f)
      ])
    }))
  ]), 1040, ["error", "error-message", "behavior", "options"]);
}
const re = /* @__PURE__ */ F(et, [["render", tt]]), nt = {
  name: "ApiCheckbox",
  props: {
    errors: { default: void 0 },
    hint: { required: !1 }
  }
}, lt = {
  key: 0,
  class: "text-small text-grey"
};
function ot(e, n, t, l, o, s) {
  const i = b("q-checkbox");
  return a(), c("div", null, [
    u(i, j({
      error: t.errors ? !0 : void 0,
      "error-message": t.errors ? t.errors.join(" ") : void 0
    }, e.$attrs), {
      default: v(() => [
        k(e.$slots, "default", {}, () => [
          t.hint ? (a(), c("div", lt, q(t.hint), 1)) : w("", !0)
        ])
      ]),
      _: 3
    }, 16, ["error", "error-message"])
  ]);
}
const it = /* @__PURE__ */ F(nt, [["render", ot]]), at = {
  field: I,
  boolean: it,
  string: I,
  url: I,
  email: I,
  regex: void 0,
  slug: I,
  integer: I,
  float: I,
  decimal: I,
  date: void 0,
  datetime: void 0,
  time: void 0,
  choice: re,
  "multiple choice": re,
  "file upload": void 0,
  "image upload": void 0,
  list: void 0,
  "nested object": void 0,
  input: "input"
}, st = {
  hidden: "hidden",
  field: I,
  boolean: I,
  string: "text",
  url: "url",
  email: "email",
  regex: void 0,
  slug: "text",
  integer: I,
  float: I,
  decimal: I,
  date: "date",
  datetime: "date",
  time: "time",
  choice: void 0,
  "multiple choice": void 0,
  "file upload": void 0,
  "image upload": void 0,
  list: void 0,
  "nested object": void 0
};
function rt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ct = function(n) {
  return dt(n) && !ut(n);
};
function dt(e) {
  return !!e && typeof e == "object";
}
function ut(e) {
  var n = Object.prototype.toString.call(e);
  return n === "[object RegExp]" || n === "[object Date]" || ht(e);
}
var ft = typeof Symbol == "function" && Symbol.for, mt = ft ? Symbol.for("react.element") : 60103;
function ht(e) {
  return e.$$typeof === mt;
}
function gt(e) {
  return Array.isArray(e) ? [] : {};
}
function R(e, n) {
  return n.clone !== !1 && n.isMergeableObject(e) ? B(gt(e), e, n) : e;
}
function vt(e, n, t) {
  return e.concat(n).map(function(l) {
    return R(l, t);
  });
}
function _t(e, n) {
  if (!n.customMerge)
    return B;
  var t = n.customMerge(e);
  return typeof t == "function" ? t : B;
}
function yt(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(n) {
    return Object.propertyIsEnumerable.call(e, n);
  }) : [];
}
function ce(e) {
  return Object.keys(e).concat(yt(e));
}
function we(e, n) {
  try {
    return n in e;
  } catch {
    return !1;
  }
}
function pt(e, n) {
  return we(e, n) && !(Object.hasOwnProperty.call(e, n) && Object.propertyIsEnumerable.call(e, n));
}
function bt(e, n, t) {
  var l = {};
  return t.isMergeableObject(e) && ce(e).forEach(function(o) {
    l[o] = R(e[o], t);
  }), ce(n).forEach(function(o) {
    pt(e, o) || (we(e, o) && t.isMergeableObject(n[o]) ? l[o] = _t(o, t)(e[o], n[o], t) : l[o] = R(n[o], t));
  }), l;
}
function B(e, n, t) {
  t = t || {}, t.arrayMerge = t.arrayMerge || vt, t.isMergeableObject = t.isMergeableObject || ct, t.cloneUnlessOtherwiseSpecified = R;
  var l = Array.isArray(n), o = Array.isArray(e), s = l === o;
  return s ? l ? t.arrayMerge(e, n, t) : bt(e, n, t) : R(n, t);
}
B.all = function(n, t) {
  if (!Array.isArray(n))
    throw new Error("first argument should be an array");
  return n.reduce(function(l, o) {
    return B(l, o, t);
  }, {});
};
var wt = B, kt = wt;
const Q = /* @__PURE__ */ rt(kt), qt = (e, n) => {
  const t = {};
  return n.forEach((l) => {
    try {
      t[l.attrs.name] = e[l.attrs.name];
    } catch (o) {
      console.debug(o);
    }
  }), t;
}, Ct = {
  name: "ApiForm",
  emits: ["update:modelValue", "submit"],
  props: {
    optionFields: {
      required: !0
    },
    requiredSuffix: {
      default: "*"
    },
    dark: {
      default: !1
    },
    disabled: {
      default: !1
    },
    cleanData: {
      default: !1,
      type: Boolean
    },
    formClass: {
      default: "row q-col-gutter-md"
    },
    fieldClass: {
      default: "col-12"
    },
    fieldsConfig: {
      default: {}
    },
    errors: {
      default: void 0
    },
    modelValue: {
      required: !0,
      default: {}
    },
    showReadonlyFields: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, n) {
    const t = P(), l = xe(e, "modelValue"), o = P(l.value), s = ne(() => e.cleanData ? qt(o.value, t.value) : Q(e.modelValue, o.value)), i = function() {
      n.emit("update:modelValue", s.value), n.emit("submit", s.value);
    };
    W(
      () => e.modelValue,
      () => {
        f();
      },
      { deep: !0 }
    ), W(
      () => o.value,
      () => {
        n.emit("update:modelValue", s.value);
      },
      { deep: !0 }
    );
    const f = function() {
      if (!e.optionFields)
        return;
      let r = [];
      for (const [p, y] of Object.entries(e.optionFields)) {
        if (e.fieldsConfig[p] === null || !e.showReadonlyFields && y.read_only && !e.fieldsConfig.hasOwnProperty(p))
          continue;
        e.modelValue && e.modelValue.hasOwnProperty(p) ? o.value[p] = e.modelValue[p] : y != null && y.default && (o.value[p] = y.default);
        let U = e.requiredSuffix && y.required ? `${y.label} ${e.requiredSuffix}` : y.label, $ = {
          attrs: {
            name: p,
            label: U,
            readonly: y.read_only,
            required: y.required,
            hint: y.help_text,
            multiple: y.type === "multiple choice",
            options: y.choices
          },
          type: y.type
        };
        $ = Q($, e.fieldsConfig[p] || {}), r.push($);
      }
      return r;
    };
    return W(
      () => e.optionFields,
      () => {
        t.value = f();
      },
      { immediate: !0 }
    ), {
      fields: t,
      inputAttrs: function(r) {
        return Q(r.attrs, n.attrs);
      },
      formData: o,
      onSubmit: i,
      getFieldComponent: (r) => at[r],
      getFieldType: (r) => st[r]
    };
  }
}, St = {
  key: 0,
  class: "col-12"
}, xt = { class: "col-12" };
function It(e, n, t, l, o, s) {
  const i = b("q-banner"), f = b("q-btn"), d = b("q-form");
  return l.fields ? (a(), M(d, {
    key: 0,
    class: V(t.formClass),
    dark: t.dark,
    onSubmit: l.onSubmit
  }, {
    default: v(() => {
      var h;
      return [
        (h = t.errors) != null && h.non_field_errors ? (a(), c("div", St, [
          k(e.$slots, "nonFieldError", {}, () => [
            u(i, { class: "bg-negative text-white" }, {
              default: v(() => [
                T(q(t.errors.non_field_errors.join(" ")), 1)
              ]),
              _: 1
            })
          ])
        ])) : w("", !0),
        (a(!0), c(C, null, S(l.fields, (g) => (a(), M(X(l.getFieldComponent(g.type)), j({
          key: g.attrs.name,
          modelValue: l.formData[g.attrs.name],
          "onUpdate:modelValue": (r) => l.formData[g.attrs.name] = r,
          class: t.fieldClass,
          dark: t.dark,
          disable: t.disabled,
          errors: t.errors ? t.errors[g.attrs.name] : void 0,
          field: g,
          rules: g.rules,
          type: l.getFieldType(g.attrs.type)
        }, l.inputAttrs(g)), {
          default: v(() => [
            k(e.$slots, `default.${g.attrs.name}`)
          ]),
          _: 2
        }, 1040, ["modelValue", "onUpdate:modelValue", "class", "dark", "disable", "errors", "field", "rules", "type"]))), 128)),
        k(e.$slots, "extras"),
        k(e.$slots, "submit", {}, () => [
          m("div", xt, [
            u(f, { type: "submit" }, {
              default: v(() => [
                T("Submit")
              ]),
              _: 1
            })
          ])
        ])
      ];
    }),
    _: 3
  }, 8, ["class", "dark", "onSubmit"])) : w("", !0);
}
const de = /* @__PURE__ */ F(Ct, [["render", It]]), K = {
  field: void 0,
  boolean: {
    component: pe,
    attrs: {}
  },
  string: {
    component: E,
    attrs: {
      type: "text"
    }
  },
  url: {
    component: E,
    attrs: {
      type: "url"
    }
  },
  email: {
    component: E,
    attrs: {
      type: "email"
    }
  },
  regex: {
    component: E
  },
  slug: {
    component: E
  },
  integer: {
    component: E,
    attrs: {
      type: "number"
    }
  },
  float: {
    component: E,
    attrs: {
      type: "number"
    }
  },
  decimal: {
    component: E,
    attrs: {
      type: "number"
    }
  },
  date: {
    component: E,
    attrs: {
      type: "date"
    }
  },
  datetime: {
    component: E,
    attrs: {
      type: "date"
    }
  },
  time: {
    component: E,
    attrs: {
      type: "time"
    }
  },
  choice: {
    component: ye
  },
  "multiple choice": {
    component: void 0
  },
  "file upload": {
    component: oe
  },
  "image upload": {
    component: oe
  },
  list: {
    component: void 0
  },
  "nested object": {
    component: void 0
  }
}, Pt = te({
  name: "DynamicInput",
  props: {
    field: {
      required: !0,
      type: Object
    },
    fieldComponent: {
      default: void 0,
      type: Object
    },
    errors: {
      default: void 0,
      type: Array || void 0
    },
    modelValue: {
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(e, n) {
    return {
      component: ne(() => {
        var o, s;
        if (e.fieldComponent)
          return e.fieldComponent;
        if (!((o = e.field) != null && o.type))
          throw "no field type given";
        if (!K[e.field.type])
          throw `Field "${e.field.type}" has no component in mapping.`;
        let l = {
          component: K[e.field.type].component,
          attrs: {
            ...K[e.field.type].attrs,
            label: e.field.label,
            required: e.field.required,
            hint: e.field.help_text,
            readonly: e.field.read_only,
            maxlength: e.field.max_length,
            behavior: "menu",
            modelValue: e.modelValue,
            ...n.attrs
          },
          handlers: {}
        };
        return l.attrs.required && (l.attrs.label = l.attrs.label + " *"), l.component === ye && (l.attrs.modelValue = l.attrs.modelValue === void 0 ? null : l.attrs.modelValue, e.field.choices && (l.attrs.options = e.field.choices.flatMap((i) => ({
          label: i.display_name,
          value: i.value
        })))), l.component === pe && (l.attrs.class = (s = l.attrs) != null && s.class ? l.attrs.class : "q-py-sm", n.attrs["no-indeterminate"] && (l.attrs.modelValue = l.attrs.modelValue || !1)), l.attrs = {
          ...l.attrs,
          ...n.attrs
        }, l;
      })
    };
  }
}), Mt = {
  key: 0,
  class: "text-muted text-small"
};
function Ft(e, n, t, l, o, s) {
  var i;
  return a(), c("div", null, [
    (a(), M(X(e.component.component), j({
      error: e.errors ? !0 : void 0,
      "error-message": e.errors ? e.errors.join(" ") : void 0,
      "model-value": e.component.attrs.modelValue
    }, e.component.attrs, Ie(e.component.handlers), {
      "onUpdate:modelValue": n[0] || (n[0] = (f) => {
        e.$emit("update:modelValue", f), e.component.attrs.modelValue = f;
      })
    }), ve({ _: 2 }, [
      S(e.$slots, (f, d) => ({
        name: d,
        fn: v((h) => [
          k(e.$slots, d, { slot: h })
        ])
      }))
    ]), 1040, ["error", "error-message", "model-value"])),
    ((i = e.component.component) == null ? void 0 : i.name) === "QCheckbox" && e.component.attrs.hint ? (a(), c("div", Mt, q(e.component.attrs.hint), 1)) : w("", !0)
  ]);
}
const ue = /* @__PURE__ */ F(Pt, [["render", Ft]]);
function J(e, n, t = void 0) {
  const l = H();
  if (!e)
    return e;
  if (!be.isValid(e))
    return console.error(`Dateformat invalid: ${e}`), e;
  let o = new Date(e), s;
  typeof window < "u" ? s = t || l.localStorage.getItem("language") || (window.navigator ? window.navigator.language : void 0) : s = t || l.localStorage.getItem("language");
  try {
    return o.toLocaleDateString(s, n);
  } catch (i) {
    console.error(e, i);
    return;
  }
}
const At = {
  currency: function({ value: e, locale: n = void 0, currency: t = "EUR", minimumFractionDigits: l, maximumFractionDigits: o }) {
    const s = H();
    return n || (n = s.localStorage.getItem("language") || "de"), new Intl.NumberFormat(n, {
      style: "currency",
      currency: t,
      minimumFractionDigits: l,
      maximumFractionDigits: o
    }).format(e);
  },
  i18nNotation: function({
    value: e,
    locale: n = void 0
  }) {
    const t = H();
    return n || (n = t.localStorage.getItem("language") || "de"), new Intl.NumberFormat(n, {}).format(e);
  },
  i18nDate: function(e, n = void 0) {
    if (!e)
      return e;
    let t = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      ...n
    };
    return J(e, t);
  },
  i18nTime: function(e, n = void 0) {
    return e && J(e, n);
  },
  i18nDateTime: function(e, n = void 0) {
    if (!e)
      return e;
    let t = {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      ...n
    };
    return J(e, t);
  },
  dateTimeFormat: function(e, n = void 0, t = void 0) {
    if (!e)
      return e;
    if (!be.isValid(e))
      return console.error(`Dateformat invalid: ${e}`), e;
    const l = H();
    let o = new Date(e), s;
    return typeof window < "u" ? s = t || l.localStorage.getItem("language") || (window.navigator ? window.navigator.language : void 0) : s = t || l.localStorage.getItem("language"), new Intl.DateTimeFormat(s, n).format(o);
  },
  pluralize: function(e, n, t = void 0) {
    if (typeof e == "object" && (e = e.value), e = Number.parseInt(e), e === 1)
      return n;
    let l = t;
    return t || (l = `${n}s`), l;
  }
};
class Et {
  constructor() {
    D(this, "cookieScripts", []);
    D(this, "isProcessed", !1);
  }
  getAll() {
    return this.cookieScripts;
  }
  add(n) {
    this.cookieScripts.push(n);
  }
  removeNotRequiredCookies() {
    this.cookieScripts.forEach((n) => {
      n.required || n.removeCookie();
    });
  }
  processScripts() {
    this.isProcessed || (this.cookieScripts.forEach((n) => {
      n.required || n.isActive() ? n.onAccept() : n.onDecline();
    }), this.isProcessed = !0);
  }
  init() {
    O.get("cookieConsentDialog") && this.processScripts();
  }
  accept({ all: n }) {
    O.has("cookieConsentDialog") || O.set("cookieConsentDialog", !0, { path: "/", sameSite: "Lax", expires: 90 }), n && this.cookieScripts.forEach((t) => {
      t.setCookie(!0);
    }), this.processScripts();
  }
}
class Ot {
  constructor({ name: n, slug: t, description: l, label: o, onAccept: s, onDecline: i, required: f }) {
    D(this, "name");
    D(this, "description");
    D(this, "label");
    D(this, "slug");
    D(this, "required");
    this.name = n, this.slug = t, this.required = f, this.description = l, this.label = o, this.onAccept = s || function() {
    }, this.onDecline = i || this.onDecline;
  }
  isActive() {
    if (!this.slug)
      throw new Error("no slug set");
    return !!O.get(this.slug);
  }
  setCookie(n) {
    if (!this.slug)
      throw new Error("no slug set");
    return O.set(this.slug, n, { path: "/", sameSite: "Lax" });
  }
  removeCookie() {
    if (!this.slug)
      throw new Error("no slug set");
    O.remove(this.slug);
  }
  onAccept() {
  }
  onDecline() {
  }
}
const z = new Et(), jt = {
  cookieConsent: z,
  CookieScript: Ot
}, Dt = {
  name: "CookieConsent",
  props: {
    title: { required: !1 },
    text: { required: !1 },
    btnAcceptLabel: { required: !1, default: "Accept all" },
    btnDenyLabel: { required: !1, default: "Only necessary" },
    btnSettingLabel: { required: !1, default: "Settings" },
    btnSaveLabel: { required: !1, default: "Save" },
    btnCancelLabel: { required: !1, default: "Cancel" },
    modelValue: { default: !1, required: !0 },
    disabled: { default: !1 }
  },
  emits: [
    "update:modelValue",
    "accepted",
    "acceptedBtnClick",
    "deny",
    "denyBtnClick",
    "close"
  ],
  setup(e, { emit: n }) {
    const t = P(!1), l = P([]), o = Pe({});
    if (!O.get("cookieConsentDialog")) {
      if (e.disabled === !0)
        return;
      n("update:modelValue", !0);
    }
    const s = function(r) {
      return !!O.get(r);
    };
    W(
      () => l,
      (r) => {
        r.value.forEach((p) => {
          o[p.slug] = p.isActive();
        });
      },
      { deep: !0 }
    );
    const i = function(r) {
      O.get(r.slug, !0) ? (r.removeCookie(), o[r.slug] = !1) : (r.setCookie(!0), o[r.slug] = !0);
    }, f = function() {
      z.accept({ all: !0 }), n("update:modelValue", !1), n("accepted"), n("acceptedBtnClick"), n("close");
    }, d = function() {
      z.removeNotRequiredCookies(), z.accept({ all: !1 }), n("update:modelValue", !1), n("deny"), n("denyBtnClick"), n("close");
    }, h = function() {
      z.accept({ all: !1 }), n("update:modelValue", !1), n("close");
    }, g = function() {
      t.value = !0;
    };
    return le(() => {
      l.value = z.getAll();
    }), {
      accept: f,
      cookieConsent: z,
      showSettings: t,
      settingsModal: g,
      deny: d,
      save: h,
      cookieScripts: l,
      cookieToggle: i,
      isCookieActives: s,
      cookieStatus: o,
      close
    };
  }
}, Vt = {
  class: "row full-width q-col-gutter-md",
  "data-nosnippet": "true"
}, $t = /* @__PURE__ */ m("div", { class: "col-12" }, null, -1), Lt = { class: "col-12" }, zt = { class: "text-weight-bold" }, Tt = ["innerHTML"], Nt = { class: "col-12" }, Bt = { class: "col-shrink q-gutter-md flex items-center justify-center" };
function Ut(e, n, t, l, o, s) {
  const i = b("q-btn"), f = b("q-card-section"), d = b("q-card"), h = b("q-dialog"), g = b("q-item-label"), r = b("q-item-section"), p = b("q-toggle"), y = b("q-item"), U = b("q-list"), $ = b("q-card-actions"), G = Z("close-popup");
  return a(), c(C, null, [
    u(h, {
      "model-value": t.modelValue,
      "full-width": "",
      position: "bottom",
      seamless: "",
      square: "",
      "onUpdate:modelValue": n[0] || (n[0] = (x) => e.$emit("update:modelValue", x))
    }, {
      default: v(() => [
        u(d, { dark: "" }, {
          default: v(() => [
            u(f, { class: "row items-center no-wrap" }, {
              default: v(() => [
                k(e.$slots, "default", {}, () => [
                  m("div", Vt, [
                    $t,
                    m("div", Lt, [
                      m("div", zt, q(t.title), 1),
                      k(e.$slots, "default", {}, () => [
                        m("div", {
                          class: "text-grey full-width",
                          style: { "white-space": "pre-line" },
                          innerHTML: t.text
                        }, null, 8, Tt)
                      ])
                    ]),
                    m("div", Nt, [
                      k(e.$slots, "actions", {}, () => [
                        m("div", Bt, [
                          m("div", null, [
                            u(i, {
                              label: t.btnSettingLabel,
                              color: "primary",
                              dense: "",
                              flat: "",
                              onClick: l.settingsModal
                            }, null, 8, ["label", "onClick"])
                          ]),
                          m("div", null, [
                            u(i, {
                              label: t.btnDenyLabel,
                              color: "primary",
                              outline: "",
                              onClick: l.deny
                            }, null, 8, ["label", "onClick"])
                          ]),
                          m("div", null, [
                            u(i, {
                              label: t.btnAcceptLabel,
                              color: "primary",
                              unelevated: "",
                              onClick: l.accept
                            }, null, 8, ["label", "onClick"])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["model-value"]),
    u(h, {
      modelValue: l.showSettings,
      "onUpdate:modelValue": n[1] || (n[1] = (x) => l.showSettings = x),
      onClose: n[2] || (n[2] = (x) => e.$emit("close"))
    }, {
      default: v(() => [
        u(d, null, {
          default: v(() => [
            u(f, null, {
              default: v(() => [
                u(U, null, {
                  default: v(() => [
                    (a(!0), c(C, null, S(l.cookieScripts, (x) => (a(), M(y, {
                      key: x.name
                    }, {
                      default: v(() => [
                        u(r, null, {
                          default: v(() => [
                            u(g, null, {
                              default: v(() => [
                                T(q(x.name) + " " + q(x.label), 1)
                              ]),
                              _: 2
                            }, 1024),
                            x.description ? (a(), M(g, {
                              key: 0,
                              caption: ""
                            }, {
                              default: v(() => [
                                T(q(x.description), 1)
                              ]),
                              _: 2
                            }, 1024)) : w("", !0)
                          ]),
                          _: 2
                        }, 1024),
                        u(r, {
                          side: "",
                          top: ""
                        }, {
                          default: v(() => [
                            u(p, {
                              "model-value": !!l.cookieStatus[x.slug],
                              "onUpdate:modelValue": (_) => l.cookieToggle(x)
                            }, null, 8, ["model-value", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024))), 128))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            u($, { align: "right" }, {
              default: v(() => [
                Y(u(i, {
                  label: t.btnCancelLabel,
                  flat: ""
                }, null, 8, ["label"]), [
                  [G]
                ]),
                Y(u(i, {
                  label: t.btnSaveLabel,
                  color: "primary",
                  outline: "",
                  onClick: l.save
                }, null, 8, ["label", "onClick"]), [
                  [G]
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ], 64);
}
const fe = /* @__PURE__ */ F(Dt, [["render", Ut]]);
function Rt(e) {
  if (e < 1024)
    return `${e} bytes`;
  if (e >= 1024 && e < 1048576)
    return `${(e / 1024).toFixed(1)} KB`;
  if (e >= 1048576)
    return `${(e / 1048576).toFixed(1)} MB`;
}
const Wt = {
  name: "FileUploaderField",
  props: {
    multiple: { default: !0, type: Boolean },
    gallery: { default: !1, type: Boolean },
    label: { default: "Drag and drop files or click here" },
    modelValue: {
      required: !0
    },
    lastOrderNum: {
      default: 0
    },
    ordering: {
      default: !1,
      type: Boolean
    },
    errors: {
      type: Array
    },
    maxFiles: {
      type: Number
    },
    maxFileSizeInMB: {
      type: Number
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = P(), l = P([]), o = P(), s = P([]);
    function i(_) {
      _.preventDefault();
    }
    const f = function() {
      o.value = void 0, n("update:modelValue", l.value);
    }, d = function(_) {
      return Rt(_.size);
    };
    ["dragenter", "dragover", "dragleave", "drop"].forEach((_) => {
      document.body.addEventListener(_, i);
    });
    const g = function() {
      t.value && (s.value = [], t.value.click());
    }, r = function(_) {
      return e.maxFiles && l.value.length >= e.maxFiles ? (ie.create({
        position: "top",
        message: "Maximale Anzahl von Dateien erreicht.",
        color: "warning",
        caption: `${_.name}`
      }), !1) : e.maxFileSizeInMB && _.size > e.maxFileSizeInMB * 1024 * 1024 ? (ie.create({
        position: "top",
        message: `Maximale Größe von ${e.maxFileSizeInMB} MB überschritten.`,
        color: "warning",
        caption: `${_.name}`
      }), !1) : (l.value.push(_), !0);
    }, p = function() {
      var _;
      if (!(!t.value || !((_ = t.value) != null && _.files))) {
        for (let A = 0; A < t.value.files.length; A++) {
          const ke = t.value.files[A];
          r(ke);
        }
        f();
      }
    }, y = function(_) {
      return URL.createObjectURL(_);
    }, U = function(_) {
      l.value.splice(_, 1), f();
    }, $ = function(_) {
      for (let A = 0; A < _.dataTransfer.files.length; A++)
        r(_.dataTransfer.files[A]);
      f();
    };
    return ge(() => {
      o.value = e.errors;
    }), {
      click: g,
      fileInput: t,
      changeFile: p,
      fileList: l,
      getUrl: y,
      drop: $,
      removeFile: U,
      fileSize: d,
      setPosImageUp: function(_) {
        if (_ <= 0)
          return;
        const A = l.value.splice(_, 1)[0];
        l.value.splice(_ - 1, 0, A), f();
      },
      setPosImageDown: function(_) {
        if (_ >= l.value.length)
          return;
        const A = l.value.splice(_, 1)[0];
        l.value.splice(_ + 1, 0, A), f();
      },
      tmpError: o,
      validationErrors: s
    };
  }
};
const Ht = { class: "row" }, Yt = ["multiple"], Xt = {
  key: 0,
  class: "text-muted"
}, Gt = {
  key: 0,
  class: "col-12 q-mb-md"
}, Qt = { class: "col-12" }, Kt = { class: "col-12" }, Jt = { class: "" }, Zt = { class: "flex items-center no-wrap" }, en = {
  class: "q-px-sm",
  style: { "overflow-wrap": "anywhere" }
}, tn = {
  key: 0,
  class: "text-center text-negative q-mb-sm"
}, nn = {
  key: 1,
  class: "row q-col-gutter-md"
}, ln = ["src"], on = {
  key: 1,
  class: "text-bold text-center",
  style: { "overflow-wrap": "anywhere" }
}, an = { class: "text-center" }, sn = {
  key: 0,
  class: "text-center text-negative q-mb-sm"
};
function rn(e, n, t, l, o, s) {
  var h, g;
  const i = b("q-icon"), f = b("q-banner"), d = b("q-btn");
  return a(), c("div", Ht, [
    !(!t.multiple && l.fileList.length > 0) && (!t.maxFiles || t.multiple && l.fileList.length < t.maxFiles) ? (a(), c("div", {
      key: 0,
      class: "c-upload-wrapper q-mb-lg bg-grey-3 flex flex-center column cursor-pointer",
      onClick: n[1] || (n[1] = (...r) => l.click && l.click(...r)),
      onDrop: n[2] || (n[2] = _e((...r) => l.drop && l.drop(...r), ["prevent"]))
    }, [
      m("div", null, [
        u(i, {
          name: "fas fa-file-arrow-up",
          size: "lg"
        }),
        m("input", j({
          ref: "fileInput",
          multiple: t.multiple,
          class: "hidden",
          name: "files",
          type: "file"
        }, e.$attrs, {
          onChange: n[0] || (n[0] = (...r) => l.changeFile && l.changeFile(...r))
        }), null, 16, Yt)
      ]),
      m("div", null, q(t.label), 1),
      t.multiple && t.maxFiles ? (a(), c("div", Xt, "(max. " + q(t.maxFiles) + " Dateien insgesamt)", 1)) : w("", !0)
    ], 32)) : w("", !0),
    (h = l.fileList) != null && h.length ? (a(), c(C, { key: 1 }, [
      (g = l.validationErrors) != null && g.length ? (a(), c("div", Gt, [
        (a(!0), c(C, null, S(l.validationErrors, (r) => (a(), M(f, {
          key: r,
          class: "bg-warning q-mb-sm",
          rounded: ""
        }, {
          default: v(() => [
            T(q(r), 1)
          ]),
          _: 2
        }, 1024))), 128))
      ])) : w("", !0),
      m("div", Qt, q(t.errors), 1),
      m("div", Kt, [
        m("div", Jt, [
          t.gallery ? (a(), c("div", nn, [
            (a(!0), c(C, null, S(l.fileList, (r, p) => (a(), c("div", {
              class: "col-12 col-sm-6",
              key: r.name
            }, [
              r.type.startsWith("image/") ? (a(), c("img", {
                key: 0,
                src: l.getUrl(r),
                class: "full-width",
                style: { "max-height": "200px", "object-fit": "contain" }
              }, null, 8, ln)) : (a(), c("div", on, [
                u(i, { name: "far fa-file" }),
                T(" " + q(r.name), 1)
              ])),
              m("div", an, [
                m("div", null, q(l.fileSize(r)), 1),
                t.errors && t.errors[p] ? (a(), c("div", sn, [
                  (a(!0), c(C, null, S(t.errors[p], (y) => (a(), c("div", { key: y }, q(y), 1))), 128))
                ])) : w("", !0),
                t.ordering ? (a(), c(C, { key: 1 }, [
                  u(d, {
                    flat: "",
                    round: "",
                    onClick: (y) => l.setPosImageUp(p)
                  }, {
                    default: v(() => [
                      u(i, {
                        name: "fas fa-angle-up",
                        size: "xs"
                      })
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  u(d, {
                    flat: "",
                    round: "",
                    onClick: (y) => l.setPosImageDown(p)
                  }, {
                    default: v(() => [
                      u(i, {
                        name: "fas fa-angle-down",
                        size: "xs"
                      })
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ], 64)) : w("", !0),
                u(d, {
                  onClick: (y) => l.removeFile(p),
                  round: "",
                  flat: "",
                  size: "sm"
                }, {
                  default: v(() => [
                    u(i, { name: "fas fa-trash" })
                  ]),
                  _: 2
                }, 1032, ["onClick"])
              ])
            ]))), 128))
          ])) : (a(!0), c(C, { key: 0 }, S(l.fileList, (r, p) => (a(), c("div", {
            key: r.name,
            class: "text-bold flex items-center justify-between no-wrap q-my-md"
          }, [
            m("div", Zt, [
              m("div", null, [
                u(i, {
                  name: "far fa-file",
                  size: "lg"
                })
              ]),
              m("div", en, q(r.name) + " (" + q(l.fileSize(r)) + ")", 1),
              t.errors && t.errors[p] ? (a(), c("div", tn, [
                (a(!0), c(C, null, S(t.errors[p], (y) => (a(), c("div", { key: y }, q(y), 1))), 128))
              ])) : w("", !0)
            ]),
            m("div", null, [
              u(d, {
                onClick: (y) => l.removeFile(p),
                round: "",
                flat: "",
                size: "sm"
              }, {
                default: v(() => [
                  u(i, { name: "fas fa-trash" })
                ]),
                _: 2
              }, 1032, ["onClick"])
            ])
          ]))), 128))
        ])
      ])
    ], 64)) : w("", !0)
  ]);
}
const me = /* @__PURE__ */ F(Wt, [["render", rn], ["__scopeId", "data-v-9bf21e6c"]]);
const cn = {
  name: "SecureEmail",
  props: {
    email: {
      type: String,
      required: !0
    },
    subject: {
      type: String,
      required: !1
    }
  },
  setup(e) {
    const n = P();
    return le(() => {
      const l = e.email.split(".")[0], o = e.email.split(".")[1], s = l.split("@")[0], i = l.split("@")[1];
      n.value.dataset.hi = s, n.value.dataset.de = i, n.value.dataset.this = o;
    }), {
      emailRef: n,
      click: function() {
        window.location.href = `mailto:${n.value.dataset.hi}@${n.value.dataset.de}.${n.value.dataset.this}?subject=${e.subject || ""}`;
      }
    };
  }
};
function dn(e, n, t, l, o, s) {
  return a(), c("a", {
    ref: "emailRef",
    class: "cryptedmail",
    href: "#",
    onClick: n[0] || (n[0] = _e((...i) => l.click && l.click(...i), ["prevent"]))
  }, null, 512);
}
const he = /* @__PURE__ */ F(cn, [["render", dn], ["__scopeId", "data-v-2faf4e0c"]]), un = {
  key: 0,
  class: "overlay"
}, fn = /* @__PURE__ */ te({
  __name: "FadeOutText",
  props: {
    maxHeight: {
      default: 300,
      type: Number
    },
    trashhold: {
      default: 100,
      type: Number
    },
    backgroundColor: {
      default: "white",
      type: String
    }
  },
  setup(e) {
    const n = e;
    Me((o) => ({
      "4d841c14": e.backgroundColor
    }));
    const t = P(), l = P(!1);
    return le(() => {
      t.value.scrollHeight > n.maxHeight + n.trashhold && (l.value = !0);
    }), (o, s) => {
      const i = b("q-btn");
      return a(), c("div", {
        ref_key: "wrapperRef",
        ref: t,
        style: N({ "max-height": l.value ? `${n.maxHeight}px` : void 0, overflow: l.value ? "hidden" : "auto" }),
        class: "fade-out-text-wrapper"
      }, [
        k(o.$slots, "default", {}, void 0, !0),
        l.value ? (a(), c("div", un, [
          k(o.$slots, "show-more", {}, () => [
            u(i, {
              color: "primary",
              flat: "",
              "no-caps": "",
              onClick: s[0] || (s[0] = (f) => l.value = !1)
            }, {
              default: v(() => [
                T("Alles anzeigen")
              ]),
              _: 1
            })
          ], !0)
        ])) : w("", !0)
      ], 4);
    };
  }
});
const mn = /* @__PURE__ */ F(fn, [["__scopeId", "data-v-62934c26"]]), _n = {
  CookieConsentCmp: jt,
  install(e, n) {
    e.component(ae.name, ae), e.component(ee.name, ee), e.component(se.name, se), e.component(de.name, de), e.component(fe.name, fe), e.component(me.name, me), e.component(ue.name, ue), e.component(he.name, he), e.component("FadeOutText", mn), e.config.globalProperties.$filters = At;
  }
};
export {
  _n as default
};
