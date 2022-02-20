function retencionesSELLOS() { 
    guardarDatosSellos();    

    const { monto_factura } = objetoFactura;
    const { sellos } = objetoFactura;
    const { tipo_operacion } = sellos;

    if(tipo_operacion === 'Gravada') {
        objetoFactura.sellos.monto_retencion_sellos = calcularRetencionesSELLOS(monto_factura, 0.005);
        imprimirResultadoSellos();    
    } else if(tipo_operacion === 'Excluído del Régimen') {
        montoRetencion = 0;
            imprimirResultadoSellos(false, 'No se calcula la retención por encontrarse la operación excluída del régimen');
    }                   
            
    document.getElementById('tipo-operacion-sellos').options.item(0).selected = 'selected';    
    tipoRetencion.options.item(0).selected = 'selected';    
    
    fieldsetIIBB.classList.add('ocultar');
    iibbFacturaB.classList.add('ocultar');
    iibbFacturaC.classList.add('ocultar');

    fieldsetIVA.classList.add('ocultar');
    ivaFacturaB.classList.add('ocultar');

    fieldsetGCIAS.classList.add('ocultar');
    gciasFacturaB.classList.add('ocultar');
    
    fieldsetSELLOS.classList.add('ocultar');
    sellosFactura.classList.add('ocultar');        

    fieldsetSUSS.classList.add('ocultar');
    sussFacturaB.classList.add('ocultar');

    fieldsetPPLL.classList.add('ocultar');
    ppllFacturaB.classList.add('ocultar');
    ppllFacturaC.classList.add('ocultar');
}

function calcularRetencionesSELLOS(monto,tasa){
    let montoRetencion = Number((monto * tasa).toFixed(2));    
    
    return montoRetencion;    
}

function imprimirResultadoSellos(tipo = true, mensaje = '') {
    if(tipo === true) {
        const divResultadoAnterior = document.querySelector('.contenido-modal');
        if(divResultadoAnterior !== null) {
            divResultadoAnterior.remove();
        }

        const tituloModal = document.getElementById('titulo-modal');
        tituloModal.innerHTML = 'Resultado:'

        const modalResultado = document.getElementById('resultado-modal');

        const nuevoDiv = document.createElement('DIV'); 
        nuevoDiv.classList.add('contenido-modal');

        const tipoDeFacturaP = document.createElement('LI');      
        tipoDeFacturaP.innerHTML = `Tipo de Comprobante: <span>${objetoFactura.tipo_factura}</span>`;
        nuevoDiv.appendChild(tipoDeFacturaP);

        const montoFacturaP = document.createElement('LI');      
        montoFacturaP.innerHTML = `Monto de la Factura: <span> ${formatearNumeros(objetoFactura.monto_factura)}</span>`;    
        nuevoDiv.appendChild(montoFacturaP);

        const bienesServiciosP = document.createElement('LI');      
        bienesServiciosP.innerHTML = `Tipo de operación: <span>${objetoFactura.sellos.tipo_operacion}</span>`;    
        nuevoDiv.appendChild(bienesServiciosP);

        const montoRetencionP = document.createElement('LI');      
        montoRetencionP.innerHTML = `Monto de la retención: <span> ${formatearNumeros(objetoFactura.sellos.monto_retencion_sellos)}</span>`;    
        nuevoDiv.appendChild(montoRetencionP);

        modalResultado.appendChild(nuevoDiv);

        document.getElementById('modal_container').classList.add('show');

    } else if (tipo === false) {
        const divResultadoAnterior = document.querySelector('.contenido-modal');
        if(divResultadoAnterior !== null) {
            divResultadoAnterior.remove();
        }

        const tituloModal = document.getElementById('titulo-modal');
        tituloModal.innerHTML = 'Error:'

        const modalResultado = document.getElementById('resultado-modal');

        const nuevoDiv = document.createElement('DIV'); 
        nuevoDiv.classList.add('contenido-modal');

        const mensajeError = document.createElement('P');
        mensajeError.classList.add('mensaje-error');
        mensajeError.innerHTML = mensaje;

        nuevoDiv.appendChild(mensajeError);

        modalResultado.appendChild(nuevoDiv);

        document.getElementById('modal_container').classList.add('show');
    }
}

function guardarDatosSellos() {
    const tipo_operacion = document.getElementById('tipo-operacion-sellos').value;
    if(tipo_operacion === 'gravada') {
        objetoFactura.sellos.tipo_operacion = 'Gravada';
    } else if(tipo_operacion === 'excluido') {
        objetoFactura.sellos.tipo_operacion = 'Excluído del Régimen';
    }
}