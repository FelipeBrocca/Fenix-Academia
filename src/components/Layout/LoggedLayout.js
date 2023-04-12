import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useClubs } from "../../context/ClubsContext"
import { usePlayers } from "../../context/PlayersContext"
import { useCoaches } from "../../context/CoachesContext"
import Loader from "../Loader/Loader"

const LoggedLayout = () => {

    const [loading, setLoading] = useState(true)
    const { getClubs } = useClubs()
    const { getPlayers } = usePlayers()
    const { getCoaches } = useCoaches()

    const getApis = async () => {
        await getClubs()
        await getPlayers()
        await getCoaches()
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