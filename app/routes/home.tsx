import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState  } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "smart feedback for your dream job" },
  ];
}

export default function Home() {
  const {auth , kv} = usePuterStore()  ;
  const navigate =useNavigate();
  const [resumes , setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(()=>{
        if(!auth.isAuthenticated) navigate('/auth?next=/')
  },[auth.isAuthenticated ])

 useEffect(()=>{
  const loadResume = async()=>{
      setLoading(true);
      const resumes = (await kv.list('resume:*',true))as KVItem[];
      const parsedResumes=resumes.map((resume)=>(
        JSON.parse(resume.value) as Resume
      ))

      console.log('parsedResuems' , parsedResumes);
      setResumes(parsedResumes || []);
      setLoading(false)
  } 
  loadResume();
 },[])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover "> 
  <Navbar/>
    <section className="main-section">
          <div className="page-heading py-16">
                <h1>Track your application & resume Ratings</h1>
                {
                  !loading &&resumes.length ===0 ?(
                    <h2>No resumes found. upload your first resume to get feedback</h2>
                  ):(
                <h2>Review your submission andcheck AI-powered feedback</h2>
                  )
                }
          </div>
          {
            loading &&(
              <div className="flex flex-col items-center justify-center">
                  <img src="/images/resume-scan-2.gif" alt="" loading="lazy" className="w-[200px]" />
              </div>
            )
          }
          {
            resumes.length >0 &&(
              <div className="resumes-section">
                  {
                    resumes.map((resume)=>(
                      <ResumeCard key={resume.id} resume={resume} />
                    ))
                  }
              </div>
            )
          }

          {
            !loading && resumes.length===0  && (
              <div className="flex flex-col items-center justify-center mt-10 gap-4">
                  <Link to={'/upload'} >
                      upload Resume
                  </Link>
              </div>
            )
          }
    </section>
  </main>
}
