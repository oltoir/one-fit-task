import axios from "axios";
import {useQuery} from "react-query";
import {getAll} from "../../api/vacancies.service";
import '../../index.scss'
import style from './Main.module.scss'
import Vacancy from "../Vacancy/Vacancy";
import React, {useState} from "react";

const MainPage  = () => {
    const [example, setExample] = useState(0)
    const [show, setShow] = useState(false)
    const [params, setParams] = useState("")
    const [filterTags, setfilterTags] = useState("")
    const {isLoading, data, error, refetch} = useQuery(['vacancies',params], getAll,
        {
            cacheTime: 5000,
        })
    const classNameGenerator = (...classes: any)=>{
        return classes.join(" ")
    }
    const newcomp = (isNew: any) => {
        if(isNew){
            return <div className={style.new}>NEW!</div>
        }
    }
    const featuredComp = (isFeatured: any) => {
        if(isFeatured){
            return <div className={style.featured}>Featured</div>
        }
    }
    let filtersArr: string[]
    filtersArr = []
    const showComp = (isShow: any) => {
        if(isShow){
            return <div className={classNameGenerator(style.card,style.filter)}>
                <div className={style.content}>
                    {filterTags.split("&").map((param: string,index:any) => (
                        <div onClick={()=>deleteFilter(param)} className={style.tag} key={index}>{param.split("=")[1]}</div>
                    ))}
                <div onClick={()=>resetFilter()} className={style.clear}>Clear</div>
                </div>
            </div>
        }
    }
    if (isLoading){
        return <h2>Loading...</h2>
    }
    if (error instanceof Error){
        return <h2>{error.message }</h2>
    }

    const filter = (data:string) =>{
        setShow(true)
        if(params && !params.includes(data)){
            setParams(params+"&"+data)
            setfilterTags(params+"&"+data)
        }
        else{
            setParams(data)
            setfilterTags(data)
        }
    }

    let cardStyle

    const cardStylComp = (featured:boolean) =>{
        if (featured){
            return cardStyle = classNameGenerator(style.card,style.border_left)
        }
        else{
            return cardStyle = classNameGenerator(style.card)
        }

    }

    const deleteFilter = (filter:string)=>{
        setParams(params.replace(filter,""))
        setfilterTags(params.replace(filter,""))
        console.log(params.length)
        if(params.length<24){
            resetFilter()
        }
    }

    const resetFilter = () =>{
        setShow(false)
        setParams("")
        setfilterTags("")
    }


    return (
        <div>
            <div className='container'>
                {showComp(show)}
                <div className={style.main_page}>
                    {
                        data?.data.map((vacancy: any) => {
                            return <div className={cardStylComp(vacancy["featured"])} key={vacancy['id']}>
                                <div className={style.content}>
                                    <div className={style.left_side}>
                                        <div>
                                            {/*<img src={require(""+img_baseUrl+logo).default} alt=""/>*/}
                                            {/*{SVGGenerator(img_baseUrl,logo)}*/}
                                            <img src={require("../../assets/images/manage.svg").default} alt=""/>
                                            {/*{img_baseUrl+logo}*/}
                                        </div>
                                        <div>
                                            <div className={style.card_row}>
                                                <div className={style.company_title}>{vacancy["company"]}</div>
                                                {newcomp(vacancy["new"])}
                                                {featuredComp(vacancy["featured"])}
                                            </div>
                                            <div>
                                                <div className={style.position}>
                                                    {vacancy["position"]}
                                                </div>
                                                <div className={classNameGenerator(style.card_row, style.grey)}>
                                                    <div>{vacancy["postedAt"]}</div>
                                                    <div>&#183;</div>
                                                    <div>{vacancy["contract"]}</div>
                                                    <div>&#183;</div>
                                                    <div>{vacancy["location"]}</div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.right_side}>
                                        <div className={style.card_row}>
                                            <div onClick={()=>[filter("role="+vacancy["role"]),refetch]}
                                                 className={style.tag}>{vacancy["role"]}</div>

                                            <div onClick={()=>[filter("level=" + vacancy["level"]),refetch]}
                                                 className={style.tag}>{vacancy["level"]}</div>

                                            {vacancy['languages'].map((lang: string,index:any) => (
                                                <div onClick={()=>[filter("languages=" + lang),refetch]} className={style.tag} key={index}>{lang}</div>
                                            ))}
                                            {vacancy["tools"].map((tool: string,index:any) => (
                                                <div onClick={()=>[filter("tools=" + tool),refetch]}
                                                    className={style.tag} key={index}>{tool}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage