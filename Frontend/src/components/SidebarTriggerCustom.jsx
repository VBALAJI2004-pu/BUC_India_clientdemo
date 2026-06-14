import React from 'react';
import { Menu } from 'lucide-react';
import { useSidebar } from './ui/sidebar';
import { cn } from '../lib/utils';

export const SidebarTriggerCustom = ({ className }) => {
    const { toggleSidebar, isMobile, setOpenMobile } = useSidebar();

    const handleToggle = () => {
        if (isMobile) {
            setOpenMobile(true);
        } else {
            toggleSidebar();
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={cn(
                "p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-500 hover:bg-blue-500/20 transition-all active:scale-95",
                className
            )}
            aria-label="Open Sidebar"
        >
            <Menu className="h-6 w-6" />
        </button>
    );
};
