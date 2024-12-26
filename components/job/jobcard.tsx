import Image from "next/image";
import Link from "next/link"; // Import Link component
import { FC } from "react";

interface AvatarProps {
  src: string;
  alt: string;
}

interface TaskProps {
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  taskDone: number;
  totalTasks: number;
  tags: string[];
  avatars: AvatarProps[];
}

const JobCard: FC<TaskProps> = ({
  title,
  description,
  progress,
  dueDate,
  taskDone,
  totalTasks,
  tags,
  avatars,
}) => {
  return (
    <div className="flex-shrink max-w-full w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 mb-6 h-full">
        <div className="flex flex-row justify-between pb-4">
          <div className="flex flex-col">
            <h3 className="text-base font-bold">{title}</h3>
          </div>
          <div className="relative">
            <button
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-three-dots w-6 h-6"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col pb-4">
          <div className="flex flex-row items-center">
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-2 py-1 flex items-center font-semibold text-xs rounded text-yellow-700 bg-yellow-200">
            On Progress
          </span>
          <span className="px-2 py-1 flex items-center font-semibold text-xs rounded text-red-400 border border-red-400 bg-white">
            Due: {dueDate}
          </span>
        </div>
        <div className="relative mb-4">
          {avatars.map((avatar, index) => (
            <Link href="/" key={index}>
              <Image
                src={avatar.src}
                alt={avatar.alt}
                className="inline-block shadow-xl max-w-full ltr:-mr-4 rtl:-ml-4 border-2 border-gray-200 bg-gray-300 dark:bg-gray-900 dark:border-gray-700 transform hover:-translate-y-1 w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <div>
            <span className="text-sm inline-block text-gray-500 dark:text-gray-100">
              Task done : <span className="text-gray-700 dark:text-white font-bold">{taskDone}</span>/{totalTasks}
            </span>
          </div>
          <div>
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 mr-2 text-xs rounded font-semibold bg-gray-100 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
