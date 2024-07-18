var pre = 0;
var valor = 0;
var cantidad = document.getElementById("cantidad");
var lista = document.getElementById("lista");
var cantidades = JSON.parse(localStorage.getItem("cantidades")) || [];

document.getElementById("valor").oninput =()=> {
    valor = parseInt(document.getElementById("valor").value);
    document.getElementById("vvalor").innerHTML = `$${valor}.00 MXN`;
}
const preguntar = async () =>{
    const { value: presupuesto } = await Swal.fire({
        title: "Presupuesto inicial",
        input: "number",
        inputLabel: "cantidad",
        inputValue: "0",
        showCancelButton:true,
        inputValidator: (value) => {
            if(!value){
                return "se requiere un valor";
            }
        }
      });
      if (presupuesto) {
      pre = parseInt(presupuesto);
      cantidad.innerHTML = `$${pre}.00 MXN`;
      }
}
const verCantidades = () => {
    cantidades =JSON.parse(localStorage.getItem("cantidades")) || [];
    let total =0;
    let cantHTML = ``;
    cantidades.forEach(cant =>{
        if(cant > 0){
            total += parseInt(cant);
            cantHTML += `<li class="list-group-item list-group-item-danger">${cant}</li>`;
        }else{
            total += parseInt(cant);
            cantHTML += `<li class="list-group-item list-group-item-primary">${cant}</li>`
        }
    });
    cantidad.innerHTML = `$${pre + total}.00 MXN`;
    lista.innerHTML = cantHTML;
}
const añadir = () => {
    valor = parseInt(document.getElementById("valor").value);
    if (valor == 0){
        Swal.fire({title: "ERROR ", text : "Ingresa un valor que no sea 0", icon : "question"});
        return;
    }
    cantidades = JSON.parse(localStorage.getItem("cantidades")) || [];
    cantidades.push(valor);
    localStorage.setItem("cantidades",JSON.stringify(cantidades));
    verCantidades();
}
const elimi = () =>{
    valor = parseInt(document.getElementById("valor").value);
    if(valor == 0){
    
    Swal.fire({title: "ERROR ", text : "Ingresa un valor que no sea 0", icon : "question"});
    return;

}
cantidades = JSON.parse(localStorage.getItem("cantidades")) || [];
var x = (valor > 0) ? (valor * -1):valor;
cantidades.push(x);
localStorage.setItem("cantidades",JSON.stringify(cantidades));
    verCantidades();
}
const eliminar = () =>{
    localStorage.clear();
    valor = 0;
    pre = 0;
    document.getElementById("valor").value = valor; 
    document.getElementById("vvalor").innerHTML = `$${valor}.00 MXN`;
    cantidad.innerHTML =`$${pre}.00 mxn` ;
    preguntar();
    verCantidades();
}
