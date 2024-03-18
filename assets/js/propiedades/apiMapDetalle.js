import { getPropertiesForId } from "../services/PropertiesServices.js";


export default async function apiCallMapDetail(id, realtorId, statusId, companyId){

let {data} = await getPropertiesForId(id, realtorId, statusId, companyId );


const MapaMarker = document.getElementById('map')

mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ'
const map = new mapboxgl.Map({
    
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-70.680628,-33.469970],
    projection: 'globe',
    zoom: 4,
    
});

// let divMapContainer = document.getElementById('map');
if(data?.LngLat !== null && data.LngLat !== ""){
    let LngLat = data?.LngLat.replace('{', '').replace('}', '').replace(',', '').replace('Lat', "").split(':');
    const propiedad = [parseFloat(LngLat[1]), parseFloat(LngLat[2])];
    createMarker(propiedad, data)
}else {
    MapaMarker.innerHTML = `<h4>No cuanta con ubicación exacta, para mostrar en el mapa</h4>`
}

	// const UbiProp = [parseFloat(LngLat[1]), parseFloat(LngLat[2])];
function createMarker(propiedad, data) {
         // create the popup
         const popup = new mapboxgl.Popup({ offset: 25 }).setText(`
         ${data?.title}`)
         
         // create DOM element for the marker
         const ubicacion = document.createElement('div');
         ubicacion.id = 'marker';
     
         const marker = new mapboxgl.Marker({
             color: '#ff7300',
             scale: .8
         })
             marker.setLngLat(propiedad)
             .setPopup(popup) // sets a popup on this marker
             .addTo(map);

         }
}
   