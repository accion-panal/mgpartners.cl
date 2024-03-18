import { FooterInformation } from "./userId.js";

const ServicesInfo = () => {

    /* LLENAR INFORMACION DE CARDS */
    let information = document.getElementById('footer-text-info');
    if (information !== null) { 
        information.innerHTML = `
        <p>
        ${FooterInformation.direction}
        <br><br>
        <strong>Phone:</strong> ${FooterInformation.phone}<br>
        <strong>Email:</strong> ${FooterInformation.email}<br>
        <strong>Horario Semana:</strong> ${FooterInformation.horarioSemana}<br>
        <strong>Horario Fin de semana:</strong> ${FooterInformation.horarioFinSemana}<br>
      </p>
        `;
    };
}

ServicesInfo();