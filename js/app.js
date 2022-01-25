console.log('aplicación iniciada');

const radioButtons = document.querySelectorAll('input[name="tipo"]');
const inputMonto = document.getElementById('monto-factura');
const inputRetencion = document.querySelectorAll('select[name="retencion"]');

const tipoRetencion = document.getElementById('retencion');

const fieldsetIIBB = document.getElementById('fieldset-iibb');
const iibbFacturaB = document.getElementById('iibb-factura-b');
const iibbFacturaC = document.getElementById('iibb-factura-c');

const fieldsetIVA = document.getElementById('fieldset-iva');
const ivaFacturaB = document.getElementById('iva-factura-b');

const fieldsetGCIAS = document.getElementById('fieldset-gcias');
const gciasFacturaB = document.getElementById('gcias-factura-b');

const fieldsetSUSS = document.getElementById('fieldset-suss');
const sussFacturaB = document.getElementById('suss-factura-b');

const fieldsetSELLOS = document.getElementById('fieldset-sellos');
const sellosFactura = document.getElementById('sellos-factura');

const btnCalcular = document.getElementById('calcular');
const btnLimpiar = document.getElementById('limpiar');
const divResultado = document.getElementById('resultado');

let objetoFactura = {
    tipo_factura: 'fb',
    monto_factura: 0,
    iibb: {
        se_calcula: false,
        tipo_operacion: '',
        alicuotaIVA: '',
        tipo_inscripcion: '',
        monto_retencion_iibb: 0
    },
    iva: {
        se_calcula: false,
        tipo_operacion: '',        
        monto_retencion_iva: 0
    },
    gcias: {
        se_calcula: false,
        tipo_operacion: '',        
        monto_retencion_gcias: 0
    },
    suss: {
        se_calcula: false,
        tipo_operacion: '',
        alicuotaIVA: '',        
        monto_retencion_suss: 0
    },
    sellos: {
        se_calcula: false,
        tipo_operacion: '',        
        monto_retencion_sellos: 0
    }
}

iniciarApp();

function iniciarApp() {    
    radioButtons.forEach(function (item) {
        item.addEventListener('change', clickRadio)});
    inputRetencion.forEach(function (item) {
        item.addEventListener('change', clickRetencion)});
    btnCalcular.addEventListener('click', calcularRetenciones);
    btnLimpiar.addEventListener('click', limpiar);
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
        objetoFactura.iibb.se_calcula = true;

        fieldsetIVA.classList.add('ocultar');
        objetoFactura.iva.se_calcula = false;

        fieldsetGCIAS.classList.add('ocultar');
        objetoFactura.gcias.se_calcula = false;

        fieldsetSUSS.classList.add('ocultar');
        objetoFactura.suss.se_calcula = false;

        fieldsetSELLOS.classList.add('ocultar');
        objetoFactura.sellos.se_calcula = false;

        if(objetoFactura.tipo_factura === 'fb') {
            iibbFacturaB.classList.remove('ocultar');
            iibbFacturaC.classList.add('ocultar');

        } else if(objetoFactura.tipo_factura === 'fc') {
            iibbFacturaB.classList.add('ocultar');
            iibbFacturaC.classList.remove('ocultar');
        }

    } else if(tipoRetencion.value === 'iva') {
        fieldsetIVA.classList.remove('ocultar');
        objetoFactura.iva.se_calcula = true;

        fieldsetIIBB.classList.add('ocultar');
        objetoFactura.iibb.se_calcula = false;

        fieldsetGCIAS.classList.add('ocultar');
        objetoFactura.gcias.se_calcula = false;

        fieldsetSUSS.classList.add('ocultar');
        objetoFactura.suss.se_calcula = false;

        fieldsetSELLOS.classList.add('ocultar');
        objetoFactura.sellos.se_calcula = false;

        if(objetoFactura.tipo_factura === 'fb') {
            ivaFacturaB.classList.remove('ocultar');

        } else if(objetoFactura.tipo_factura === 'fc') {
            alert('Error, no se puede calcular retención de iva a una factura c');            
        }
    } else if(tipoRetencion.value === 'gcias'){
        fieldsetGCIAS.classList.remove('ocultar');
        objetoFactura.gcias.se_calcula = true;

        fieldsetIVA.classList.add('ocultar');
        objetoFactura.iva.se_calcula = false;

        fieldsetIIBB.classList.add('ocultar');
        objetoFactura.iibb.se_calcula = false;

        fieldsetSUSS.classList.add('ocultar');
        objetoFactura.suss.se_calcula = false;

        fieldsetSELLOS.classList.add('ocultar');
        objetoFactura.sellos.se_calcula = false;

        if(objetoFactura.tipo_factura === 'fb') {
            gciasFacturaB.classList.remove('ocultar');

        } else if(objetoFactura.tipo_factura === 'fc') {
            alert('Error, no se puede calcular retención de ganancias a una factura c');            
        }
    } else if(tipoRetencion.value === 'suss'){
        
        fieldsetSUSS.classList.remove('ocultar');
        objetoFactura.suss.se_calcula = true;

        fieldsetIVA.classList.add('ocultar');
        objetoFactura.iva.se_calcula = false;

        fieldsetIIBB.classList.add('ocultar');
        objetoFactura.iibb.se_calcula = false;

        fieldsetGCIAS.classList.add('ocultar');
        objetoFactura.gcias.se_calcula = false;  

        fieldsetSELLOS.classList.add('ocultar');
        objetoFactura.sellos.se_calcula = false;
        
        if(objetoFactura.tipo_factura === 'fb') {
            sussFacturaB.classList.remove('ocultar');

        } else if(objetoFactura.tipo_factura === 'fc') {
            alert('Error, no se puede calcular retención de suss a una factura c');            
        }
    } else if(tipoRetencion.value === 'sellos'){
        fieldsetSELLOS.classList.remove('ocultar');
        objetoFactura.sellos.se_calcula = true;

        fieldsetSUSS.classList.add('ocultar');
        objetoFactura.suss.se_calcula = false;

        fieldsetIVA.classList.add('ocultar');
        objetoFactura.iva.se_calcula = false;

        fieldsetIIBB.classList.add('ocultar');
        objetoFactura.iibb.se_calcula = false;

        fieldsetGCIAS.classList.add('ocultar');
        objetoFactura.gcias.se_calcula = false;  

        sellosFactura.classList.remove('ocultar');            

    } else {
        fieldsetIIBB.classList.add('ocultar');
        objetoFactura.iibb.se_calcula = false;

        fieldsetIVA.classList.add('ocultar');
        objetoFactura.iva.se_calcula = false;

        fieldsetGCIAS.classList.add('ocultar');
        objetoFactura.gcias.se_calcula = false;

        fieldsetSUSS.classList.add('ocultar');
        objetoFactura.suss.se_calcula = false;

        fieldsetSELLOS.classList.add('ocultar');
        objetoFactura.sellos.se_calcula = false;
    }
}

