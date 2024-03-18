import { getProperties } from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";

import { PropertyData } from "../Data/userId.js";

export default async function apiDestCall() {
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let {data} = await getProperties(1, 10, CodigoUsuarioMaestro, 1, companyId, realtorId);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false && data.highlighted != 0 );

    filtrado = filtrado.map(item => {
      // Reemplazar "\" por "//" en la propiedad "image"
      item.image = item.image.replace(/\\/g, "//");
      return item;
    });
    /* data = data.map(item => {
      // Reemplazar "\" por "//" en la propiedad "image"
      item.image = item.image.replace(/\\/g, "//");
      return item;
    }); */

    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

    let respuesta = document.getElementById('respuesta');

    // respuesta.innerHTML = `<div>${filtrado} Propiedades encontradas
	// </div>`;
  /*   console.log('filtrado ',filtrado);
  console.log('data ',data); */
  
    document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `<li class="splide__slide">
          <div class="" data-aos="fade-up" data-aos-delay="100" >
            <div class="post-item position-relative h-100">
              <div class="post-img position-relative overflow-hidden" style="height:330px; margin: 0 15px">
                <img src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "assets/img/Sin.png"  }" class="img-fluid" alt="" style="height:100% !important;width:100%;">
                <span class="post-date">${data.operation}</span>
              </div>
              <div class="post-content d-flex flex-column">
                <h3 class="post-title">${data.title}</h3>
                <div class="meta d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <span class="ps-2">${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" } , ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna" }, Chile</span>
                  </div>
                </div>
                <div class="meta d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <span class="ps-2 precio-card"><b>UF ${clpToUf(data.price, ufValueAsNumber)}</b></span>
                  </div>
                  <span class="px-3 text-black-50">/</span>
                  <div class="d-flex align-items-center">
                    <span class="ps-2 precio-card"><b>CLP ${parseToCLPCurrency(data?.price)}</b></span>
                  </div>
                </div>

                <hr>
                <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" class="readmore stretched-link" target="_blank"><span>Ver detalle</span><i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          </li>`
        ).join("");

        
        let splide = new Splide(".splide", {
          type: "loop",
          drag :"free",
          perPage: 3,
          breakpoints: {
            1399: {
              perPage: 2,
            },
            991: {
              perPage: 1,
            }
          }
      });
      splide.mount();   
}
document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	// let splideList = new Splide(".splide");
	// splideList.mount();
	splide.mount();
});