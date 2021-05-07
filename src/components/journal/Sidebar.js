import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(startLogout())
    }

    const {name, picture} = useSelector(state => state.auth)
    
  
    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <img style={{width : '2rem'}} src={picture} alt={picture} />
                    <span> {name}</span>
                </h3>

                <button className="btn"
                        onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />    

        </aside>
    )
}
