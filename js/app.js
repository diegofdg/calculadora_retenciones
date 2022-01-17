console.log('aplicación iniciada');

const divResultado = document.getElementById('resultado');
//const inputRadio = document.getElementById('radio-button');
const facturaB = document.getElementById('factura-b');
const facturaC = document.getElementById('factura-c');

/* const inputMontoTotal = document.getElementById('monto-factura');
const inputBienesServicios = document.getElementById('bienes-servicios');
const inputAlicuotaIVA = document.getElementById('alicuota-iva');
const inputInscripcionIIBB = document.getElementById('inscripcion-iibb'); */
const btnCalcular = document.getElementById('calcular');
const radioButtons = document.querySelectorAll('input[name="tipo"]');

let tipoFacturaSeleccionada = 'fb';
let bienesServicios = '';
let alicuotaIVA = '';
let inscripcionIIBB = '';
let montoFactura = 0;
let montoRetencion = 0;

iniciarApp();

function iniciarApp() {
    radioButtons.forEach(function (item) {
        item.addEventListener('change', clickRadio)});

    btnCalcular.addEventListener('click', calcularRetenciones);    
}

function clickRadio(){
    let seleccion;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            seleccion = radioButton.value;
            mostrarSelect(seleccion);
            break;
        }
    }
}

function mostrarSelect(seleccion) {
    if(seleccion === 'fb'){
        facturaB.classList.remove('ocultar');
        facturaC.classList.add('ocultar');
        tipoFacturaSeleccionada = 'fb'
    } else if (seleccion === 'fc'){
        facturaC.classList.remove('ocultar');
        facturaB.classList.add('ocultar');
        tipoFacturaSeleccionada = 'fc'
    }
}

function calcularRetenciones() {    
    console.log('Calculando las retenciones de una '+tipoFacturaSeleccionada);
    retencionesIIBB();    
}

