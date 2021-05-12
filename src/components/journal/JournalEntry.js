import React from 'react'
import moment from 'moment'
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';





export const JournalEntry = ({ id, body, date, title, url }) => {


    const noteDate = moment(date);
    const dispatch = useDispatch()


    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            body,
            date,
            title,
            url,
        }))

    }

    return (
        <div className="journal__entry pointer"
            onClick={handleEntryClick}>

            {
                (url) &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `${url}`
                    }}
                ></div>}

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>

        </div>
    )
}
