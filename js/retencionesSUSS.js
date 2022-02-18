function retencionesSUSS() {
    if(objetoFactura.tipo_factura === 'Factura B') {

        guardarDatosSUSS();

        const { monto_factura } = objetoFactura;
        const { suss } = objetoFactura;
        const { tipo_operacion, alicuotaIVA } = suss;

        if(tipo_operacion === 'Empleadores') {
            if(alicuotaIVA === 'Alícuota General (21%)') {                
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.21, 0.01, 400);
                imprimirResultadoSUSS();                
            } else if(alicuotaIVA === 'Alícuota Reducida (10,5%)') {
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.105, 0.01, 400);
                imprimirResultadoSUSS();                
            }
        } else if(tipo_operacion === 'Servicios de Limpieza') {
            if(alicuotaIVA === 'Alícuota General (21%)') {                
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.21, 0.06, 0);
                imprimirResultadoSUSS();                
            } else {
                imprimirResultadoSUSS(false, 'No existe la combinación "Servicios de Limpieza" con "Alícuota Reducida de IVA"');
            }
        } else if(tipo_operacion === 'Empresas Constructoras - Ingenieria') {
            if(alicuotaIVA === 'Alícuota General (21%)') {                
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.21, 0.012, 14876.03);
                imprimirResultadoSUSS();
            } else {
                imprimirResultadoSUSS(false, 'No existe la combinación "Empresas Constructoras - Ingenieria" con "Alícuota Reducida de IVA"');
            }
        } else if(tipo_operacion === 'Empresas Constructoras - Arquitectura') {
            if(alicuotaIVA === 'Alícuota General (21%)') {                
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.21, 0.025, 30991.74);
                imprimirResultadoSUSS();                
            } else {
                imprimirResultadoSUSS(false, 'No existe la combinación "Empresas Constructoras - Arquitectura" con "Alícuota Reducida de IVA"');
            }
        } else if(tipo_operacion === 'Excluído del Régimen') {
            montoRetencion = 0;
            imprimirResultadoSUSS(false, 'No se calcula la retención por encontrarse la operación excluída del régimen');
        }
        
    } else if (objetoFactura.tipo_factura === 'fc') {
        imprimirResultadoSUSS(false, 'No se calcula la retención por tratarse de una Factura C');
        
    }
    document.getElementById('tipo-operacion-suss-fb').options.item(0).selected = 'selected';
    document.getElementById('alicuota-iva2').options.item(0).selected = 'selected';
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

function calcularRetencionesSUSS(monto,alicuota,tasa,minimo){    
    let montoRetencion = Number((( monto / ( 1 + alicuota )) * tasa).toFixed(2));
    
    if(montoRetencion > minimo){
        return montoRetencion;
    } else {
        return montoRetencion = 0;
    }
}

function imprimirResultadoSUSS(tipo = true, mensaje = '') {
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
        bienesServiciosP.innerHTML = `Tipo de operación: <span>${objetoFactura.suss.tipo_operacion}</span>`;    
        nuevoDiv.appendChild(bienesServiciosP);

        const alicuotaIVAP = document.createElement('LI');      
        alicuotaIVAP.innerHTML = `Alícuota de IVA: <span>${objetoFactura.suss.alicuotaIVA}</span>`;    
        nuevoDiv.appendChild(alicuotaIVAP);

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

function guardarDatosSUSS() {
    const tipo_operacion = document.getElementById('tipo-operacion-suss-fb').value;
    if(tipo_operacion === 'empleadores') {
        objetoFactura.suss.tipo_operacion = 'Empleadores';
    } else if (tipo_operacion === 'limpieza') {
        objetoFactura.suss.tipo_operacion = 'Servicios de Limpieza';
    } else if(tipo_operacion === 'ingenieria') {
        objetoFactura.suss.tipo_operacion = 'Empresas Constructoras - Ingenieria';
    } else if(tipo_operacion === 'arquitectura') {
        objetoFactura.suss.tipo_operacion = 'Empresas Constructoras - Arquitectura';
    } else if(tipo_operacion === 'excluido') {
        objetoFactura.suss.tipo_operacion = 'Excluído del Régimen';
    }

    const alicuotaIVA = document.getElementById('alicuota-iva2').value;
    if(alicuotaIVA === 'general') {
        objetoFactura.suss.alicuotaIVA = 'Alícuota General (21%)';
    } else if (alicuotaIVA === 'reducida') {
        objetoFactura.suss.alicuotaIVA = 'Alícuota Reducida (10,5%)';
    }
}