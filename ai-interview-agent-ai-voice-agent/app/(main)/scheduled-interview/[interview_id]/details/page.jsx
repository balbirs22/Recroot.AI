"use client";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidateList from "./_components/CandidateList";

function InterviewDetails() {
  const { interview_id } = useParams();
  const [interviewDetail, setInterviewDetail] = useState();

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetail();
    }
  }, [interview_id]);

  const GetInterviewDetail = async () => {
    const { data, error } = await supabase
      .from("Interviews")
      .select(`
        jobPosition,
        jobDescription,
        questionList,
        type,
        duration,
        interview_id,
        created_at,
        interview_feedback(userEmail, userName, feedback, created_at)
      `)
      .eq("interview_id", interview_id)
      .single(); // since interview_id is unique

    if (error) {
      console.error("❌ Supabase fetch error:", error);
    }

    setInterviewDetail(data);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidate={interviewDetail?.interview_feedback || []} />
    </div>
  );
}

export default InterviewDetails;
