const inputFactura = document.querySelectorAll('select[name="factura"]');
const inputMonto = document.getElementById('monto-factura');
const inputRetencion = document.querySelectorAll('select[name="retencion"]');

const tipoRetencion = document.getElementById('retencion');
const tipoFactura = document.getElementById('factura');

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

const fieldsetPPLL = document.getElementById('fieldset-ppll');
const ppllFacturaB = document.getElementById('ppll-factura-b');
const ppllFacturaC = document.getElementById('ppll-factura-c');

const btnCalcular = document.getElementById('calcular');
const btnLimpiar = document.getElementById('limpiar');
const divResultado = document.getElementById('resultado');

const modal_container = document.getElementById('modal_container');
const btnCerrarModal = document.getElementById('close');

let objetoFactura = {
    tipo_factura: '',
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
    },
    ppll: {
        se_calcula: false,
        tipo_operacion: '',
        monto_retencion_ppll: 0
    }
}

iniciarApp();

function iniciarApp() {    
    inputFactura.forEach(function (item) {
        item.addEventListener('change', clickFactura)});

    inputRetencion.forEach(function (item) {
        item.addEventListener('change', clickRetencion)});

    btnCalcular.addEventListener('click', calcularRetenciones);

    btnLimpiar.addEventListener('click', limpiar);

    btnCerrarModal.addEventListener('click', () => {
        modal_container.classList.remove('show');
    });

    document.addEventListener('click', e => {  
        if (e.target == document.querySelector('.modal-container.show')) {
            modal_container.classList.remove('show');
        }
    });
    
    document.addEventListener('keyup', e => {
        if (e.key == 'Escape' && document.querySelector('.modal-container.show')) {
            modal_container.classList.remove('show');
        }
    });
}

function clickFactura(){
    if(tipoFactura.value === 'fb') {
        objetoFactura.tipo_factura = 'Factura B';
    } else if (tipoFactura.value === 'fc') {
        objetoFactura.tipo_factura = 'Factura C';
    }
}

function clickRetencion() {    
    if(validarTipoFactura()) {
        if(validarMonto()) {
            switch(tipoRetencion.value) {        
                case 'iibb':
                    mostrarIIBB();
                    break;
    
                case 'iva':
                    mostrarIVA();
                    break;
    
                case 'gcias':
                    mostrarGCIAS();
                    break;
    
                case 'sellos':
                    mostrarSELLOS();
                    break;
    
                case 'suss':
                    mostrarSUSS();
                    break;
    
                case 'ppll':
                    mostrarPPLL();
                    break;
    
                default:
                    alert('Por favor, elige una retención para calcular');
            }
        } else {
            tipoRetencion.options.item(0).selected = 'selected';
        }
    } else {
        tipoRetencion.options.item(0).selected = 'selected';
    }
}

function mostrarIIBB() {
    fieldsetIIBB.classList.remove('ocultar');
    objetoFactura.iibb.se_calcula = true;

    fieldsetIVA.classList.add('ocultar');
    objetoFactura.iva.se_calcula = false;

    fieldsetGCIAS.classList.add('ocultar');
    objetoFactura.gcias.se_calcula = false;

    fieldsetSELLOS.classList.add('ocultar');
    objetoFactura.sellos.se_calcula = false;

    fieldsetSUSS.classList.add('ocultar');
    objetoFactura.suss.se_calcula = false;

    fieldsetPPLL.classList.add('ocultar');
    objetoFactura.ppll.se_calcula = false;

    if(objetoFactura.tipo_factura === 'Factura B') {
        iibbFacturaB.classList.remove('ocultar');
        iibbFacturaC.classList.add('ocultar');

    } else if(objetoFactura.tipo_factura === 'Factura C') {
        iibbFacturaB.classList.add('ocultar');
        iibbFacturaC.classList.remove('ocultar');
    }
    bloquearCampos();

}

function mostrarIVA() {
    fieldsetIVA.classList.remove('ocultar');
    objetoFactura.iva.se_calcula = true;

    fieldsetIIBB.classList.add('ocultar');
    objetoFactura.iibb.se_calcula = false;

    fieldsetGCIAS.classList.add('ocultar');
    objetoFactura.gcias.se_calcula = false;

    fieldsetSELLOS.classList.add('ocultar');
    objetoFactura.sellos.se_calcula = false;

    fieldsetSUSS.classList.add('ocultar');
    objetoFactura.suss.se_calcula = false;

    fieldsetPPLL.classList.add('ocultar');
    objetoFactura.ppll.se_calcula = false;

    if(objetoFactura.tipo_factura === 'Factura B') {
        ivaFacturaB.classList.remove('ocultar');

    } else if(objetoFactura.tipo_factura === 'Factura C') {
        tipoRetencion.options.item(0).selected = 'selected';
        fieldsetIVA.classList.add('ocultar');
        objetoFactura.iva.se_calcula = false;
        alert('Error: no se puede calcular retención de IVA a una Factura C');
    }
    bloquearCampos();
}

