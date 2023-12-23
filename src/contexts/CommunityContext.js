import React, { useContext, useState } from 'react'

export const communityContext = React.createContext();
export const updateCommunityContext = React.createContext();

export function useCommunityContext() {
  return useContext(communityContext);
}

export function useUpdateCommunityContext() {
  return useContext(updateCommunityContext);
}

function CommunityContext({ children }) {
  const [community, setCommunity] = useState({
    communityId: 2,
    communityName: "DHA Phase 7",
    communityLongitude: "31.4682",
    communityLatitude: "74.4393"
  });

  const updateCommunity = (data) => {
    setCommunity(data);
  };


  return (
    <communityContext.Provider value={community}>
      <updateCommunityContext.Provider value={updateCommunity}>
        {children}
      </updateCommunityContext.Provider>
    </communityContext.Provider>

  );
}

export default CommunityContext;