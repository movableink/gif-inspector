"use strict"
define("gif-inspector/app",["exports","gif-inspector/resolver","ember-load-initializers","gif-inspector/config/environment"],function(e,t,r,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,r.default)(a,n.default.modulePrefix)
var i=a
e.default=i}),define("gif-inspector/components/gif-frame",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=["unspecified","do not dispose","restore to background","restore to previous"],r=Ember.Component.extend({localPalette:Ember.computed("reader","frame",function(){return this.reader.framePalette(this.frame.index)}),frameDelay:Ember.computed("frame.delay",function(){return 10*this.frame.delay}),disposalName:Ember.computed("frame.disposal",function(){return t[this.frame.disposal]})})
e.default=r}),define("gif-inspector/components/gif-inspector",["exports","omggif"],function(e,t){function r(e,t,r,n,a,i,o){try{var l=e[i](o),s=l.value}catch(f){return void r(f)}l.done?t(s):Promise.resolve(s).then(n,a)}function n(e){return new Promise(function(t,r){var n=new FileReader
n.onload=function(e){var r=e.target.result
t(new Uint8Array(r))},n.onerror=r,n.readAsArrayBuffer(e)})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Component.extend({reader:null,frames:Ember.computed("reader",function(){var e=[]
if(this.reader)for(var t=0;t<this.reader.numFrames();t++)e.push(Object.assign(this.reader.frameInfo(t),{index:t}))
return e}),globalPalette:Ember.computed("reader",function(){return this.reader.globalPalette()||[]}),backgroundColor:Ember.computed("reader","globalPalette",function(){return this.globalPalette?this.globalPalette[this.reader.background_index]:{r:0,g:0,b:0,a:0}}),loopCount:Ember.computed("reader",function(){return this.reader.loopCount()}),parseGif:function(e){Ember.set(this,"array",e),Ember.set(this,"reader",new t.GifReader(e))},actions:{processGif:function(){var e,t=(e=regeneratorRuntime.mark(function e(t){var r,a
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.target.files||!t.target.files[0]){e.next=7
break}return r=t.target.files[0],e.next=4,n(r)
case 4:a=e.sent,Ember.set(this,"name",r.name),this.parseGif(a)
case 7:case"end":return e.stop()}},e,this)}),function(){var t=this,n=arguments
return new Promise(function(a,i){var o=e.apply(t,n)
function l(e){r(o,a,i,l,s,"next",e)}function s(e){r(o,a,i,l,s,"throw",e)}l(void 0)})})
return function(e){return t.apply(this,arguments)}}()}})
e.default=a}),define("gif-inspector/components/gif-palette",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({})
e.default=t}),define("gif-inspector/components/gif-player",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({speed:10,tagName:"span",didInsertElement:function(){this.image=this.element.querySelector(".gif-player"),this.context=this.image.getContext("2d"),void 0!==this.frameNumber?this.drawOnce=!0:this.frameNumber=0,this.draw()},draw:function(){if(this.reader){var e=this.reader,t=this.image,r=this.context,n=t.width,a=t.height,i=++this.frameNumber%e.numFrames(),o=e.frameInfo(i)
0!==i&&2!==o.disposal||r.clearRect(0,0,n,a)
var l=r.getImageData(0,0,n,a)
if(e.decodeAndBlitFrameRGBA(i,l.data),r.putImageData(l,0,0),this.drawOnce)r.strokeStyle="#FF0000",r.rect(o.x,o.y,o.width,o.height),r.stroke()
else{var s=this.draw.bind(this)
setTimeout(s,o.delay*this.speed)}}}})
e.default=t}),define("gif-inspector/helpers/and",["exports","ember-truth-helpers/helpers/and"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"and",{enumerable:!0,get:function(){return t.and}})}),define("gif-inspector/helpers/app-version",["exports","gif-inspector/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,r){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.default.APP.version,i=n.versionOnly||n.hideSha,o=n.shaOnly||n.hideVersion,l=null
return i&&(n.showExtended&&(l=a.match(r.versionExtendedRegExp)),l||(l=a.match(r.versionRegExp))),o&&(l=a.match(r.shaRegExp)),l?l[0]:a}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var a=Ember.Helper.helper(n)
e.default=a}),define("gif-inspector/helpers/eq",["exports","ember-truth-helpers/helpers/equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"equal",{enumerable:!0,get:function(){return t.equal}})}),define("gif-inspector/helpers/gt",["exports","ember-truth-helpers/helpers/gt"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"gt",{enumerable:!0,get:function(){return t.gt}})}),define("gif-inspector/helpers/gte",["exports","ember-truth-helpers/helpers/gte"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"gte",{enumerable:!0,get:function(){return t.gte}})}),define("gif-inspector/helpers/is-array",["exports","ember-truth-helpers/helpers/is-array"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"isArray",{enumerable:!0,get:function(){return t.isArray}})}),define("gif-inspector/helpers/is-empty",["exports","ember-truth-helpers/helpers/is-empty"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("gif-inspector/helpers/is-equal",["exports","ember-truth-helpers/helpers/is-equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"isEqual",{enumerable:!0,get:function(){return t.isEqual}})}),define("gif-inspector/helpers/lt",["exports","ember-truth-helpers/helpers/lt"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"lt",{enumerable:!0,get:function(){return t.lt}})}),define("gif-inspector/helpers/lte",["exports","ember-truth-helpers/helpers/lte"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"lte",{enumerable:!0,get:function(){return t.lte}})}),define("gif-inspector/helpers/not-eq",["exports","ember-truth-helpers/helpers/not-equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"notEq",{enumerable:!0,get:function(){return t.notEq}})}),define("gif-inspector/helpers/not",["exports","ember-truth-helpers/helpers/not"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"not",{enumerable:!0,get:function(){return t.not}})}),define("gif-inspector/helpers/or",["exports","ember-truth-helpers/helpers/or"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"or",{enumerable:!0,get:function(){return t.or}})}),define("gif-inspector/helpers/palette-background",["exports"],function(e){function t(e){var t=e[0]
if(!t)return"".htmlSafe()
var r=[t.r,t.g,t.b,t.a].join(", ")
return"background-color: rgba(".concat(r,")").htmlSafe()}Object.defineProperty(e,"__esModule",{value:!0}),e.paletteBackground=t,e.default=void 0
var r=Ember.Helper.helper(t)
e.default=r}),define("gif-inspector/helpers/palette-color",["exports"],function(e){function t(e){var t=e[0]
if(!t)return"".htmlSafe()
var r=[t.r,t.g,t.b,t.a].join(", ")
return"rgba(".concat(r,")").htmlSafe()}Object.defineProperty(e,"__esModule",{value:!0}),e.paletteColor=t,e.default=void 0
var r=Ember.Helper.helper(t)
e.default=r}),define("gif-inspector/helpers/xor",["exports","ember-truth-helpers/helpers/xor"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"xor",{enumerable:!0,get:function(){return t.xor}})}),define("gif-inspector/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","gif-inspector/config/environment"],function(e,t,r){var n,a
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r.default.APP&&(n=r.default.APP.name,a=r.default.APP.version)
var i={name:"App Version",initialize:(0,t.default)(n,a)}
e.default=i}),define("gif-inspector/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=r}),define("gif-inspector/initializers/export-application-global",["exports","gif-inspector/config/environment"],function(e,t){function r(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var r
if("undefined"!=typeof window)r=window
else if("undefined"!=typeof global)r=global
else{if("undefined"==typeof self)return
r=self}var n,a=t.default.exportApplicationGlobal
n="string"==typeof a?a:Ember.String.classify(t.default.modulePrefix),r[n]||(r[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete r[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=r,e.default=void 0
var n={name:"export-application-global",initialize:r}
e.default=n}),define("gif-inspector/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r}),define("gif-inspector/router",["exports","gif-inspector/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
r.map(function(){})
var n=r
e.default=n}),define("gif-inspector/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("gif-inspector/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"n7eVqkIi",block:'{"symbols":[],"statements":[[7,"h1"],[9],[0,"GIF Inspector"],[10],[0,"\\n\\n"],[1,[21,"gif-inspector"],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"gif-inspector/templates/application.hbs"}})
e.default=t}),define("gif-inspector/templates/components/gif-frame",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"2nz0OSUW",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","frame"],[9],[0,"\\n  "],[7,"h3"],[9],[0,"Frame "],[1,[23,["frame","index"]],false],[10],[0,"\\n\\n  "],[7,"div"],[11,"class","frame-info"],[9],[0,"\\n    "],[7,"table"],[9],[0,"\\n      "],[7,"tbody"],[9],[0,"\\n        "],[7,"tr"],[9],[0,"\\n          "],[7,"th"],[9],[0,"Dimensions"],[10],[0,"\\n          "],[7,"td"],[9],[1,[23,["frame","width"]],false],[0," × "],[1,[23,["frame","height"]],false],[10],[0,"\\n        "],[10],[0,"\\n        "],[7,"tr"],[9],[0,"\\n          "],[7,"th"],[9],[0,"Offset"],[10],[0,"\\n          "],[7,"td"],[9],[0,"x: "],[1,[23,["frame","x"]],false],[0,", y: "],[1,[23,["frame","y"]],false],[10],[0,"\\n        "],[10],[0,"\\n        "],[7,"tr"],[9],[0,"\\n          "],[7,"th"],[9],[0,"Disposal"],[10],[0,"\\n          "],[7,"td"],[9],[1,[23,["frame","disposal"]],false],[0," ("],[1,[21,"disposalName"],false],[0,")"],[10],[0,"\\n        "],[10],[0,"\\n        "],[7,"tr"],[9],[0,"\\n          "],[7,"th"],[9],[0,"Delay"],[10],[0,"\\n          "],[7,"td"],[9],[1,[23,["frame","delay"]],false],[0," ("],[1,[21,"frameDelay"],false],[0,"ms)"],[10],[0,"\\n        "],[10],[0,"\\n        "],[7,"tr"],[9],[0,"\\n          "],[7,"th"],[9],[0,"Local Palette"],[10],[0,"\\n          "],[7,"td"],[9],[1,[23,["frame","has_local_palette"]],false],[10],[0,"\\n        "],[10],[0,"\\n        "],[7,"tr"],[9],[0,"\\n          "],[7,"th"],[9],[0,"Data Length"],[10],[0,"\\n          "],[7,"td"],[9],[1,[23,["frame","data_length"]],false],[10],[0,"\\n        "],[10],[0,"\\n        "],[7,"tr"],[9],[0,"\\n          "],[7,"th"],[9],[0,"Data Offset"],[10],[0,"\\n          "],[7,"td"],[9],[1,[23,["frame","data_offset"]],false],[10],[0,"\\n        "],[10],[0,"\\n\\n"],[4,"if",[[23,["frame","has_local_palette"]]],null,{"statements":[[0,"          "],[7,"tr"],[9],[0,"\\n            "],[7,"th"],[9],[0,"Palette Size"],[10],[0,"\\n            "],[7,"td"],[9],[1,[23,["frame","palette_size"]],false],[10],[0,"\\n          "],[10],[0,"\\n"]],"parameters":[]},null],[0,"      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n\\n  "],[1,[27,"gif-player",null,[["reader","frameNumber"],[[23,["reader"]],[23,["frame","index"]]]]],false],[0,"\\n\\n"],[4,"if",[[23,["frame","has_local_palette"]]],null,{"statements":[[0,"    "],[7,"p"],[9],[0,"\\n      Palette:\\n      "],[1,[27,"gif-palette",null,[["colors"],[[23,["localPalette"]]]]],false],[0,"\\n    "],[10],[0,"\\n"]],"parameters":[]},null],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"gif-inspector/templates/components/gif-frame.hbs"}})
e.default=t}),define("gif-inspector/templates/components/gif-inspector",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"ee1qMluP",block:'{"symbols":["frame"],"statements":[[7,"input"],[11,"multiple","true"],[12,"onchange",[27,"action",[[22,0,[]],"processGif"],null]],[11,"accept","image/gif"],[11,"type","file"],[9],[10],[0,"\\n\\n"],[4,"if",[[23,["reader"]]],null,{"statements":[[0,"  "],[7,"h2"],[9],[1,[21,"name"],false],[10],[0,"\\n\\n  "],[7,"div"],[11,"class","gif"],[9],[0,"\\n    "],[7,"div"],[11,"class","gif-info"],[9],[0,"\\n      "],[7,"table"],[9],[0,"\\n        "],[7,"tbody"],[9],[0,"\\n          "],[7,"tr"],[9],[0,"\\n            "],[7,"th"],[9],[0,"Dimensions"],[10],[0,"\\n            "],[7,"td"],[9],[1,[23,["reader","width"]],false],[0," × "],[1,[23,["reader","height"]],false],[10],[0,"\\n          "],[10],[0,"\\n          "],[7,"tr"],[9],[0,"\\n            "],[7,"th"],[9],[0,"Loop Count"],[10],[0,"\\n            "],[7,"td"],[9],[0,"\\n              "],[1,[21,"loopCount"],false],[0,"\\n\\n"],[4,"if",[[27,"eq",[[23,["loopCount"]],0],null]],null,{"statements":[[0,"                (loop forever)\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[27,"eq",[[23,["loopCount"]],1],null]],null,{"statements":[[0,"                (no looping)\\n"]],"parameters":[]},null],[0,"            "],[10],[0,"\\n          "],[10],[0,"\\n          "],[7,"tr"],[9],[0,"\\n            "],[7,"th"],[9],[0,"Data Size"],[10],[0,"\\n            "],[7,"td"],[9],[1,[23,["array","length"]],false],[10],[0,"\\n          "],[10],[0,"\\n          "],[7,"tr"],[9],[0,"\\n            "],[7,"th"],[9],[0,"Background Color"],[10],[0,"\\n            "],[7,"td"],[9],[0,"\\n"],[4,"if",[[23,["globalPalette","length"]]],null,{"statements":[[0,"                "],[7,"span"],[11,"class","palette-color"],[12,"style",[27,"palette-background",[[23,["backgroundColor"]]],null]],[9],[0,"\\n                "],[10],[0,"\\n                "],[1,[27,"palette-color",[[23,["backgroundColor"]]],null],false],[0,"\\n                (index "],[1,[23,["reader","background_index"]],false],[0,")\\n"]],"parameters":[]},{"statements":[[0,"                No global background color.\\n"]],"parameters":[]}],[0,"            "],[10],[0,"\\n          "],[10],[0,"\\n          "],[7,"tr"],[9],[0,"\\n            "],[7,"th"],[9],[0,"Palette"],[10],[0,"\\n            "],[7,"td"],[9],[0,"\\n"],[4,"if",[[23,["globalPalette","length"]]],null,{"statements":[[0,"                "],[1,[27,"gif-palette",null,[["colors"],[[23,["globalPalette"]]]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                No global palette.\\n"]],"parameters":[]}],[0,"            "],[10],[0,"\\n          "],[10],[0,"\\n        "],[10],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n\\n    "],[7,"div"],[11,"class","player"],[9],[0,"\\n      "],[1,[27,"gif-player",null,[["reader"],[[23,["reader"]]]]],false],[0,"\\n      "],[7,"p"],[9],[0,"Normal speed"],[10],[0,"\\n    "],[10],[0,"\\n\\n    "],[7,"div"],[11,"class","player"],[9],[0,"\\n      "],[1,[27,"gif-player",null,[["reader","speed"],[[23,["reader"]],100]]],false],[0,"\\n      "],[7,"p"],[9],[0,"1/10 speed"],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n\\n"],[4,"each",[[23,["frames"]]],null,{"statements":[[0,"    "],[1,[27,"gif-frame",null,[["frame","reader"],[[22,1,[]],[23,["reader"]]]]],false],[0,"\\n"]],"parameters":[1]},null],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[7,"p"],[9],[0,"Select a GIF to inspect it."],[10],[0,"\\n"]],"parameters":[]}]],"hasEval":false}',meta:{moduleName:"gif-inspector/templates/components/gif-inspector.hbs"}})
e.default=t})
define("gif-inspector/templates/components/gif-palette",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"sUfPTtXu",block:'{"symbols":["color"],"statements":[[4,"each",[[23,["colors"]]],null,{"statements":[[0,"  "],[7,"span"],[11,"class","palette-color"],[12,"style",[27,"palette-background",[[22,1,[]]],null]],[12,"title",[27,"palette-color",[[22,1,[]]],null]],[9],[0,"\\n  "],[10],[0,"\\n"]],"parameters":[1]},null]],"hasEval":false}',meta:{moduleName:"gif-inspector/templates/components/gif-palette.hbs"}})
e.default=t}),define("gif-inspector/templates/components/gif-player",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"4LGkqOUE",block:'{"symbols":[],"statements":[[7,"canvas"],[11,"class","gif-player"],[12,"width",[23,["reader","width"]]],[12,"height",[23,["reader","height"]]],[9],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"gif-inspector/templates/components/gif-player.hbs"}})
e.default=t}),define("gif-inspector/config/environment",[],function(){try{var e="gif-inspector/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),r={default:JSON.parse(unescape(t))}
return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("gif-inspector/app").default.create({name:"gif-inspector",version:"0.0.0+cd718b4e"})
