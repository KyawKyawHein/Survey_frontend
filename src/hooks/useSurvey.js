import {useMutation} from '@tanstack/react-query';
import { createSurvey } from '../api/Survey';

const useSurveyCreateMutation = ()=>{
    return useMutation({
        mutationKey : ['post','survey'],
        mutationFn : createSurvey
    })
}

export const useSurvey =()=>{
    return {
        useSurveyCreateMutation
    }   
}