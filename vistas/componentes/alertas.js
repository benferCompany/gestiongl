



export const mostrarAlerta = function (param) {
  /*const param = {
    color: "whitesmoke",
    background: "rgba(211, 27, 27, 1)",
    mensaje:"este es el mensaje del alerta"
  }*/
  const divAlert = document.createElement("div");
  divAlert.id = "idAlerta";
 
  divAlert.style = `
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: ${param.background};
            color: ${param.color};
            padding:1em;
            border-radius : 8px;
            box-shadow : 0 4px 10px rgba(0,0,0,0.3);
            font-family : Arial, sans-serif;
            font-size : 16px;
            opacity: 0;
            animation: fadeInOut 4s ease-in-out forwards;
        `
  divAlert.innerHTML = `
          <style>
          @keyframes fadeInOut {
            0%   { opacity: 0; }
            20%  { opacity: 1; }
            80%  { opacity: 1; }
            100% { opacity: 0; }
          }

          </style>
          <h1>${param.mensaje}</h1>
        `;


  document.body.appendChild(divAlert)

}

