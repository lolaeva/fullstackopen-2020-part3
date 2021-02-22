(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var o=t(1),c=t(15),r=t.n(c),s=t(3),a=t(4),i=t.n(a),u=t(0),l=function(e){var n=e.showAll,t=e.handleFilter;return Object(u.jsxs)("section",{className:"filter__section",children:["filter shown with: ",Object(u.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.personsToShow,t=e.onDelete;return Object(u.jsx)("div",{className:"persons__list",children:n.map((function(e){return Object(u.jsxs)("div",{className:"persons__list__item",children:[Object(u.jsxs)("span",{className:"persons__list__item__content",children:[e.name,"  ",e.number]}),Object(u.jsx)("button",{className:"persons__list__item__button",onClick:function(){return t(e.id)},children:"delete"})]},e.id)}))})},f=function(e){var n=e.newName,t=e.newNumber,o=e.onNameChange,c=e.onNumberChange,r=e.addPerson;return Object(u.jsxs)("form",{onSubmit:r,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:n,onChange:o})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:t,onChange:c})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){return function(e,n){return e&&e.length>0?Object(u.jsx)("section",{className:"notification",children:e}):Object(u.jsx)("section",{className:"errorNotification",children:n})}(e.message,e.errorMessage)},b="/api/persons",h=function(){return i.a.get(b).then((function(e){return e.data}))},m=function(e){return i.a.post(b,e).then((function(e){return e.data}))},O=function(e){return i.a.delete("".concat(b,"/").concat(e))},p=function(e,n){return i.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},g=(t(14),function(){var e=Object(o.useState)([]),n=Object(s.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),a=Object(s.a)(r,2),i=a[0],b=a[1],g=Object(o.useState)(""),v=Object(s.a)(g,2),x=v[0],_=v[1],w=Object(o.useState)(""),N=Object(s.a)(w,2),S=N[0],E=N[1],T=Object(o.useState)(""),C=Object(s.a)(T,2),k=C[0],y=C[1],P=Object(o.useState)(""),D=Object(s.a)(P,2),R=D[0],A=D[1];Object(o.useEffect)((function(){h().then((function(e){c(e)}))}),[]);var L=0===S.length?t:t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return console.log(k),Object(u.jsxs)("section",{className:"phonebook__section",children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(j,{message:k,errorMessage:R}),Object(u.jsx)(l,{showAll:S,handleFilter:function(e){E(e.target.value)}}),Object(u.jsx)("h3",{children:"add a new"}),Object(u.jsx)(f,{newName:i,newNumber:x,onNameChange:function(e){return b(e.target.value)},onNumberChange:function(e){return _(e.target.value)},addPerson:function(e){e.preventDefault();var n={name:i,number:x};if(t.some((function(e){return e.name===i}))){var o=t.find((function(e){return e.name===i})).id;if(!window.confirm("".concat(i," is already added to phonebook. Replace old number with the new one? ")))return;p(o,n).then((function(e){console.log("PUT RESPONSE",e),c(t.map((function(n){return o!==n.id?n:e}))),y("Updated ".concat(n.name," successfully.")),setTimeout((function(){return y(null)}),5e3),b(""),_("")})).catch((function(e){console.log(e),A("Information of ".concat(n.name," has already been removed from the server.")),setTimeout((function(){return A(null)}),5e3)}))}else m(n).then((function(e){console.log("POST RESPONSE",e),c(t.concat(e)),y("Added ".concat(n.name," successfully")),setTimeout((function(){return y(null)}),5e3),b(""),_("")})).catch((function(e){console.log("Error",e.response.data.error),A(e.response.data.error),setTimeout((function(){return A(null)}),5e3)}))}}),Object(u.jsx)("h3",{children:"Numbers"}),Object(u.jsx)(d,{personsToShow:L,onDelete:function(e){if(console.log("TO BE DELETED",t.find((function(n){return n.id===e}))),window.confirm("Delete person")){var n=t.find((function(n){return n.id===e}));O(e).then((function(){y("Removed ".concat(n.name," successfully")),setTimeout((function(){return y(null)}),5e3),c(t.filter((function(n){return n.id!==e})))}))}}})]})});r.a.render(Object(u.jsx)(g,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.6b58d6ee.chunk.js.map