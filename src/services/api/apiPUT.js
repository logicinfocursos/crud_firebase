import firebase from '../../services/firebaseConnection'



export const apiPUT = async (table, objetctToUpdate) => {

    await firebase.firestore().collection(table)
    .doc(objetctToUpdate.id)
    .update(objetctToUpdate)
    .then(() => {
        return true
    })
    .catch((error) => {
        console.log(`erro ao tentar atualizar esse registro - erro: ${error}`)
        return false
    })
}