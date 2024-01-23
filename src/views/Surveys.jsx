import React from 'react'
import PageComponent from '../components/PageComponent'
import { useStateContext } from '../context/StateContext'
import SurveyListItem from '../components/SurveyListItem';
import TButton from '../components/core/TButton';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const Surveys = () => {
    const {surveys} = useStateContext();
    console.log(surveys);
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
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {
                    surveys? surveys.map(survey=>{
                        return (
                            <SurveyListItem key={survey.id} {...survey} />
                        )
                    }):''
                }
                </div>
           </PageComponent>
        </>
    )
}

export default Surveys