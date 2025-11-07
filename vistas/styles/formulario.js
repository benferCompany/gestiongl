export const formularioCss = (formulario) => {
  return `<style>
       ${formulario} {
            all:unset;
            display: flex;
            flex-direction: column; 
            background: black;
            color: whitesmoke;
            padding: 1em;
            width: 300px;
            border-radius: 10px;
            margin-top: 2em;
            font-family: Arial, Tahoma, sans-serif;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.9);
       }
        input[type="text"], input[type="number"] {
            height: 20px;
            background: transparent;
            color: whitesmoke;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid whitesmoke;
            transition: 0.3s;
        }
        input[type="text"]:hover, input[type="number"]:hover {
            height: 25px;
            background:  rgba(240, 133, 33, 0.16);;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid whitesmoke;
        }

        
        input[type="submit"] {
            color: whitesmoke;
            background:  rgba(240, 133, 33, 1);
            border-radius: 5px;
            border: none;
            padding: 10px;
            width: 300px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            transition: 0.3s;
        }
        input[type="submit"]:hover {
            color: whitesmoke;
            background:  rgba(240, 33, 33, 0.72);
            border-radius: 5px;
            border: none;
            padding: 10px;
            width: 300px;
            cursor: pointer;
        }
        label {
            margin-bottom: 0.5em;
        }
    
        </style>
    `
}


export const padreFormularioCss = () => {
  return `
            display: flex;             /* activa Flexbox */
            padding: 1em;
            aling-items: center;
            justify-content: center;   /* centra horizontalmente */
            gap: 50px;                 /* espacio entre los contenedores */
            flex-wrap: wrap;           /* permite que los hijos pasen a la siguiente línea */
        `

}

export const tablaCss = () => {
  const style = ` <style>

      table{
        margin-top: 0px;
        width: 900px;
        text-aling: center;
        background: #000000f1;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.75);
      }
      table thead {
        padding: 1em;
        background:  black;
        height: 30px;
        border: 1px solid red;
        color: whitesmoke;
        font-family: Arial, Tahoma, sans-serif;
      }
      tbody {

        background:  rgba(234, 234, 234, 1);
        height: 30px;
        font-family: Arial, Tahoma, sans-serif;
      }
      table button {
        background:  rgba(255, 166, 0, 1);
        width: 50px;
        color: black;
      }
      .td-btn {
       display: flex;
       background:  rgba(255, 166, 0, 1);
      }
       .td-btn button {
        background:  rgba(255, 166, 0, 1);
        width: 50%;
        color: black;
        border-radius: 0px;
        border-top: none;
        border-right: none;
        border-left: 1px solid black;
        transition: 0.3s;
       }
        .td-btn button:hover {
        background:  rgba(255, 82, 82, 0.78);
        width: 50%;
        color: #000000c4f;
        border-radius: 0px;
        border-top: none;
        border-right: none;
        border-left: 1px solid black;
       }
      td{
      
        text-align:center;
      }
        </style>
`
  return style
}

export const formBuscarPorPalabraCss = () => {

  return `
    <style>
        #formSearchId {
          background: black;
          padding: 10px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          width: 190px;
          justify-content: space-between;
          align-items: center;
        }
        #formSearchId input {
          all:unset;
        }
        #formSearchId input[type="search"]{
            background: transparent;
            height: 30px;
            width: 150px;
            color: whitesmoke;
            border: none;
            font-family: Arial, Verdana, Geneva, Tahoma, sans-serif;
        }
        #formSearchId input[type="submit"]{
            border-top-right-radius: 10px;
            background: transparent;
            height: 30px;
            cursor: pointer;
            width: 30px;
            text-align: center;
            font-size: 22px;
        }
        #formSearchId input::placeholder {
            color: whitesmoke;
            margin-left: 5px;
            opacity: 1;
        }
    </style>
   `
}

export const formularioSelectCss = () => {
  return ` 
    .divSelect{
          width:100%;
          background: black;
          color:whitesmoke;
      }
      .divSelect input {
          width:100%;
          color:whitesmoke;
          background: transparent;
          border-top: none;
          border-left: none;
          border-right:none;
          border-bottom: 1px solid white;
          transition: 0.3s;
          }
      .divSelect input:hover{
            color:whitesmoke;
            height: 25px;
            background:  rgba(240, 133, 33, 0.16);;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid white;
        }

      ul{
        color: whitesmoke; 
        list-style: none;
      }


        `
}