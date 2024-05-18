import RenderSteps from "./RenderSteps";


export default function AddCourse() {
    return (
        <>
            <div className="flex w-full items-start gap-x-6">
                <div className="flex flex-1 flex-col">
                    <h1 className="mb-14 text-richblack-5 text-3xl font-medium">
                        Add Course
                    </h1>
                    <div className="flex-1">
                        <RenderSteps/>
                    </div>
                </div>
                <div className="stickey top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
                    <p className="text-richblack-5 mb-8 text-lg">
                        ⚡ Code Upload Tips
                    </p>
                    <ul className="ml-5 text-richblack-5 list-item list-disc text-xs space-y-4">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video secion controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video secion controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}