import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import WidgetCheckbox from "../../../components/Shared/Widgets/WidgetCheckbox";

const DashboardWidgets = () => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            totalBlogs: false,
            totalCollage: false,
            totalGrades: false,
            totalMockTest: false,
            totalParents: false,
            totalRegular: false,
            totalSchool: false,
            totalStudents: false,
            totalSubjects: false,
            totalTest: false,
            totalTutors: false,
            totalUniversity: false,
        },
    });
    const {
        control: controlManagement,
        handleSubmit: submitManagement,
        reset: resetManagement,
    } = useForm({
        defaultValues: {
            totalBlogsSummary: false,
            totalCollageSummary: false,
            totalGradesSummary: false,
            totalMockTestSummary: false,
            totalParentsSummary: false,
            totalRegularSummary: false,
            totalSchoolSummary: false,
            totalStudentsSummary: false,
            totalSubjectsSummary: false,
            totalTestSummary: false,
            totalTutorSummary: false,
            totalUniversitySummary: false,
        },
    });

    const onSubmit = (data) => {
        console.log(data, "data");
    };
    const onSubmitManagement = (data) => {
        console.log(data, "data1");
    };

    useEffect(() => {
        resetManagement({
            totalBlogsSummary: false,
            totalCollageSummary: false,
            totalGradesSummary: false,
            totalMockTestSummary: false,
            totalParentsSummary: true,
            totalRegularSummary: true,
            totalSchoolSummary: true,
            totalStudentsSummary: true,
            totalSubjectsSummary: true,
            totalTestSummary: true,
            totalTutorSummary: true,
            totalUniversitySummary: true,
        });
    }, []);

    useEffect(() => {
        reset({
            totalBlogs: false,
            totalCollage: false,
            totalGrades: false,
            totalMockTest: false,
            totalParents: true,
            totalRegular: true,
            totalSchool: true,
            totalStudents: true,
            totalSubjects: true,
            totalTest: true,
            totalTutors: true,
            totalUniversity: true,
        });
    }, []);

    return (
        <section className="py-10">
            <div className="flex justify-between items-center mb-12">
                <h1 className="font-bold text-xl md:text-4xl text-white">
                    Dashboard Widgets Settings
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow-lg">
                <div className="rounded-lg">
                    <div>
                        <div className="py-5 px-5">
                            <div>
                                <h2 className="capitalize text-lg font-semibold text-gray-700 ">
                                    Dashboard Header Cards Management
                                </h2>
                            </div>
                        </div>
                        <div className="px-5 py-5 bg-[#f1f5f9]">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-4">
                                    <div>
                                        <WidgetCheckbox
                                            labelName={"Total Tutors"}
                                            checkboxId={"total-tutors"}
                                            control={control}
                                            name="totalTutors"
                                        />
                                        <WidgetCheckbox
                                            control={control}
                                            labelName={"Total Parents"}
                                            checkboxId={"total-parents"}
                                            name="totalParents"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Total Students"}
                                            control={control}
                                            checkboxId={"total-students"}
                                            name="totalStudents"
                                        />
                                    </div>
                                    <div>
                                        <WidgetCheckbox
                                            labelName={"Total School"}
                                            control={control}
                                            checkboxId={"total-school"}
                                            name="totalSchool"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Total University"}
                                            control={control}
                                            checkboxId={"total-universities"}
                                            name="totalUniversity"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Total Collage"}
                                            control={control}
                                            checkboxId={"total-collages"}
                                            name="totalCollage"
                                        />
                                    </div>
                                    <div>
                                        <WidgetCheckbox
                                            labelName={"Total Grades"}
                                            control={control}
                                            checkboxId={"total-grades"}
                                            name="totalGrades"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Total Subjects"}
                                            control={control}
                                            checkboxId={"total-subjects"}
                                            name="totalSubjects"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Total Mock Test"}
                                            control={control}
                                            checkboxId={"total-mock-test"}
                                            name="totalMockTest"
                                        />
                                    </div>
                                    <div>
                                        <WidgetCheckbox
                                            labelName={"Total Regular"}
                                            control={control}
                                            checkboxId={"total-regulars"}
                                            name="totalRegular"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Total Blogs"}
                                            name="totalBlogs"
                                            control={control}
                                            checkboxId={"total-blogs"}
                                        />
                                        <WidgetCheckbox
                                            labelName={"Total Test"}
                                            name="totalTest"
                                            control={control}
                                            checkboxId={"total-test"}
                                        />
                                    </div>
                                </div>
                                <div className="ml-9 mt-4">
                                    <Button
                                        type="submit"
                                        color="blue"
                                        className="hover:-translate-y-1 transition-all duration-500"
                                    >
                                        Save
                                    </Button>
                                    {/* <Button
                                    color="blue"
                                    className="bg-primary relative text-white opacity-100 focus:opacity-100 focus:shadow-none active:opacity-100 hover:-translate-y-1 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40"
                                >
                                    Save
                                </Button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className="py-5 px-5">
                            <div>
                                <h2 className="capitalize text-lg font-semibold text-gray-700 ">
                                    Dashboard Widgets Management
                                </h2>
                            </div>
                        </div>
                        <div className="px-5 pt-5 pb-9 bg-[#f1f5f9]">
                            <form
                                onSubmit={submitManagement(onSubmitManagement)}
                            >
                                <div className="grid grid-cols-4">
                                    <div>
                                        <WidgetCheckbox
                                            labelName={"Tutors Summary"}
                                            checkboxId={"tutors-summary"}
                                            control={controlManagement}
                                            name="totalTutorSummary"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Parents Summary"}
                                            checkboxId={"parents-summary"}
                                            control={controlManagement}
                                            name="totalParentsSummary"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Students Summary"}
                                            checkboxId={"students-summary"}
                                            control={controlManagement}
                                            name="totalStudentsSummary"
                                        />
                                    </div>
                                    <div>
                                        <WidgetCheckbox
                                            labelName={"School Summary"}
                                            checkboxId={"school-summary"}
                                            control={controlManagement}
                                            name="totalSchoolSummary"
                                        />
                                        <WidgetCheckbox
                                            labelName={"University Summary"}
                                            checkboxId={"universities-summary"}
                                            control={controlManagement}
                                            name="totalUniversitySummary"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Collage Summary"}
                                            checkboxId={"collages-summary"}
                                            control={controlManagement}
                                            name="totalCollageSummary"
                                        />
                                    </div>
                                    <div>
                                        <WidgetCheckbox
                                            labelName={"Grades Summary"}
                                            checkboxId={"grades-summary"}
                                            control={controlManagement}
                                            name="totalGradesSummary"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Subjects Summary"}
                                            checkboxId={"subjects-summary"}
                                            control={controlManagement}
                                            name="totalSubjectsSummary"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Mock Test Summary"}
                                            checkboxId={"mock-test-summary"}
                                            control={controlManagement}
                                            name="totalMockTestSummary"
                                        />
                                    </div>
                                    <div>
                                        <WidgetCheckbox
                                            labelName={"Regular Summary"}
                                            checkboxId={"regulars-summary"}
                                            control={controlManagement}
                                            name="totalRegularSummary"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Blogs Summary"}
                                            checkboxId={"blogs-summary"}
                                            control={controlManagement}
                                            name="totalBlogsSummary"
                                        />
                                        <WidgetCheckbox
                                            labelName={"Test Summary"}
                                            checkboxId={"test-summary"}
                                            control={controlManagement}
                                            name="totalTestSummary"
                                        />
                                    </div>
                                </div>
                                <div className="ml-9 mt-4">
                                    <Button
                                        type="submit"
                                        color="blue"
                                        className="hover:-translate-y-1 transition-all duration-500"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardWidgets;
