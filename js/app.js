console.log('aplicación iniciada');

const radioButtons = document.querySelectorAll('input[name="tipo"]');
const inputMonto = document.getElementById('monto-factura');
const inputRetencion = document.querySelectorAll('select[name="retencion"]');
const fieldsetIIBB = document.getElementById('fieldset-iibb');
const tipoRetencion = document.getElementById('retencion');
const iibbFacturaB = document.getElementById('iibb-factura-b');
const iibbFacturaC = document.getElementById('iibb-factura-c');
const btnCalcular = document.getElementById('calcular');
const divResultado = document.getElementById('resultado');

const objetoFactura = {
    tipo_factura: 'fb',
    monto_factura: 0,
    ingresos_brutos: {
        se_calcula: false,
        tipo_operacion: '',
        alicuotaIVA: '',
        tipo_inscripcion: '',
        monto_retencion_iibb: 0
    }
}

iniciarApp();

function iniciarApp() {    
    radioButtons.forEach(function (item) {
        item.addEventListener('change', clickRadio)});
    inputRetencion.forEach(function (item) {
        item.addEventListener('change', clickRetencion)});
    btnCalcular.addEventListener('click', calcularRetenciones);
}

function clickRadio(){
    let seleccion;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            seleccion = radioButton.value;
            guardarTipoFactura(seleccion);
            clickRetencion();
            break;
        }
    }
}

function clickRetencion() {    
    if(tipoRetencion.value === 'iibb'){
        fieldsetIIBB.classList.remove('ocultar');
        objetoFactura.ingresos_brutos.se_calcula = true;

        if(objetoFactura.tipo_factura === 'fb') {
            iibbFacturaB.classList.remove('ocultar');
            iibbFacturaC.classList.add('ocultar');


        } else if(objetoFactura.tipo_factura === 'fc') {
            iibbFacturaB.classList.add('ocultar');
            iibbFacturaC.classList.remove('ocultar');
        }
    } else {
        fieldsetIIBB.classList.add('ocultar');
        objetoFactura.ingresos_brutos.se_calcula = false;
    }
}

function guardarTipoFactura(seleccion) {
    if(seleccion === 'fb'){        
        objetoFactura.tipo_factura = 'fb';
    } else if (seleccion === 'fc'){        
        objetoFactura.tipo_factura = 'fc';        
    }    
}

function calcularRetenciones() {
    if(validarTipoFactura()) {
        console.log('pasaste la validacion de tipo de factura');

        if(validarMonto()) {
            console.log('pasaste la validacion de monto');            

            if(objetoFactura.ingresos_brutos.se_calcula) {
                retencionesIIBB();
                console.log(objetoFactura);             
                

            } else {
                console.log('no pasaste la validacion de retenciones');            
            }
        } else {
            console.log('no pasaste la validacion de monto');        
        }
    } else {
        console.log('no pasaste la validacion de tipo de factura');        
    }
}

function validarTipoFactura() {
    if(objetoFactura.tipo_factura === 'fb' || objetoFactura.tipo_factura === 'fc') {        
        return true;
    } else {
        objetoFactura.tipo_factura === 'fb';
        return false;
    }
}

function validarMonto() {
    montoFactura = inputMonto.value;    

    if( montoFactura === '' || montoFactura === null || isNaN(montoFactura) || montoFactura <= 0 ) {        
        inputMonto.value = '';
        objetoFactura.monto_factura = 0;
        return false;
    }
    objetoFactura.monto_factura = dosDecimales(montoFactura);    
    return true;
}

