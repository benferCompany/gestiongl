

export const consultaSelect = async (param) => {
    try {
     
        const response = await fetch(param.url,
            {
                method: "POST",
                body: JSON.stringify(param.body),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        const responseJson = await response.json();

        if (responseJson.status == "success") {
            return responseJson.data;
        } else {

            return [];
        }

    } catch (error) {
        console.error(error);
    }
}