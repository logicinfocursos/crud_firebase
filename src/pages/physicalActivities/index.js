import { useState, useEffect } from 'react'

import { apiGET } from '../../services/api/apiGET'
import { Breadcrumb, MyLink } from '../../components'



export default function () {

    const [physicalActivities, setPhysicalActivities] = useState([])



    useEffect(() => { apiGET('physicalActivities', setPhysicalActivities) }, [])



    if (!physicalActivities) return <h1>carregando...</h1>



    return (
        <div className="container" style={{ marginTop: 200 }}>

            <Breadcrumb
                title="atividade física diária"
            />

            <div className="card">
                <div className="card-header">
                    <a href={`/physicalActivity/add`} className="btn btn-secondary"><i className="fas fa-plus mr-3"></i>  criar um registro</a>

                </div>

                <div className="card-body table-responsive p-0" style={{ height: 500 }}>

                    <table className="table text-center table-hover table-sm table-responsive table-striped">

                        <thead>
                            <tr>
                                <th>cod</th>
                                <th>data</th>
                                <th>atividade</th>
                                <th>intensidade</th>
                                <th>calorias</th>
                                <th>início</th>
                                <th>fim</th>
                                <th>tempo</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                physicalActivities.length > 0

                                    ? physicalActivities.map((item, key) => {
                                        return (
                                            <PhysicalActivityItem
                                                item={item}
                                                key={key}
                                            />
                                        )
                                    })
                                    : <h3 className='mt-5'>sem dados para exibir!</h3>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}



export const PhysicalActivityItem = ({ item }) => {

    const _link = `/physicalActivity/${item.id}`

    return (
        <tr>

            <td><MyLink link={_link}>{item.code}</MyLink></td>
            <td><MyLink link={_link}>{item.created_at}</MyLink></td>
            <td><MyLink link={_link}>{item.activity}</MyLink></td>
            <td><MyLink link={_link}>{item.intensity}</MyLink></td>
            <td><MyLink link={_link}>{item.calories}</MyLink></td>

            <td><MyLink link={_link}>{item.start}</MyLink></td>
            <td><MyLink link={_link}>{item.end}</MyLink></td>
            <td><MyLink link={_link}>{item.time}</MyLink></td>

        </tr>
    )
}