import firebase from '../../services/firebaseConnection'
import { snapshotReadItems } from '../db/snapshotReadItems'



export const apiGET = async (table, setState, id) => {

    let docRef

    if (id) docRef = firebase.firestore().collection(table).doc(id)

    else docRef = firebase.firestore().collection(table).orderBy('created_at', 'desc')

    await docRef.get()
        .then((snapshot) => {

            if(id){
                setState({
                    ...snapshot.data(),
                    id: snapshot.id
                })

            } else setState(snapshotReadItems(snapshot))
            
            return true
        })

        .catch((error) => {

            console.log(`erro ao tentar listar a tabela: ${table} - erro: ${error}`)

            return false
        })
}