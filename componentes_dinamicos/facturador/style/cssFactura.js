export const facturaCss = (param) => {
    return `<style>

        .padre {
            padding-top: 20px;
            display: flex;
            justify-content: space-evenly;
            height: 100vh;
            background: ${param.backgroundColor ? param.backgroundColor : 'white'};
        }

        .padre .form {
            background-color: rgba(0, 0, 0, 0.988);
            border: none;
            border-radius: 10px;
            padding: 1rem;
            width: 30%;
            height: 75%;
            text-align: center;
            align-items: center;
            justify-content: center;
            color: whitesmoke;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .padre input {
            width: 100%;
            height: 50px;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid whitesmoke;
            color: whitesmoke;
            background-color: transparent;
        }

        .padre .btn {
            max-width: 100%;
            text-align: end;
            align-items: center;
        }

        .padre .btn button {
            all: unset;
            margin-top: 10px;
            height: 40px;
            border-radius: 5px;
            color: whitesmoke;
            border: none;
            background-color: rgb(244, 131, 33);
            cursor: pointer;
        }
        .padre .tablas {
            width: 100%;
        }
        .padre table {
            margin: auto;
            background-color: rgb(27, 27, 27);
            border-radius: 5px;
            width: 70%;
            table-layout: fixed;            

        }

        .padre thead {
            background-color: rgb(244, 131, 33);
            padding: 1rem;
            color: white;
        }

        .padre th {
            text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 5px;
        }

        .padre td {
            margin: 0;
            padding: 0;
            padding-left: 5px;
            padding-right: 5px;
            
            text-align: center;
            align-items: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .padre td input{
            all: unset;
            width: 100%;
            height: 100%;
            
        }


        .padre tbody {
            background-color: whitesmoke;
            color: black;
            cursor: pointer;
            align-items: center;
        }

        .padre tfoot {
            text-align: center;
            background-color: whitesmoke;
            color: black;
        }

        .padre .sbt {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .padre .resumen {
            display: flex;
            max-width: 100%;
            justify-content: space-between;
        }

        .padre span {
            margin-left: 5px;
        }

        .padre .btn-f {
            height: 50px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            background-color: rgb(244, 131, 33);
            color: whitesmoke;
            width: 60%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 20px;
            padding-bottom: 10px;
        }

        .padre #tdAction {
            padding: 0;
            margin: 0;
            color: #FB2C36;
            font-size: 25px;
            background-color: rgba(0, 0, 0, 0.866); 
            transition: 0.4s
        }
        .padre #tdAction:hover {
            padding: 0;
            margin: 0;
            color: #f61313;
            font-size: 25px;
            background-color: rgb(255, 202, 202); 
        }

        .padre .des {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .padre .des div{
            width: 50%;
            display: flex;
            justify-content: space-between;
            
        }
        .padre .des input{
            all:unset;
            width:100%;
            color:whitesmoke;
        }
        
    </style> `
}