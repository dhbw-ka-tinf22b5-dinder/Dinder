(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{4230:function(r,n,e){Promise.resolve().then(e.bind(e,1193))},6463:function(r,n,e){"use strict";var t=e(1169);e.o(t,"useRouter")&&e.d(n,{useRouter:function(){return t.useRouter}})},1193:function(r,n,e){"use strict";e.r(n);var t=e(7437),o=e(8323),s=e(8471),u=e(4397),a=e(8649),i=e(5336),c=e(9912),l=e(1616),d=e(6463);n.default=()=>{let r=(0,o.v9)(r=>r.error),n=(0,o.v9)(r=>r.login),{push:e}=(0,d.useRouter)();n.userName&&e("/");let p=r.errorMessage.includes("password");return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.u,{src:"./pictures/startBackground.png"}),(0,t.jsxs)(i.l,{method:"POST",submit:function(r){r.preventDefault();let n=r.target,e={loginName:n.email.value,password:n.password.value};l.h.dispatch((0,u.F)(e))},children:["E-Mail:",(0,t.jsx)(c.I,{name:"email",type:"text",error:r.errorMessage}),"Password:",(0,t.jsx)(c.I,{name:"password",type:"password",error:p?r.errorMessage:""}),(0,t.jsx)(a.G,{span:2,children:"Login"})]})]})}},8649:function(r,n,e){"use strict";e.d(n,{z:function(){return a},G:function(){return i}});var t=e(7437),o=e(8646);function s(){let r=(0,o._)(["\n  background: deepskyblue;\n  padding: 8px 24px;\n  border-radius: 25px;\n  box-shadow: none;\n  border: none;\n  grid-column: span ",";\n"]);return s=function(){return r},r}let u=e(5969).ZP.button(s(),r=>r.$span),a=r=>(0,t.jsx)(u,{$span:r.span,onClick:r.click,children:r.text}),i=r=>(0,t.jsx)(u,{type:"submit",$span:r.span,children:r.children})},5336:function(r,n,e){"use strict";e.d(n,{l:function(){return a}});var t=e(7437),o=e(8646);function s(){let r=(0,o._)(["\n    position: relative;\n    margin: auto;\n    display: grid;\n    gap: 60px;\n    grid-template-columns: auto auto;\n    background: white;\n    border-radius: 25px;\n    color: black;\n    padding: 10px;"]);return s=function(){return r},r}let u=e(5969).ZP.form(s()),a=r=>(0,t.jsx)(u,{method:r.method,onSubmit:r.submit,children:r.children})},9912:function(r,n,e){"use strict";e.d(n,{I:function(){return l}});var t=e(7437),o=e(8646),s=e(5969);function u(){let r=(0,o._)(["\n  padding-left: 5px;\n  border-color: ",";;\n  border-width: 1px;\n  border-radius: 25px;\n  background: white;\n  color: black;\n"]);return u=function(){return r},r}let a=s.ZP.input(u(),r=>r.$isError?"red":"black");function i(){let r=(0,o._)(["\n    color: red;\n    font-size: 12px;\n    margin: 0;\n    padding: 0;\n"]);return i=function(){return r},r}let c=s.ZP.p(i()),l=r=>{let{type:n="text",name:e="input",error:o=""}=r;return console.log(e+" "+o),(0,t.jsxs)("div",{children:[(0,t.jsx)(a,{type:n,name:e,$isError:""!==o}),(0,t.jsx)(c,{children:o})]})}},9413:function(r,n,e){"use strict";e.d(n,{AS:function(){return o}});let t=(0,e(6886).oM)({name:"error",initialState:{error:!1,errorMessage:""},reducers:{errorReducer:(r,n)=>n.payload}}),{errorReducer:o}=t.actions;n.ZP=t.reducer},3253:function(r,n,e){"use strict";e.d(n,{t:function(){return o}});let t=(0,e(6886).oM)({name:"login",initialState:{userName:""},reducers:{loginReducer:(r,n)=>n.payload}}),{loginReducer:o}=t.actions;n.ZP=t.reducer},1616:function(r,n,e){"use strict";e.d(n,{h:function(){return u}});var t=e(6886),o=e(9413),s=e(3253);let u=(0,t.xC)({reducer:{login:s.ZP,error:o.ZP}})},4397:function(r,n,e){"use strict";e.d(n,{F:function(){return l},y:function(){return d}});var t=e(3738),o=e(2126),s=e(9413),u=e(3253);let a={user:{userName:""},errorStatus:{error:!0,errorMessage:"E-Mail or password is wrong"}};function i(r){return{user:{userName:""},errorStatus:{error:!0,errorMessage:r}}}let c=()=>o.Z.get("http://localhost:8080/api/v1/user/me").then(r=>(console.log(r),r.data.userName)).catch(r=>r.status).then(r=>({user:{userName:r},errorStatus:{error:!1,errorMessage:""}})).catch(r=>i(r)),l=r=>async n=>{if(!t.G(r.loginName)){n((0,s.AS)(i("Invalid email").errorStatus));return}o.Z.post("http://localhost:8080/api/v1/login",r).then(r=>(console.log("Hallo "+r),r.data)).catch(r=>r.status).then(r=>r?c():a).catch(r=>i(r)).then(r=>{n((0,u.t)(r.user)),n((0,s.AS)(r.errorStatus))})},d=r=>async n=>{var e;if(r.password!==r.confirmPassword){n((0,s.AS)(i("Passwords do not match").errorStatus));return}if(!t.G(r.email)){n((0,s.AS)(i("Invalid email").errorStatus));return}(e={email:r.email,userName:r.userName,password:r.password},o.Z.post("http://localhost:8080/api/v1/register",e).then(r=>r.status).catch(r=>r.status)).then(()=>i("").errorStatus).catch(r=>i(r).errorStatus).then(r=>{n((0,s.AS)(r))})}},8471:function(r,n,e){"use strict";e.d(n,{t:function(){return a},u:function(){return i}});var t=e(8646),o=e(5969);function s(){let r=(0,t._)(["\n    position: relative;\n    margin: auto;\n    display: grid;\n    gap: 60px;\n    grid-template-columns: auto auto;\n    background: ",";\n    border-radius: 25px;\n    color: black;\n    padding: 10px;\n"]);return s=function(){return r},r}function u(){let r=(0,t._)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  max-width: 100%;\n  min-width: 100%;\n  max-height: 100%;\n  object-fit: cover;\n"]);return u=function(){return r},r}let a=o.ZP.div(s(),r=>r.$isMain?"none":"white"),i=o.ZP.img(u())}},function(r){r.O(0,[556,886,882,971,23,744],function(){return r(r.s=4230)}),_N_E=r.O()}]);