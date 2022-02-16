function retencionesIIBB() {
    if(objetoFactura.tipo_factura === 'Factura B') {
        objetoFactura.iibb.tipo_operacion = document.getElementById('tipo-operacion-iibb-fb').value;
        objetoFactura.iibb.alicuotaIVA = document.getElementById('alicuota-iva').value;
        objetoFactura.iibb.tipo_inscripcion = document.getElementById('inscripcion-iibb').value;        

        const { monto_factura } = objetoFactura;
        const { iibb } = objetoFactura;
        const { tipo_operacion, tipo_inscripcion, alicuotaIVA } = iibb;

        if(tipo_operacion === 'bienes') {
            if(alicuotaIVA === 'general') {
                if(tipo_inscripcion === 'inscripto') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.21, 1, 200);
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'convenio-multilateral') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.21, 2, 100);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'no-inscripto') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.21, 1, 600);                    
                    imprimirResultadoIIBB();
                } else {
                    alert('Por favor, elige un tipo de inscripción');
                }
            } else if(alicuotaIVA === 'reducida') {
                if(tipo_inscripcion === 'inscripto') {                    
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.105, 1, 200);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'convenio-multilateral') {                    
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.105, 2, 100);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'no-inscripto') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.105, 1, 600);                    
                    imprimirResultadoIIBB();
                }
            } else {
                alert('Por favor, elige la alícuota de iva de la operación');
            }
        } else if(tipo_operacion === 'servicios') {
            if(alicuotaIVA === 'general') {
                if(tipo_inscripcion === 'inscripto') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1.21, 1, 300);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'convenio-multilateral') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1.21, 2, 150);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'no-inscripto') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.21, 1, 600);                    
                    imprimirResultadoIIBB();
                }
            } else {
                alert('Error, no existe la combinación "servicios" con "alícuota reducida de iva"');
            }
        } else if(tipo_operacion === 'excluido') {
            montoRetencion = 0;
            alert('Error, no se calcula la retención por encontrarse la operación excluída del régimen');
        } else {
            alert('Por favor, elige una operación');
        }

        
        document.getElementById('tipo-operacion-iibb-fb').options.item(0).selected = 'selected';
    
        document.getElementById('alicuota-iva').options.item(0).selected = 'selected';
        document.getElementById('inscripcion-iibb').options.item(0).selected = 'selected';
        tipoRetencion.options.item(0).selected = 'selected';

    } else if (objetoFactura.tipo_factura === 'Factura C') {
        objetoFactura.iibb.tipo_operacion = document.getElementById('tipo-operacion-iibb-fc').value;
        
        const { monto_factura } = objetoFactura;
        const { iibb } = objetoFactura;
        const { tipo_operacion } = iibb;
        
        if(tipo_operacion === 'bienes') {
            objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1, 1, 200);                    
            imprimirResultadoIIBB();
            
        } else if(tipo_operacion === 'servicios-comunes') {
            objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1, 1, 300);                    
            imprimirResultadoIIBB();
            
        } else if (tipo_operacion === 'contratos') {
            objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1, 1, 450);                                
            imprimirResultadoIIBB();
            
        } else if(tipo_operacion === 'no-inscripto') {
            objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1, 1, 900);                                
            montoRetencion = Number((montoFactura * 0.06).toFixed(2));
            imprimirResultadoIIBB();
            
        } else if(tipo_operacion === 'excluido') {
            alert('Error, no se retiene, está excluido del régimen');            
            montoRetencion = 0;
        }
        document.getElementById('tipo-operacion-iibb-fc').options.item(0).selected = 'selected';
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
}

function calcularRetencionesIIBB(monto,tipo,alicuota,inscripcion,minimo){
    let montoRetencion = Number((((monto / alicuota) * tipo) / inscripcion).toFixed(2));
    if(montoRetencion > minimo){
        return montoRetencion;
    } else {
        return montoRetencion = 0;
    }
}

function imprimirResultadoIIBB2() {
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
    bienesServiciosP.innerHTML = `<span>${objetoFactura.iibb.tipo_operacion}</span>`;    
    nuevoDiv.appendChild(bienesServiciosP);

    const alicuotaIVAP = document.createElement('P');      
    alicuotaIVAP.innerHTML = `<span>${objetoFactura.iibb.alicuotaIVA}</span>`;    
    nuevoDiv.appendChild(alicuotaIVAP);

    const inscripcionIIBBp = document.createElement('P');      
    inscripcionIIBBp.innerHTML = `<span>${objetoFactura.iibb.tipo_inscripcion}</span>`;    
    nuevoDiv.appendChild(inscripcionIIBBp);

    const montoRetencionP = document.createElement('P');      
    montoRetencionP.innerHTML = `<span>${objetoFactura.iibb.monto_retencion_iibb}</span>`;    
    nuevoDiv.appendChild(montoRetencionP);
    
    divResultado.appendChild(nuevoDiv);
}

function imprimirResultadoIIBB() {
    const divResultadoAnterior = document.querySelector('.contenido-modal');
    if(divResultadoAnterior !== null) {
        divResultadoAnterior.remove();
    }

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
    bienesServiciosP.innerHTML = `Tipo de operación: <span>${objetoFactura.iibb.tipo_operacion}</span>`;    
    nuevoDiv.appendChild(bienesServiciosP);

    if(objetoFactura.tipo_factura === 'Factura B') {
        const alicuotaIVAP = document.createElement('LI');      
        alicuotaIVAP.innerHTML = `Alícuota de IVA: <span>${objetoFactura.iibb.alicuotaIVA}</span>`;    
        nuevoDiv.appendChild(alicuotaIVAP);
    
        const inscripcionIIBBp = document.createElement('LI');      
        inscripcionIIBBp.innerHTML = `Tipo de Inscripción: <span>${objetoFactura.iibb.tipo_inscripcion}</span>`;    
        nuevoDiv.appendChild(inscripcionIIBBp);
    }

    const montoRetencionP = document.createElement('LI');      
    montoRetencionP.innerHTML = `Monto de la retención: <span> ${formatearNumeros(objetoFactura.iibb.monto_retencion_iibb)}</span>`;    
    nuevoDiv.appendChild(montoRetencionP);
    
    modalResultado.appendChild(nuevoDiv);

    /* const modalId = this.dataset.open; */
    document.getElementById('modal_container').classList.add('show');
    

}