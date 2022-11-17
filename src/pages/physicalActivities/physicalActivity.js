import { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

import { apiDELETE, apiGET, apiPOST, apiPUT } from '../../services/api'
import { getDateTime, getCode } from '../../functions'
import { Breadcrumb } from '../../components'

import db from '../../services/db/db.json'



export default function () {

    const [physicalActivity, setPhysicalActivity] = useState([])
    const { id } = useParams()
    const operation = id == 'add' ? 'add' : 'edit'



    useEffect(() => {

        if (operation !== "add") apiGET('physicalActivities', setPhysicalActivity, id) //fetchdata()

    }, [])



    if (!physicalActivity) <></>



    return (



        <div className="container" style={{ marginTop: 200 }}>

            <Breadcrumb
                title={`atividade física (${operation == "add" ? "novo" : "editar"})`}
                previewPage='atividades físicas'
                previewPageLink='physicalActivities'
            />

            {
                operation !== "add"
                    ? <a href={`/physicalActivity/add`} className="btn btn-secondary" id="add_button"><i className="fas fa-plus"></i>  criar um registro</a>
                    : <></>
            }

            <div className="alert alert-danger mb-3 mt-3" role="alert" style={{ display: "none" }} id="deleteMessage">
                <h4 className="alert-heading">excluir registro #{physicalActivity.code}</h4>
                <p>esse item será excluído, confirma?</p>
                <hr />
                <button type="button" className="btn btn-dark" onClick={() => deleteItem('delete', 'physicalActivities', physicalActivity.id)}>excluir</button>
                <button type="button" className="btn btn-secondary" onClick={() => deleteItem('quit')}>desistir</button>
            </div>

            <div className="card mt-5 mb-5">

                <div className="card-header">
                    pesagem {physicalActivity.id ? '(# ' + physicalActivity.code + ")" : ''}
                </div>

                <form className="row p-3" id="Form">

                    <div className="mb-3 col-md-3">
                        <label htmlFor="activity" className="form-label">atividade</label>
                        <select id="activity" className="form-control" value={physicalActivity.activity} onChange={(e) => setPhysicalActivity({ ...physicalActivity, activity: e.target.value })}>

                            <option selected defaultValue="">selecionar opção</option>

                            {
                                db.activity.map((item, key)=>{
                                    return(
                                        <option defaultValue={item} key={key}>{item}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="intensity" className="form-label">intensidade</label>
                        <select id="intensity" className="form-control" value={physicalActivity.intensity} onChange={(e) => setPhysicalActivity({ ...physicalActivity, intensity: e.target.value })}>

                            <option selected defaultValue="">selecionar opção</option>

                            {
                                db.intensity.map((item, key)=>{
                                    return(
                                        <option defaultValue={item} key={key}>{item}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="perceivedSensation" className="form-label">sensação percebida</label>
                        <select id="perceivedSensation" className="form-control" value={physicalActivity.perceivedSensation} onChange={(e) => setPhysicalActivity({ ...physicalActivity, perceivedSensation: e.target.value })}>

                            <option selected defaultValue="">selecionar opção</option>
                            
                            {
                                db.perceivedSensation.map((item, key)=>{
                                    return(
                                        <option defaultValue={item} key={key}>{item}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="local" className="form-label">local</label>
                        <select id="local" className="form-control" value={physicalActivity.local} onChange={(e) => setPhysicalActivity({ ...physicalActivity, local: e.target.value })}>

                            <option selected defaultValue="">selecionar opção</option>

                            {
                                db.local.map((item, key)=>{
                                    return(
                                        <option defaultValue={item} key={key}>{item}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                   
                    <div className="mb-3 col-md-3">
                        <label htmlFor="calories" className="form-label">calorias aprox.</label>
                        <input type="text" className="form-control" id="calories" placeholder="calorias aprox" defaultValue={physicalActivity.calories} onChange={(event) => setPhysicalActivity({ ...physicalActivity, calories: event.target.value })} />                       
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="distance" className="form-label">distância aprox.em km</label>
                        <input type="text" className="form-control" id="distance" placeholder="distância aprox" defaultValue={physicalActivity.distance} onChange={(event) => setPhysicalActivity({ ...physicalActivity, distance: event.target.value })} />                       
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="start" className="form-label">início</label>
                        <input type="text" className="form-control" id="start" placeholder="formato: 00:00" defaultValue={physicalActivity.start} onChange={(event) => setPhysicalActivity({ ...physicalActivity, start: event.target.value })} />                       
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="end" className="form-label">fim</label>
                        <input type="text" className="form-control" id="end" placeholder="formato: 00:00" defaultValue={physicalActivity.end} onChange={(event) => setPhysicalActivity({ ...physicalActivity, end: event.target.value })} />                       
                    </div>

                    <div className="mb-3 col-md-12">
                        <label htmlFor="comments" className="form-label">comentários</label>
                        <textarea type="text" className="form-control" id="comments" placeholder="comentários" defaultValue={physicalActivity.comments} onChange={(event) => setPhysicalActivity({ ...physicalActivity, comments: event.target.value })} rows={3} />
                    </div>
                    <div className="mb-3 col-md-12 mt-5">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" onClick={(event) => submitForm(event, physicalActivity, setPhysicalActivity)} id="submit_button">salvar</button>
                            <button type="button" className="btn btn-danger" id="delete_button" onClick={() => deleteItem("displayMessage")}>deletar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}



export const submitForm = (event, physicalActivity, setPhysicalActivity) => {

    event.preventDefault()

    const _physicalActivity = {
        code: physicalActivity.code ? physicalActivity.code : getCode(5),
        calories: physicalActivity.calories > 0 ? parseFloat(physicalActivity.calories).toFixed(2) : 0,
        activity: physicalActivity.activity ?? "",
        intensity: physicalActivity.intensity ?? "",
        perceivedSensation: physicalActivity.perceivedSensation ?? "",
        local: physicalActivity.local ?? "",          
        distance: physicalActivity.distance ?? "",
        start: physicalActivity.start ?? "",
        end: physicalActivity.end ?? "",
        comments: physicalActivity.comments ?? "",       
        created_at: physicalActivity.code ? physicalActivity.created_at : getDateTime(),
        updated_at: getDateTime(),
    }

    if (physicalActivity.id) {
        _physicalActivity.id = physicalActivity.id
        updateData('physicalActivities', _physicalActivity)
        setPhysicalActivity(_physicalActivity)

    } else addData('physicalActivities', _physicalActivity, setPhysicalActivity) 

    setPhysicalActivity(_physicalActivity)
}



export const addData = async (table, _item, setItem) => {

    const _result = await apiPOST(table, _item, setItem)

    if(_result){

        toast.success("registro incluído com sucesso")

    } else toast.error(`erro ao tentar adicionar esse registro`)    
    
    setTimeout(
        () => window.location.href = `/physicalActivities`,
        1000
    ) 
}



export const updateData = async (table, _item) => {

    await apiPUT(table, _item)
    
    toast.success("registro atualizado com sucesso!")
}



export const deleteItem = async (option, table, idToDelete) => {

    if (option === "displayMessage") document.getElementById("deleteMessage").style.display = "block"

    else document.getElementById('deleteMessage').style.display = "none"

    if (option === 'delete') {

        if (await apiDELETE(table, idToDelete)) {
       
            toast.success("registro excluído com sucesso")

        } else  toast.error("ocorreu u erro ao tentar excluir esse registro")

        setTimeout(
            () => window.location.href = `/physicalActivities`,
            1000
        )
    }
}
