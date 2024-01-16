import Axios from "axios";

export const FetchAllGitPublicRepo = async ( query, sortBy ) => {
    try {
        if (query !== "" && sortBy  !== "") {
            const response = await Axios.get(`https://api.github.com/search/repositories?q=${query}&sort=${sortBy}&order=desc`);
            console.log("response 1 ==", response);
            if (response?.status === 200) {
                return response;
            }
        } else if (query !== "") {
            const response = await Axios.get(`https://api.github.com/search/repositories?q=${query}`);
            console.log("response 22 ==", response);
            if (response?.status === 200) {
                return response;
            }
        }    
    } catch (error) {
        return { error }
    }
}
