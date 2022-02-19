function retencionesPPLL() {
    if(objetoFactura.tipo_factura === 'Factura B') {
        guardarDatosPPLL('fb');

        const { monto_factura } = objetoFactura;
        const { ppll } = objetoFactura;
        const { tipo_operacion } = ppll;

        if(tipo_operacion === 'Servicios Comunes') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1.21, 0.02);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'Contrato Locación Obra') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1.21, 0.02);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'No inscriptos en PPLL') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1.21, 0.06);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'Excluído del Régimen') {
            imprimirResultadoIIBB(false, 'No se calcula la retención por encontrarse la operación excluída del régimen');
        }

        document.getElementById('tipo-operacion-ppll-fb').options.item(0).selected = 'selected';
        tipoRetencion.options.item(0).selected = 'selected';                 


    } else if (objetoFactura.tipo_factura === 'Factura C') {
        console.log('factura c');
        
        guardarDatosPPLL('fc');

        const { monto_factura } = objetoFactura;
        const { ppll } = objetoFactura;
        const { tipo_operacion } = ppll;

        if(tipo_operacion === 'Servicios Comunes') {
            console.log('servicios comunes');
            
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1, 0.02);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'Contrato Locación Obra') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1, 0.02);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'No inscriptos en PPLL') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1, 0.06);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'Excluído del Régimen') {
            imprimirResultadoIIBB(false, 'No se calcula la retención por encontrarse la operación excluída del régimen');
        }

        document.getElementById('tipo-operacion-ppll-fc').options.item(0).selected = 'selected';
        tipoRetencion.options.item(0).selected = 'selected';        
     
    }

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
}

function calcularRetencionesPPLL(monto,alicuota, tasa){
    let montoRetencion = Number(((monto / alicuota ) * tasa).toFixed(2));    
    
    return montoRetencion;    
}

function imprimirResultadoPPLL(tipo = true, mensaje = '') {
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
        bienesServiciosP.innerHTML = `Tipo de operación: <span>${objetoFactura.ppll.tipo_operacion}</span>`;
        nuevoDiv.appendChild(bienesServiciosP);

        const montoRetencionP = document.createElement('LI');      
        montoRetencionP.innerHTML = `Monto de la retención: <span> ${formatearNumeros(objetoFactura.ppll.monto_retencion_ppll)}</span>`;    
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

function guardarDatosPPLL(tipo_factura) {
    if(tipo_factura === 'fb') {
        const tipo_operacion = document.getElementById('tipo-operacion-ppll-fb').value;
        if(tipo_operacion === 'comunes') {
            objetoFactura.ppll.tipo_operacion = 'Servicios Comunes';
        } else if (tipo_operacion === 'contrato') {
            objetoFactura.ppll.tipo_operacion = 'Contrato Locación Obra';
        } else if(tipo_operacion === 'no-inscripto') {
            objetoFactura.ppll.tipo_operacion = 'No inscriptos en PPLL';        
        } else if(tipo_operacion === 'excluido') {
            objetoFactura.ppll.tipo_operacion = 'Excluído del Régimen';
        }
    } else if (tipo_factura === 'fc') {
        tipo_operacion = document.getElementById('tipo-operacion-ppll-fc').value;

        if(tipo_operacion === 'comunes') {
            objetoFactura.ppll.tipo_operacion = 'Servicios Comunes';
        } else if (tipo_operacion === 'contrato') {
            objetoFactura.ppll.tipo_operacion = 'Contrato Locación Obra';
        } else if(tipo_operacion === 'no-inscripto') {
            objetoFactura.ppll.tipo_operacion = 'No inscriptos en PPLL';        
        } else if(tipo_operacion === 'excluido') {
            objetoFactura.ppll.tipo_operacion = 'Excluído del Régimen';
        }
    }
}