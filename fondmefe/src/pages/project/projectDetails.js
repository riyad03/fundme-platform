import React, { useEffect, useState } from 'react';

import ContentComp from './components/ContentComp';
import  MediaComp from './components/MediaComp';
import ProfileComp from './components/ProfileComp';
import TabsComp from './components/TabsComp';
import SuggestionsComp from './components/SuggestionsComp';
import { useParams } from 'react-router-dom';

export default function ProjectDetails() {
  const campaigns = ['Campaign #1', 'Campaign #2', 'Campaign #3'];
  const tabs = ['Campaigns', 'Rewards', 'Creators', 'FAQ', 'Comments'];
  const [activeTab, setActiveTab] = useState('Campaigns');
  const {projectid}=useParams();
  const [projectdata,SetData]=useState(null);
  useEffect(()=>{
    const projects=
      {0:{title:'test',description:'this is just a test',tag:"test"},
      1:{title:'test1',description:'this is just a test',tag:"test"}};
    SetData(projects[projectid]);
  },[projectid]);
  if (!projectdata) {
    return <div className="p-6 text-white">Loading…</div>;
  }
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Media + Stats */}
      <MediaComp campaigns={campaigns}/>

      {/* Profile & Actions */}
      <ProfileComp title={projectdata.title} />      

      {/* Tabs */}
      <TabsComp tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}/>

      {/* Content */}
      <ContentComp campaigns={campaigns} activeTab={activeTab}/>

      <SuggestionsComp SimilarTag={projectdata.tag}></SuggestionsComp>

    </div>
  );
}
