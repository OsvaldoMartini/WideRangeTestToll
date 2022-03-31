import { getRestApiConfig, getSubjectSearch } from '../../api/ApiCalls';

export interface SubjectSearchServiceProps {
    children?: string | React.ReactElement;
    operation: string;
    category: string;
    nhsNumber: string;
    minAge: number;
    maxAge: any;
    changeData: (value: any) => void;
}

export const SubjectSearchService = (props: SubjectSearchServiceProps) => {
    const {
        operation,
        category,
        nhsNumber,
        minAge,
        maxAge,
        changeData
    } = props

    const callData = (data: any) => {
        changeData(data);
    }


    return new Promise(resolve => {

        let filter = "";

        if (category === "CategoryAges") {
            filter = maxAge === null ? `${operation}/${minAge}` : `${operation}/${minAge}/${maxAge}`
        } else if (category === "NhsNumberCriteriaVar") {
            const nhsNumberClean = nhsNumber && nhsNumber.replace(/[^0-9]/g, "");
            filter = `${nhsNumberClean}`;
        }
        // let objReq = {
        //     baseURL: CUSTOMER_API_URL + `/subjectsearch/${filter}`
        // }

        let requests = [];
        let options = getRestApiConfig(nhsNumber != "" ? `/subjectsearch/${filter}` : `/subjectsearch/byAge/${filter}`, "GET")
        requests.push(options);


        console.log("requests: ", requests.length);

        // if (CUSTOMER_API_URL) {
        let response = getSubjectSearch(requests, `GET - > "/subjectsearch/${filter}"`, callData);

        console.log("getSubjectSearch: ",);

        // axios.get<Customer>(endpoint.CUSTOMER_API_URL + `/subjectsearch/${filter}`)
        //     .then(response => setResult({ status: 'loaded', payload: response.data }))
        //     .catch(error => setResult({ status: 'error', error }));
        // }

        return response;
    }).then((response) => {
        return response;
    });
}



export default SubjectSearchService;