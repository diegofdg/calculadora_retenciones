function retencionesSELLOS() {    
    objetoFactura.sellos.tipo_operacion = document.getElementById('tipo-operacion-sellos').value;        

    const { monto_factura } = objetoFactura;
    const { sellos } = objetoFactura;
    const { tipo_operacion } = sellos;

    if(tipo_operacion === 'gravada') {
        objetoFactura.sellos.monto_retencion_sellos = calcularRetencionesSELLOS(monto_factura, 0.005);
        imprimirResultadoSELLOS();    
    } else if(tipo_operacion === 'excluido') {
        alert('Error, no se calcula la retención por encontrarse la operación excluída del régimen');
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

function imprimirResultadoSELLOS() {
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