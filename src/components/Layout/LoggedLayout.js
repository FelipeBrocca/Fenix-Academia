import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useClubs } from "../../context/ClubsContext"
import { usePlayers } from "../../context/PlayersContext"
import { useCoaches } from "../../context/CoachesContext"
import Loader from "../Loader/Loader"
import { useTrainings } from "../../context/TrainingsContext"

const LoggedLayout = () => {

    const [loading, setLoading] = useState(true)
    const { getClubs } = useClubs()
    const { getPlayers } = usePlayers()
    const { getCoaches } = useCoaches()
    const {getTrainings} = useTrainings()

    const getApis = async () => {
        await getClubs()
        await getPlayers()
        await getCoaches()
        await getTrainings()
        setLoading(false)
    }
    useEffect(() => {
        getApis()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {loading ? <Loader /> : <Outlet />}
        </>
      )
      
}

export default LoggedLayout