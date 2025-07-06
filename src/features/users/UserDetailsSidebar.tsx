import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Avatar } from '../../components/Avatar';
import { User } from './users.types';
import { formatJoinDate } from '../../utils/date';
import { Mail, User as UserIcon, Calendar, Briefcase } from 'lucide-react';

interface UserDetailsSidebarProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailsSidebar: React.FC<UserDetailsSidebarProps> = ({ 
  user, 
  isOpen, 
  onClose 
}) => {
  if (!user) return null;
  
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="User Profile"
    >
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Avatar
            src={user.avatar}
            alt={`${user.firstname} ${user.lastname}`}
            size="xl"
            className="mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {user.firstname} {user.lastname}
          </h3>
          <p className="text-lg text-blue-600 font-medium mb-2">{user.role}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-4 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <UserIcon className="w-5 h-5 mr-2 text-gray-600" />
            Contact Information
          </h4>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-500 mr-3" />
              <span className="text-sm text-gray-700">{user.email}</span>
            </div>
            
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 text-gray-500 mr-3" />
              <span className="text-sm text-gray-700">{user.role}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-500 mr-3" />
              <span className="text-sm text-gray-700">
                Joined {formatJoinDate(user.join_date)}
              </span>
            </div>
          </div>
        </div>
        
        {/* About Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">About</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed text-sm">
              {user.description}
            </p>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};