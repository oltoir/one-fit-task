import React from "react";
import style from './Vacancy.module.scss'
import {ReactComponent as MySvg} from "../../assets/images/photosnap.svg"
import {getAll} from "../../api/vacancies.service";

interface Props{
    logo: string;
    company: string;
    isNew: boolean;
    featured: boolean;
    position: string;
    role: string;
    level: string;
    postedAt: string;
    contract: string;
    location: string;
    languages: [];
    tools: [];
}

const Vacancy: React.FC<Props> = ({logo,company,isNew,
                                      featured,position,role,
                                      level,postedAt,contract,
                                      location,languages,tools}) => {
    const ahaha = ()=>{
        console.log('321')
    }

    const classNameGenerator = (...classes: any)=>{
        return classes.join(" ")
    }
    const SVGGenerator = (baseUrl: any,url: any)=>{
        const img_url = baseUrl + url;
        return <img src={require(img_url).default} alt=""/>
    }
    const img_baseUrl = "../../assets"

    let newComp,featuredComp;
    if(isNew){
        newComp= <div className={style.new}>NEW!</div>
    }
    if(featured){
        featuredComp = <div className={style.featured}>Featured</div>
    }
    return (
        <div className={style.card}>
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
                            <div className={style.company_title}>{company}</div>
                            {newComp}
                            {featuredComp}
                        </div>
                        <div>
                            <div className={style.position}>
                                {position}
                            </div>
                            <div className={classNameGenerator(style.card_row, style.grey)}>
                                <div>{postedAt}</div>
                                <div>&#183;</div>
                                <div>{contract}</div>
                                <div>&#183;</div>
                                <div>{location}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={style.right_side}>
                    <div className={style.card_row}>
                        <div className={style.tag}>{level}</div>
                        {languages.map((lang: string,index:any) => (
                            <div className={style.tag} key={index}>{lang}</div>
                        ))}
                        {tools.map((tool: string,index:any) => (
                            <div className={style.tag} key={index}>{tool}</div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Vacancy