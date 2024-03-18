import { getProperties, getPropertiesForCustomUrl} from "../services/PropertiesServices.js";
import { PropertyData, limitDataApi } from "../Data/userId.js";

mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ';
const map = new mapboxgl.Map({
        
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-70.680628,-33.469970],
    // projection: 'globe',
    zoom: 4,
    
});

const markers = [];

function limpiarMarcadores(dataMarket) {
    dataMarket.forEach(marker => {
        marker.remove();
    });

    // Vaciar el array
    dataMarket.length = 0;
}


export default async function apiCallMap() {
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;

    
    if(markers.length > 0){
        limpiarMarcadores(markers);
    }

    let data;
    let response;
    let filtersUrl = '';

    let storedFiltersUrl = localStorage.getItem('globalFiltersUrl');
    if(storedFiltersUrl){
        filtersUrl = storedFiltersUrl;
    }

    //* el segundo digito es el limit
    response = await getPropertiesForCustomUrl(1, limitDataApi.limitMap, CodigoUsuarioMaestro, 1, companyId, realtorId, filtersUrl);
    //* Guardar el response en el localStorage
    localStorage.setItem('globalResponse', JSON.stringify(response));

    data = response.data;
    


    // console.log('data en map: ',data);
    const promiseMap = new Promise((resolve) => {
        data.map((data) => {
            // let propiedad = [-70.680628,-33.469970]
            if (data?.LngLat !== null && data?.LngLat !== "") {
                let LngLat = data?.LngLat.replace('{', '').replace('}', '').replace(',', '').replace('Lat', "").split(':');
                const propiedad = [parseFloat(LngLat[1]), parseFloat(LngLat[2])];
                createMarker(propiedad, data);
            }
            
        });
        resolve();
    });
    
    function createMarker(propiedad, data) {
        // create the popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <span>${data?.title}</span>
            <br>
            <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" target="_blank" name="VerDetalle" class="more d-flex align-items-center float-start">
            <span class="label" id="getProperty">Ver Detalle</span>
            <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
            </a>`);
    
        // create DOM element for the marker
        const el = document.createElement('div');
        el.id = 'marker';
    
        const marker = new mapboxgl.Marker({
            color: '#ff7300',
            scale: 0.8
        });
    
        marker.setLngLat(propiedad)
              .setPopup(popup) // sets a popup on this marker
              .addTo(map);
    
        markers.push(marker); // push de marcadores al array markers
    }
    
    promiseMap.then(()=>{
          
        map.on('load', function () {
            map.resize();
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style

        });
    })
     

}


