import React from 'react';
import "./topbar.css";
import { NotificationsNone, Language, Settings, AccountCircle } from '@mui/icons-material';

export default function TopBar() {
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                <span className='logo'> shopadmin</span>
            </div>
            <div className='topRight'>
               <div className='topbarIconContainer'>
                 <NotificationsNone />
                 <span className='topiconBadge'> 2 </span>     
               </div>
               <div className='topbarIconContainer'>
                 <Language />
                 <span className='topiconBadge'> 2 </span>     
               </div>
               <div className='topbarIconContainer'>
                 <Settings />    
               </div>
               <div className='topbarIconContainer'>
                 <AccountCircle />    
               </div>
            </div>
        </div>
    </div>
  )
}
