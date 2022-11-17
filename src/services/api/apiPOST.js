import firebase from '../../services/firebaseConnection'



export const apiPOST = async (table, objectToAdd, setItem) => {

    let result = true

    await firebase.firestore().collection(table).add(objectToAdd)

        .then((docRef) => {

            setItem( docRef.id)

            console.log(`>>> apiPOST: registro incluído com sucesso`)
        })

        .catch((error) => {

            console.log(`erro ao tentar adicionar registro na tabela: ${table} - erro: ${error}`)
            result = false
        })

    return result
}