function mostrarGCIAS() {
    fieldsetGCIAS.classList.remove('ocultar');
    objetoFactura.gcias.se_calcula = true;
    
    fieldsetIIBB.classList.add('ocultar');
    objetoFactura.iibb.se_calcula = false;

    fieldsetIVA.classList.add('ocultar');
    objetoFactura.iva.se_calcula = false;

    fieldsetSELLOS.classList.add('ocultar');
    objetoFactura.sellos.se_calcula = false;

    fieldsetSUSS.classList.add('ocultar');
    objetoFactura.suss.se_calcula = false;

    fieldsetPPLL.classList.add('ocultar');
    objetoFactura.ppll.se_calcula = false;

    if(objetoFactura.tipo_factura === 'Factura B') {
        gciasFacturaB.classList.remove('ocultar');

    } else if(objetoFactura.tipo_factura === 'Factura C') {
        tipoRetencion.options.item(0).selected = 'selected';
        fieldsetGCIAS.classList.add('ocultar');
        objetoFactura.gcias.se_calcula = false;
        alert('Error: no se puede calcular retención de Ganancias a una Factura C');
    }
    bloquearCampos();
}

function mostrarSELLOS() {    
    fieldsetSELLOS.classList.remove('ocultar');
    objetoFactura.sellos.se_calcula = true;

    fieldsetIIBB.classList.add('ocultar');
    objetoFactura.iibb.se_calcula = false;
    
    fieldsetIVA.classList.add('ocultar');
    objetoFactura.iva.se_calcula = false;

    fieldsetGCIAS.classList.add('ocultar');
    objetoFactura.gcias.se_calcula = false;

    fieldsetSUSS.classList.add('ocultar');
    objetoFactura.suss.se_calcula = false;

    fieldsetPPLL.classList.add('ocultar');
    objetoFactura.ppll.se_calcula = false;
    
    sellosFactura.classList.remove('ocultar');
    bloquearCampos();
}

function mostrarSUSS() {    
    fieldsetSUSS.classList.remove('ocultar');
    objetoFactura.suss.se_calcula = true;
        
    fieldsetIIBB.classList.add('ocultar');
    objetoFactura.iibb.se_calcula = false;

    fieldsetIVA.classList.add('ocultar');
    objetoFactura.iva.se_calcula = false;

    fieldsetGCIAS.classList.add('ocultar');
    objetoFactura.gcias.se_calcula = false;

    fieldsetSELLOS.classList.add('ocultar');
    objetoFactura.sellos.se_calcula = false;

    fieldsetPPLL.classList.add('ocultar');
    objetoFactura.ppll.se_calcula = false;

    if(objetoFactura.tipo_factura === 'Factura B') {
        sussFacturaB.classList.remove('ocultar');

    } else if(objetoFactura.tipo_factura === 'Factura C') {
        tipoRetencion.options.item(0).selected = 'selected';
        fieldsetSUSS.classList.add('ocultar');
        objetoFactura.suss.se_calcula = false;
        alert('Error: no se puede calcular retención de SUSS a una Factura C');
    }
    bloquearCampos();
}

function mostrarPPLL() {
    fieldsetPPLL.classList.remove('ocultar');
    objetoFactura.ppll.se_calcula = true;

    fieldsetIIBB.classList.add('ocultar');
    objetoFactura.iibb.se_calcula = false;

    fieldsetIVA.classList.add('ocultar');
    objetoFactura.iva.se_calcula = false;

    fieldsetGCIAS.classList.add('ocultar');
    objetoFactura.gcias.se_calcula = false;

    fieldsetSELLOS.classList.add('ocultar');
    objetoFactura.sellos.se_calcula = false;

    fieldsetSUSS.classList.add('ocultar');
    objetoFactura.suss.se_calcula = false;

    if(objetoFactura.tipo_factura === 'Factura B') {
        ppllFacturaB.classList.remove('ocultar');
        ppllFacturaC.classList.add('ocultar');

    } else if(objetoFactura.tipo_factura === 'Factura C') {
        ppllFacturaB.classList.add('ocultar');
        ppllFacturaC.classList.remove('ocultar');
    }
    bloquearCampos();
}

function limpiar() {    
    inputMonto.disabled = false;          
    inputMonto.value = '';
    tipoFactura.removeAttribute('disabled');

    tipoFactura.options.item(0).selected = 'selected';
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
    
    fieldsetPPLL.classList.add('ocultar');
    ppllFacturaB.classList.add('ocultar');
    ppllFacturaC.classList.add('ocultar');

    const divResultadoAnterior = document.querySelector('#resultado div');
    if(divResultadoAnterior !== null) {
        divResultadoAnterior.remove();
    }

    divResultado.style.display = 'none'

    objetoFactura = {
        tipo_factura: '',
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
        },
        ppll: {
            se_calcula: false,
            tipo_operacion: '',        
            monto_retencion_ppll: 0
        }
    }
}

function bloquearCampos() {
    tipoFactura.setAttribute('disabled', 'true');
    inputMonto.disabled = true;              
}

function calcularRetenciones() {
    if(validarTipoFactura()) {        
        if(validarMonto()) {
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

            } else if(objetoFactura.ppll.se_calcula) {                
                retencionesPPLL();

            } else {
                alert('Por favor, elige una retención para calcular');
            }
        }
    }
}

function validarTipoFactura() {
    if(objetoFactura.tipo_factura === 'Factura B' || objetoFactura.tipo_factura === 'Factura C') {
        return true;
    } else {
        alert('Por favor, elige un tipo de Factura');
        return false;
    }
}

function validarMonto() {
    montoFactura = inputMonto.value;    

    if( montoFactura === '' || montoFactura === null || isNaN(montoFactura) || montoFactura <= 0 ) {        
        alert('Por favor, escribe el monto de la Factura');
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
