import { getPropertiesForId } from "../services/PropertiesServices.js";
// import { clpToUf } from "../utils/getExchangeRate.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf, validationUF, validationCLP, ufToClp} from "../utils/getExchangeRate.js"

export default async function apiDetalleCall(id, realtorId, statusId, companyId){
    let {data} = await getPropertiesForId(id, realtorId, statusId, companyId );

const response = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

let indicadores;

//! transformar valor del uf a int
const cleanedValue = ufValue.replace(/\./g, '').replace(',', '.');
const ufValueAsInt = parseFloat(cleanedValue).toFixed(0);
//!--

let imagenes;

let splide = new Splide( '.splide' );
let bar    = splide.root.querySelector( '.my-slider-progress-bar' );

let updatedImages = data.images.map(function (image) {
    return image.replace(/\\/g, "//");
});


function validateImg(image){
    if(image){
    if(image.endsWith('.jpg') || image.endsWith('.JPG') || image.endsWith('.png')|| image.endsWith('.PNG') || image.endsWith('.jpeg') || image.endsWith('.JPEG')){
            return `<img src="${image}" style="height: 600px; width: 100%; object-fit:scale-down" />`
        }
        return `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' loading="lazy" alt="Image" class="img-fluid" style="height:100% !important;width:100%;background-position: center center;background-repeat: no-repeat;object-fit:scale-down">`;
    }else
    {
        return `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' loading="lazy" alt="Image" class="img-fluid" style="height:100% !important;width:100%;background-position: center center;background-repeat: no-repeat;object-fit:scale-down">`;
    }
}

const lineas = data?.description.split('\n');
const lineasIniciales = 5;
const lineaVisibles = lineas ? lineas : lineasIniciales;

// console.log(lineaVisibles)


//! Imagenes en splide */
let img = '';
updatedImages.forEach((image, index) => {
    img += `
        <li class="splide__slide ${index === 0 ? 'active' : ''}">
            ${validateImg(image)}
        </li>
    `;
});
document.getElementById('carrucel-img').innerHTML = img;

splide = new Splide('.splide', {
    type: 'fade',
    padding: '5rem',
    rewind: true,
    autoplay: 'play',
});

splide.on( 'mounted move', function () {
    let end  = splide.Components.Controller.getEnd() + 1;
    let rate = Math.min( ( splide.index + 1 ) / end, 1 );
    bar.style.width = String( 100 * rate ) + '%';
} );


splide.mount();



document.getElementById('title-dire-prop').innerHTML =
    `<h2 class="title">${data?.title}</h2>
    <h5 style="color: rgb(156, 156, 156);">${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"},Chile</h5>
    <h5 class="" style="color: rgb(156, 156, 156);">cod: ${data.id}</h5>
    `

	document.getElementById('price-prop').innerHTML= `
    <h2 class="title" style="font-size: 43px;">UF  ${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)}</h2>
    <h5 style="color: rgb(156, 156, 156);">CLP ${validationCLP(data.currency.isoCode) ? parseToCLPCurrency(data?.price): parseToCLPCurrency(ufToClp(data.price, ufValueAsInt))}</h5>
    `

	document.getElementById('caract-prop').innerHTML = `
                    <h3 class="sidebar-title">Caracteristicas</h3>
                    <ul class="mt-3">
                        <li><a style="font-size: 20px;">Tipo de operación: <span style="font-size: 16px;"> <b>${data?.operation}</b></span></a></li>
                        <li><a style="font-size: 20px;">Tipo de propiedad: <span style="font-size: 16px;"><b>${data?.types}</b></span></a></li>
                        <li><a style="font-size: 20px;">Estado: <span style="font-size: 16px;"><b>${data?.installment_type || "No registra"}</b></span></a></li>
                        <li><a style="font-size: 20px;"> Superficie M²:<span style="font-size: 16px;"><b>${data?.surface_m2 || "0"} m²</b></span></a></li>
                        <li><a style="font-size: 20px;">Habitación(es): <span style="font-size: 16px;"><b>${data?.bedrooms || "0"}</b></span></a></li>
                        <li><a style="font-size: 20px;">Baño(s): <span style="font-size: 16px;"><b>${data?.bathrooms || "0"}</b></span></a></li>
                        <li><a style="font-size: 20px;">Estacionamiento(s): <span style="font-size: 16px;"> <b>${data?.coveredParkingLots || "0"}</b></span></a></li>
                    </ul>`

    document.getElementById('descrip-prop').innerHTML = `
    <p>${lineaVisibles || 'No cuenta con descripción'}</p>
    `;

	document.getElementById('data-realtor').innerHTML= `
                <div class="d-flex justify-content-center">
                    <img class="rounded-circle w-50 py-4" src="${data?.realtor.img || "assets/img/Sin.png"}">
                </div>
                <h4>${data?.realtor.name} ${data.realtor.lastName}</h4>
                <p>${data?.realtor.mail || "No registra email"}</p>
                <p>${data.realtor.contactPhone != null && data.realtor.contactPhone != undefined ? data.realtor.contactPhone : "No registra número celular" }</p>
                <hr>`

				
	document.getElementById('mapDetail').innerHTML = `
	<div class="section" style="padding-top:0rem; padding-bottom: 1rem;">
		<div class="container">
			<div class="row">
				<h1><b>UBICACIÓN DE LA PROPIEDAD</b></h1>
				<p><i class='bx bx-map'></i> ${data?.city || "No registra dirección"}, ${data?.commune || "No registra Comuna"}, Chile</p>
			</div>	
		</div>
	</div>`
}

	

