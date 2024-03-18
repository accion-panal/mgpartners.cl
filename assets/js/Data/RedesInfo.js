import { RedesInformation} from "./userId.js"

const RedesInfo = () =>{ 
    let social = document.getElementById('redes');
    if (social !== null){
        social.innerHTML = `
        <div class="social-links d-flex justify-content-center mt-3 gap-4" id="redes">
            <a href="${RedesInformation.hrefInst}" class="d-flex align-items-center justify-content-center" target="_blank">${RedesInformation.iconInst}</a>
            <a href="${RedesInformation.hrefFacebook}" class="d-flex align-items-center justify-content-center" target="_blank">${RedesInformation.iconFacebook}</a>
        </div>
        `;
    };
}


RedesInfo();