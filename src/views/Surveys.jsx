import React, { useEffect, useState } from 'react'
import PageComponent from '../components/PageComponent'
import SurveyListItem from '../components/SurveyListItem';
import TButton from '../components/core/TButton';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import axiosClient from '../axios-client';
import PaginationLink from '../components/PaginationLink';

const Surveys = () => {
    const [surveys,setSurveys] = useState([]);
    const [meta,setMeta] = useState();
    const [loading,setLoading] = useState(false);
    const getSurveys = (url)=>{
        setLoading(true);
        url = url || '/survey'
        axiosClient.get(url)
        .then(({data})=>{
            console.log(data);
            setSurveys(data.data)
            setMeta(data.meta);
            setLoading(false)
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err)
        })
    }
    useEffect(()=>{
        getSurveys()
    },[])

    return (
        <>
           <PageComponent title="Surveys" 
                button={
                    <TButton color='green' to='/survey/create' >
                        <PlusCircleIcon className='h-6 w-6 mr-2' />
                        Create New
                    </TButton>
                }
            >
                {loading && <h1>Loading</h1>}
                {!loading && (
                    <div>
                    {surveys.length === 0 && (
                            <div className="py-8 text-center text-gray-700">
                                You don't have surveys created
                            </div>
                    )}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {
                            surveys ? surveys.map(survey => {
                                return (
                                    <SurveyListItem key={survey.id} {...survey}/>
                                )
                            }) : ''
                        }
                    </div>
                        {surveys.length > 0 && <PaginationLink meta={meta} getSurveys={getSurveys} />}
                    </div>
                )}
           </PageComponent>
        </>
    )
}

export default Surveys