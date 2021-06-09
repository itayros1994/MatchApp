import React from 'react';
import nemo from '../assets/imgs/nemoDemo.jpg'

export function ParticipantPreview({ member }) {
  return <div className="participant"><img className="member-img-participant" src={member.imgUrl}/></div>;
}
