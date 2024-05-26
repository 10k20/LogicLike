import { Key } from "react";
import "./Sidebar.scss";

interface SidebarProps {
  themes: string[];
  onTagClick: (tag: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ themes, onTagClick }) => {
  return (
    <aside>
      <ul>
        <li onClick={() => onTagClick('')}>Все темы</li>
        {
          themes.map((tag:string, index:Key) => (
            <li key={index} onClick={() => onTagClick(tag)}>{tag}</li>
          ))
        }
      </ul>
    </aside>
  )
}