import React from 'react';
import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Eye } from 'lucide-react';
import { User } from './users.types';

interface UserCardProps {
  user: User;
  onViewMore: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onViewMore }) => {
  return (
    <Card hover className="p-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <Avatar
          src={user.avatar}
          alt={`${user.firstname} ${user.lastname}`}
          size="xl"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {user.firstname} {user.lastname}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{user.role}</p>
        </div>
        <Button
          onClick={onViewMore}
          variant="outline"
          size="sm"
          icon={Eye}
          className="w-full"
        >
          View More
        </Button>
      </div>
    </Card>
  );
};