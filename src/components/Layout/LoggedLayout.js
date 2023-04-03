import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useClubs } from "../../context/ClubsContext"
import { usePlayers } from "../../context/PlayersContext"

const LoggedLayout = () => {

const { getClubs } = useClubs()
const { getPlayers } = usePlayers()

    useEffect(() => {
       getClubs()
       getPlayers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Outlet />
    )
}

export default LoggedLayout