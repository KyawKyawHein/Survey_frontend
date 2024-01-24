import { useParams } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import SurveyForm from "../components/Survey/SurveyForm";

const SurveyView = () => {
    const {id} = useParams()
    return (
        <>
            <PageComponent title={id ? "Edit Survey" : "Create Survey"}>
                <SurveyForm id={id ?? null} />
            </PageComponent>
        </>
    )
}
export default SurveyView;