function retencionesIIBB() {
    if(objetoFactura.tipo_factura === 'fb') {
        objetoFactura.ingresos_brutos.tipo_operacion = document.getElementById('bienes-servicios-fb').value;
        objetoFactura.ingresos_brutos.alicuotaIVA = document.getElementById('alicuota-iva').value;
        objetoFactura.ingresos_brutos.tipo_inscripcion = document.getElementById('inscripcion-iibb').value;        

        const { tipo_factura, monto_factura } = objetoFactura;
        const { ingresos_brutos } = objetoFactura;
        const { tipo_operacion, tipo_inscripcion, alicuotaIVA } = ingresos_brutos;

        if(tipo_operacion === 'bienes') {
            if(alicuotaIVA === 'general') {
                if(tipo_inscripcion === 'inscripto') {
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.21, 1, 200);
                    imprimirResultado();
                } else if(tipo_inscripcion === 'convenio-multilateral') {
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.21, 2, 100);                    
                    imprimirResultado();
                } else if(tipo_inscripcion === 'no-inscripto') {
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.21, 1, 600);                    
                    imprimirResultado();
                }
            } else if(alicuotaIVA === 'reducida') {
                if(tipo_inscripcion === 'inscripto') {                    
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.105, 1, 200);                    
                    imprimirResultado();
                } else if(tipo_inscripcion === 'convenio-multilateral') {                    
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.105, 2, 100);                    
                    imprimirResultado();
                } else if(tipo_inscripcion === 'no-inscripto') {
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.105, 1, 600);                    
                    imprimirResultado();
                }
            }
        } else if(tipo_operacion === 'servicios') {
            if(alicuotaIVA === 'general') {
                if(tipo_inscripcion === 'inscripto') {
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1.21, 1, 300);                    
                    imprimirResultado();
                } else if(tipo_inscripcion === 'convenio-multilateral') {
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1.21, 2, 150);                    
                    imprimirResultado();
                } else if(tipo_inscripcion === 'no-inscripto') {
                    objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.21, 1, 600);                    
                    imprimirResultado();
                }
            } else {
                alert('Error, no existe la combinación "servicios" con "alícuota reducida de iva"');
            }
        } else if(tipo_operacion === 'excluido') {
            montoRetencion = 0;
            alert('Error, no se calcula la retención por encontrarse la operación excluída del régimen');
        }    

    } else if (objetoFactura.tipo_factura === 'fc') {
        objetoFactura.ingresos_brutos.tipo_operacion = document.getElementById('bienes-servicios-fc').value;
        
        const { tipo_factura, monto_factura } = objetoFactura;
        const { ingresos_brutos } = objetoFactura;
        const { tipo_operacion, tipo_inscripcion, alicuotaIVA } = ingresos_brutos;
        /* const inputMonto = document.getElementById('monto-factura');         */
        
        
        if(tipo_operacion === 'bienes') {
            objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1, 1, 200);                    
            imprimirResultado();
            
        } else if(tipo_operacion === 'servicios-comunes') {
            objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1, 1, 300);                    
            imprimirResultado();
            
        } else if (tipo_operacion === 'contratos') {
            objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1, 1, 450);                                
            imprimirResultado();
            
        } else if(tipo_operacion === 'no-inscripto') {
            objetoFactura.ingresos_brutos.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1, 1, 900);                                
            montoRetencion = Number((montoFactura * 0.06).toFixed(2));
            imprimirResultado();
            
        } else if(tipo_operacion === 'excluido') {
            alert('Error, no se retiene, está excluido del régimen');            
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
    tipoDeFacturaP.textContent = `Tipo de Factura: ${objetoFactura.tipo_factura}`;
    nuevoDiv.appendChild(tipoDeFacturaP);

    const montoFacturaP = document.createElement('P');      
    montoFacturaP.innerHTML = `Monto de la Factura: <span>${objetoFactura.monto_factura}</span>`;    
    nuevoDiv.appendChild(montoFacturaP);

    const bienesServiciosP = document.createElement('P');      
    bienesServiciosP.innerHTML = `<span>${objetoFactura.ingresos_brutos.tipo_operacion}</span>`;    
    nuevoDiv.appendChild(bienesServiciosP);

    const alicuotaIVAP = document.createElement('P');      
    alicuotaIVAP.innerHTML = `<span>${objetoFactura.ingresos_brutos.alicuotaIVA}</span>`;    
    nuevoDiv.appendChild(alicuotaIVAP);

    const inscripcionIIBBp = document.createElement('P');      
    inscripcionIIBBp.innerHTML = `<span>${objetoFactura.ingresos_brutos.tipo_inscripcion}</span>`;    
    nuevoDiv.appendChild(inscripcionIIBBp);

    const montoRetencionP = document.createElement('P');      
    montoRetencionP.innerHTML = `<span>${objetoFactura.ingresos_brutos.monto_retencion_iibb}</span>`;    
    nuevoDiv.appendChild(montoRetencionP);
    
    divResultado.appendChild(nuevoDiv);
}

function calcularRetencionesIIBB(monto,tipo,alicuota,inscripcion,minimo){
    montoRetencion = Number((((monto / alicuota) * tipo) / inscripcion).toFixed(2));
    if(montoRetencion > minimo){
        return montoRetencion;
    } else {
        return montoRetencion = 0;
    }
}