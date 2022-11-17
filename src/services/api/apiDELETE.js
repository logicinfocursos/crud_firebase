import firebase from '../../services/firebaseConnection'



export const apiDELETE = async (table, idToDelete) => {

    let result = true
    await firebase.firestore().collection(table).doc(idToDelete).delete()

    .then(() => {

        console.log(`registro  ${idToDelete} na tabela: ${table} foi excluído com sucesso!`)
    })

    .catch(error => {    

        console.log(`erro ao tentar deleter esse registro na tabela: ${table} - erro: ${error}`)

        result = false
    })

    return result
}