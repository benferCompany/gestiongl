export const facturaCss = () => {
    return `<style>

        .padre {
            padding-top: 20px;
            display: flex;
            justify-content: space-evenly;
            height: 100vh;
            background-color: rgb(12, 12, 12);
        }

        .form {
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

        input {
            width: 100%;
            height: 50px;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid whitesmoke;
            color: whitesmoke;
            background-color: transparent;
        }

        .btn {
            max-width: 100%;
            text-align: end;
            align-items: center;
        }

        .btn button {
            all: unset;
            margin-top: 10px;
            height: 40px;
            border-radius: 5px;
            color: whitesmoke;
            border: none;
            background-color: rgb(244, 131, 33);
            cursor: pointer;
        }
        .tablas {
            width: 100%;
        }
        table {
            margin: auto;
            background-color: rgb(27, 27, 27);
            border-radius: 5px;
            width: 70%;
            table-layout: fixed;            

        }

        thead {
            background-color: rgb(244, 131, 33);
            padding: 1rem;
            color: white;
        }

        th {
            text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 5px;
        }

        td {
            margin: 0;
            padding: 0;
            padding-left: 5px;
            padding-right: 5px;
            
            text-align: center;
            align-items: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        td input{
            all: unset;
            width: 100%;
            height: 100%;
            
        }


        tbody {
            background-color: whitesmoke;
            color: black;
            cursor: pointer;
            align-items: center;
        }

        tfoot {
            text-align: center;
            background-color: whitesmoke;
            color: black;
        }

        .sbt {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .resumen {
            display: flex;
            max-width: 100%;
            justify-content: space-between;
        }

        span {
            margin-left: 5px;
        }

        .btn-f {
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

        #tdAction {
            padding: 0;
            margin: 0;
            color: #FB2C36;
            font-size: 25px;
            background-color: rgba(0, 0, 0, 0.866); 
            transition: 0.4s
        }
        #tdAction:hover {
            padding: 0;
            margin: 0;
            color: #f61313;
            font-size: 25px;
            background-color: rgb(255, 202, 202); 
        }

        .des {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .des div{
            width: 50%;
            display: flex;
            justify-content: space-between;
            
        }
        .des input{
            all:unset;
            width:100%;
            color:whitesmoke;
        }
        
    </style> `
}