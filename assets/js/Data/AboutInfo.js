import { AboutInformation } from "./userId.js";

const AboutInfo = () => {
    localStorage.removeItem('globalQuery');
    const { mision, vision } = AboutInformation;

    /* LLENAR INFORMACION DE DESCRIPCION */
    let desc = document.getElementById('description-about');
    if (desc !== null) {
        desc.innerHTML = `${AboutInformation.desc}`;
    }
    /* LLENAR INFORMACION DE MISION */
    let misionInfo = document.getElementById('mision-about');
    if (misionInfo !== null) {
        misionInfo.innerHTML = `
            ${mision.icon}
            <div>
                <h4><a href="" class="stretched-link">${mision.title}</a></h4>
                <p>${mision.desc}</p>
            </div>
        `;
    }
    /* LLENAR INFORMACION DE VISION */
    let visionInfo = document.getElementById('vision-about');
    if (visionInfo !== null) {
        visionInfo.innerHTML = `
            ${vision.icon}
            <div>
                <h4><a href="" class="stretched-link">${vision.title}</a></h4>
                <p>${vision.desc}</p>
            </div>
        `;
    }
}

AboutInfo();