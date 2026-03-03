"use strict";

const EMAIL = "houseofantique30@gmail.com";
const WA_INTL = "9647777045599";

function waText(){
  return [
    "السلام عليكم بيت التحفيات،",
    "أرغب في تقييم/عرض بيع قطعة.",
    "",
    "سأرسل الصور والمعلومات التالية:",
    "1) نوع القطعة:",
    "2) الأبعاد (سم):",
    "3) الحالة (كسر/ترميم/نقص):",
    "4) أي ختم/كتابة/توقيع:",
    "5) ملاحظات:",
    "",
    "مع الشكر."
  ].join("\n");
}

function mailtoLink(){
  const subject = "طلب فحص/تقييم أو عرض بيع قطعة — بيت التحفيات";
  const body = [
    "السادة/ بيت التحفيات المحترمون،",
    "أرغب في تقييم/عرض بيع قطعة. أرفق الصور والمعلومات التالية:",
    "",
    "الاسم:",
    "رقم الهاتف:",
    "نوع القطعة:",
    "الأبعاد (سم):",
    "الحالة (كسر/ترميم/نقص):",
    "أي ختم/كتابة/توقيع:",
    "ملاحظات:",
    "",
    "وتفضلوا بقبول فائق الاحترام."
  ].join("\n");

  return `mailto:${encodeURIComponent(EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* WA + MAIL buttons */
document.querySelectorAll("[data-wa]").forEach(el=>{
  el.addEventListener("click",(e)=>{
    e.preventDefault();
    window.open(`https://wa.me/${WA_INTL}?text=${encodeURIComponent(waText())}`,"_blank","noopener,noreferrer");
  });
});
document.querySelectorAll("[data-mail]").forEach(el=>{
  el.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = mailtoLink();
  });
});

/* Drawer */
const drawer = document.querySelector("[data-drawer]");
const openBtn = document.querySelector("[data-drawer-open]");
const closeBtns = document.querySelectorAll("[data-drawer-close]");

function openDrawer(){
  drawer.hidden = false;
  drawer.classList.add("isOpen");
  document.body.style.overflow = "hidden";
}
function closeDrawer(){
  drawer.classList.remove("isOpen");
  setTimeout(()=> drawer.hidden = true, 220);
  document.body.style.overflow = "";
}
openBtn?.addEventListener("click", openDrawer);
closeBtns.forEach(b=> b.addEventListener("click", closeDrawer));
drawer?.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeDrawer(); });