function limpiar() {
    radioButtons.forEach(function (item) {
        item.disabled = false;        
    });
    radioButtons[0].checked = true;
    inputMonto.disabled = false;          
    inputMonto.value = '';

    tipoRetencion.options.item(0).selected = 'selected';
    
    fieldsetIIBB.classList.add('ocultar');
    iibbFacturaB.classList.add('ocultar');
    iibbFacturaC.classList.add('ocultar');

    fieldsetIVA.classList.add('ocultar');
    ivaFacturaB.classList.add('ocultar');

    fieldsetGCIAS.classList.add('ocultar');
    gciasFacturaB.classList.add('ocultar');

    fieldsetSUSS.classList.add('ocultar');
    sussFacturaB.classList.add('ocultar');

    fieldsetSELLOS.classList.add('ocultar');
    sellosFactura.classList.add('ocultar');    

    const divResultadoAnterior = document.querySelector('#resultado div');
    if(divResultadoAnterior !== null) {
        divResultadoAnterior.remove();
    }

    divResultado.style.display = 'none'

    objetoFactura = {
        tipo_factura: 'fb',
        monto_factura: 0,
        iibb: {
            se_calcula: false,
            tipo_operacion: '',
            alicuotaIVA: '',
            tipo_inscripcion: '',
            monto_retencion_iibb: 0
        },
        iva: {
            se_calcula: false,
            tipo_operacion: '',        
            monto_retencion_iva: 0
        },
        gcias: {
            se_calcula: false,
            tipo_operacion: '',        
            monto_retencion_gcias: 0
        },
        suss: {
            se_calcula: false,
            tipo_operacion: '',
            alicuotaIVA: '',        
            monto_retencion_suss: 0
        },
        sellos: {
            se_calcula: false,
            tipo_operacion: '',        
            monto_retencion_sellos: 0
        }
    }
}

function bloquearCampos() {
    radioButtons.forEach(function (item) {
        item.disabled = true;
    });            
    inputMonto.disabled = true;              
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
        if(validarMonto()) {
            console.log('pasaste la validacion de monto');  
            bloquearCampos();

            if(objetoFactura.iibb.se_calcula) {
                retencionesIIBB();
                
            } else if(objetoFactura.iva.se_calcula) {
                retencionesIVA();

            } else if(objetoFactura.gcias.se_calcula) {
                retencionesGCIAS();

            } else if(objetoFactura.suss.se_calcula) {                
                retencionesSUSS();

            } else if(objetoFactura.sellos.se_calcula) {                
                retencionesSELLOS();

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

function dosDecimales(numero) {
    let numeroString = numero.toString();
    let regex = /(\d*.\d{0,2})/;
    return Number(numeroString.match(regex)[0]);
}