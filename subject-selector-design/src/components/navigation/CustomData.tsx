import React, { FC } from "react";
import { Table } from "react-bootstrap";
//import { Pagination, Table } from "react-bootstrap";

export interface Customer {
    _id: string;
    index: number;
    guid: string;
    isActive: boolean;
    balance: string;
    picture: string;
    age: number;
    eyeColor: string;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    registered: string;
    latitude: number;
    longitude: number;
    tags: string[];
    sibilings: Sibiling[];
    greeting: string;
    favoriteFruit: string;
}

interface Sibiling {
    id: number;
    name: string;
}

// function useFetchData(url: string): {
//     data: Customer[] | null,
//     done: boolean
// } {
//     const [data, dataSet] = useState<Customer[] | null>(null);
//     const [done, doneSet] = useState(false);


//     useEffect(() => {
//         fetch(url)
//             .then(resp => resp.json())
//             .then((d: Customer[]) => {
//                 dataSet(d);
//                 doneSet(true);
//             });
//     }, [url]);

//     return {
//         data,
//         done
//     }
// }


export interface CustomDataProps {
    children?: string | React.ReactElement;
    title?: string;
    className?: string;
    disabled?: boolean;
    currentItems: any;
}

export const CustomData: FC<CustomDataProps> = ({
    currentItems,
}) => {

    //const { data, done } = useFetchData("/customers_data.json");
    //console.log(data && data![0].age)
    console.log(currentItems)
    if (currentItems && currentItems !== undefined) {
        currentItems.forEach((element: any) => {
            console.log(element);
        });
    }
    // const renderTableData = (data) => {
    //     return data.map((key, index) => {
    //         return <th key={index}>{key.toUpperCase()}</th>
    //     })



    const renderTableData = (currentItems: any[]) => {
        return currentItems.map((item, index) => {
            return (
                <tr key={index}>
                    <th >{item.NHS_NUMBER}</th>
                    <th>{item.NAME}</th>
                    <th>{item.AGE}</th>
                    <th>{item.HUB}</th>
                    <th>{item.SCREENING_CENTRE}</th>
                    <th >{item.EPISODE_START_DATE}</th>
                    <th>{item.EPISODE_END_DATE}</th>
                    <th >{item.LATEST_EVENT_STATUS}</th>
                </tr>
            )
        })
    }


    return (
        // <div className="center-grid">
        <div className="grid-style">
            {currentItems !== undefined && (
                <Table size="sm" >
                    <thead>
                        <th style={{ width: "200px" }}>NHS Number</th>
                        <th style={{ width: "200px" }}>Name</th>
                        <th style={{ width: "200px" }}>Age</th>
                        <th style={{ width: "200px" }}>Hub</th>
                        <th style={{ width: "200px" }}>Screening Centre</th>
                        <th style={{ width: "200px" }}>Epipsode Start</th>
                        <th style={{ width: "200px" }}>Epipsode End</th>
                        <th style={{ width: "200px" }}>Latest Event Status</th>
                    </thead>
                    <tbody>
                        {currentItems && renderTableData(currentItems)}
                        {/* {data.map((item) => {
                            <tr>
                                <th>item.name</th>
                                <th>item.gender</th>
                                <th>item.eyeColor</th>
                                <th>item.sibilings.lengh</th>
                                <th>item.age</th>
                            </tr>
                        })
                        } */}
                    </tbody>
                    {/* <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination> */}
                </Table>

            )
            }
        </div >
    );
}
