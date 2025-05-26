import React, { useEffect, useState } from 'react';

import ContentComp from './components/ContentComp';
import  MediaComp from './components/MediaComp';
import ProfileComp from './components/ProfileComp';
import TabsComp from './components/TabsComp';
import SuggestionsComp from './components/SuggestionsComp';
import { useParams } from 'react-router-dom';
import {getCachedProject} from "../../components/cach";
import { useLocation } from 'react-router-dom';

export default function ProjectDetails() {
  const tabs = ['Campaigns', 'Rewards', 'Creators', 'FAQ', 'Comments'];
  const [CampaignData,SetCampaignData]=useState(null);
  const [activeTab, setActiveTab] = useState('Campaigns');
  const routeParams = useParams();
  const [projectid, setProjectId] = useState(routeParams.projectid);
  const [projectdata,SetData]=useState(null);
  const [questionData,SetQuestionData]=useState(null);
  const [rewardData,SetRewardData]=useState(null);
  const [userData,setUserData]=useState(null);
  

  
  const location = useLocation();
  useEffect(()=>{
    /** Get the cached project */
    
    /*const {cachedProject,cachedUser} = getCachedProject(projectid);
   console.log("this for project details");

    if (!cachedProject){
      console.log("unloaded");
    }else{
      console.log("test "+ cachedProject);
    }*/
    
    console.log(location.state.project);
    console.log(location.state.user);
    SetData(location.state.project);
    setUserData(location.state.user);
    /** Get Campaigns related to that project */
    
      fetch(`http://localhost:8080/api/campaigns/${projectid}`).
      then((res)=>{
        if(res.ok)
          return res.json();
        throw new Error("Failed to fetch");
        
      }).then(
        (data)=>{SetCampaignData(data); }
      ).catch(
        (err)=>{console.error("❌ Fetch error:", err);

      })
    
    /** Get Questions related to that project */
  
      fetch(`http://localhost:8080/api/questions/${projectid}`).
      then((res)=>{
        if(res.ok)
          return res.json();
        throw new Error("Failed to fetch");
        
      }).then(
        (data)=>{SetQuestionData(data);}
      ).catch(
        (err)=>{console.error("❌ Fetch error:", err);

      })
    
    /** Get Reward related to that project */
    
      fetch(`http://localhost:8080/api/rewards/${projectid}`).
      then((res)=>{
        if(res.ok)
          return res.json();
        throw new Error("Failed to fetch");
        
      }).then(
        (data)=>{SetRewardData(data);}
      ).catch(
        (err)=>{console.error("❌ Fetch error:", err);

      })
    

  },[projectid]);

  
  if (!projectdata/*||!CampaignData || !rewardData || !questionData*/) {
    return <div className="p-6 text-white">Loading…</div>;
  }

  console.log(userData);
  const campaigns =CampaignData||[];
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Media + Stats */}
      <MediaComp campaigns={5000} name={projectdata.name} videoId={projectdata.videoId} videoUrl={projectdata.videoUrl&& projectdata.videoUrl} donationGoal={projectdata.donationGoal}/>

      {/* Profile & Actions */}
      <ProfileComp title={projectdata.title} users={userData.name} userid={userData.id} followers={userData.followers.length}/>      

      {/* Tabs */}
      <TabsComp tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}/>

      {/* Content */}
      <ContentComp campaigns={campaigns} rewards={rewardData} faq={questionData} activeTab={activeTab} name={userData.name} followers={userData.followers.length} description={userData.description}/>

      <SuggestionsComp SimilarTag={projectdata.tag}></SuggestionsComp>

    </div>
  );
}


//for following  http://manual-api-gateway-service:8080/api/follow/users/1/target/2