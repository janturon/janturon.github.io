/** XHRform = XMLHttpRequest + Promises + FormData */
const XHRform = (form, progress) => new Promise((resolve, reject) => {
  if(typeof form == "string") form = document.getElementById(form);
  if(!form || !form.method) reject("no form");
  let XHR = new XMLHttpRequest();
  XHR.onload = _ => resolve(XHR.response, XHR.getAllResponseHeaders());
  XHR.onerror = _ => reject("no conn");
  if(progress) XHR.onprogress = e => progress(e.loaded, e.total);
  XHR.open(form.method, form.action);
  XHR.setRequestHeader("Content-Type", form.enctype);
  XHR.withCredentials = 1;
  form.onsubmit = e =>
    e.preventDefault() || XHR.send(new FormData(form));
});