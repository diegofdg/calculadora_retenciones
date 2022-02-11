function retencionesGCIAS() {
    if(objetoFactura.tipo_factura === 'fb') {
        objetoFactura.gcias.tipo_operacion = document.getElementById('tipo-operacion-gcias-fb').value;        

        const { monto_factura } = objetoFactura;
        const { gcias } = objetoFactura;
        const { tipo_operacion } = gcias;

        if(tipo_operacion === 'bienes-21') {
            objetoFactura.gcias.monto_retencion_gcias = calcularRetencionesGCIAS(monto_factura, 0.21, 100000, 0.02, 90);
            imprimirResultadoGCIAS();
            
        } else if(tipo_operacion === 'bienes-105') {
            objetoFactura.gcias.monto_retencion_gcias = calcularRetencionesGCIAS(monto_factura, 0.105, 100000, 0.02, 90);
            imprimirResultadoGCIAS();

        } else if(tipo_operacion === 'servicios-21') {
            objetoFactura.gcias.monto_retencion_gcias = calcularRetencionesGCIAS(monto_factura, 0.21, 30000, 0.02, 90);
            imprimirResultadoGCIAS();

        } else if(tipo_operacion === 'servicios-105') {
            objetoFactura.gcias.monto_retencion_gcias = calcularRetencionesGCIAS(monto_factura, 0.105, 30000, 0.02, 90);
            imprimirResultadoGCIAS();
            
        } else if(tipo_operacion === 'excluido') {
            montoRetencion = 0;
            alert('Error, no se calcula la retención por encontrarse la operación excluída del régimen');
        }    

    } else if (objetoFactura.tipo_factura === 'fc') {
        alert('Error, no se calcula la retención por tratarse de una factura c');        
    }
    document.getElementById('tipo-operacion-gcias-fb').options.item(0).selected = 'selected';    
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

function calcularRetencionesGCIAS(monto,alicuota,mni,tasa,minimo){    
    let montoRetencion = Number(((( monto / ( 1 + alicuota )) - mni ) * tasa).toFixed(2));
    
    if(montoRetencion > minimo){
        return montoRetencion;
    } else {
        return montoRetencion = 0;
    }
}

function imprimirResultadoGCIAS() {
    const divResultadoAnterior = document.querySelector('#resultado div');
    if(divResultadoAnterior !== null) {
        divResultadoAnterior.remove();
    }

    divResultado.style.display = 'block';

    const nuevoDiv = document.createElement('DIV');    
    
    const tipoDeFacturaP = document.createElement('P');      
    tipoDeFacturaP.textContent = `Tipo de Factura: ${objetoFactura.tipo_factura}`;
    nuevoDiv.appendChild(tipoDeFacturaP);

    const montoFacturaP = document.createElement('P');      
    montoFacturaP.innerHTML = `Monto de la Factura: <span>${objetoFactura.monto_factura}</span>`;    
    nuevoDiv.appendChild(montoFacturaP);

    const bienesServiciosP = document.createElement('P');      
    bienesServiciosP.innerHTML = `<span>${objetoFactura.gcias.tipo_operacion}</span>`;    
    nuevoDiv.appendChild(bienesServiciosP);

    const montoRetencionP = document.createElement('P');      
    montoRetencionP.innerHTML = `<span>${objetoFactura.gcias.monto_retencion_gcias}</span>`;    
    nuevoDiv.appendChild(montoRetencionP);
    
    divResultado.appendChild(nuevoDiv);
}