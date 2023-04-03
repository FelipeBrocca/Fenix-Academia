import { createContext, useCallback, useContext, useState } from 'react'
import {
    getClubsRequest,
    clubDetailRequest,
    newClubRequest,
    updateClubRequest,
    deleteClubRequest
} from '../api/clubsAPI'

const clubsContext = createContext()

export const useClubs = () => {
    const context = useContext(clubsContext)
    return context
}

export const ClubsProvider = ({children}) => {
    const [clubs, setClubs] = useState([])

    const getClubs = useCallback(async() => {
        const res = await getClubsRequest();
        setClubs(res.data)
    }, []);

    const getClub = useCallback(async (id) => {
        const club = await clubDetailRequest();
        return club.data
    }, [])

    const createClub = async (club) => {
        const create = await newClubRequest(club)
        if(create){
            setClubs([...clubs, create.data])
        } else {
            alert('No se pudo crear el nuevo club')
        }
    }
    
    const updateClub = async(id, club) => {
        const clubToEdit = await updateClubRequest(id, club)
        setClubs(clubs.map(club => (
            club._id === id ? clubToEdit.data : club
        )))
    }

    const deleteClub = async (id) => {
        await deleteClubRequest(id)
        setClubs(clubs.filter(club => club._id !== id))
    }

    return (
        <clubsContext.Provider value={{
            clubs,
            setClubs,
            getClubs,
            getClub,
            createClub,
            updateClub,
            deleteClub
        }}>
            {children}
        </clubsContext.Provider>
    )
}