function retencionesIIBB() {
    if(tipoFacturaSeleccionada === 'fb') {
        const inputMontoTotal = document.getElementById('monto-factura');        
        const bienesServicios = document.querySelector('#bienes-servicios').value;        
        console.log(bienesServicios);
        const alicuotaIVA = document.querySelector('#alicuota-iva').value;        
        console.log(alicuotaIVA);
        const inscripcionIIBB = document.querySelector('#inscripcion-iibb').value;        
        console.log(inscripcionIIBB);
        montoFactura = dosDecimales(inputMontoTotal.value);

        if(bienesServicios === 'bienes') {
            if(alicuotaIVA === 'general') {
                if(inscripcionIIBB === 'inscripto') {                    
                    montoRetencion = Number(((montoFactura / 1.21) * 0.02).toFixed(2));
                    if(montoRetencion > 200){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                } else if(inscripcionIIBB === 'convenio-multilateral') {                    
                    montoRetencion = Number((((montoFactura / 1.21) / 2) * 0.02).toFixed(2));
                    if(montoRetencion > 100){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                } else if(inscripcionIIBB === 'no-inscripto') {
                    montoRetencion = Number(((montoFactura / 1.21) * 0.06).toFixed(2));
                    if(montoRetencion > 600){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                } 
            } else if(alicuotaIVA === 'reducida') {
                if(inscripcionIIBB === 'inscripto') {                    
                    montoRetencion = Number(((montoFactura / 1.105) * 0.02).toFixed(2));
                    if(montoRetencion > 200){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                } else if(inscripcionIIBB === 'convenio-multilateral') {                    
                    montoRetencion = Number((((montoFactura / 1.105) / 2) * 0.02).toFixed(2));
                    if(montoRetencion > 100){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                } else if(inscripcionIIBB === 'no-inscripto') {
                    montoRetencion = Number(((montoFactura / 1.105) * 0.06).toFixed(2));
                    if(montoRetencion > 600){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                }
            }
        } else if(bienesServicios === 'servicios') {
            if(alicuotaIVA === 'general') {
                if(inscripcionIIBB === 'inscripto') {                    
                    montoRetencion = Number(((montoFactura / 1.21) * 0.03).toFixed(2));
                    if(montoRetencion > 300){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                } else if(inscripcionIIBB === 'convenio-multilateral') {                    
                    montoRetencion = Number((((montoFactura / 1.21) / 2) * 0.03).toFixed(2));
                    if(montoRetencion > 150){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                } else if(inscripcionIIBB === 'no-inscripto') {
                    montoRetencion = Number(((montoFactura / 1.21) * 0.06).toFixed(2));
                    if(montoRetencion > 600){
                        imprimirResultado();
                    } else {
                        montoRetencion = 0;
                    }
                }
            } else {
                console.log('Error, opciones seleccionadas no válidas');            
            }
        } else if(bienesServicios === 'excluido') {
            console.log('No se retiene, está excluido del régimen');            
            montoRetencion = 0;
        }    

    } else if (tipoFacturaSeleccionada === 'fc') {
        const inputMontoTotal = document.getElementById('monto-factura');        
        const bienesServicios2 = document.querySelector('#bienes-servicios2').value;        
        console.log(bienesServicios2);
        const alicuotaIVA = document.querySelector('#alicuota-iva').value;        
        console.log(alicuotaIVA);
        const inscripcionIIBB = document.querySelector('#inscripcion-iibb').value;        
        console.log(inscripcionIIBB);
        montoFactura = dosDecimales(inputMontoTotal.value);
        
        
        
        
        if(bienesServicios2 === 'bienes') {
            montoRetencion = Number((montoFactura * 0.02).toFixed(2));
            if(montoRetencion > 200){
                imprimirResultado();
            } else {
                montoRetencion = 0;
            }
        } else if(bienesServicios2 === 'servicios-comunes') {
            montoRetencion = Number((montoFactura * 0.03).toFixed(2));
            if(montoRetencion > 300){
                imprimirResultado();
            } else {
                montoRetencion = 0;
            }
        } else if (bienesServicios2 === 'contratos') {
            montoRetencion = Number((montoFactura * 0.03).toFixed(2));
            if(montoRetencion > 450){
                imprimirResultado();
            } else {
                montoRetencion = 0;
            }
        } else if(bienesServicios2 === 'no-inscripto') {
            montoRetencion = Number((montoFactura * 0.06).toFixed(2));
            if(montoRetencion > 900){
                imprimirResultado();
            } else {
                montoRetencion = 0;
            }
        } else if(bienesServicios2 === 'excluido') {
            console.log('No se retiene, está excluido del régimen');            
            montoRetencion = 0;
        }
    }
}

function dosDecimales(numero) {
    let numeroString = numero.toString();
    let regex = /(\d*.\d{0,2})/;
    return Number(numeroString.match(regex)[0]);
  }
  
  function imprimirResultado() {
    const nuevoDiv = document.createElement('DIV');    
    
    const tipoDeFacturaP = document.createElement('P');      
    tipoDeFacturaP.textContent = `Tipo de Factura: ${tipoFacturaSeleccionada}`;
    nuevoDiv.appendChild(tipoDeFacturaP);

    const montoFacturaP = document.createElement('P');      
    montoFacturaP.innerHTML = `Monto de la Factura: <span>${montoFactura}</span>`;    
    nuevoDiv.appendChild(montoFacturaP);

    const bienesServiciosP = document.createElement('P');      
    bienesServiciosP.innerHTML = `<span>${bienesServicios}</span>`;    
    nuevoDiv.appendChild(bienesServiciosP);

    const alicuotaIVAP = document.createElement('P');      
    alicuotaIVAP.innerHTML = `<span>${alicuotaIVA}</span>`;    
    nuevoDiv.appendChild(alicuotaIVAP);

    const inscripcionIIBBp = document.createElement('P');      
    inscripcionIIBBp.innerHTML = `<span>${inscripcionIIBB}</span>`;    
    nuevoDiv.appendChild(inscripcionIIBBp);

    const montoRetencionP = document.createElement('P');      
    montoRetencionP.innerHTML = `<span>${montoRetencion}</span>`;    
    nuevoDiv.appendChild(montoRetencionP);
    
    divResultado.appendChild(nuevoDiv);
}

