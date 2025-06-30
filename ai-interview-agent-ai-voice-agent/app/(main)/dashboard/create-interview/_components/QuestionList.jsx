"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Loader, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";

function QuestionList({ formData, onCreateLink }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });

      let content = result.data;

      if (!content) {
        toast.error("No content received from server.");
        setLoading(false);
        return;
      }

      console.log("⚙️ AI RAW Content:", content);

      // Ensure content is a string
      if (typeof content !== "string") {
        content = JSON.stringify(content);
      }

      // Try to extract JSON block using regex
      let jsonString = content.trim();
      if (content.includes("```json")) {
        const match = content.match(/```json\s*([\s\S]*?)```/i);
        if (match) {
          jsonString = match[1].trim();
        }
      }

      let parsed;
      try {
        parsed = JSON.parse(jsonString);
      } catch (jsonError) {
        console.error("❌ Failed to parse JSON:", jsonString);
        toast.error("Invalid JSON format received from AI.");
        setLoading(false);
        return;
      }

      if (!parsed || !Array.isArray(parsed.interviewQuestions)) {
        toast.error("No interview questions found in the server response.");
        setLoading(false);
        return;
      }

      setQuestionList(parsed.interviewQuestions);
      setLoading(false);
    } catch (error) {
      console.error("🚨 AI Generation Error:", error);
      toast.error("Server Error. Please try again.");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();

    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...formData,
          questionList,
          userEmail: user?.email,
          interview_id,
        },
      ])
      .select();

    // Update user credits
    await supabase
      .from("Users")
      .update({ credits: Number(user?.credits) - 1 })
      .eq("email", user?.email)
      .select();

    setSaveLoading(false);
    onCreateLink(interview_id);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job position...
            </p>
          </div>
        </div>
      )}

      {!loading && questionList?.length > 0 && (
        <QuestionListContainer questionList={questionList} />
      )}

      <div className="flex justify-end mt-10">
        <Button onClick={onFinish} disabled={saveLoading}>
          {saveLoading && <Loader className="animate-spin mr-2" />}
          Created Interview Link & Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
