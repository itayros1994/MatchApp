import React from 'react';
import { ParticipantPreview } from './ParticipantPreview';

export function ParticipantList({ members }) {
  return (
    <div className="participant-list">
      {members.map((member) => {
        return <ParticipantPreview key={member._id} member={member} />;
      })}
    </div>
  );
}
