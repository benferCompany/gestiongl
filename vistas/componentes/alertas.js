export const mostrarAlerta = function (param) {
  /*const param = {
    color: "#1e293b",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    mensaje:"este es el mensaje del alerta"
  }*/
  const divAlert = document.createElement("div");
  divAlert.id = "idAlerta";
 
  divAlert.style = `
            left: 50%;
            position: fixed;
            top: 50%;
            transform: translate(-50%, -50%);
            color: ${param.color};
            background: ${param.background};
            border-radius: 16px;
            padding: 1.25rem 2rem;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.25), 0 10px 15px -6px rgba(0, 0, 0, 0.1);
            font-weight: 600;
            font-size: 1rem;
            letter-spacing: -0.01em;
            line-height: 1.6;
            animation: slideInOut 4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 9999;
            max-width: 400px;
            min-width: 280px;
            text-align: center;
            will-change: transform, opacity;
            transition: all 0.3s ease;
        `
  divAlert.innerHTML = `
          <style>
          @keyframes slideInOut {
            0% { 
              opacity: 0; 
              transform: translate(-50%, -30%);
              filter: blur(4px);
            }
            15% { 
              opacity: 1; 
              transform: translate(-50%, -50%);
              filter: blur(0);
            }
            85% { 
              opacity: 1; 
              transform: translate(-50%, -50%);
              filter: blur(0);
            }
            100% { 
              opacity: 0; 
              transform: translate(-50%, -70%);
              filter: blur(4px);
              display:none;
            }
          }
          
          #idAlerta h1 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          
          #idAlerta h1::before {
            content: "✨";
            font-size: 1.3rem;
            opacity: 0.9;
          }
          </style>
          <h1>${param.mensaje}</h1>
        `;

  document.body.appendChild(divAlert)
};