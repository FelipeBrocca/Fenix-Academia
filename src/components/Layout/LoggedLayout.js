import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useClubs } from "../../context/ClubsContext"
import { usePlayers } from "../../context/PlayersContext"
import { useCoaches } from "../../context/CoachesContext"
import Loader from "../Loader/Loader"
import { useTrainings } from "../../context/TrainingsContext"
import { useFinances } from "../../context/FinancesContext"
import { useMoney } from "../../context/MoneyContext"


const LoggedLayout = () => {
  const [loading, setLoading] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const { getClubs } = useClubs();
  const { getPlayers } = usePlayers();
  const { getCoaches } = useCoaches();
  const { getTrainings } = useTrainings();
  const { getMoney } = useMoney()
  const { getFinances, finances, createFinance } = useFinances();

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const months = [
    { value: 0, label: 'Enero' },
    { value: 1, label: 'Febrero' },
    { value: 2, label: 'Marzo' },
    { value: 3, label: 'Abril' },
    { value: 4, label: 'Mayo' },
    { value: 5, label: 'Junio' },
    { value: 6, label: 'Julio' },
    { value: 7, label: 'Agosto' },
    { value: 8, label: 'Septiembre' },
    { value: 9, label: 'Octubre' },
    { value: 10, label: 'Noviembre' },
    { value: 11, label: 'Diciembre' }
  ];

  const handleAutNewFinance = async (todayMonth, todayYear) => {
    for (let monthValue = 0; monthValue < months.length; monthValue++) {
      const month = months[monthValue];
      const existingFinance = finances.find(
        finance =>
          finance.month.value === month.value && finance.month.year === todayYear
      );
      if (!existingFinance) {
        await createFinance({
          month: {
            value: month.value,
            month: month.label,
            year: todayYear,
          },
        });
      }
    }
  };

  useEffect(() => {
    async function fetchApis() {
      await getClubs();
      await getPlayers();
      await getCoaches();
      await getTrainings();
      await getFinances();
      await getMoney('645d68366038927bb68f2072')
      setLoading(false);
      setInitialRender(false);
    }

    fetchApis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (!initialRender) {
      handleAutNewFinance(todayMonth, todayYear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayYear]);


  return <>{loading ? <Loader /> : <Outlet />}</>;
};

export default LoggedLayout;
