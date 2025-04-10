import React from 'react';
import { Calendar, MapPin, Users, Award, Activity } from 'lucide-react';
import { EventCardProps } from '../types';
import { Link, useNavigate } from 'react-router-dom';

export default function EventCard({ event, onJoin, isJoined }: EventCardProps) {
  const isFullyBooked = event.currentParticipants >= event.maxParticipants;
  const navigate = useNavigate();

  const handleCardClick = () => {
    const eventId = event._id;
    console.log("Navigating to event with ID:", eventId);
    console.log("Event details:", event);
    navigate(`/event/${eventId}`);
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoin(event._id);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02] border border-gray-100 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-md text-sm font-medium border border-gray-200">
          {event.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 tracking-tight">{event.title}</h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Award className="w-4 h-4 mr-2" />
            <span>{event.pointsEarned} points</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Hosted by {event.host}</span>
          <button
            onClick={handleJoinClick}
            disabled={isJoined || event.currentParticipants >= event.maxParticipants}
            className={`w-1/2 px-4 py-2 rounded-md ${
              isJoined 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : event.currentParticipants >= event.maxParticipants
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {isJoined 
              ? 'Joined' 
              : event.currentParticipants >= event.maxParticipants
              ? 'Fully Booked'
              : 'Join Event'}
          </button>
        </div>
      </div>
    </div>
  );
}