function retencionesPPLL() {
    if(objetoFactura.tipo_factura === 'fb') {
        objetoFactura.iibb.tipo_operacion = document.getElementById('tipo-operacion-ppll-fb').value;
        const { monto_factura } = objetoFactura;
        const { ppll } = objetoFactura;
        const { tipo_operacion } = ppll;

        if(tipo_operacion === 'comunes') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1.21, 0.02);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'contrato') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1.21, 0.02);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'no-inscripto') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1.21, 0.06);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'excluido') {
            alert('Error, no se calcula la retención por encontrarse la operación excluída del régimen');
        }

        document.getElementById('tipo-operacion-ppll-fb').options.item(0).selected = 'selected';
        tipoRetencion.options.item(0).selected = 'selected';                 


    } else if (objetoFactura.tipo_factura === 'fc') {
        objetoFactura.iibb.tipo_operacion = document.getElementById('tipo-operacion-ppll-fc').value;
        const { monto_factura } = objetoFactura;
        const { ppll } = objetoFactura;
        const { tipo_operacion } = ppll;

        if(tipo_operacion === 'comunes') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1, 0.02);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'contrato') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1, 0.02);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'no-inscripto') {
            objetoFactura.ppll.monto_retencion_ppll = calcularRetencionesPPLL(monto_factura, 1, 0.06);
            imprimirResultadoPPLL();    
        } else if(tipo_operacion === 'excluido') {
            alert('Error, no se calcula la retención por encontrarse la operación excluída del régimen');
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

function imprimirResultadoPPLL() {
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
    bienesServiciosP.innerHTML = `<span>${objetoFactura.sellos.tipo_operacion}</span>`;    
    nuevoDiv.appendChild(bienesServiciosP);

    const montoRetencionP = document.createElement('P');      
    montoRetencionP.innerHTML = `<span>${objetoFactura.sellos.monto_retencion_sellos}</span>`;    
    nuevoDiv.appendChild(montoRetencionP);
    
    divResultado.appendChild(nuevoDiv);
}