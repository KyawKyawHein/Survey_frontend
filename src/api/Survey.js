import axiosClient from "../axios-client";

export const createSurvey =  (payload)=>{
    axiosClient.post('/survey', payload)
        .then(({ data }) => data)
        .catch((err) => {
            console.log(err);
    })
}
