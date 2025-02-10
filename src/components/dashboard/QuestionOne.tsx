const QuestionOne = () => {
    const Question = [{
        list: {
            data: [
                {
                    title: "What is the capital of India?",
                    options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
                }
            ]
        }
    }];
    return (
        <div className="text-center">
            <p>{Question[0].list.data[0].title} {Question[0].list.data[0].options[0]}</p>
        </div>
    )
}

export default QuestionOne
