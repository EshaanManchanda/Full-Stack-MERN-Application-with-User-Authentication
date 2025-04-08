import React from 'react';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { BiHomeAlt } from 'react-icons/bi';
import { IoMdNotifications } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';

const IconExample: React.FC = () => {
  // Use React.createElement to avoid TypeScript errors with React Icons
  const renderIcon = (Icon: any, props: any) => {
    return React.createElement(Icon, props);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">React Icons Examples</h2>
      
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              {renderIcon(FaCheck, { size: 24, className: "text-success mb-2" })}
              <p>Success Check</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              {renderIcon(FaTimes, { size: 24, className: "text-danger mb-2" })}
              <p>Error/Close</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              {renderIcon(BiHomeAlt, { size: 24, className: "text-primary mb-2" })}
              <p>Home Icon</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              {renderIcon(IoMdNotifications, { size: 24, className: "text-warning mb-2" })}
              <p>Notification</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              {renderIcon(MdEmail, { size: 24, className: "text-info mb-2" })}
              <p>Email</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              {renderIcon(FaEdit, { size: 24, className: "text-secondary mb-2" })}
              <p>Edit</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              {renderIcon(FaTrash, { size: 24, style: { color: '#dc3545' }, className: "mb-2" })}
              <p>Delete</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3>Usage Examples:</h3>
        <pre className="bg-light p-3 rounded">
          {`// Import icons
import { FaCheck } from 'react-icons/fa';
import { BiHomeAlt } from 'react-icons/bi';

// Use in JSX with React.createElement to avoid TypeScript errors
{React.createElement(FaCheck, { size: 24, className: "text-success" })}
{React.createElement(BiHomeAlt, { size: 24, className: "text-primary" })}

// OR use the renderIcon helper function
const renderIcon = (Icon, props) => React.createElement(Icon, props);
{renderIcon(FaCheck, { size: 24, className: "text-success" })}
`}
        </pre>
      </div>
    </div>
  );
};

export default IconExample; 