function retencionesSUSS() {
    if(objetoFactura.tipo_factura === 'fb') {
        objetoFactura.suss.tipo_operacion = document.getElementById('tipo-operacion-suss-fb').value;
        objetoFactura.suss.alicuotaIVA = document.getElementById('alicuota-iva2').value;

        const { monto_factura } = objetoFactura;
        const { suss } = objetoFactura;
        const { tipo_operacion, alicuotaIVA } = suss;

        if(tipo_operacion === 'empleadores') {
            if(alicuotaIVA === 'general') {                
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.21, 0.01, 400);
                imprimirResultadoSUSS();                
            } else if(alicuotaIVA === 'reducida') {
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.105, 0.01, 400);
                imprimirResultadoSUSS();                
            }
        } else if(tipo_operacion === 'limpieza') {
            if(alicuotaIVA === 'general') {                
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.21, 0.06, 0);
                imprimirResultadoSUSS();                
            } else {
                alert('Error, no existe la combinación "limpieza" con "alícuota reducida de iva"');
            }
        } else if(tipo_operacion === 'ingenieria') {
            if(alicuotaIVA === 'general') {                
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.21, 0.012, 14876.03);
                imprimirResultadoSUSS();                
            } else {
                alert('Error, no existe la combinación "ingenieria" con "alícuota reducida de iva"');
            }
        } else if(tipo_operacion === 'arquitectura') {
            if(alicuotaIVA === 'general') {                
                objetoFactura.suss.monto_retencion_suss = calcularRetencionesSUSS(monto_factura, 0.21, 0.025, 30991.74);
                imprimirResultadoSUSS();                
            } else {
                alert('Error, no existe la combinación "arquitectura" con "alícuota reducida de iva"');
            }
        } else if(tipo_operacion === 'excluido') {
            montoRetencion = 0;
            alert('Error, no se calcula la retención por encontrarse la operación excluída del régimen');
        }
        
        document.getElementById('tipo-operacion-suss-fb').options.item(0).selected = 'selected';
    
        document.getElementById('alicuota-iva2').options.item(0).selected = 'selected';        
        tipoRetencion.options.item(0).selected = 'selected';

    } else if (objetoFactura.tipo_factura === 'fc') {
        alert('Error, no se calcula la retención por tratarse de una factura c');
        
    }
    document.getElementById('tipo-operacion-suss-fb').options.item(0).selected = 'selected';    
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

function imprimirResultadoSUSS() {
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
    bienesServiciosP.innerHTML = `<span>${objetoFactura.suss.tipo_operacion}</span>`;    
    nuevoDiv.appendChild(bienesServiciosP);

    const alicuotaIVAP = document.createElement('P');      
    alicuotaIVAP.innerHTML = `<span>${objetoFactura.suss.alicuotaIVA}</span>`;    
    nuevoDiv.appendChild(alicuotaIVAP);

    const montoRetencionP = document.createElement('P');      
    montoRetencionP.innerHTML = `<span>${objetoFactura.suss.monto_retencion_suss}</span>`;    
    nuevoDiv.appendChild(montoRetencionP);
    
    divResultado.appendChild(nuevoDiv);
}