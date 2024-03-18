import { ContactInformation } from "./userId.js";

const ServicesInfo = () => {
    localStorage.removeItem('globalQuery');
    /* LLENAR INFORMACION DE CARDS */
    let information = document.getElementById('contact-info');
    if (information !== null) { 
        information.innerHTML = ContactInformation.map((data)=>`
            <div class="col-lg-4">
                <div class="info-item  d-flex flex-column justify-content-center align-items-center text-center">                      
                    <h5>${data.icon}</h5>
                    <p>${data.title}</p>                
                </div>
            </div>
        `).join('');
    };
}

ServicesInfo();