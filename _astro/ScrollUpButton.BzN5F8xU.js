import{j as o}from"./jsx-runtime.ClP7wGfN.js";import{r}from"./index.DK-fsZOb.js";const a=()=>{const[s,e]=r.useState(!1);r.useEffect(()=>{window.addEventListener("scroll",i)},[]);const i=()=>{const t=document.documentElement.scrollTop;t>300?e(!0):t<=300&&e(!1)},n=()=>{window.scrollTo({top:0,behavior:"smooth"})};return o.jsx(o.Fragment,{children:s&&o.jsx("button",{className:"w-12 h-12 fixed bottom-6 right-6 main-border-gray rounded-xl  bg-bgDark2 hover:bg-bgDark3 cursor-pointer flex justify-center items-center transition z-50",onClick:n,"aria-label":"Scroll to top",children:o.jsx("svg",{fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"35px",height:"35px",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M4.16732 12.5L10.0007 6.66667L15.834 12.5",stroke:"rgb(99, 102, 241)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})})};export{a as ScrollUpButton};
