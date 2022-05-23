import React from "react";
import style from './Vacancy.module.scss'

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
                        <img src={logo} alt=""/>
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
                            <div className={[style.card_row, style.grey]}>
                                {postedAt}
                                &#183;
                                {contract}
                                &#183;
                                {location}
                            </div>

                        </div>
                    </div>
                </div>
                <div className={style.right_side}>
                    <div className={style.card_row}>
                        {position}
                        {languages.map((lang: string,index:any) => (
                            <div key={index}>{lang}</div>
                        ))}
                        {tools.map((tool: string,index:any) => (
                            <div key={index}>{tool}</div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Vacancy