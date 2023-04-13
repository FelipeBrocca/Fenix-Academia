import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import EditModal from '../components/Profile/EditModal'
import { useCoaches } from '../context/CoachesContext'
import Loader from '../components/Loader/Loader'
import CoachesProfile from '../components/Profile/CoachesProfile'

const CoachProfile = ({ person }) => {

  const { getCoach, updateCoach } = useCoaches()
  const [coach, setCoach] = useState({})
  const [loading, setLoading] = useState(true)
  const [noCoachFound, setNoCoachFound] = useState(false)
  const params = useParams()


 useEffect(() => {
  (async () => {
    const coachProfile = await getCoach(params.id)
    if(coachProfile !== undefined && coachProfile !== null && coachProfile.name){
      setCoach(coachProfile)
      setLoading(false)
    } else if (coachProfile === null){
      setLoading(false)
      setNoCoachFound(true)
    }
  })()
 }, [params.id, updateCoach, getCoach])


 if (loading) {
  return <Loader />
}
else if (noCoachFound) {
  return <h3 style={{ color: 'var(--white)' }} className='no-player-found'>No existe este entrenador/a</h3>
}
else {
  return (
    <main>
        <div className='top-profile'>
          <Link className='back-to-list' to='/entrenadores/listado'>Volver</Link>
          <EditModal person={coach} id={params.id} />
        </div>
        <CoachesProfile
        coach={coach}
        />
      </main>
  )
}}

export default CoachProfile