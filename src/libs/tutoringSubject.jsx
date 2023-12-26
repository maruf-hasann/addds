import { Fragment } from "react";

// for showing subject dynamic like Art(Bangla 1st, Bangla 2nd) into UI
const tutoringSubject = (tutoringSubs) => {
    const tutoringSubjects = tutoringSubs?.reduce((accumulator, currentObj) => {
        const existingEntry = accumulator?.find(
            (entry) => entry?.mainSubject === currentObj?.mainSubject
        );
        if (existingEntry) {
            existingEntry?.subSubjects?.push(currentObj?.subSubject);
        } else {
            if (currentObj?.subSubject) {
                accumulator.push({
                    mainSubject: currentObj?.mainSubject,
                    subSubjects: [currentObj?.subSubject],
                });
            } else {
                accumulator.push({
                    mainSubject: currentObj?.mainSubject,
                    subSubjects: [],
                });
            }
        }

        return accumulator;
    }, []);

    let content = null;
    if (tutoringSubjects?.length) {
        content = tutoringSubjects?.map((subject, idx) => (
            <Fragment key={idx}>
                <span className="cursor-pointer flex">
                    {subject?.mainSubject}{" "}
                    {subject?.subSubjects?.length ? <span>{"("}</span> : ""}
                    {
                        <>
                            {subject?.subSubjects?.map((ss, idx) => (
                                <span className="inline-block" key={idx}>
                                    {`${ss}${
                                        subject?.subSubjects?.length - 1 == idx
                                            ? ""
                                            : ","
                                    }`}
                                </span>
                            ))}
                        </>
                    }
                    {subject?.subSubjects?.length ? <span>{")"}</span> : ""}
                </span>
                {`${tutoringSubjects?.length - 1 == idx ? " " : "|"}`}
            </Fragment>
        ));
    }

    if (!tutoringSubjects?.length) {
        content = "No Subject";
    }
    return <>{content}</>;
};

export default tutoringSubject;
