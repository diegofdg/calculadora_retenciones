function retencionesIIBB() {
    if(objetoFactura.tipo_factura === 'Factura B') {
        guardarDatosIIBB('fb');

        const { monto_factura } = objetoFactura;
        const { iibb } = objetoFactura;
        const { tipo_operacion, tipo_inscripcion, alicuotaIVA } = iibb;

        if(tipo_operacion === 'Compras de Bienes') {
            if(alicuotaIVA === 'Alícuota General (21%)') {
                if(tipo_inscripcion === 'Inscripto en Ingresos Brutos') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.21, 1, 200);
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'Inscripto en Convenio Multilateral') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.21, 2, 100);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'No Inscripto en Ingresos Brutos') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.21, 1, 600);                    
                    imprimirResultadoIIBB();
                } else {
                    imprimirResultadoIIBB(false, 'Por favor, elige un tipo de inscripción');
                }
            } else if(alicuotaIVA === 'Alícuota Reducida (10,5%)') {
                if(tipo_inscripcion === 'Inscripto en Ingresos Brutos') {                    
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.105, 1, 200);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'Inscripto en Convenio Multilateral') {                    
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1.105, 2, 100);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'No Inscripto en Ingresos Brutos') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.105, 1, 600);                    
                    imprimirResultadoIIBB();
                }
            } else {
                imprimirResultadoIIBB(false, 'Por favor, elige la alícuota de iva de la operación');
            }
        } else if(tipo_operacion === 'Servicios') {
            if(alicuotaIVA === 'Alícuota General (21%)') {
                if(tipo_inscripcion === 'Inscripto en Ingresos Brutos') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1.21, 1, 300);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'Inscripto en Convenio Multilateral') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1.21, 2, 150);                    
                    imprimirResultadoIIBB();
                } else if(tipo_inscripcion === 'No Inscripto en Ingresos Brutos') {
                    objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1.21, 1, 600);                    
                    imprimirResultadoIIBB();
                }
            } else {
                imprimirResultadoIIBB(false, 'No existe la combinación "servicios" con "alícuota reducida de iva"');
            }
        } else if(tipo_operacion === 'Excluído del Régimen') {
            montoRetencion = 0;
            imprimirResultadoIIBB(false, 'No se calcula la retención por encontrarse la operación excluída del régimen');
        } else {
            imprimirResultadoIIBB(false, 'Por favor, elige una operación');            
        }

        document.getElementById('tipo-operacion-iibb-fb').options.item(0).selected = 'selected';
    
        document.getElementById('alicuota-iva').options.item(0).selected = 'selected';
        document.getElementById('inscripcion-iibb').options.item(0).selected = 'selected';
        tipoRetencion.options.item(0).selected = 'selected';

    } else if (objetoFactura.tipo_factura === 'Factura C') {
        guardarDatosIIBB('fc');
                
        const { monto_factura } = objetoFactura;
        const { iibb } = objetoFactura;
        const { tipo_operacion } = iibb;
        
        if(tipo_operacion === 'Compras de Bienes') {
            objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.02, 1, 1, 200);                    
            imprimirResultadoIIBB();
            
        } else if(tipo_operacion === 'Servicios Comunes') {
            objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1, 1, 300);                    
            imprimirResultadoIIBB();
            
        } else if (tipo_operacion === 'Contrato de Locación de Obra') {
            objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.03, 1, 1, 450);                                
            imprimirResultadoIIBB();
            
        } else if(tipo_operacion === 'No Inscripto en Ingresos Brutos') {
            objetoFactura.iibb.monto_retencion_iibb = calcularRetencionesIIBB(monto_factura, 0.06, 1, 1, 900);                                
            montoRetencion = Number((montoFactura * 0.06).toFixed(2));
            imprimirResultadoIIBB();
            
        } else if(tipo_operacion === 'Excluído del Régimen') {
            imprimirResultadoIIBB(false, 'No se retiene, está excluido del régimen');            
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

function imprimirResultadoIIBB(tipo = true, mensaje = '') {
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

function guardarDatosIIBB(tipo_factura) {
    if(tipo_factura === 'fb') {
        const tipo_operacion = document.getElementById('tipo-operacion-iibb-fb').value;

        if(tipo_operacion === 'bienes') {
            objetoFactura.iibb.tipo_operacion = 'Compras de Bienes';
        } else if (tipo_operacion === 'servicios') {
            objetoFactura.iibb.tipo_operacion = 'Servicios';
        } else if(tipo_operacion === 'excluido') {
            objetoFactura.iibb.tipo_operacion = 'Excluído del Régimen';
        }
    
        const alicuotaIVA = document.getElementById('alicuota-iva').value;
        if(alicuotaIVA === 'general') {
            objetoFactura.iibb.alicuotaIVA = 'Alícuota General (21%)';
        } else if (alicuotaIVA === 'reducida') {
            objetoFactura.iibb.alicuotaIVA = 'Alícuota Reducida (10,5%)';
        }
    
        const tipo_inscripcion = document.getElementById('inscripcion-iibb').value;
        if(tipo_inscripcion === 'inscripto') {
            objetoFactura.iibb.tipo_inscripcion = 'Inscripto en Ingresos Brutos';
        } else if (tipo_inscripcion === 'convenio-multilateral') {
            objetoFactura.iibb.tipo_inscripcion = 'Inscripto en Convenio Multilateral';
        } else if (tipo_inscripcion === 'no-inscripto') {
            objetoFactura.iibb.tipo_inscripcion = 'No Inscripto en Ingresos Brutos';
        }

    } else if (tipo_factura === 'fc') {
        tipo_operacion = document.getElementById('tipo-operacion-iibb-fc').value;

        if(tipo_operacion === 'bienes') {
            objetoFactura.iibb.tipo_operacion = 'Compras de Bienes';
        } else if (tipo_operacion === 'servicios-comunes') {
            objetoFactura.iibb.tipo_operacion = 'Servicios Comunes';
        } else if(tipo_operacion === 'contratos') {
            objetoFactura.iibb.tipo_operacion = 'Contrato de Locación de Obra';
        } else if(tipo_operacion === 'no-inscripto') {
            objetoFactura.iibb.tipo_operacion = 'No Inscripto en Ingresos Brutos';
        } else if(tipo_operacion === 'excluido') {
            objetoFactura.iibb.tipo_operacion = 'Excluído del Régimen';
        }
    }
}