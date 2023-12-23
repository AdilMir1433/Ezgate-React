import React, { useContext, useState } from 'react'

export const blockContext = React.createContext();
export const updateBlockContext = React.createContext();

export function useBlockContext() {
    return useContext(blockContext);
}

export function useUpdateBlockContext() {
    return useContext(updateBlockContext);
}

function BlockContext({ children }) {
    const [block, setBlock] = useState({
        id: 5,
        blockName: "W",
        communityByCommunityId: {
            communityId: 2,
            communityName: "DHA Phase 7",
            communityLongitude: "31.4682",
            communityLatitude: "74.4393"
        }
    });

    const updateBlock = (data) => {
        setBlock(data);
    };


    return (
        <blockContext.Provider value={block}>
            <updateBlockContext.Provider value={updateBlock}>
                {children}
            </updateBlockContext.Provider>
        </blockContext.Provider>

    );
}

export default BlockContext;