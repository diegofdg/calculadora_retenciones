function retencionesIVA() {
    if(objetoFactura.tipo_factura === 'fb') {
        objetoFactura.iva.tipo_operacion = document.getElementById('tipo-operacion-iva-fb').value;        

        const { monto_factura } = objetoFactura;
        const { iva } = objetoFactura;
        const { tipo_operacion } = iva;

        if(tipo_operacion === 'bienes-21') {
            objetoFactura.iva.monto_retencion_iva = calcularRetencionesIVA(monto_factura, 21, 0.5, 400);
            imprimirResultadoIVA();
            
        } else if(tipo_operacion === 'bienes-105') {
            objetoFactura.iva.monto_retencion_iva = calcularRetencionesIVA(monto_factura, 10.5, 0.8, 400);
            imprimirResultadoIVA();

        } else if(tipo_operacion === 'servicios-21') {
            objetoFactura.iva.monto_retencion_iva = calcularRetencionesIVA(monto_factura, 21, 0.8, 400);
            imprimirResultadoIVA();

        } else if(tipo_operacion === 'servicios-105') {
            objetoFactura.iva.monto_retencion_iva = calcularRetencionesIVA(monto_factura, 10.5, 0.8, 400);
            imprimirResultadoIVA();
            
        } else if(tipo_operacion === 'excluido') {
            montoRetencion = 0;
            alert('Error, no se calcula la retención por encontrarse la operación excluída del régimen');
        }    

    } else if (objetoFactura.tipo_factura === 'fc') {
        alert('Error, no se calcula la retención por tratarse de una factura c');        
    }
    document.getElementById('tipo-operacion-iva-fb').options.item(0).selected = 'selected';    
    tipoRetencion.options.item(0).selected = 'selected';

}

function calcularRetencionesIVA(monto,alicuota,tasa,minimo){
    let montoRetencion = Number((monto * (alicuota / (100 + alicuota)) * tasa).toFixed(2));

    if(montoRetencion > minimo){
        return montoRetencion;
    } else {
        return montoRetencion = 0;
    }
}

function imprimirResultadoIVA() {
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
    bienesServiciosP.innerHTML = `<span>${objetoFactura.iva.tipo_operacion}</span>`;    
    nuevoDiv.appendChild(bienesServiciosP);

    const montoRetencionP = document.createElement('P');      
    montoRetencionP.innerHTML = `<span>${objetoFactura.iva.monto_retencion_iva}</span>`;    
    nuevoDiv.appendChild(montoRetencionP);
    
    divResultado.appendChild(nuevoDiv);
}