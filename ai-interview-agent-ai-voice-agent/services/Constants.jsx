import {
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  Settings,
  TargetIcon,
  User2Icon,
  WalletCards,
} from "lucide-react";

export const SideBarOption = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: TargetIcon,
  },
];

export const QUESTIONS_PROMPT = `
You are an expert technical interviewer.

Based on the following inputs, generate a well-structured list of high-quality interview questions:

- Job Title: {{jobTitle}}
- Job Description: {{jobDescription}}
- Interview Duration: {{duration}} minutes
- Interview Type: {{type}}

📌 Your task:
- Analyze the job description to identify key responsibilities, required skills, and expected experience.
- Generate a list of interview questions depending on the interview duration.
- Adjust the number and depth of questions to match the interview duration.
- Ensure the questions reflect the tone and structure of a real-life {{type}} interview.

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.

📝 Return the response **strictly** in the following JSON format inside a Markdown code block:

\`\`\`json
{
  "interviewQuestions": [
    {
      "question": "Describe a time you had to learn a new technology quickly.",
      "type": "Behavioral"
    },
    {
      "question": "Explain how you would design a scalable backend for a large e-commerce site.",
      "type": "Technical"
    }
  ]
}
\`\`\`
`;

export const FEEDBACK_PROMPT = `{{conversation}}
Depends on this Interview Conversation between assistant and user, 
give me feedback for the user interview. Give me rating out of 10 for Technical Skills, 
Communication, Problem Solving, and Experience. Also give me a summary in 3 lines 
about the interview and one line to let me know whether it is recommended 
for hire or not with a message. Give me the response in JSON format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7
    },
    "summary": "<in 3 lines>",
    "recommendation": "",
    "recommendationMsg": ""
  }
}`;
