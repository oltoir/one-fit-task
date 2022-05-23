import axios from "axios";
import {useQuery} from "react-query";
import {getAll} from "../../api/vacancies.service";
import '../../index.scss'
import style from './Main.module.scss'
import Vacancy from "../Vacancy/Vacancy";

const MainPage  = () => {
    const {isLoading, data, error} = useQuery('vacancies', getAll,
        {
            cacheTime: 5000,
        })

    if (isLoading){
        return <h2>Loading...</h2>
    }
    if (error instanceof Error){
        return <h2>{error.message }</h2>
    }
    return (
        <div>
            <div className='container'>
                <div className={style.main_page}>
                    {
                        data?.data.map((vacancy: any) => {
                            return <Vacancy
                                key={vacancy['id']}
                                logo={vacancy['logo']}
                                company={vacancy['company']}
                                isNew={vacancy['new']}
                                featured={vacancy['featured']}
                                position={vacancy['position']}
                                role={vacancy['role']}
                                level={vacancy['level']}
                                postedAt={vacancy['postedAt']}
                                contract={vacancy['contract']}
                                location={vacancy['location']}
                                languages={vacancy['languages']}
                                tools={vacancy['tools']}
                            />
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage