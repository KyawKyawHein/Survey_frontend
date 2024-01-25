import { useParams } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import SurveyForm from "../components/Survey/SurveyForm";
import TButton from "../components/core/TButton";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline";

const SurveyView = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false);
    const [survey, setSurvey] = useState({
        title: "",
        description: "",
        expire_date: "",
        image: null,
        image_url: null,
        questions: [],
        status: false
    })
    const deleteSurvey = ()=>{
        
    }
    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/survey/${id}`).then(({ data }) => {
                console.log(data);
                setSurvey(data.data);
                setLoading(false);
            });
        }
    }, [])
    console.log(survey);
    return (
        <>
            <PageComponent title={id ? "Edit Survey" : "Create Survey"}
                button={
                    <div className="flex gap-3">
                        <TButton color='green' href={`/survey/public/${survey.slug}`} >
                            <LinkIcon className="h-4 w-4 mr-2"/>
                            Public Link
                        </TButton>
                        <TButton color='red' onClick={deleteSurvey} >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Delete
                        </TButton>
                    </div>
                }
            >
                {
                    loading ? <h1 className="text-center">Loading</h1> :
                        <SurveyForm id={id ?? null} survey={survey} setSurvey={setSurvey} />
                }
            </PageComponent>
        </>
    )
}
export default SurveyView;