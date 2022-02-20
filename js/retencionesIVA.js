 function retencionesIVA() {
    if(objetoFactura.tipo_factura === 'Factura B') {        
        guardarDatosIVA();
        
        const { monto_factura } = objetoFactura;
        const { iva } = objetoFactura;
        const { tipo_operacion } = iva;

        if(tipo_operacion === 'Bienes Gravados al 21%') {
            objetoFactura.iva.monto_retencion_iva = calcularRetencionesIVA(monto_factura, 21, 0.5, 400);
            imprimirResultadoIVA();
            
        } else if(tipo_operacion === 'Bienes Gravados al 10.5%') {
            objetoFactura.iva.monto_retencion_iva = calcularRetencionesIVA(monto_factura, 10.5, 0.8, 400);
            imprimirResultadoIVA();

        } else if(tipo_operacion === 'Servicios Gravados al 21%') {
            objetoFactura.iva.monto_retencion_iva = calcularRetencionesIVA(monto_factura, 21, 0.8, 400);
            imprimirResultadoIVA();

        } else if(tipo_operacion === 'Servicios Gravados al 10.5%') {
            objetoFactura.iva.monto_retencion_iva = calcularRetencionesIVA(monto_factura, 10.5, 0.8, 400);
            imprimirResultadoIVA();
            
        } else if(tipo_operacion === 'Excluído del Régimen') {
            montoRetencion = 0;
            imprimirResultadoIVA(false, 'No se calcula la retención por encontrarse la operación excluída del régimen');
        }    

    } else if (objetoFactura.tipo_factura === 'Factura C') {
        imprimirResultadoIVA(false, 'No se calcula la retención por tratarse de una Factura C');
    }

    document.getElementById('tipo-operacion-iva-fb').options.item(0).selected = 'selected';    
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

function calcularRetencionesIVA(monto,alicuota,tasa,minimo){
    let montoRetencion = Number((monto * (alicuota / (100 + alicuota)) * tasa).toFixed(2));

    if(montoRetencion > minimo){
        return montoRetencion;
    } else {
        return montoRetencion = 0;
    }
}

function imprimirResultadoIVA(tipo = true, mensaje = '') {
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
        bienesServiciosP.innerHTML = `Tipo de operación: <span>${objetoFactura.iva.tipo_operacion}</span>`;    
        nuevoDiv.appendChild(bienesServiciosP);

        const montoRetencionP = document.createElement('LI');      
        montoRetencionP.innerHTML = `Monto de la retención: <span> ${formatearNumeros(objetoFactura.iva.monto_retencion_iva)}</span>`;
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

function guardarDatosIVA() {
    const tipo_operacion = document.getElementById('tipo-operacion-iva-fb').value;

    if(tipo_operacion === 'bienes-21') {
        objetoFactura.iva.tipo_operacion = 'Bienes Gravados al 21%';
    } else if (tipo_operacion === 'bienes-105') {
        objetoFactura.iva.tipo_operacion = 'Bienes Gravados al 10.5%';
    } else if(tipo_operacion === 'servicios-21') {
        objetoFactura.iva.tipo_operacion = 'Servicios Gravados al 21%';
    } else if(tipo_operacion === 'servicios-105') {
        objetoFactura.iva.tipo_operacion = 'Servicios Gravados al 10.5%';
    } else if(tipo_operacion === 'excluido') {
        objetoFactura.iva.tipo_operacion = 'Excluído del Régimen';
    }
}