function serverValidate(frm) {
  const worthy = e => e.name && !e.novalidate && e.name.indexOf(":")==-1 && e.name!="form";
  const decorate = e => e.name=validateItem(e);
  const validateItem = elem => {
    if(elem.type=="number" || elem.type=="range") return validateNumber(elem);
    if(elem.type=="radio" || elem.type=="checkbox") return validateRC(elem);
    if(elem.pattern) return validateRegexp(elem);
    return serverValidateText(elem);
  }
  const validateText = elem => {
    var parts = [];
    parts.push(elem.required?"s":"S");
    if(elem.minlength) parts.push(elem.minlength);
    if(elem.maxlength) parts.push("to"+elem.maxlength);
    return parts.join("")+":"+elem.name;
  }
  const validateNumber = elem => {
    var parts = [];
    if(elem.step>0 && elem.step<1) parts.push(elem.required ? "f" : "F");
    else parts.push(elem.required ? "i" : "I");
    if(elem.min) parts.push(elem.min);
    if(elem.max) parts.push("to"+elem.max);
    return parts.join("")+":"+elem.name;
  }
  const validateRC = (elem,group,name,base) => (group=[...elem.form.elements].filter(e=>e.name==elem.name),
    elem.name.indexOf(":")==-1 &&(
      name=group.map(e=>encodeURIComponent(e.value)).join(","), base=elem.name,
      group.map(e=>e.name=(elem.required?"c":"C")+name+":"+base)
    ), elem.name);
  const validateRegexp = elem => "r"+elem.pattern+":"+elem.name;
  [...frm.elements].filter(worthy).forEach(decorate);
}
